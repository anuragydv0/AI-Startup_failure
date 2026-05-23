import "server-only"
import JSZip from "jszip"
import { XMLParser } from "fast-xml-parser"
import { AppError } from "@/backend/utils/errors"
import type { ParsedDocument } from "@/backend/models/analysis"

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  processEntities: true,
  trimValues: true,
})

function extractTextRuns(node: unknown): string[] {
  if (!node) return []

  if (typeof node === "string") return [node]
  if (Array.isArray(node)) return node.flatMap((item) => extractTextRuns(item))
  if (typeof node !== "object") return []

  const record = node as Record<string, unknown>
  const parts: string[] = []

  for (const [key, value] of Object.entries(record)) {
    if (key === "a:t" && typeof value === "string") {
      parts.push(value)
      continue
    }
    parts.push(...extractTextRuns(value))
  }

  return parts
}

function getSlideNumber(path: string) {
  const matched = path.match(/slide(\d+)\.xml$/i)
  return matched ? Number.parseInt(matched[1], 10) : 0
}

export async function parsePPTX(
  fileBuffer: Buffer,
  fileName: string,
  fileSize: number
): Promise<ParsedDocument> {
  try {
    const zip = await JSZip.loadAsync(fileBuffer)
    const slidePaths = Object.keys(zip.files)
      .filter((path) => /^ppt\/slides\/slide\d+\.xml$/i.test(path))
      .sort((a, b) => getSlideNumber(a) - getSlideNumber(b))

    if (slidePaths.length === 0) {
      throw new AppError(422, "PPTX_PARSE_FAILED", "No slides detected in PPTX file.")
    }

    const pages = await Promise.all(
      slidePaths.map(async (slidePath, index) => {
        const slideXML = await zip.file(slidePath)?.async("text")
        if (!slideXML) {
          return {
            index: index + 1,
            title: `Slide ${index + 1}`,
            text: "",
            noteText: "",
          }
        }

        const slideTree = xmlParser.parse(slideXML)
        const textRuns = extractTextRuns(slideTree)
          .map((entry) => entry.trim())
          .filter(Boolean)
        const joinedText = textRuns.join(" ")

        const slideNumber = getSlideNumber(slidePath)
        const notePath = `ppt/notesSlides/notesSlide${slideNumber}.xml`
        const noteXml = await zip.file(notePath)?.async("text")
        const noteText = noteXml
          ? extractTextRuns(xmlParser.parse(noteXml))
              .map((entry) => entry.trim())
              .filter(Boolean)
              .join(" ")
          : ""

        const title = textRuns[0] ? textRuns[0].slice(0, 100) : `Slide ${index + 1}`

        return {
          index: index + 1,
          title,
          text: joinedText,
          noteText,
        }
      })
    )

    const fullText = pages
      .map((slide) => [slide.title, slide.text, slide.noteText].filter(Boolean).join("\n"))
      .join("\n\n")

    return {
      fileName,
      fileType: "pptx",
      fileSize,
      text: fullText,
      pages,
      metadata: {
        pageCount: pages.length,
        extractedAt: new Date().toISOString(),
        parser: "jszip-fast-xml-parser",
      },
    }
  } catch (error) {
    throw new AppError(422, "PPTX_PARSE_FAILED", "Unable to parse PPTX content.", {
      fileName,
      reason: error instanceof Error ? error.message : "unknown",
    })
  }
}

