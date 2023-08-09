import axios from "axios"
import Swal from "sweetalert2"

const baseUrl = 'https://globaluser.ball188.cc/user'

export const login = async({account, password}) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, {account, password})
    const token = res.data.data.token
    
    if(token) {
      return {success: true, ...res.data.data}
    }

  } catch (error) {
    const errorMessage = error.response.data.result.message
    Swal.fire({
      icon: 'error',
      title: '登入失敗',
      text: errorMessage
    })
    console.error('[login error]', error)
  }
}

export const register = async ({account, password, confirm_password, currency, invite_code}) => {
  try {
    const res = await axios.post(`${baseUrl}/register`, {
      account, password, confirm_password, currency, invite_code
    })

    const token = res.data.data.token

    if (token) {
      return {success: true, ...res.data.data}
    }
  } catch(error) {
    const errorMessage = error.response.data.result.message
    Swal.fire({
      icon: 'error',
      title: '登入失敗',
      text: errorMessage
    })
    console.error('[login error]', error)
  }
}

export const logout = async (token) => {
  try {
    await axios({
      method: 'post',
      headers: {
        Authorization: 'bearer ' + token
      },
      url: `${baseUrl}/logout`
    })
  } catch (error) {
    console.error('[logout error]', error)
  }
}
