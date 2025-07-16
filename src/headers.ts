
import { CONTENTTYPE_JSON } from "./contenttypes"

export const headers = (initial?: Record<string, string>): Headers => {
  return new Headers(initial)
}

class Headers {
  private headers: Record<string, string>

  constructor(initial?: Record<string, string>) {
    this.headers = { ...(initial ?? {}) }
  }

  withBearer(token: string): this {
    this.headers["Authorization"] = "Bearer " + token
    return this
  }

  withLanguage(language?: string): this {
    if (language) {
      this.headers["Accept-Language"] = language
    }
    return this
  }

  withContentTypeJson(): this {
    return this.withContentType(CONTENTTYPE_JSON)
  }

  withContentType(contentType: string): this {
    this.headers["Content-Type"] = contentType
    return this
  }

  withHeader(key: string, value?: string): this {
    if (value) {
      this.headers[key] = value
    }
    return this
  }

  export(): Record<string, string> {
    return { ...this.headers }
  }
}