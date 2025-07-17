/** Specialized Error for fetch errors which include the response status and optional data */
export class FetchError extends Error {
  status: number

  data?: unknown

  constructor(response: Response, data?: unknown) {
    super(`Request failed with status code ${response.status}`)

    this.status = response.status
    this.data = data
  }
}