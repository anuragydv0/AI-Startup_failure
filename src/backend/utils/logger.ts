type LogLevel = "info" | "warn" | "error"

interface LogPayload {
  message: string
  context?: Record<string, unknown>
}

function format(level: LogLevel, payload: LogPayload) {
  return JSON.stringify({
    level,
    message: payload.message,
    context: payload.context ?? {},
    timestamp: new Date().toISOString(),
  })
}

export const logger = {
  info(payload: LogPayload) {
    console.info(format("info", payload))
  },
  warn(payload: LogPayload) {
    console.warn(format("warn", payload))
  },
  error(payload: LogPayload) {
    console.error(format("error", payload))
  },
}

