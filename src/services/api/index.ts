import { API_ADDRESS } from 'constants/api'
import HttpError from './HttpError'

import './mock'

type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class API {
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
    return fetch(url, mergedOptions).then((response) => {
      return Promise.all([
        response, 
        response.json(),
      ])
    }).then(([response, body]) => {
      if (!response.ok) {
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

const api = new API()
export default api