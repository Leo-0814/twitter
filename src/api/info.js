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

    console.log(res.data.data)
    return res.data.data
  } catch (error) {
    console.error('[get info]', error)
  }
}

export const editInfo = async ({adminToken, account_id, ...prop}) => {
  try {
    const res = await axios({
      method: 'put',
      url: `${adminBaseUrl}/user/info/${account_id}`,
      headers: {
        Authorization: 'bearer ' + adminToken,
      },
      data: {...prop}
    })
    
    return res.data.data
  } catch (error) {
    console.error('[Edit info]', error)
  }
}

export const getUsers = async (adminToken) => {
  try {
    const res = await axios.get(`${adminBaseUrl}/BRL/user/list`, {
      headers: {
        Authorization: 'bearer ' + adminToken
      }
    })

    return res.data.data
  } catch (error) {
    console.error('[Get users]', error)
  }
}

export const followUser = async (account_id, adminToken) => {
  try {
    const res = await axios({
      method: 'put',
      url: `${adminBaseUrl}/user/email/status`,
      headers: {
        Authorization: 'bearer ' + adminToken
      },
      data: {account_id}
    })
      return res.data.data
    }
    catch (error) {
    console.error('[Follow users]', error)
  }
} 