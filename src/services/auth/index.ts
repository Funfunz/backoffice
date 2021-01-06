import user, { IUser } from 'services/api/models/user'

class Auth {

  private user?: IUser;
  private authenticated: boolean = false;

  constructor() {
    const username = localStorage.getItem('username') || undefined
    if (username) {
      this.authenticated = true
      user.me().then((result) => {
        if (result) {
          this.user = result
          localStorage.setItem('username', this.user.email)
        }
      }).catch(() => {
        this.user = undefined
        this.authenticated = false
        localStorage.removeItem('username')
      })
    } else {
      this.authenticated = false
    }
  }

  get isAuthenticated() {
    return this.authenticated
  }

  async login(username: string, password: string) {
    try {
      const result = await user.login(username, password)
      this.user = result
      this.authenticated = true
      localStorage.setItem('username', this.user.email)
    } catch (error) {
      this.user = undefined
      this.authenticated = false
    }
  }

  async resetPassword(username: string) {
    console.log('reset password auth service:', username)
  }

  async logout() {
    try {
      user.logout()
    } finally {
      this.authenticated = false
      this.user = undefined
      localStorage.removeItem('username')
    }
  }
}

const auth = new Auth()
export default auth