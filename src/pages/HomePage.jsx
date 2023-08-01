import logo from '../images/logo.png'
import { LogoIcon } from '../component/common/logo.styled'
import Button from '../component/Button'
import LeftContainer from '../component/LeftContainer'
import RightContainer from '../component/RightContainer'
import PostCard from '../component/PostCard'
import homeActive from '../images/_base/homeActive.png'
import { useState } from 'react'
import { Modal, ModalBackground } from '../component/Modal'
import ReplyCard from '../component/ReplyCard'
import leftArrow from '../images/_base/leftArrow.png'
import reply from '../images/_base/reply.png'
import like from '../images/_base/like.png'
import clsx from 'clsx'

const HomePage = () => {
  const [postingModal, setPostingModal] = useState(false)
  const [replyPage, setReplyPage] = useState(false)

  return (
    <>
      <div className="mainContainer">
        <LeftContainer home={homeActive} onClickPost={() => setPostingModal(true)}>'</LeftContainer>

        <div className={clsx("centerContainer", { reply: replyPage})}>
          <div className="centerContainer-title">首頁</div>
          <div className="centerContainer-posting">
            <LogoIcon src={logo} alt="logo" className="posting-img" />
            <textarea rows='3' cols='100' className="posting-textarea" placeholder='有什麼新鮮事?'></textarea>
            <Button className='posting-btn'>推文</Button>
          </div>
          <div className="centerContainer-post">
            <PostCard onClickReply={() => setReplyPage(true)}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)}></PostCard>
          </div>
          <Modal active={postingModal} onClickModalCancel={() => setPostingModal(false)}></Modal>
        </div>

        <div className={clsx("replyListContainer", { reply: replyPage})}>
          <div className="replyList-header">
            <img src={leftArrow} alt="leftArrow" className="replyList-header-back" onClick={() => setReplyPage(false)}/>
            <div className="replyList-header-title">推文</div>
          </div>
          <div className="replyList-content">
            <div className="replyList-content-header">
              <LogoIcon src={logo} alt="" className="content-header-photo" />
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
            <img src={reply} alt="reply" className="replyList-action-icon" />
            <img src={like} alt="like" className="replyList-action-icon" />
          </div>
          <div className="replyList-reply">
            <ReplyCard></ReplyCard>
            <ReplyCard></ReplyCard>
            <ReplyCard></ReplyCard>
            <ReplyCard></ReplyCard>
            <ReplyCard></ReplyCard>
            <ReplyCard></ReplyCard>
            <ReplyCard></ReplyCard>
          </div>
        </div>


        <RightContainer></RightContainer>
      </div>

      <ModalBackground active={postingModal}></ModalBackground>
    </>

  )
}

export default HomePage