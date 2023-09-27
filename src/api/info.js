import axios from "axios"

const baseUrl = 'https://globaluser.ball188.cc/user'

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

