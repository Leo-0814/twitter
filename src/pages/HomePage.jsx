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
  const [replyModal, setReplyModal] = useState(false)

  return (
    <>
      <div className="mainContainer">
        <LeftContainer home={homeActive} onClickPost={() => setPostingModal(true)}>'</LeftContainer>

        {/* centerContainer */}
        <div className={clsx("centerContainer", { reply: replyPage})}>
          <div className="centerContainer-title">首頁</div>
          <div className="centerContainer-posting">
            <LogoIcon src={logo} alt="logo" className="posting-img" />
            <textarea rows='3' cols='100' className="posting-textarea" placeholder='有什麼新鮮事?'></textarea>
            <Button className='posting-btn'>推文</Button>
          </div>
          <div className="centerContainer-post">
            <PostCard onClickReply={() => setReplyPage(true)} isLike={true}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)}></PostCard>
          </div>
          <Modal active={postingModal} onClickModalCancel={() => setPostingModal(false)} className='centerContainer-posting-modal' btnText='推文' type='typeA'>
            <div className="posting-modal-content">
                <LogoIcon src={logo} alt="logo" className="modal-content-img" />
                <textarea rows='6' cols='100' className="modal-content-textarea" placeholder='有什麼新鮮事?'></textarea>
            </div>
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
          <Modal active={postingModal} onClickModalCancel={() => setPostingModal(false)} className='replyList-posting-modal' btnText='推文'  type='typeA'>
            <div className="posting-modal-content">
              <LogoIcon src={logo} alt="logo" className="modal-content-img" />
              <textarea rows='6' cols='100' className="modal-content-textarea" placeholder='有什麼新鮮事?'></textarea>
            </div>
          </Modal>
          <Modal active={replyModal} onClickModalCancel={() => setReplyModal(false)} className='replyList-reply-modal' btnText='回覆'  type='typeA'>
            <ReplyCard className='reply-modal-replyCard'></ReplyCard>
            <div className="reply-modal-ownReply">
              <LogoIcon src={logo} alt="logo" className="modal-ownReply-img" />
              <textarea rows='8' cols='100' className="modal-ownReply-textarea" placeholder='推你的回覆'></textarea>
            </div>
          </Modal>
        </div>


        <RightContainer></RightContainer>
      </div>

      <ModalBackground active={postingModal || replyModal}></ModalBackground>
    </>

  )
}

export default HomePage