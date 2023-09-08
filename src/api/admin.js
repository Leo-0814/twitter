import axios from "axios"
// import Swal from "sweetalert2"

const baseUrl = 'https://adminapi.ball188.cc'

export const adminLogin = async(account, password, gcode) => {
  try {
    const res = await axios.post(`${baseUrl}/admin/login`, {account, password, gcode})

    const token = res.data.data.token
    
    if(token) {
      return token
    }

  } catch (error) {
    // const errorMessage = error.response.data.result.message
    // Swal.fire({
    //   icon: 'error',
    //   title: '登入失敗',
    //   text: errorMessage
    // })
    console.error('[login error]', error)
  }
}