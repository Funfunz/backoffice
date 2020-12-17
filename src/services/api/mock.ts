import { API_ADDRESS } from "constants/api"
import createMatcher, { PathMatch, IMatchParams } from 'path-match'
import { delay } from "utils"
import { API_MOCK_ENABLED } from 'constants/api'

type MockedFetch = ((url: RequestInfo, params: IMatchParams, options?: RequestInit) => Promise<any>);

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface IMockRoute {
  method: Method, 
  match: PathMatch;
  func: MockedFetch,
};

const routes: IMockRoute[] = []

export default function mock(method: Method, url: string, func: MockedFetch) {
  const match = createMatcher()(url)
  routes.push({ method, match, func })
}

export const originalFetch = window.fetch

if (API_MOCK_ENABLED) {
  
  // mocks enabled
  import('./models/table.mock')
  import('./models/user.mock')
  
  // override fetch API
  window.fetch = async (url: RequestInfo, options: RequestInit = {}) => {
    await delay(300)
    if (typeof url === 'string') {
      const method = options.method || 'GET'
      const path = url.replace(API_ADDRESS, '')
      for (const route of routes) {
        const result = route.match(path)
        if (result && route.method === method) {
          const params: IMatchParams = typeof result === 'boolean'
            ? {}
            : result
          const response = await route.func(url, params, options)
          return new Response(JSON.stringify(response))
        }
      }
    }
    return await originalFetch(url, options)
  }
}

