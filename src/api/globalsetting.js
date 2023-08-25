import axios from "axios"

const baseUrl = 'https://globalsetting.ball188.cc'

export  const getBanner = async () => {
  try {
    const res = await axios.get(`${baseUrl}/BRL/banner?lang=zh&needAuth=false`)

    return res.data.data
  } catch (error) {
    console.error('[Get banner]', error)
  }
}