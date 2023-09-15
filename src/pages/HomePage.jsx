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
import { ReplyListContainer } from '../component/ReplyListContainer'
import db from "../configs/config"

const HomePage = () => {
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
  const [ replyContainerId, setReplyContainerId ] = useState('')
  const [ replyModalInputValue, setReplyModalInputValue ] = useState('') 
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  
  
  // 推薦跟隨
  const handleClickFollowUser = async (id) => {
    const adminToken2 = localStorage.getItem('adminToken2')

    try {
      await followUser(id, adminToken2)
      const res = await getUsers(adminToken2)
      setUserList(res)
      // window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  // 發文
  const handleClickPost = async () => {
    // if (postingContent.length === 0) {
    //   return
    // }
    // const token = localStorage.getItem('token')
    // const id = postList[0].id + 1
    // const time = new Date()
    // const getTime = time.getTime()
    // const create_at = time.toLocaleString()

    // try {
    //   const res = await createPost({token, id, create_at, getTime, postingContent, ...personInfo})
      
    //   if (res) {
    //     const newPostList = [res,...postList]
    //     setPostList(newPostList)
    //     setPostingContent('')
    //     setPostingModal(false)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    if (postingContent.length === 0) {
      return
    }
    const time = new Date()
    const getTime = time.getTime()
    const create_at = time.toLocaleString()
    const id = postList[0].id + 1

    const fields = {
      account: personInfo.account,
      account_id: personInfo.account_id,
      content: postingContent,
      create_at,
      getTime,
      id,
      real_name: personInfo.real_name,
      like: [],
      reply: [],
    }

    db.ref('/posts').update({[id]: fields})
    setPostingContent('')
    setPostingModal(false)
  }

  // 對推文按喜歡
  const handleClickLike = async (postId) => {
    // const token = localStorage.getItem('token')
    // const post = postList.filter(item => item.id === postId)
    // try {
    //   const res = await editPost({post, personInfo, token})
      
    //   if (res) {
    //     setReplyContainerData(res)
    //     const posts = await getPosts()
    //     setPostList(posts)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    let account_id = personInfo.account_id
    let post = postList.filter(post => post.id === postId)
    let postLike = post[0].like

    if (postLike.includes(personInfo.account_id)) {
      db.ref(`posts/${postId}/like/${account_id}`).remove()
    } else {
      db.ref(`posts/${postId}/like`).update({[account_id]: account_id})
    }
  }

  // 點擊推文回覆跳轉replyListContainer
  const handleClickReply = (postId) => {
    setIsOpenReplyPage(true)
    setReplyContainerId(postId)
  }

  // 回覆推文
  const handleReply = async (postId) => {
    // const token = localStorage.getItem('token')
    // const post = postList.filter(item => item.id === postId)
    // const time = new Date()
    // const getTime = time.getTime()
    // const create_at = time.toLocaleString()

    // try {
    //   const res = await editPost({post, personInfo, token, replyModalInputValue, create_at, getTime})
      
    //   if (res) {
    //     setReplyModalInputValue('')
    //     const posts = await getPosts()
    //     setPostList(posts)
    //     const newPostData = posts.filter(post => post.id === postId)
    //     setReplyContainerData(newPostData[0])
    //     setIsOpenReplyModal(false)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    if (replyModalInputValue.length === 0) {
      return
    }
    let post = postList.filter(post => post.id === postId)
    post = post[0]
    const time = new Date()
    const getTime = time.getTime()
    const create_at = time.toLocaleString()
    const id = post.reply.length
    const fields = {
      account: personInfo.account,
      account_id: personInfo.account_id,
      content: replyModalInputValue,
      create_at,
      getTime,
      id,
      real_name: personInfo.real_name,
    }

    db.ref(`/posts/${postId}/reply`).update({[id]: fields})
    setReplyModalInputValue('')
    setIsOpenReplyModal(false)
  }

  // 初始拿推文
  useEffect(() => {
    const getPostsAsync = () => {
    //   try {
    //     const res = await getPosts()
    //     setPostList(res)

    //     if (searchParams.get('from') === 'setting') {
    //       setPostingModal(true)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    db.ref('posts').on('value', snapshot => {
      let data = []
      snapshot.forEach(item => {
        data.push(item.val())
      })
      for (let item in data) {
        let post = data[item]
        if (!post.hasOwnProperty('like')) {
          post['like'] = []
        } else {
          let likeArr = []
          for (let item in post.like) {
            likeArr.push(post.like[item])
          }
          post.like = likeArr
        }
        if (!post.hasOwnProperty('reply')) {
          post['reply'] = []
        } else {
          let replyArr = []
          for (let item in post.reply) {
            replyArr.push(post.reply[item])
          }
          post.reply = replyArr.reverse()
        }
      }
      setPostList(data.reverse())
    })
  }
  getPostsAsync()
},[])

  useEffect(() => {
  if (searchParams.get('from') === 'setting') {
    setPostingModal(true)
  }
  },[searchParams])

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
        setUserList(resGetUsers)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken2')
        navigate('/login')
      }
    }
    checkTokenAsync()
  },[navigate])

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

        {/* centerContainer */}
        <div className={clsx("centerContainer", { reply: isOpenReplyPage })}>
          <Photo src={ownPhoto} alt="ownPhoto" className="centerContainer-ownPhoto" />
          <div className="centerContainer-title">首頁</div>
          <div className="centerContainer-posting">
            <Photo src={ownPhoto} alt="ownPhoto" className="posting-img" />
            <textarea rows='3' cols='100' className="posting-textarea" placeholder='有什麼新鮮事?' value={postingContent} onChange={(e) => setPostingContent(e.target.value)}></textarea>
            <Button className='posting-btn' onClick={handleClickPost}>推文</Button>
          </div>
          <div className="centerContainer-post">
            {postList.map((post) => {
              return (
                <PostCard key={post.id} className='centerContainer-post-card' onClickReply={handleClickReply} postData={post} personInfo={personInfo} onClickLike={handleClickLike} userData={''}></PostCard>
              )
            })}
          </div>
          <Modal active={postingModal} onClickModalCancel={() => setPostingModal(false)} className='centerContainer-posting-modal' btnText='推文' type='typeA'>
            <div className="posting-modal-content">
                <Photo src={ownPhoto} alt="ownPhoto" className="modal-content-img" />
              <textarea rows='6' cols='100' className="modal-content-textarea" placeholder='有什麼新鮮事?' value={postingContent} onChange={(postingModalTextareaValue) => setPostingContent(postingModalTextareaValue.target.value)}></textarea>
            </div>
            <Button className='posting-modal-btn' onClick={handleClickPost}>推文</Button>
          </Modal>
        </div>

        <ReplyListContainer 
          isOpenReplyPage={isOpenReplyPage} 
          isOpenReplyModal={isOpenReplyModal} 
          onClickOpenReplyPage={(boolean) => setIsOpenReplyPage(boolean)} 
          onClickOpenReplyModal={(boolean) => setIsOpenReplyModal(boolean)} 
          postId={replyContainerId} 
          postList={postList}
          onClick={handleClickLike} 
          personInfo={personInfo} 
          replyModalInputValue={replyModalInputValue} 
          onChange={(value) => setReplyModalInputValue(value.target.value)} 
          onClickReply={handleReply}>
        </ReplyListContainer>

        <RightContainer onClick={handleClickFollowUser} userList={userList.slice(0, 20)}></RightContainer>
      </div>

      <ModalBackground active={postingModal || isOpenReplyModal}></ModalBackground>
    </>

  )
}

export default HomePage