export interface ApiSuccess<T> {
  ok: true
  data: T
}

export interface ApiErrorShape {
  ok: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export type ApiResponse<T> = ApiSuccess<T> | ApiErrorShape

