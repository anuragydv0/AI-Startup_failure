import "server-only"
import { logger } from "@/backend/utils/logger"
import type { ParsedDocument, ParsedPageLike } from "@/backend/models/analysis"
import { PDFParse } from "pdf-parse"

export async function parsePDF(
  fileBuffer: Buffer,
  fileName: string,
  fileSize: number
): Promise<ParsedDocument> {
  let pdfParser: PDFParse | null = null
  try {
    logger.info({
      message: "Starting PDF parsing",
      context: { fileName, fileSize },
    })

    pdfParser = new PDFParse({ data: fileBuffer })
    const textResult = await pdfParser.getText()

    const pages: ParsedPageLike[] = textResult.pages.map((p) => ({
      index: p.num,
      title: `Page ${p.num}`,
      text: p.text || "",
    }))

    const extractedText = textResult.text || ""
    const numPages = textResult.total || pages.length || 1

    logger.info({
      message: "PDF parsing completed successfully",
      context: { fileName, pages: numPages, textLength: extractedText.length },
    })

    return {
      fileName,
      fileType: "pdf",
      fileSize,
      text: extractedText,
      pages,
      metadata: {
        pageCount: numPages,
        extractedAt: new Date().toISOString(),
        parser: "pdf-parse",
      },
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    logger.error({
      message: "PDF parsing failed",
      context: { fileName, error: errorMessage, stack: error instanceof Error ? error.stack : undefined },
    })

    // Return fallback with empty text - let Claude rule-based engine handle it
    return {
      fileName,
      fileType: "pdf",
      fileSize,
      text: "",
      pages: [],
      metadata: {
        pageCount: 0,
        extractedAt: new Date().toISOString(),
        parser: "pdf-parse-failed",
      },
    }
  } finally {
    if (pdfParser) {
      try {
        await pdfParser.destroy()
      } catch (destroyError) {
        logger.error({
          message: "Failed to destroy pdfParser instance",
          context: { error: destroyError instanceof Error ? destroyError.message : String(destroyError) },
        })
      }
    }
  }
}
