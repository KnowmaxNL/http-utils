import { describe, test, expect } from '@jest/globals'
import { CONTENTTYPE_JSON } from './contenttypes'

describe('Content Types', () => {
  test('should export correct JSON content type', () => {
    expect(CONTENTTYPE_JSON).toBe('application/json')
  })

  test('should be a string constant', () => {
    expect(typeof CONTENTTYPE_JSON).toBe('string')
  })

  test('should not be empty', () => {
    expect(CONTENTTYPE_JSON).toBeTruthy()
    expect(CONTENTTYPE_JSON.length).toBeGreaterThan(0)
  })
})
