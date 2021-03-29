import http, { HttpError } from './http'

export type IFields = Array<string | { [key: string]: IFields }> | { [key: string]: IFields }
export interface IArgs {
  [key: string]: IArgs | string | number | boolean | undefined | IArgs[] | string[] | number[] | boolean[]
}

function isFile(file: any) {
  return file !== null && file !== undefined &&
    typeof file.lastModified === 'number' && 
    typeof file.name === 'string' &&
    typeof file.size === 'number' &&
    typeof file.type === 'string'
}

function generateArgs(args: IArgs): string {
  return Object.keys(args).map(
    (argName) => {
      const value = args[argName]
      if (Array.isArray(value)) {
        return `${argName}: [${(value as any[]).map((v) => {
          if (typeof v === 'string') {
            return `"${v}"`
          } else if (typeof v === 'boolean' || typeof v === 'number' || typeof v === 'undefined') {
            return `${v}`
          } else if (isFile(v)) {
            return `$${argName}`
          } else {
            return `{${generateArgs(v)}}`
          }
        }).join(',')}]`
      } else if (typeof value === 'string') {
        return `${argName}: "${value}"` 
      } else if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'undefined') {
        return `${argName}: ${value}`
      } else if (isFile(value)) {
        return `${argName}: $${argName}`
      } else if (Object.keys(value).length) {
        return `${argName}: {${generateArgs(value)}}`
      } else {
        return undefined
      }
    },
  ).filter(v => v !== undefined).join(', ')
}

function generateVariables(options: Partial<IGQuery>[] | IArgs) {
  let typings: Record<string, string> = {}
  let variables: Record<string, any> = {}
  if (!Array.isArray(options)) {
    options = [{ args: options }]
  }
  options.forEach(({ args }) => {
    if (!args) return
    Object.keys(args).forEach(
      (argName) => {
        const value = args[argName]
        if (Array.isArray(value)) {
          (value as any[]).filter(v => isFile(v)).forEach(() => {
            typings[argName] = 'Upload'
          })
        } else if (isFile(value)) {
          typings[argName] = 'Upload'
          variables[argName] = value
        } else if (typeof value === 'object'){
          const { typings: newTypigns, variables: newVariables } = generateVariables(args[argName] as IArgs)
          typings = {
            ...typings,
            ...newTypigns,
          }
          variables = {
            ...variables,
            ...newVariables,
          }
        }
      },
    )
  })
  return { typings, variables } 
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
      },'',
    )
  } else {
    return Object.keys(fields).reduce(
      (result, fieldName) => {
        return `${result}
          ${fieldName} {
            ${generateFields(fields[fieldName])}
          }
        `
      },'',
    )
  }
}
function generateMap(variables: Record<string, any>) {
  const fields: any[] = []
  const map: Record<string, string[]> = {}
  Object.keys(variables).forEach((varName, index) => {
    fields.push(variables[varName])
    map[`${index}`] = [`variables.${varName}`]
  })
  return { fields, map }
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
  const { typings, variables } = generateVariables(options)

  const query = `${type} ${Object.keys(typings).length 
    ? `(${Object.keys(typings).map((varName) => `$${varName}: ${typings[varName]}`).join(', ')})`
    : ''
  } {
    ${options.map((options) => {
    const args = options.args && generateArgs(options.args)
    return `
      ${options.operation} ${args ? `(${args})` : ''} ${options.fields ? `{
        ${generateFields(options.fields)}
      }` : ''}
    `
  }).join('')}
  }`

  let body: FormData | string
  let contentType: string | undefined
  if (Object.keys(typings).length) {
    body = new FormData()
    body.append('operations', JSON.stringify({ query }))
    const { map, fields } = generateMap(variables)
    body.append('map', JSON.stringify(map))
    fields.forEach((field, index) => (body as FormData).append(`${index}`, field))
    contentType = undefined
  } else {
    body = JSON.stringify({ query })
    contentType = 'application/json'
  }
  return http.post('/graphql?', {
    body,
    headers: contentType ? {
      'Content-Type': contentType,
    } : {},
  }).then((body: any) => {
    if (body.error) {
      throw body.error
    }
    return body.data && (
      resultKey
        ? body.data[resultKey]
        : body.data
    )
  }).catch((httpError: HttpError) => {
    throw httpError?.body?.errors?.[0]?.message || httpError?.body?.error?.message || httpError
  })
}

export function mutation(options: IGQuery | IGQuery[]) {
  return query(options, 'mutation')
}

const graphql = { query, mutation }
export default graphql