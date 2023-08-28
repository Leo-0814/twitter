import LeftContainer from '../component/LeftContainer'
import settingActive from '../images/_base/settingActive.png'
import React, { useEffect, useState } from 'react'
import { getInfo } from '../api/info'
import { useNavigate } from 'react-router-dom'
import { getBanner, getBannerOfPromotion } from '../api/banner'
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay, Pagination,Navigation } from "swiper/modules";
import 'swiper/css'; 
import 'swiper/css/pagination'; 
import 'swiper/css/navigation';

const PromotionPage = () => {
  const [ postingModal, setPostingModal ] = useState(false)
  const [ isOpenReplyPage, setIsOpenReplyPage ] = useState(false)
  const [ personInfo, setPersonInfo ] = useState({
    account_id: '',
    account: '',
    real_name: '',
    remark: '',
    email: '',
  }) 
  const navigate = useNavigate()

  const [ bannerList, setBannerList ] = useState([])

  // 判斷token拿取個人資料
  useEffect(() => {
    const getInfoAsync = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      } 

      try {
        const res = await getInfo(token)
        if (!res) {
          localStorage.removeItem('token')
          navigate('/login')
        } else {
          setPersonInfo({
          email: res.email,
          account: res.account,
          real_name: res.real_name,
          account_id: res.account_id,
          remark: res.remark,
        })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getInfoAsync()
  },[navigate])

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

  return (
    <>
      <div className="mainContainer">
        <LeftContainer 
          promotion={settingActive} 
          onClickPost={() => {
            setPostingModal(true)
            setIsOpenReplyPage(false)
          }}
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