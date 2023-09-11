import axios from "axios"

const baseUrl = 'https://globaluser.ball188.cc/user'
const adminBaseUrl = 'https://adminapi.ball188.cc'

export const getInfo = async (token) => {
  try {
    const res = await axios.get(`${baseUrl}/info`, {
      headers: {
        Authorization: 'bearer ' + token,
      }
    })

    return res.data.data
  } catch (error) {
    console.error('[get info]', error)
  }
}

export const editInfo = async ({adminToken2, account_id, ...prop}) => {
  try {
    const res = await axios({
      method: 'put',
      url: `${adminBaseUrl}/user/info/${account_id}`,
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
    const res = await axios.get(`${adminBaseUrl}/BRL/user/list?current=1&pageSize=300&slow_query_status=0&sorter=%7B%7D&filter=%7B%7D&page_size=300&page=1&lang=zh`, {
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
      url: `${adminBaseUrl}/user/email/status`,
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