import "server-only"
import { parsePDF } from "@/backend/parsers/pdf-parser"
import { parsePPTX } from "@/backend/parsers/pptx-parser"
import type { FileKind, ParsedDocument } from "@/backend/models/analysis"

export async function parseUploadedDocument(
  fileBuffer: Buffer,
  fileName: string,
  fileSize: number,
  fileType: FileKind
): Promise<ParsedDocument> {
  if (fileType === "pdf") {
    return parsePDF(fileBuffer, fileName, fileSize)
  }

  return parsePPTX(fileBuffer, fileName, fileSize)
}

