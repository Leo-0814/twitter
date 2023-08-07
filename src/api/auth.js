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
    Swal.fire({
      icon: 'error',
      title: '登入失敗',
      text: error.response.data.result.message
    })
    console.log('[login error]', error)
  }
}

// export const register = async ({account, userName,}) => {

// }