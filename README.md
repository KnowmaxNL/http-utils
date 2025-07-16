# HTTP Utils

A TypeScript library providing utilities for HTTP operations including headers, content types, status codes, and HTTP methods.

## Installation

```bash
npm install http-utils
```

## Features

- 🔧 **Headers Builder**: Fluent API for building HTTP headers
- 📝 **Content Types**: Constants for common MIME types
- 🚦 **Status Codes**: HTTP status code constants and helper functions
- 🌐 **HTTP Methods**: HTTP method constants and utilities

## Usage

### Headers Builder

```typescript
import { headers } from 'http-utils'

// Basic usage
const basicHeaders = headers()
  .withContentTypeJson()
  .withBearer('your-token')
  .export()

// Advanced usage
const advancedHeaders = headers({ 'X-Custom': 'value' })
  .withBasicAuth('username', 'password')
  .withLanguage('en-US')
  .withUserAgent('MyApp/1.0')
  .withNoCacheControl()
  .export()

// For fetch API
const fetchHeaders = headers()
  .withBearer('token')
  .toFetchHeaders()

fetch('/api/data', {
  headers: fetchHeaders
})
```

### Content Types

```typescript
import { 
  CONTENTTYPE_JSON, 
  CONTENTTYPE_XML, 
  CONTENTTYPE_FORM_URLENCODED,
  CONTENTTYPE_IMAGE_PNG 
} from 'http-utils'

// Use in your requests
headers().withContentType(CONTENTTYPE_JSON)
headers().withAccept(CONTENTTYPE_XML)
```

### Status Codes

```typescript
import { 
  STATUS_OK, 
  STATUS_NOT_FOUND, 
  STATUS_INTERNAL_SERVER_ERROR,
  isSuccess,
  isError 
} from 'http-utils'

// Check response status
if (response.status === STATUS_OK) {
  // Handle success
}

// Use helper functions
if (isSuccess(response.status)) {
  // Handle any success status (2xx)
}

if (isError(response.status)) {
  // Handle any error status (4xx or 5xx)
}
```

### HTTP Methods

```typescript
import { 
  HTTP_GET, 
  HTTP_POST, 
  isIdempotent, 
  allowsBody 
} from 'http-utils'

// Use in requests
fetch('/api/data', { method: HTTP_POST })

// Check method properties
if (isIdempotent(method)) {
  // Safe to retry
}

if (allowsBody(method)) {
  // Can include request body
}
```

## API Reference

### Headers Class

| Method | Description |
|--------|-------------|
| `withBearer(token)` | Add Bearer authorization |
| `withBasicAuth(username, password)` | Add Basic authorization |
| `withApiKey(key, headerName?)` | Add API key (default: X-API-Key) |
| `withContentTypeJson()` | Set Content-Type to application/json |
| `withContentTypeForm()` | Set Content-Type to application/x-www-form-urlencoded |
| `withAcceptJson()` | Set Accept to application/json |
| `withLanguage(language)` | Set Accept-Language |
| `withUserAgent(userAgent)` | Set User-Agent |
| `withNoCacheControl()` | Set no-cache headers |
| `withHeader(key, value)` | Add custom header |
| `withHeaders(headers)` | Add multiple headers |
| `removeHeader(key)` | Remove header |
| `hasHeader(key)` | Check if header exists |
| `getHeader(key)` | Get header value |
| `export()` | Get plain object |
| `toFetchHeaders()` | Get fetch-compatible Headers |

### Status Code Helpers

| Function | Description |
|----------|-------------|
| `isInformational(status)` | Check if status is 1xx |
| `isSuccess(status)` | Check if status is 2xx |
| `isRedirection(status)` | Check if status is 3xx |
| `isClientError(status)` | Check if status is 4xx |
| `isServerError(status)` | Check if status is 5xx |
| `isError(status)` | Check if status is 4xx or 5xx |

### HTTP Method Helpers

| Function | Description |
|----------|-------------|
| `isIdempotent(method)` | Check if method is idempotent |
| `isSafe(method)` | Check if method is safe |
| `allowsBody(method)` | Check if method allows request body |

## Requirements

- Node.js 16.0.0 or higher
- TypeScript 4.0+ (for TypeScript projects)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://github.com/KnowmaxNL/http-utils#readme)
- 🐛 [Report Issues](https://github.com/KnowmaxNL/http-utils/issues)
- 💬 [Discussions](https://github.com/KnowmaxNL/http-utils/discussions)

---

Made with ❤️ by [Knowmax BV](https://github.com/KnowmaxNL)
