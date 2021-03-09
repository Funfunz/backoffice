export interface IProperty {
  name: string,
  searchable: boolean,
  model?: {
    isPk?: boolean,
    type: string,
    allowNull: boolean,
  },
  layout?: {
    label?: string,
    editField?: {
      type: 'text' | 'number' | 'password',
    },
    entityPage?: {
      filterable?: {
        type: string,
        inputType: 'checkbox'
        checked: unknown
        unChecked: unknown
      } | {
        type: string,
        inputType: 'select',
        content: {
          label: string,
          value: unknown,
        }[]
      },
    },
    visible?: {
      entityPage: boolean,
      detail: boolean,
      relation: boolean
    },
    [key: string]: unknown
  }
}

export interface IRelation {
  type: "n:1" | "n:m"
  foreignKey: string
  relationalTable: string
  remoteTable: string
}

export interface IEntity {
  error?: boolean
  loading?: boolean
  name: string
  properties?: IProperty[]
  layout: {
    label: string
  },
  relations?: IRelation[]
}