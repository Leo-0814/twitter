import LeftContainer from '../component/LeftContainer'
import settingActive from '../images/_base/settingActive.png'
import React, { useEffect, useState } from 'react'
import { getInfo, getUsers } from '../api/info'
import { useNavigate } from 'react-router-dom'
import { getBanner, getBannerOfPromotion } from '../api/banner'
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay, Pagination,Navigation } from "swiper/modules";
import 'swiper/css'; 
import 'swiper/css/pagination'; 
import 'swiper/css/navigation';
import { changeLanguage } from 'i18next'

const PromotionPage = () => {
  const [ personInfo, setPersonInfo ] = useState({
    account_id: '',
    account: '',
    real_name: '',
    remark: '',
    email: '',
  }) 
  const navigate = useNavigate()

  const [ bannerList, setBannerList ] = useState([])

  // 初始拿Banner
  useEffect(() => {
    const gerBannerAsync = async () => {
      try {
        const banner = await getBanner()
        const bannerOfPromotion = await getBannerOfPromotion()

        if (banner && bannerOfPromotion) {
          let allBanner = banner.concat(bannerOfPromotion)
          setBannerList(allBanner)
        }
      } catch (error) {
        console.log(error)
      }
    }
    gerBannerAsync()
  },[])

  // 確認token
  useEffect(() => {
    const checkTokenAsync = async () => {
      const token = localStorage.getItem('token')
      const adminToken2 = localStorage.getItem('adminToken2')
      if (!token || !adminToken2) {
        navigate('/login')
        return
      }

      const resGetInfo = await getInfo(token)
      const resGetUsers = await getUsers(adminToken2)
      if (resGetInfo && resGetUsers) {
        setPersonInfo(resGetInfo)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken2')
        navigate('/login')
      }
    }
    checkTokenAsync()
  },[navigate])

    // 設定語系
  useEffect(() => {
    const defaultLang = localStorage.getItem('defaultLanguage')
    changeLanguage(defaultLang)
  },[])

  return (
    <>
      <div className="mainContainer">
        <LeftContainer 
          promotion={settingActive}
          account_id={personInfo.account_id}
        >
        </LeftContainer>

        {/* PromotionContainer */}
        <div className='promotionContainer'>
          <Swiper 
            modules={[ Autoplay, Pagination, Navigation ]}
            spaceBetween={0} // 圖片間距
            slidesPerView={1} // 每頁圖片數
            loop={bannerList.length > 1} //無限循環
            autoplay={{ // 自動輪播
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation //左右箭頭導航 
            pagination={{ clickable: true }}  //頁數 
            // onSlideChange={() => console.log('slide change')} // 圖片更換時dosomething
            // onSwiper={(swiper) => console.log(swiper)} 
            className="swiper"
          > 
            {bannerList.map(banner => {
              return (
                <SwiperSlide key={banner.id} ><img src={banner.img? banner.img: banner.img_url} alt="banner" className='swiper-banner'/></SwiperSlide> 
              )
            })}
          </Swiper> 
        </div>
      </div>
    </>

  )
}

export default PromotionPage