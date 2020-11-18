import api, { API } from 'services/api';
import { dispatch } from 'reducers';
import HttpError from '../HttpError';
import { FETCH_USER_FULFILLED } from 'reducers/user';
import { delay } from 'utils/index';

export interface IUser {
  id?: number,
  name: string,
  username: string,
  password?: string,
};

class User {
  private api: API;
  
  constructor (api: API) {
    this.api = api;
  }

  async me() {
    dispatch({ type : 'FETCH_USER_PENDING' });
    await delay(100)
    return await this.api.get('/users/me').then((user: IUser) => {
      if (user && user.id) {
        dispatch({ 
          type: FETCH_USER_FULFILLED, 
          payload: user,
        });
        return user;
      } else {
        throw new HttpError({ status: 403 })
      }
    })
  }

  login(username: string, password: string) {
    const data = {
      username,
      password,
    }
    return this.api.post('/auth/local', { body: JSON.stringify(data)}).then((user: IUser) => {
      if (user.id) {
        dispatch({ 
          type: FETCH_USER_FULFILLED, 
          payload: user,
        })
        return user
      } else {
        throw new HttpError({ status: 403 })
      }
    })
  }

  logout () {
    return this.api.get('/logout').then(() => {
      dispatch({ type:'LOGOUT' });
      return true
    })
  }
}

const user = new User(api)
export default user
