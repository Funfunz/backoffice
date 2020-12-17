import { ITable } from './table'
import mock from '../mock'

const TABLES: ITable[] = [
  { 
    name: 'users',
    layout: {
      label: 'Users',
    },
  },
  { 
    name: 'products',
    layout: {
      label: 'Products',
    },
  },
]

mock('GET', '/tables', async () => {
  return TABLES
})

mock('GET', '/tables/:tableName', async (url, params) => {
  switch (params.tableName){
    case 'users':
      return {
        columns: [
          { name: 'id' },
          { name: 'username' },
          { name: 'email' },
        ],
        ...TABLES[0],
      }
    case 'products':
      return {
        columns: [
          { name: 'id' },
          { name: 'name' },
          { name: 'description' },
        ],
        ...TABLES[1],
      }
    default:
      return 
  }
})