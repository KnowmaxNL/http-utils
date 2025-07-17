import { describe, test, expect } from '@jest/globals'
import { FetchError } from './FetchError'

// Helper function to create a mock Response object
function createMockResponse(status: number, statusText = 'Status Text'): Response {
  return {
    status,
    statusText,
    ok: status >= 200 && status < 300,
    headers: new Headers(),
    url: 'https://example.com/api',
    type: 'basic',
    redirected: false,
    body: null,
    bodyUsed: false,
    clone: () => createMockResponse(status, statusText),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    json: () => Promise.resolve({}),
    text: () => Promise.resolve('')
  } as Response
}

describe('FetchError', () => {
  test('should create error with response status', () => {
    const response = createMockResponse(404)
    const error = new FetchError(response)

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(FetchError)
    expect(error.message).toBe('Request failed with status code 404')
    expect(error.status).toBe(404)
    expect(error.data).toBeUndefined()
  })

  test('should create error with response status and data', () => {
    const response = createMockResponse(400)
    const errorData = { message: 'Bad request', code: 'INVALID_INPUT' }
    const error = new FetchError(response, errorData)

    expect(error.message).toBe('Request failed with status code 400')
    expect(error.status).toBe(400)
    expect(error.data).toEqual(errorData)
  })

  test('should handle different HTTP status codes', () => {
    const testCases = [
      { status: 400, expectedMessage: 'Request failed with status code 400' },
      { status: 401, expectedMessage: 'Request failed with status code 401' },
      { status: 403, expectedMessage: 'Request failed with status code 403' },
      { status: 404, expectedMessage: 'Request failed with status code 404' },
      { status: 500, expectedMessage: 'Request failed with status code 500' },
      { status: 502, expectedMessage: 'Request failed with status code 502' },
      { status: 503, expectedMessage: 'Request failed with status code 503' }
    ]

    testCases.forEach(({ status, expectedMessage }) => {
      const response = createMockResponse(status)
      const error = new FetchError(response)

      expect(error.message).toBe(expectedMessage)
      expect(error.status).toBe(status)
    })
  })

  test('should handle various data types', () => {
    const response = createMockResponse(422)

    // String data
    const stringError = new FetchError(response, 'Simple error message')
    expect(stringError.data).toBe('Simple error message')

    // Object data
    const objectData = { errors: ['Field is required'], timestamp: '2023-01-01T00:00:00Z' }
    const objectError = new FetchError(response, objectData)
    expect(objectError.data).toEqual(objectData)

    // Array data
    const arrayData = ['error1', 'error2', 'error3']
    const arrayError = new FetchError(response, arrayData)
    expect(arrayError.data).toEqual(arrayData)

    // Number data
    const numberError = new FetchError(response, 42)
    expect(numberError.data).toBe(42)

    // Boolean data
    const booleanError = new FetchError(response, true)
    expect(numberError.data).toBe(42)

    // Null data
    const nullError = new FetchError(response, null)
    expect(nullError.data).toBeNull()
  })

  test('should maintain error stack trace', () => {
    const response = createMockResponse(500)
    const error = new FetchError(response)

    expect(error.stack).toBeDefined()
    expect(typeof error.stack).toBe('string')
    expect(error.stack).toContain('FetchError')
  })

  test('should be throwable and catchable', () => {
    const response = createMockResponse(404)
    const errorData = { message: 'Resource not found' }

    expect(() => {
      throw new FetchError(response, errorData)
    }).toThrow(FetchError)

    try {
      throw new FetchError(response, errorData)
    } catch (error) {
      expect(error).toBeInstanceOf(FetchError)
      expect((error as FetchError).status).toBe(404)
      expect((error as FetchError).data).toEqual(errorData)
      expect((error as FetchError).message).toBe('Request failed with status code 404')
    }
  })

  test('should work with instanceof checks', () => {
    const response = createMockResponse(400)
    const fetchError = new FetchError(response)
    const regularError = new Error('Regular error')

    expect(fetchError instanceof FetchError).toBe(true)
    expect(fetchError instanceof Error).toBe(true)
    expect(regularError instanceof FetchError).toBe(false)
    expect(regularError instanceof Error).toBe(true)
  })

  test('should preserve error name', () => {
    const response = createMockResponse(500)
    const error = new FetchError(response)

    expect(error.name).toBe('Error') // Inherits from Error
  })

  test('should handle edge case status codes', () => {
    // Test with unusual but valid status codes
    const edgeCases = [
      { status: 100, description: 'Continue' },
      { status: 204, description: 'No Content' },
      { status: 418, description: "I'm a teapot" },
      { status: 599, description: 'Network connect timeout error' }
    ]

    edgeCases.forEach(({ status, description }) => {
      const response = createMockResponse(status)
      const error = new FetchError(response)

      expect(error.status).toBe(status)
      expect(error.message).toBe(`Request failed with status code ${status}`)
    })
  })

  test('should handle complex nested data structures', () => {
    const response = createMockResponse(400)
    const complexData = {
      error: {
        code: 'VALIDATION_FAILED',
        message: 'Validation failed',
        details: {
          fields: [
            { field: 'email', message: 'Invalid email format' },
            { field: 'password', message: 'Password too short' }
          ],
          timestamp: new Date('2023-01-01T00:00:00Z'),
          requestId: 'req-123-456-789'
        }
      },
      metadata: {
        version: '1.0.0',
        source: 'api-gateway'
      }
    }

    const error = new FetchError(response, complexData)

    expect(error.data).toEqual(complexData)
    expect(error.status).toBe(400)
    
    // Verify deep equality
    expect((error.data as any).error.details.fields).toHaveLength(2)
    expect((error.data as any).error.details.fields[0].field).toBe('email')
    expect((error.data as any).metadata.version).toBe('1.0.0')
  })

  test('should store reference to the provided data', () => {
    const response = createMockResponse(400)
    const originalData = { message: 'Original message', items: ['a', 'b', 'c'] }
    
    const error = new FetchError(response, originalData)
    
    // Verify the error stores the same reference to the data
    expect(error.data).toBe(originalData)
    expect(error.data).toEqual(originalData)
  })
})