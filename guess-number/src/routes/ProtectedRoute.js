import React, { Component } from 'react'
import authChecker from '../service/authChecker'
import Guess from '../pages/Guess'
import { Redirect, withRouter } from 'react-router-dom'

class ProtectedRoute extends Component {
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isAuth: false,
      token: localStorage.getItem('jwt_token')
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.checkAuth()
    console.log('protect mount')
  }

  componentWillUnmount() {
    console.log('unmount protectr')
    this._isMounted = false
  }

  async checkAuth() {
    const auth = await authChecker(this.state.token)
    if (this._isMounted) {
      this.setState({
        isAuth: auth,
        isLoading: false
      })
    }
  }

  render() {
    return (
      <div>
        {
          this.state.isLoading
            ? <div>Loading. . . </div>
            : (
                this.state.isAuth
                  ? <Guess />
                  : <Redirect to="/login" />
              )
        }
      </div>
    )
  }
}
export default withRouter(ProtectedRoute)
