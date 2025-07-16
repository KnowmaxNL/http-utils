# HTTP Utils

A TypeScript library providing utilities for HTTP operations including headers and content types.

## Installation

```bash
npm install @knowmax/http-utils
```

## Features

- 🔧 **Headers Builder**: Fluent API for building HTTP headers
- 📝 **Content Types**: Constants for common MIME types

## Usage

### Headers Builder

```typescript
import { headers } from '@knowmax/http-utils'

// Basic usage
const basicHeaders = headers()
  .withContentTypeJson()
  .withBearer('your-token')
  .export()

// Advanced usage
const advancedHeaders = headers({ 'X-Custom': 'value' })
  .withBearer('token123')
  .withLanguage('en-US')
  .withContentType('text/plain')
  .withHeader('X-API-Key', 'secret')
  .export()
```

### Content Types

```typescript
import { CONTENTTYPE_JSON } from '@knowmax/http-utils'

// Use in your requests
headers().withContentType(CONTENTTYPE_JSON)
```

## API Reference

### Headers Class

| Method | Description |
|--------|-------------|
| `withBearer(token)` | Add Bearer authorization |
| `withLanguage(language)` | Set Accept-Language (optional parameter) |
| `withContentTypeJson()` | Set Content-Type to application/json |
| `withContentType(contentType)` | Set custom Content-Type |
| `withHeader(key, value)` | Add custom header (ignores empty values) |
| `export()` | Get plain object with all headers |

### Content Types

| Constant | Value |
|----------|-------|
| `CONTENTTYPE_JSON` | `'application/json'` |

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
