import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Guess from '../pages/Guess'
import Login from '../pages/Login'
import authChecker from '../service/authChecker'
import ProtectedRoute from './ProtectedRoute'
// import Loader from 'react-loader-spinner'

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isAuth: false,
      token: localStorage.getItem('jwt_token')
    }
  }

  componentDidMount() {
    this.checkAuth()
    console.log('Mount', this.state.isAuth)
  }

  async checkAuth() {
    const auth = await authChecker(this.state.token)
    this.setState({
      isAuth: auth,
      isLoading: false
    })
  }

  render() {
    return (
      <div>
        {
          this.state.isLoading
            ? (<div>Loading</div>)
            : (
              <div>
                <Switch>
                  <Route exact path="/">
                    {
                      this.state.isAuth
                        ? (<Redirect to="/guess" />)
                        : (<Redirect to="/login" />)
                    }
                  </Route>
                  <Route path="/guess">
                    {/* {this.state.isAuth ? <Guess /> : <div>fali</div>} */}
                    <ProtectedRoute Component={Guess} path="/guess" />
                  </Route>
                  <Route path="/login" render={() => (
                    <Login token={this.state.token} />
                  )}/>
                  <Route path="/home">
                    <div>home </div>
                  </Route>
                  <Route path="*">
                    <div>404 Not found </div>
                  </Route>
                </Switch>
              </div>
              )}
      </div>
    )
  }
}
export default Routes
