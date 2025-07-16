import { describe, test, expect } from '@jest/globals'
import { headers } from './headers'
import { CONTENTTYPE_JSON } from './contenttypes'

describe('Headers', () => {
  test('should create headers with initial values', () => {
    const initial = { 'X-Custom': 'value' }
    const h = headers(initial).export()

    expect(h).toEqual(initial)
  })

  test('should create headers without initial values', () => {
    const h = headers().export()

    expect(h).toEqual({})
  })

  test('should add bearer token', () => {
    const h = headers().withBearer('abc123').export()

    expect(h).toEqual({
      "Authorization": "Bearer abc123"
    })
  })

  test('should add bearer token with spaces', () => {
    const h = headers().withBearer('abc 123').export()

    expect(h).toEqual({
      "Authorization": "Bearer abc 123"
    })
  })

  test('should add language header', () => {
    const h = headers().withLanguage('en-US').export()

    expect(h).toEqual({
      "Accept-Language": "en-US"
    })
  })

  test('should not add language header when undefined', () => {
    const h = headers().withLanguage(undefined).export()

    expect(h).toEqual({})
  })

  test('should not add language header when empty string', () => {
    const h = headers().withLanguage('').export()

    expect(h).toEqual({})
  })

  test('should add JSON content type', () => {
    const h = headers().withContentTypeJson().export()

    expect(h).toEqual({
      "Content-Type": CONTENTTYPE_JSON
    })
  })

  test('should add custom content type', () => {
    const h = headers().withContentType('text/plain').export()

    expect(h).toEqual({
      "Content-Type": "text/plain"
    })
  })

  test('should add custom header with value', () => {
    const h = headers().withHeader('X-Custom', 'test-value').export()

    expect(h).toEqual({
      "X-Custom": "test-value"
    })
  })

  test('should not add header with undefined value', () => {
    const h = headers().withHeader('X-Custom', undefined).export()

    expect(h).toEqual({})
  })

  test('should not add header with empty value', () => {
    const h = headers().withHeader('X-Custom', '').export()

    expect(h).toEqual({})
  })

  test('should chain multiple headers', () => {
    const h = headers()
      .withBearer('token123')
      .withContentTypeJson()
      .withLanguage('en-US')
      .withHeader('X-Custom', 'value')
      .export()

    expect(h).toEqual({
      "Authorization": "Bearer token123",
      "Content-Type": CONTENTTYPE_JSON,
      "Accept-Language": "en-US",
      "X-Custom": "value"
    })
  })

  test('should override headers when set multiple times', () => {
    const h = headers()
      .withBearer('token1')
      .withBearer('token2')
      .export()

    expect(h).toEqual({
      "Authorization": "Bearer token2"
    })
  })

  test('should preserve initial headers and add new ones', () => {
    const initial = { 'X-Initial': 'initial-value' }
    const h = headers(initial)
      .withBearer('token')
      .withLanguage('en-US')
      .export()

    expect(h).toEqual({
      "X-Initial": "initial-value",
      "Authorization": "Bearer token",
      "Accept-Language": "en-US"
    })
  })

  test('should not mutate initial headers object', () => {
    const initial = { 'X-Initial': 'initial-value' }
    const h = headers(initial).withBearer('token').export()

    expect(initial).toEqual({ 'X-Initial': 'initial-value' })
    expect(h).toEqual({
      "X-Initial": "initial-value",
      "Authorization": "Bearer token"
    })
  })

  test('should handle case-sensitive headers', () => {
    const h = headers()
      .withHeader('content-type', 'text/plain')
      .withContentTypeJson()
      .export()

    expect(h).toEqual({
      "content-type": "text/plain",
      "Content-Type": CONTENTTYPE_JSON
    })
  })

  test('should return new object on each export call', () => {
    const headerBuilder = headers().withBearer('token')
    const export1 = headerBuilder.export()
    const export2 = headerBuilder.export()

    expect(export1).toEqual(export2)
    expect(export1).not.toBe(export2) // Different object references
  })

  test('should work with complex chaining and conditional logic', () => {
    const token = 'abc123'
    const language = 'fr-FR'
    const customValue = 'test'

    const h = headers({ 'X-App': 'MyApp' })
      .withBearer(token)
      .withLanguage(language)
      .withContentTypeJson()
      .withHeader('X-Custom', customValue)
      .withHeader('X-Empty', '') // Should not be added
      .withHeader('X-Undefined', undefined) // Should not be added
      .export()

    expect(h).toEqual({
      "X-App": "MyApp",
      "Authorization": "Bearer abc123",
      "Accept-Language": "fr-FR",
      "Content-Type": CONTENTTYPE_JSON,
      "X-Custom": "test"
    })
  })
})