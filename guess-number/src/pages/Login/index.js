import axios from 'axios'
import { Component } from 'react'
import { withRouter } from 'react-router-dom'

const BASE_URL = 'http://localhost:3000'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '', isLoggedin: false }
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSubmitLogin = this.onSubmitLogin.bind(this)
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  async onSubmitLogin(event) {
    event.preventDefault()
    const data = { username: this.state.username, password: this.state.password }
    const response = await axios.post(`${BASE_URL}/login`, data)
    const token = response.data
    const status = response.status
    console.log(response.status)
    if (status === 200) {
      localStorage.setItem('jwt_token', token)
      this.setState({
        isLoggedin: true
      })
      this.props.history.push('/guess')
    }
  }

  render() {
    return (
        <>
          <form className="box">
            <span className="title">Login</span>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="your username"
                  value={this.state.username}
                  onChange={this.onUsernameChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="your password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                />
              </div>
            </div>
            <button className="button is-primary" onClick={this.onSubmitLogin}>
              Login
            </button>
          </form>
      </>
    )
  }
}

export default withRouter(Login)
