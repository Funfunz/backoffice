import api, { API } from 'services/api'
import { dispatch } from 'reducers'
import HttpError from '../HttpError'
import { LOGIN_PENDING, FETCH_USER_PENDING, FETCH_USER_FULFILLED, FETCH_USER_REJECTED, LOGIN_FULFILLED, LOGIN_REJECTED } from 'reducers/user'
import * as gql from 'gql-query-builder'

export interface IUser {
  id?: number,
  name: string,
  username: string,
  password?: string,
};

class User {
  private api: API;
  
  constructor (api: API) {
    this.api = api
  }

  async me() {
    dispatch({ type: FETCH_USER_PENDING })
    const graphQl = gql.query({
      operation: 'me',
      fields: ['id', 'name', 'email']
    })
    return this.api.post('/', {
      body: JSON.stringify({
        query: graphQl.query
      })
    }).then(
      (body) => {
        console.log("body me", body)
        if (body.errors) {
          throw body.errors
        }
        if (body.data && body.data.me) {
          
          dispatch({ 
            type: FETCH_USER_FULFILLED,
            payload: body.data.me
          })
          return body.data.me as IUser
        }
        dispatch({ 
          type: FETCH_USER_REJECTED,
        })
        throw new HttpError({ status: 403 })
      }
    ).catch(
      (errors) => {
        dispatch({ type: FETCH_USER_REJECTED, payload: errors[0].message })
        throw new HttpError({ status: 403 })
      }
    )
  }

  login(
    identity: string,
    password: string,
  ) {
    dispatch({ type: LOGIN_PENDING })
    const graphQl = gql.mutation({
      operation: `login (email: "${identity}", password: "${password}")`,
    })
    return this.api.post('/', {
      body: JSON.stringify({
        query: graphQl.query
      })
    }).then(
      (body) => {
        console.log("body login", body)
        if (body.errors) {
          throw body.errors
        }
        if (body.data && body.data.login) {
          
          dispatch({ 
            type: LOGIN_FULFILLED,
          })
          return this.me()
        }
        dispatch({ 
          type: LOGIN_REJECTED,
        })
        throw new HttpError({ status: 403 })
      }
    ).catch(
      (errors) => {
        dispatch({ type: LOGIN_REJECTED, payload: errors[0].message })
        throw new HttpError({ status: 403 })
      }
    )
  }

  logout () {
    return this.api.get('/logout').then(() => {
      dispatch({ type:'LOGOUT' })
      return true
    })
  }
}

const user = new User(api)
export default user
