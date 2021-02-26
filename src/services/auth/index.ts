import user, { IUser } from 'services/auth/user'

class Auth {

  private user?: IUser;
  private authenticated: boolean = true;

  constructor() {
    const username = localStorage.getItem('username') || undefined
    if (username) {
      this.authenticated = true
      user.me().then((result) => {
        if (result) {
          this.user = result
          localStorage.setItem('username', this.user.username)
        }
      }).catch(() => {
        this.user = undefined
        this.authenticated = false
        localStorage.removeItem('username')
      })
    } else {
      this.authenticated = true
    }
  }

  get isAuthenticated() {
    return this.authenticated
  }

  get me() {
    return this.user
  }

  async login(username: string, password: string) {
    try {
      const result = await user.login(username, password)
      this.user = result
      this.authenticated = true
      localStorage.setItem('username', this.user.username)
    } catch (error) {
      this.user = undefined
      this.authenticated = false
    }
  }

  async logout() {
    try {
      await user.logout()
    } finally {
      this.authenticated = false
      this.user = undefined
      localStorage.removeItem('username')
    }
  }
}

const auth = new Auth()
export default auth