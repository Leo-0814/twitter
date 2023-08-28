import axios from "axios"

const baseUrl = 'https://globalsetting.ball188.cc'
const baseUrl2 = 'https://brlapi.ball188.cc'


export  const getBanner = async () => {
  try {
    const res = await axios.get(`${baseUrl}/BRL/banner?lang=zh&needAuth=false`)

    return res.data.data
  } catch (error) {
    console.error('[Get banner]', error)
  }
}

export  const getBannerOfPromotion = async () => {
  try {
    const res = await axios.get(`${baseUrl2}/BRL/promotion/show/banner?lang=pt&needAuth=false`)

    return res.data.data
  } catch (error) {
    console.error('[Get banner]', error)
  }
}