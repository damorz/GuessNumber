import { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const BASE_URL = 'http://localhost:3000'

class Guess extends Component {
  constructor(props) {
    super(props)
    this.state = { guessNumber: 0, message: '', answer: '?' }
    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmitNumber = this.onSubmitNumber.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout() {
    localStorage.removeItem('jwt_token')
    this.props.history.push('/login')
  }

  onInputChange(event) {
    this.setState({
      guessNumber: parseInt(event.target.value)
    })
  }

  async onSubmitNumber(event) {
    event.preventDefault()
    const params = {
      guessNumber: this.state.guessNumber
    }
    const response = await axios.get(`${BASE_URL}/guess`, { params })
    const guessNumberResponse = response.data.guessNumber
    const status = response.status
    if (status === 201) {
      this.setState({ message: `${guessNumberResponse} is Correct~. You can guess the next number right now.` })
    } else if (status === 202) {
      this.setState({ message: `${guessNumberResponse} is Wrong answer. please try again  :(` })
    }
  }

  render() {
    return (
        <>
        <div className="box">
            <h1>Guess.It</h1>
            <h2>Guess the number between 0 - 5.</h2>
            <form className="control">
                <input
                    id="guessNumber"
                    className="input"
                    type="number"
                    placeholder="Guess the number"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    value={this.state.guessNumber}
                    onChange={this.onInputChange}
                />
                <button
                  className="button is-primary"
                  onClick={this.onSubmitNumber}
                >
                  Submit
                </button>
                <button
                  className="button is-primary"
                  style={{ marginLeft: 20 }}
                  onClick={this.logout}
                >
                  Logout
                </button>
            </form>
            <h1>{ this.state.message }</h1>
        </div>
        </>
    )
  }
}

export default withRouter(Guess)
