import axios from "axios"
import Swal from "sweetalert2"
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
    const errorMessage = error.response.data.result.message
    Swal.fire({
      icon: 'error',
      title: '登入失敗',
      text: errorMessage
    })
    console.error('[login error]', error)
  }
}

export const editInfo = async ({adminToken2, account_id, ...prop}) => {
  try {
    const res = await axios({
      method: 'put',
      url: `${baseUrl}/user/info/${account_id}`,
      headers: {
        Authorization: 'bearer ' + adminToken2,
      },
      data: {...prop}
    })
    
    return res.data.data
  } catch (error) {
    console.error('[Edit info]', error)
  }
}

export const getUsers = async (adminToken2) => {
  try {
    const res = await axios.get(`${baseUrl}/BRL/user/list?current=1&pageSize=300&slow_query_status=0&sorter=%7B%7D&filter=%7B%7D&page_size=300&page=1&lang=zh`, {
      headers: {
        Authorization: 'bearer ' + adminToken2
      }
    })

    return res.data.data.user_list.data
  } catch (error) {
    console.error('[Get users]', error)
  }
}

export const followUser = async (account_id, adminToken2) => {
  try {
    const res = await axios({
      method: 'put',
      url: `${baseUrl}/user/email/status`,
      headers: {
        Authorization: 'bearer ' + adminToken2
      },
      data: {account_id}
    })
      return res.data.data
    }
    catch (error) {
    console.error('[Follow users]', error)
  }
} 

export const addIP = async ({ip, adminToken2, remark = 'leoAdd', status_back_office = 1, status_front_end = 0}) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${baseUrl}/BRL/iprule`,
      data: {ip, remark, status_back_office, status_front_end},
      headers: {
        Authorization: 'bearer ' + adminToken2 
      },
    })
    return res.data
  } catch (error) {
    console.log('[Add IP]', error)
  }
}