import ButtonHollow from "../component/Button-hollow"
import LeftContainer from "../component/LeftContainer"
import PostCard from "../component/PostCard"
import RightContainer from "../component/RightContainer"
import leftArrow from '../images/_base/leftArrow.png'
import photo from '../images/photo.png'
import background from '../images/background.png'
import informationActive from '../images/_base/informationActive.png'
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Modal, ModalBackground } from "../component/Modal"
import userPhoto from '../images/userPhoto.png'
import clsx from "clsx"
import reply from '../images/_base/reply.png'
import like from '../images/_base/like.png'
import ReplyCard from "../component/ReplyCard"
import AuthInput from "../component/AuthInput"
import FollowCard from "../component/FollowCard"
import { Photo } from "../component/common/photo.styled"
import { editInfo, getInfo } from "../api/info"
import Button from "../component/Button"
import Swal from "sweetalert2"

const InformationPage = () => {
  const [postingModal, setPostingModal] = useState(false)
  const [replyPage, setReplyPage] = useState(false)
  const [followPage, setFollowPage] = useState(false)
  const [replyModal, setReplyModal] = useState(false)
  const [editInfoModal, setEditInfoModal] = useState(false)
  const [infoTabControl, setInfoTabControl] = useState(0)
  const [followTabControl, setFollowTabControl] = useState(0)
  const [isFollow, setIsFollow] = useState(false)
  const [ personInfo, setPersonInfo ] = useState({
    account_id: '',
    account: '',
    real_name: '',
    remark: '',
  }) 
  const realNameRef = useRef(personInfo.real_name)
  const accountRef = useRef(personInfo.account)
  const adminToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FkbWluYXBpLmJhbGwxODguY2MvYWRtaW4vbG9naW4iLCJpYXQiOjE2OTE0NjY1MjksImV4cCI6MTY5MTYzOTMyOSwibmJmIjoxNjkxNDY2NTI5LCJqdGkiOiJabmdxZjVXVlRJclpuekYzIiwic3ViIjoiMjUiLCJwcnYiOiJjODI5MjIzODM1ZDExMTM4ZjA4YWNlNTZmZmE2NjI4YmMyNjgzY2I1In0.VS-1Px66ifJ2BJzG4l5OMSmUN59gxIOruzIAx53yl1w'
  const area_code = ''
  const mobile = ''
  const user_level_id = 22

  const handleChange = (remarkInputValue) => {
    setPersonInfo({
      ...personInfo,
      remark: remarkInputValue.target.value
    })
  }
  const handleClick = async () => {
    if (personInfo.real_name.length === 0 || personInfo.remark.length === 0) {
      return
    }

    try {
      const res = await editInfo({ area_code, mobile, user_level_id, adminToken, ...personInfo })

      if (res) {
        // window.location.reload()
        setPersonInfo(personInfo)
        setEditInfoModal(false)
        Swal.fire({
          icon: 'success',
          title: '儲存成功',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
          position: 'top'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getInfoAsync = async () => {
      const token = localStorage.getItem('token')

      try {
        const { account, real_name, account_id, remark
 } = await getInfo(token)
        setPersonInfo({
          ...personInfo,
          account,
          real_name,
          account_id,
          remark,
        })
        realNameRef.current = real_name
        accountRef.current = account
      } catch (error) {
        console.log(error)
      }
    }
    getInfoAsync()
  }, [editInfoModal])
  
  return (
    <>
      <div className="mainContainer">
        <LeftContainer information={informationActive} onClickPost={() => {
          setPostingModal(true)
          setReplyPage(false)
          setFollowPage(false)}}></LeftContainer>

        {/* informationContainer */}
        <div className={clsx("informationContainer", { reply: replyPage, follow: followPage})}>
          <div className="informationContainer-header">
            <Link to='/home'><img src={leftArrow} alt="leftArrow" className="header-back" /></Link>
            <div className="header-content">
              <div className="header-content-username">{realNameRef.current}</div>
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
              <div className="self-content-username">{realNameRef.current}</div>
              <div className="self-content-account">@{accountRef.current}</div>
              <div className="self-content-text">{personInfo.remark}</div>
              <div className="self-content-footer">
                <div className="content-footer-following" onClick={() => {
                  setFollowPage(true)
                  setFollowTabControl(0)}}>34個<span className="footer-following-span">跟隨中</span></div>
                <div className="content-footer-following" onClick={() => {
                  setFollowPage(true) 
                  setFollowTabControl(1)}}>59位<span className="footer-following-span">跟隨者</span></div>
              </div>
            </div>
          </div>
          <div className="informationContainer-tabs">
            <div className={clsx('tabs-tab', {active: infoTabControl === 0})} onClick={() => setInfoTabControl(0)}>推文</div>
            <div className={clsx('tabs-tab', {active: infoTabControl === 1})} onClick={() => setInfoTabControl(1)}>回覆</div>
            <div className={clsx('tabs-tab', {active: infoTabControl === 2})} onClick={() => setInfoTabControl(2)}>喜歡的內容</div>
          </div>
          {/* tab post */}
          <div className={clsx('informationContainer-post', {active: infoTabControl === 0})}>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={false} real_name={realNameRef.current} account={accountRef.current}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={false} real_name={realNameRef.current} account={accountRef.current}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={false} real_name={realNameRef.current} account={accountRef.current}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={false} real_name={realNameRef.current} account={accountRef.current}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={false} real_name={realNameRef.current} account={accountRef.current}></PostCard>
          </div>
          {/* tab reply */}
          <div className={clsx('informationContainer-reply', {active: infoTabControl === 1})}>
            <ReplyCard type='typeA' real_name={realNameRef.current} account={accountRef.current}></ReplyCard>
            <ReplyCard type='typeA' real_name={realNameRef.current} account={accountRef.current}></ReplyCard>
            <ReplyCard type='typeA' real_name={realNameRef.current} account={accountRef.current}></ReplyCard>
            <ReplyCard type='typeA' real_name={realNameRef.current} account={accountRef.current}></ReplyCard>
            <ReplyCard type='typeA' real_name={realNameRef.current} account={accountRef.current}></ReplyCard>
          </div>
          {/* tab like */}
          <div className={clsx('informationContainer-like', {active: infoTabControl === 2})}>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={true} real_name={realNameRef.current} account={accountRef.current}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={true} real_name={realNameRef.current} account={accountRef.current}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={true} real_name={realNameRef.current} account={accountRef.current}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={true} real_name={realNameRef.current} account={accountRef.current}></PostCard>
            <PostCard onClickReply={() => setReplyPage(true)} isLike={true} real_name={realNameRef.current} account={accountRef.current}></PostCard>
          </div>
          {/* 推文modal */}
          <Modal active={postingModal} onClickModalCancel={() => setPostingModal(false)} className='informationContainer-posting-modal' btnText='推文' type='typeA'>
            <div className="posting-modal-content">
              <Photo src={userPhoto} alt="logo" className="modal-content-img" />
              <textarea rows='6' cols='100' className="modal-content-textarea" placeholder='有什麼新鮮事?'></textarea>
            </div>
            <Button className='posting-modal-btn'>推文</Button>
          </Modal>
          {/* 編輯個人資料modal */}
          <Modal active={editInfoModal} onClickModalCancel={() => setEditInfoModal(false)} className='informationContainer-editInfo-modal' btnText='儲存' title='編輯個人資料' type='typeB'>
            <div className="editInfo-modal-picture">
              <img src={background} alt="background" className="modal-picture-background" />
              <img src={photo} alt="photo1" className="modal-picture-photo" />
            </div>
            <div className="editInfo-modal-input">
              <div className="modal-input-username">
                <AuthInput 
                  value={personInfo.real_name} name='username' label='名稱' className='input-username-input' onChange={(realNameInputValue) => setPersonInfo({
                    ...personInfo,
                    real_name: realNameInputValue
                    })}
                />
                <div className="input-username-count">{personInfo.real_name.length}/50</div>
              </div>
              
              <div className="modal-input-introduction">
                <label htmlFor='introduction' className="input-introduction-label">自我介紹</label>
                <textarea id='introduction' className='input-introduction-textarea' rows='6' cols='100' placeholder="請輸入自我介紹" value={personInfo.remark} onChange={handleChange}></textarea>
                <div className="input-introduction-count">{personInfo.remark.length}/160</div>
              </div>
            </div>
            <Button className='editInfo-modal-btn' onClick={handleClick}>儲存</Button>
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
          <Modal active={replyModal} onClickModalCancel={() => setReplyModal(false)} className='replyList-reply-modal' btnText='回覆' type='typeA'>
            <ReplyCard className='reply-modal-replyCard'></ReplyCard>
            <div className="reply-modal-ownReply">
              <Photo src={userPhoto} alt="logo" className="modal-ownReply-img" />
              <textarea rows='8' cols='100' className="modal-ownReply-textarea" placeholder='推你的回覆'></textarea>
            </div>
            <Button className='reply-modal-btn'>回覆</Button>
          </Modal>
        </div>

        {/* followListContainer */}
        <div className={clsx("followListContainer", { follow: followPage})}>
          <div className="followListContainer-header">
            <img src={leftArrow} alt="leftArrow" className="header-back" onClick={() => setFollowPage(false)}/>
            <div className="header-content">
              <div className="header-content-username">John Doe</div>
              <div className="header-content-postCount">25 推文</div>
            </div>
          </div>
          <div className="followListContainer-tabs">
            <div className={clsx('tabs-tab', {active: followTabControl === 0})} onClick={() => setFollowTabControl(0)}>追隨者</div>
            <div className={clsx('tabs-tab', {active: followTabControl === 1})} onClick={() => setFollowTabControl(1)}>正在追隨</div>
          </div>
          <div className={clsx('followListContainer-follower', {active: followTabControl === 0})}>
            <FollowCard isFollow={isFollow} onClick={() => setIsFollow(!isFollow)}></FollowCard>
            <FollowCard isFollow={true}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
          </div>
          <div className={clsx('followListContainer-following', {active: followTabControl === 1})}>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
          </div>
        </div>

        <RightContainer></RightContainer>
      </div>

      <ModalBackground active={postingModal || replyModal || editInfoModal}></ModalBackground>
    </>
  )
}

export default InformationPage