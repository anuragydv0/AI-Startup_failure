import { AppError } from "@/backend/utils/errors"
import { fileKindSchema, type FileKind } from "@/backend/models/analysis"

const allowedMimeTypes: Record<FileKind, string[]> = {
  pdf: ["application/pdf"],
  pptx: [
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-powerpoint",
  ],
}

export function detectFileKind(fileName: string): FileKind {
  const extension = fileName.split(".").pop()?.toLowerCase()
  const inferred = extension === "pdf" ? "pdf" : extension === "pptx" ? "pptx" : null

  const result = fileKindSchema.safeParse(inferred)
  if (!result.success) {
    throw new AppError(
      400,
      "UNSUPPORTED_FILE_TYPE",
      "Only PDF and PPTX files are supported."
    )
  }

  return result.data
}

export function validateUpload(file: File, maxUploadBytes: number): FileKind {
  if (!file) {
    throw new AppError(400, "FILE_REQUIRED", "No file was provided.")
  }

  if (file.size === 0) {
    throw new AppError(400, "EMPTY_FILE", "The uploaded file is empty.")
  }

  if (file.size > maxUploadBytes) {
    throw new AppError(
      413,
      "FILE_TOO_LARGE",
      `File size exceeds the ${Math.floor(maxUploadBytes / 1024 / 1024)}MB limit.`
    )
  }

  const fileKind = detectFileKind(file.name)
  const mimes = allowedMimeTypes[fileKind]
  if (file.type && !mimes.includes(file.type)) {
    throw new AppError(
      400,
      "INVALID_MIME_TYPE",
      `Invalid file MIME type: ${file.type}. Expected ${mimes.join(", ")}.`
    )
  }

  return fileKind
}

