import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

const authChecker = async (token) => {
  if (token === null) {
    token = ''
  }
  try {
    const response = await axios.post(`${BASE_URL}/isauth?jwt_token=${token}`)
    const status = response.status
    if (status === 200) {
      const isValid = response.data
      return isValid
    }
  } catch (error) {
    console.error('Unauthentication: ', error)
    return false
  }
  return false
}
export default authChecker
