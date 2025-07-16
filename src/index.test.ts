import { describe, test, expect } from '@jest/globals'
import { headers } from './index'
import { CONTENTTYPE_JSON } from './index'

describe('Index Exports', () => {
  test('should export headers function', () => {
    expect(typeof headers).toBe('function')
  })

  test('should export CONTENTTYPE_JSON constant', () => {
    expect(CONTENTTYPE_JSON).toBe('application/json')
  })

  test('should allow creating headers through index export', () => {
    const h = headers().withBearer('test').export()
    
    expect(h).toEqual({
      "Authorization": "Bearer test"
    })
  })

  test('should allow using content type constants through index export', () => {
    const h = headers().withContentType(CONTENTTYPE_JSON).export()
    
    expect(h).toEqual({
      "Content-Type": "application/json"
    })
  })
})
