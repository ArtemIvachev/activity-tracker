export default async function fetchJson(input, init) {
  const response = await fetch(input, init)
  const data = await response.json()

  if (response.ok) {
    return data
  }
  throw new FetchError({
    message: data.message,
    response,
    data,
  })
}

export class FetchError extends Error {
  constructor({ message, response, data }) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }

    this.name = 'FetchError'
    this.response = response
    this.data = data ?? { message: message }
  }
}
