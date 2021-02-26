import * as gql from 'gql-query-builder'
import http, { HttpError } from 'services/http'

export interface IGQuery {
  operation: string
  fields?: Array<string | object>
  args?: {
    [k: string]: any
  }
}

export function query(options: IGQuery | IGQuery[], type: 'query' | 'mutation' = 'query') {
  let resultKey: string
  if (!Array.isArray(options)) {
    resultKey = options.operation
    options = [options]
  }
  const body = gql[type](options.map((options) => ({
    operation: options.operation,
    fields: options.fields,
    variables: options.args
  })))
  return http.post('/graphql?', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(
    (body: any) => {
      if (body.error) {
        throw body.error
      }
      return body.data && (
        resultKey
          ? body.data[resultKey]
          : body.data
      )
    }
  ).catch(
    (httpError: HttpError) => {
      throw httpError?.body?.errors?.[0]?.message || httpError?.body?.error?.message || httpError
    }
  )
}

export function mutation(options: IGQuery | IGQuery[]) {
  return query(options, 'mutation')
}
