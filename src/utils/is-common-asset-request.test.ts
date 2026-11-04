import { describe, expect, test } from 'vitest'
import { isCommonAssetRequest } from './is-common-asset-request'

describe(isCommonAssetRequest, () => {
  test('returns true for common static assets including favicon.ico', () => {
    expect(
      isCommonAssetRequest(new Request('https://example.com/favicon.ico')),
    ).toBe(true)
    expect(
      isCommonAssetRequest(new Request('https://example.com/assets/app.ico')),
    ).toBe(true)
    expect(
      isCommonAssetRequest(new Request('https://example.com/styles.css')),
    ).toBe(true)
    expect(
      isCommonAssetRequest(new Request('https://example.com/logo.svg')),
    ).toBe(true)
    expect(
      isCommonAssetRequest(new Request('https://example.com/image.png')),
    ).toBe(true)
    expect(
      isCommonAssetRequest(new Request('https://example.com/bundle.js')),
    ).toBe(true)
    expect(
      isCommonAssetRequest(new Request('https://example.com/font.woff2')),
    ).toBe(true)
  })

  test('returns true for file protocol', () => {
    expect(isCommonAssetRequest(new Request('file:///path/to/asset.txt'))).toBe(
      true,
    )
  })

  test('returns true for fonts.googleapis.com', () => {
    expect(
      isCommonAssetRequest(
        new Request('https://fonts.googleapis.com/css2?family=Roboto'),
      ),
    ).toBe(true)
  })

  test('returns true for node_modules requests', () => {
    expect(
      isCommonAssetRequest(
        new Request('https://example.com/node_modules/package/dist/index.js'),
      ),
    ).toBe(true)
  })

  test('returns true for @vite internal requests', () => {
    expect(
      isCommonAssetRequest(new Request('https://example.com/@vite/client')),
    ).toBe(true)
  })

  test('returns false for api requests and page routes', () => {
    expect(
      isCommonAssetRequest(new Request('https://example.com/api/user')),
    ).toBe(false)
    expect(
      isCommonAssetRequest(new Request('https://example.com/posts/123')),
    ).toBe(false)
    expect(
      isCommonAssetRequest(new Request('https://example.com/graphql')),
    ).toBe(false)
  })
})
