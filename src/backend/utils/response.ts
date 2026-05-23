import { NextResponse } from "next/server"
import type { ApiResponse } from "@/backend/models/api"
import { AppError, toAppError } from "@/backend/utils/errors"
import { logger } from "@/backend/utils/logger"

export function okResponse<T>(data: T, status = 200) {
  return NextResponse.json<ApiResponse<T>>({ ok: true, data }, { status })
}

export function errorResponse(error: unknown) {
  const appError = toAppError(error)

  if (!(error instanceof AppError)) {
    logger.error({
      message: "Unhandled error reached response boundary",
      context: { error: appError.message, details: appError.details },
    })
  }

  return NextResponse.json<ApiResponse<never>>(
    {
      ok: false,
      error: {
        code: appError.code,
        message: appError.message,
        details: appError.details,
      },
    },
    { status: appError.status }
  )
}

