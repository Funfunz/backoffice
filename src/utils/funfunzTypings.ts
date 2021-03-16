export interface IProperty {
  name: string
  searchable: boolean
  isPk?: boolean
  readOnly?: true
  type: string
  required?: boolean
  filterable?: boolean | string[]
  backoffice?: {
    label?: string
    editField?: {
      type: string
    },
    entityPage?: {
      filterable?: {
        type: string
        inputType: 'checkbox'
        checked: unknown
        unChecked: unknown
      } | {
        type: string
        inputType: 'select'
        content: {
          label: string
          value: unknown
        }[]
      },
    },
    visible?: {
      entityPage: boolean
      detail: boolean
      relation: boolean
    },
    [key: string]: unknown
  }
}

export interface IRelation {
  type: "n:1" | "n:m"
  foreignKey: string
  relationalEntity: string
  remoteEntity: string
}

export interface IEntity {
  error?: boolean
  loading?: boolean
  name: string
  properties?: IProperty[]
  visible?: boolean
  backoffice: {
    label: string
  },
  relations?: IRelation[]
}