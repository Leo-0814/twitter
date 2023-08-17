import userPhoto from '../images/userPhoto.png'
import ownPhoto from '../images/ownPhoto.png'
import Button from '../component/Button'
import LeftContainer from '../component/LeftContainer'
import RightContainer from '../component/RightContainer'
import PostCard from '../component/PostCard'
import homeActive from '../images/_base/homeActive.png'
import React, { useEffect, useState } from 'react'
import { Modal, ModalBackground } from '../component/Modal'
import ReplyCard from '../component/ReplyCard'
import leftArrow from '../images/_base/leftArrow.png'
import reply from '../images/_base/reply.png'
import like from '../images/_base/like.png'
import clsx from 'clsx'
import { Photo } from '../component/common/photo.styled'
import { followUser, getInfo, getUsers } from '../api/info'
import { useNavigate } from 'react-router-dom'
import { adminToken } from '../component/common/adminToken'
import { createPost, editPost, getPosts } from '../api/posts'

const HomePage = () => {
  const [postingModal, setPostingModal] = useState(false)
  const [replyPage, setReplyPage] = useState(false)
  const [replyModal, setReplyModal] = useState(false)
  const [ userList, setUserList ] = useState([])
  const navigate = useNavigate()
  const [ personInfo, setPersonInfo ] = useState({
    account_id: '',
    account: '',
    real_name: '',
    remark: '',
    email: '',
  }) 
  const [ postList, setPostList ] = useState([])
  const [ postingContent, setPostingContent ] = useState('')
  
  // 推薦跟隨
  const handleClickFollowUser = async (id) => {
    try {
      await followUser(id, adminToken)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  // 發文
  const handleClickPost = async () => {
    if (postingContent.length === 0) {
      return
    }

    const token = localStorage.getItem('token')
    const id = postList[postList.length - 1].id + 1
    const time = new Date()
    const getTime = time.getTime()
    const create_at = time.toLocaleString()

    try {
      const res = await createPost({token, id, create_at, getTime, postingContent, ...personInfo})
      
      if (res) {
        setPostList((prop) => {
          return [
            ...prop,
            res
          ]
        })
        setPostingContent('')
        setPostingModal(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 對推文按喜歡
  const handleClickLike = async (postId) => {
    const token = localStorage.getItem('token')
    const account_id = personInfo.account_id
    const post = postList.filter(item => item.id === postId)
    try {
      const res = await editPost({post, account_id, token})

      if (res) {
        const res = await getPosts()
        setPostList(res)
      }
    } catch (error) {
      console.log(error)
    }
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
      try {
        const res = await getUsers(adminToken)
        
        if (res) {
          setUserList(res)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUsersAsync()
  },[])

  // 初始拿推文
  useEffect(() => {
    const getPostsAsync = async () => {
      try {
        const res = await getPosts()
        setPostList(res.reverse())
      } catch (error) {
        console.log(error)
      }
    }
    getPostsAsync()
  },[])

  return (
    <>
      <div className="mainContainer">
        <LeftContainer home={homeActive} onClickPost={() => {
          setPostingModal(true)
          setReplyPage(false)}}>'</LeftContainer>

        {/* centerContainer */}
        <div className={clsx("centerContainer", { reply: replyPage})}>
          <div className="centerContainer-title">首頁</div>
          <div className="centerContainer-posting">
            <Photo src={ownPhoto} alt="logo" className="posting-img" />
            <textarea rows='3' cols='100' className="posting-textarea" placeholder='有什麼新鮮事?' value={postingContent} onChange={(e) => setPostingContent(e.target.value)}></textarea>
            <Button className='posting-btn' onClick={handleClickPost}>推文</Button>
          </div>
          <div className="centerContainer-post">
            {postList.map((post) => {
              return (
                <PostCard key={post.id} onClickReply={() => setReplyPage(true)} postData={post} account_id={personInfo.account_id} onClick={handleClickLike}></PostCard>
              )
            })}
          </div>
          <Modal active={postingModal} onClickModalCancel={() => setPostingModal(false)} className='centerContainer-posting-modal' btnText='推文' type='typeA'>
            <div className="posting-modal-content">
                <Photo src={ownPhoto} alt="logo" className="modal-content-img" />
              <textarea rows='6' cols='100' className="modal-content-textarea" placeholder='有什麼新鮮事?' value={postingContent} onChange={(postingModalTextareaValue) => setPostingContent(postingModalTextareaValue.target.value)}></textarea>
            </div>
            <Button className='posting-modal-btn' onClick={handleClickPost}>推文</Button>
          </Modal>
        </div>

        {/* replyListContainer */}
        <div className={clsx("replyListContainer", { reply: replyPage})}>
          <div className="replyList-header">
            <img src={leftArrow} alt="leftArrow" className="replyList-header-back" onClick={() => setReplyPage(false)}/>
            <div className="replyList-header-title">推文</div>
          </div>
          <div className="replyList-content">
            <div className="replyList-content-header">
              <Photo src={userPhoto} alt="" className="content-header-photo" />
              <div className="content-header-data">
                <div className="header-data-username">Apple</div>
                <div className="header-data-account">@apple</div>
              </div>
            </div>
            <div className="replyList-content-text">Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt.</div>
            <div className="replyList-content-footer">上午 10:05 ． 2021年11月10日</div>
          </div>
          <div className="replyList-actionCount">
            <div className="replyList-actionCount-item">
              <div className="actionCount-item-count">34<span className="actionCount-item-span">回覆</span></div>
            </div>
            <div className="replyList-actionCount-item">
              <div className="actionCount-item-count">808<span className="actionCount-item-span">喜歡次數</span></div>
            </div>
          </div>
          <div className="replyList-action">
            <img src={reply} alt="reply" className="replyList-action-icon" onClick={() => setReplyModal(true)}/>
            <img src={like} alt="like" className="replyList-action-icon" />
          </div>
          <div className="replyList-reply">
            <ReplyCard type='typeA'></ReplyCard>
            <ReplyCard type='typeA'></ReplyCard>
            <ReplyCard type='typeA'></ReplyCard>
            <ReplyCard type='typeA'></ReplyCard>
            <ReplyCard type='typeA'></ReplyCard>
            <ReplyCard type='typeA'></ReplyCard>
            <ReplyCard type='typeA'></ReplyCard>
          </div>
          <Modal active={replyModal} onClickModalCancel={() => setReplyModal(false)} className='replyList-reply-modal' btnText='回覆'  type='typeA'>
            <ReplyCard className='reply-modal-replyCard'></ReplyCard>
            <div className="reply-modal-ownReply">
              <Photo src={userPhoto} alt="logo" className="modal-ownReply-img" />
              <textarea rows='8' cols='100' className="modal-ownReply-textarea" placeholder='推你的回覆'></textarea>
            </div>
            <Button className='reply-modal-btn'>推文</Button>
          </Modal>
        </div>


        <RightContainer onClick={handleClickFollowUser} userList={userList}></RightContainer>
      </div>

      <ModalBackground active={postingModal || replyModal}></ModalBackground>
    </>

  )
}

export default HomePage