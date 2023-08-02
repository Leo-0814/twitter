import ButtonHollow from "../component/Button-hollow"
import LeftContainer from "../component/LeftContainer"
import PostCard from "../component/PostCard"
import RightContainer from "../component/RightContainer"
import leftArrow from '../images/_base/leftArrow.png'
import photo from '../images/photo.png'
import background from '../images/background.png'
import informationActive from '../images/_base/informationActive.png'
import { Link } from "react-router-dom"
import { useState } from "react"
import { Modal, ModalBackground } from "../component/Modal"
import { LogoIcon } from "../component/common/logo.styled"
import logo from '../images/logo.png'
import clsx from "clsx"
import reply from '../images/_base/reply.png'
import like from '../images/_base/like.png'
import ReplyCard from "../component/ReplyCard"
import AuthInput from "../component/AuthInput"

const InformationPage = () => {
  const [postingModal, setPostingModal] = useState(false)
  const [replyPage, setReplyPage] = useState(false)
  const [replyModal, setReplyModal] = useState(false)
  const [editInfoModal, setEditInfoModal] = useState(false)
  const [tabControl, setTabControl] = useState(0)
  const [username, setUsername] =useState('John Doe')
  const [introduction, setIntroduction] =useState('')
  
  return (
    <>
      <div className="mainContainer">
        <LeftContainer information={informationActive} onClickPost={() => setPostingModal(true)}></LeftContainer>

        {/* informationContainer */}
        <div className={clsx("informationContainer", { reply: replyPage})}>
          <div className="informationContainer-header">
            <Link to='/home'><img src={leftArrow} alt="leftArrow" className="header-back" /></Link>
            <div className="header-content">
              <div className="header-content-username">John Doe</div>
              <div className="header-content-postCount">25 推文</div>
            </div>
          </div>
          <div className="informationContainer-self">
            <div className="self-picture">
              <img src={background} alt="background" className="self-picture-background" />
              <img src={photo} alt="photo1" className="self-picture-photo" />
              <ButtonHollow className='self-picture-btn' onClick={() => setEditInfoModal(true)}>編輯個人資料</ButtonHollow>
            </div>
            <div className="self-content">
              <div className="self-content-username">John Doe</div>
              <div className="self-content-account">@heyjohn</div>
              <div className="self-content-text">Ipsum is simply dummy text of the printing and typesetting industry.</div>
              <div className="self-content-footer">
                <div className="content-footer-following">34個<span className="footer-following-span">跟隨中</span></div>
                <div className="content-footer-following">59位<span className="footer-following-span">跟隨者</span></div>
              </div>
            </div>
          </div>
          <div className="informationContainer-tabs">
            <div className={clsx('tabs-tab', {active: tabControl === 0})} onClick={() => setTabControl(0)}>推文</div>
            <div className={clsx('tabs-tab', {active: tabControl === 1})} onClick={() => setTabControl(1)}>回覆</div>
            <div className={clsx('tabs-tab', {active: tabControl === 2})} onClick={() => setTabControl(2)}>喜歡的內容</div>
          </div>
          <div className={clsx('informationContainer-post', {active: tabControl === 0})}>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={false}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={false}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={false}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={false}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={false}></PostCard>
          </div>
          <div className={clsx('informationContainer-reply', {active: tabControl === 1})}>
            <ReplyCard type='typeA'></ReplyCard>
            <ReplyCard type='typeA'></ReplyCard>
            <ReplyCard type='typeA'></ReplyCard>
            <ReplyCard type='typeA'></ReplyCard>
            <ReplyCard type='typeA'></ReplyCard>
          </div>
          <div className={clsx('informationContainer-like', {active: tabControl === 2})}>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={true}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={true}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={true}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={true}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={true}></PostCard>
          </div>
          <Modal active={postingModal} onClickModalCancel={() => setPostingModal(false)} className='informationContainer-posting-modal' btnText='推文' type='typeA'>
            <div className="posting-modal-content">
              <LogoIcon src={logo} alt="logo" className="modal-content-img" />
              <textarea rows='6' cols='100' className="modal-content-textarea" placeholder='有什麼新鮮事?'></textarea>
            </div>
          </Modal>
          <Modal active={editInfoModal} onClickModalCancel={() => setEditInfoModal(false)} className='informationContainer-editInfo-modal' btnText='儲存' title='編輯個人資料' type='typeB'>
            <div className="editInfo-modal-picture">
              <img src={background} alt="background" className="modal-picture-background" />
              <img src={photo} alt="photo1" className="modal-picture-photo" />
            </div>
            <div className="editInfo-modal-input">
              <div className="modal-input-username">
                <AuthInput 
                  value={username} name='username' label='名稱' className='input-username-input' onChange={(usernameInputValue) => setUsername(usernameInputValue)}
                />
                <div className="input-username-count">8/50</div>
              </div>
              
              <div className="modal-input-introduction">
                <label htmlFor='introduction' className="input-introduction-label">自我介紹</label>
                <textarea id='introduction' className='input-introduction-textarea' rows='6' cols='100' placeholder="請輸入自我介紹">{introduction}</textarea>
                <div className="input-introduction-count">0/160</div>
              </div>
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
          <Modal active={postingModal} onClickModalCancel={() => setPostingModal(false)} className='replyList-posting-modal' btnText='推文' type='typeA'>
            <div className="posting-modal-content">
              <LogoIcon src={logo} alt="logo" className="modal-content-img" />
              <textarea rows='6' cols='100' className="modal-content-textarea" placeholder='有什麼新鮮事?'></textarea>
            </div>
          </Modal>
          <Modal active={replyModal} onClickModalCancel={() => setReplyModal(false)} className='replyList-reply-modal' btnText='回覆' type='typeA'>
            <ReplyCard className='reply-modal-replyCard'></ReplyCard>
            <div className="reply-modal-ownReply">
              <LogoIcon src={logo} alt="logo" className="modal-ownReply-img" />
              <textarea rows='8' cols='100' className="modal-ownReply-textarea" placeholder='推你的回覆'></textarea>
            </div>
          </Modal>
        </div>

        <RightContainer></RightContainer>
      </div>

      <ModalBackground active={postingModal || replyModal || editInfoModal}></ModalBackground>
    </>
  )
}

export default InformationPage