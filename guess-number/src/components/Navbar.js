import { Component } from 'react'
// import { NavLink } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <span className="navbar-item">
            <h1 className="menu-logo">Guess.It</h1>
          </span>
        </div>
      </nav>
    )
  }
}

export default Navbar
