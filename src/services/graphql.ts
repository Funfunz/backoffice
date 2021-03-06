import http, { HttpError } from 'services/http'

export type IFields = Array<string | { [key: string]: IFields }> | { [key: string]: IFields }
export interface IArgs {
  [key: string]: IArgs | string | number | boolean | undefined | IArgs[] | string[] | number[] | boolean[]
}

function generateArgs(args: IArgs): string {
  return Object.keys(args).map(
    (argName) => {
      const value = args[argName]
      if (Array.isArray(value)) {
        return `${argName}: [${(value as any[]).map((v) => {
          if (typeof value === 'string') {
            return `"${v}"`
          } else if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'undefined') {
            return `${v}`
          } else {
            return `{${generateArgs(v)}}`
          }
        }).join(',')}]`
      } else if (typeof value === 'string') {
        return `${argName}: "${value}"` 
      } else if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'undefined') {
        return `${argName}: ${value}`
      } else {
        return `${argName}: {${generateArgs(value)}}`
      }
    }
  ).join(', ')
}

function generateFields(fields: IFields | string): string {
  if (typeof fields === 'string') {
    return fields
  } else if (Array.isArray(fields)) {
    return fields.reduce(
      (result: string, field) => {
        return `${result}
          ${generateFields(field)}
        `
      },''
    )
  } else {
    return Object.keys(fields).reduce(
      (result, fieldName) => {
        return `${result}
          ${fieldName} {
            ${generateFields(fields[fieldName])}
          }
        `
      },''
    )
  }
}

export interface IGQuery {
  operation: string
  fields?: IFields
  args?: IArgs
}
export function query(options: IGQuery | IGQuery[], type: 'query' | 'mutation' = 'query') {
  let resultKey: string
  if (!Array.isArray(options)) {
    resultKey = options.operation
    options = [options]
  }
  const query = `${type} {
    ${options.map((options) => `
      ${options.operation} ${options.args && !!Object.keys(options.args).length ? `(${generateArgs(options.args)})` : ''} ${options.fields ? `{
        ${generateFields(options.fields)}
      }` : ''}
    `).join('')}
  }`
  return http.post('/graphql?', {
    body: JSON.stringify({ query }),
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

const graphql = { query, mutation }
export default graphql