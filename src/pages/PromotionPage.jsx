import ownPhoto from '../images/ownPhoto.png'
import Button from '../component/Button'
import LeftContainer from '../component/LeftContainer'
import RightContainer from '../component/RightContainer'
import PostCard from '../component/PostCard'
import homeActive from '../images/_base/homeActive.png'
import React, { useEffect, useState } from 'react'
import { Modal, ModalBackground } from '../component/Modal'
import clsx from 'clsx'
import { Photo } from '../component/common/photo.styled'
import { followUser, getInfo, getUsers } from '../api/info'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { createPost, editPost, getPosts } from '../api/posts'
import { ReplyListContainer } from '../component/ReplyListContainer'
import { getBanner } from '../api/globalsetting'

const PromotionPage = () => {
  const [ postingModal, setPostingModal ] = useState(false)
  const [ isOpenReplyPage, setIsOpenReplyPage ] = useState(false)
  const [ isOpenReplyModal, setIsOpenReplyModal ] = useState(false)
  const [ userList, setUserList ] = useState([])
  const [ personInfo, setPersonInfo ] = useState({
    account_id: '',
    account: '',
    real_name: '',
    remark: '',
    email: '',
  }) 
  const [ postList, setPostList ] = useState([])
  const [ postingContent, setPostingContent ] = useState('')
  const [ replyContainerData, setReplyContainerData ] = useState({
    id: '',
    account: '',
    real_name: '',
    create_at: '',
    getTime: '',
    content: '',
    photo: '',
    reply: [],
    like: []
  })
  const [ replyModalInputValue, setReplyModalInputValue ] = useState('') 
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [ bannerList, setBannerList ] = useState([])
  const [ isActiveBannerId, setIsActiveBannerId ] = useState(31)
  
  
  
  
  // 推薦跟隨
  const handleClickFollowUser = async (id) => {
    const adminToken = localStorage.getItem('adminToken')

    try {
      await followUser(id, adminToken)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickTest = () => {

  }

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

  // 初始拿用戶列表
  useEffect(() => {
    const getUsersAsync = async () => {
      const adminToken = localStorage.getItem('adminToken')

      if (!adminToken) {
        navigate('/adminlogin')
        return
      }

      try {
        const res = await getUsers(adminToken)
        
        if (res) {
          setUserList(res)
        } else {
          localStorage.removeItem('adminToken')
          navigate('/adminlogin')
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUsersAsync()
  },[navigate])

  // 初始拿推文
  useEffect(() => {
    const getPostsAsync = async () => {
      try {
        const res = await getPosts()
        setPostList(res)

        if (searchParams.get('from') === 'setting') {
          setPostingModal(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getPostsAsync()
  },[searchParams])

  // 初始拿Banner
  useEffect(() => {
    const gerBannerAsync = async () => {
      try {
        const res = await getBanner()

        if (res) {
          setBannerList(res)
        }
        console.log(res)
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
          home={homeActive} 
          onClickPost={() => {
            setPostingModal(true)
            setIsOpenReplyPage(false)
          }}
          account_id={personInfo.account_id}
        >
        </LeftContainer>

        {/* PromotionContainer */}
        <div className='promotionContainer'>

          <div className="swiper">
            <div className="swiper-wrapper">
              {bannerList.map(banner => {
                return (
                  <div className="swiper-slide" key={banner.id}><img src={banner.img} alt="" className='banner' onClick={handleClickTest}/></div>
                )
              })}
            </div>
            {/* <!-- If we need pagination --> */}
            <div className="swiper-pagination"></div>

            {/* <!-- If we need navigation buttons --> */}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>

            {/* <!-- If we need scrollbar --> */}
          {/* <!--   <div className="swiper-scrollbar"></div> */}
        </div>


          <div className="banner-container">
            {bannerList.map(banner => {
              return (
                <img src={banner.img} alt="" key={banner.id} className={clsx('banner', {active: isActiveBannerId === banner.id})} onClick={handleClickTest}/>
              )
            })}
          </div>
        </div>

        <RightContainer onClick={handleClickFollowUser} userList={userList}></RightContainer>
      </div>

      <ModalBackground active={postingModal || isOpenReplyModal}></ModalBackground>
    </>

  )
}

export default PromotionPage