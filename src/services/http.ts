import { API_ADDRESS, API_PASS, API_USER } from '../constants/api'

type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface IHttpError {
  status: number
  statusText?: string
  body?: any
}

export class HttpError extends Error{

  public readonly status: number
  public readonly statusText?: string
  public readonly body?: any

  constructor({status, statusText, body}: IHttpError) {
    super(statusText)
    this.status = status
    this.statusText = statusText
    this.body = body
  }
}

export class HTTP {
  private baseUrl = API_ADDRESS
  private defaultOptions: RequestInit = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }

  private request(method: FetchMethod, endpoint: string, options: RequestInit = {}) {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${this.baseUrl}${endpoint}`
    const mergedOptions: RequestInit = {
      ...this.defaultOptions,
      ...options,
      method,
      body: options.body,
    }
    if (API_USER && API_PASS) {
      (mergedOptions.headers as Record<string, string>)['Authorization'] = `Basic ${btoa(`${API_USER}:${API_PASS}`)}`
    }
    return fetch(url, mergedOptions).then((response) => {
      return Promise.all([
        response, 
        response.json(),
      ])
    }).then(([response, body]) => {
      if (!response.ok) {
        console.log(response, body)
        throw new HttpError({
          status: response.status,
          statusText: response.statusText,
          body,
        })
      }
      return body
    })
  }

  get(endpoint: string, options?: RequestInit) {
    return this.request('GET', endpoint, options)
  }

  post(endpoint: string, options?: RequestInit) {
    return this.request('POST', endpoint, options)
  }

  put(endpoint: string, data: any, options?: RequestInit) {
    return this.request('PUT', endpoint, options)
  }

  delete(endpoint: string, options?: RequestInit) {
    return this.request('DELETE', endpoint, options)
  }
}

const http = new HTTP()
export default http
