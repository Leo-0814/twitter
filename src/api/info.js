import axios from "axios"

const baseUrl = 'https://globaluser.ball188.cc/user'
const adminBaseUrl = 'https://adminapi.ball188.cc/user'

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

export const editInfo = async ({adminToken, id, ...prop}) => {
  try {
    const res = await axios({
      method: 'put',
      url: `${adminBaseUrl}/info/${id}`,
      headers: {
        Authorization: 'bearer ' + adminToken,
      },
      data: {...prop}
    })
    
    return res.data.data
  } catch (error) {
    console.error('[Edit password]', error)
  }
}