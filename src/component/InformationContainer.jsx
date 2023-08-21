import clsx from "clsx"
import leftArrow from '../images/_base/leftArrow.png'
import { Link } from "react-router-dom"
import ownPhoto from '../images/ownPhoto.png'
import userPhoto from '../images/userPhoto.png'
import baseBackground from '../images/baseBackground.png'
import userBackground from '../images/userBackground.png'
import ButtonHollow from "./Button-hollow"
import PostCard from "./PostCard"
import ReplyCard from "./ReplyCard"
import { Modal } from "./Modal"
import { Photo } from "./common/photo.styled"
import Button from "./Button"
import editPhoto from '../images/_base/edit-photo.png'
import backgroundDelete from '../images/_base/background-delete.png'
import AuthInput from "./AuthInput"

export const InformationContainer = ({isOpenReplyPage, isOpenFollowPage, realNameRef, accountRef, remarkRef, userData, postList, personInfo, backgroundUrl, photoUrl, onClickEditInfoModal, onClickFollowPage, onClickFollowTabControl, infoTabControl, onClickInfoTabControl, onClickReply, onClickLike, postingModal, onClickPostingModal, postingContent, onClickPostingContent, onClickPost, editInfoModal, onChangeUploadBackground, onClickBackgroundUrl, onChangeUploadPhoto, onChangePersonInfo, onClickEditInfo}) => {
  
  return (
    <div className={clsx("informationContainer", { reply: isOpenReplyPage, follow: isOpenFollowPage})}>
      <div className="informationContainer-header">
        <Link to='/home'><img src={leftArrow} alt="leftArrow" className="header-back" /></Link>
        <div className="header-content">
          <div className="header-content-username">{userData.real_name? userData.real_name: realNameRef.current}</div>
          <div className="header-content-postCount">{postList.filter(post => {
            if (userData.account) {
              return (
                post.account === userData.account
              )
            } else {
              return (
                post.account === personInfo.account
              )
            }
            }).length} 推文</div>
        </div>
      </div>
      <div className="informationContainer-self">
        <div className="self-picture">
          <img src={backgroundUrl? backgroundUrl: userData.account_id? userData.account_id === personInfo.account_id? baseBackground: userBackground: baseBackground} alt="background" className="self-picture-background" />
          <div className="self-picture-photo">
            <img src={photoUrl? photoUrl: userData.account_id? userData.account_id === personInfo.account_id? ownPhoto: userPhoto: ownPhoto} alt="photo1" className="picture-photo-img" />
          </div>
          {userData.account? 
          <></>: // 要改寫
          <ButtonHollow className='self-picture-btn' onClick={() => onClickEditInfoModal?.(true)}>編輯個人資料</ButtonHollow>
          }
        </div>
        <div className="self-content">
          <div className="self-content-username">{userData.real_name? userData.real_name: realNameRef.current}</div>
          <div className="self-content-account">@{userData.account? userData.account: accountRef.current}</div>
          <div className="self-content-text">{userData.remark? userData.remark: remarkRef.current}</div>
          <div className="self-content-footer">
            <div className="content-footer-following" onClick={() => {
              onClickFollowPage?.(true)
              onClickFollowTabControl?.(0)}}>34個<span className="footer-following-span">跟隨中</span></div>
            <div className="content-footer-following" onClick={() => {
              onClickFollowPage(true) 
              onClickFollowTabControl(1)}}>59位<span className="footer-following-span">跟隨者</span></div>
          </div>
        </div>
      </div>
      <div className="informationContainer-tabs">
        <div className={clsx('tabs-tab', {active: infoTabControl === 0})} onClick={() => onClickInfoTabControl(0)}>推文</div>
        <div className={clsx('tabs-tab', {active: infoTabControl === 1})} onClick={() => onClickInfoTabControl(1)}>回覆</div>
        <div className={clsx('tabs-tab', {active: infoTabControl === 2})} onClick={() => onClickInfoTabControl(2)}>喜歡的內容</div>
      </div>
      {/* tab post */}
      <div className={clsx('informationContainer-post', {active: infoTabControl === 0})}>
        {postList.map((post) => {
          if (!userData.account) {
            if (post.account === personInfo.account) {
              return (
                <PostCard key={post.id} onClickReply={(postData) => onClickReply?.(postData)} postData={post} personInfo={personInfo} userData={userData} onClickLike={(postDataId) => onClickLike?.(postDataId)}></PostCard>
              )
            }
          } else {
            if (post.account === userData.account) {
              return (
                <PostCard key={post.id} onClickReply={(postData) => onClickReply?.(postData)} postData={post} personInfo={personInfo} userData={userData} onClickLike={(postDataId) => onClickLike?.(postDataId)}></PostCard>
              )
            }
          }
        })}
      </div>
      {/* tab reply */}
      <div className={clsx('informationContainer-reply', {active: infoTabControl === 1})}>
        {postList.map(post => { 
          return(
            post.reply.map(item => {
              if (!userData.account) {
                if (item.account === personInfo.account) {
                  return (
                    <ReplyCard key={item.id} type='typeA' replyData={item} personInfo={personInfo} postData={post} userData={userData}></ReplyCard>
                  )
                } 
              } else {
                if (item.account === userData.account) {
                  return (
                    <ReplyCard key={item.id} type='typeA' replyData={item} personInfo={personInfo} postData={post} userData={userData}></ReplyCard>
                  )
                } 
              }
            })
          )
        })}
      </div>
      {/* tab like */}
      <div className={clsx('informationContainer-like', {active: infoTabControl === 2})}>
        {postList.map((post) => {
          if (!userData.account) {
            if (post.like.includes(personInfo.account_id)) {
              return (
                <PostCard key={post.id} onClickReply={(postData) => onClickReply?.(postData)} postData={post} personInfo={personInfo} userData={userData} onClickLike={(postDataId) => onClickLike?.(postDataId)}></PostCard>
              )
            }
          } else {
            if (post.like.includes(userData.account_id)) {
              return (
                <PostCard key={post.id} onClickReply={(postData) => onClickReply?.(postData)} postData={post} personInfo={personInfo} userData={userData} onClickLike={(postDataId) => onClickLike?.(postDataId)}></PostCard>
              )
            }
          }
        })}
      </div>
      {/* 推文modal */}
      <Modal active={postingModal} onClickModalCancel={() => onClickPostingModal?.(false)} className='informationContainer-posting-modal' btnText='推文' type='typeA'>
        <div className="posting-modal-content">
          <Photo src={ownPhoto} alt="ownPhoto" className="modal-content-img" />
          <textarea rows='6' cols='100' className="modal-content-textarea" placeholder='有什麼新鮮事?' value={postingContent} onChange={(postingTextareaValue) => onClickPostingContent?.(postingTextareaValue.target.value)}></textarea>
        </div>
        <Button className='posting-modal-btn' onClick={() => onClickPost?.()}>推文</Button>
      </Modal>
      {/* 編輯個人資料modal */}
      <Modal active={editInfoModal} onClickModalCancel={() => onClickEditInfoModal?.(false)} className='informationContainer-editInfo-modal' btnText='儲存' title='編輯個人資料' type='typeB'>
        <div className="editInfo-modal-picture">
          <div className="modal-picture-background">
            <img src={backgroundUrl? backgroundUrl: baseBackground} alt="background" className="picture-background-img" />
            <div className="picture-background-edit">
              <label className="background-edit-icon">
                <img src={editPhoto} alt="editIcon" className="edit-icon-img"/>
                <input type="file" accept= "image/png, image/jpeg" className="edit-icon-input" onChange={(e) => onChangeUploadBackground?.(e)}/>
              </label>
              <img src={backgroundDelete} alt="delete-background" className="background-edit-delete" onClick={() => 
                onClickBackgroundUrl?.('')}
              />
            </div>
          </div>
          <div className="modal-picture-photo">
            <img src={photoUrl ? photoUrl : ownPhoto} alt="photo1" className="picture-photo-img" />
            <div className="picture-photo-edit">
              <label className="photo-edit-icon">
                <img src={editPhoto} alt="editIcon" className="edit-icon-img"/>
                <input type="file" className="edit-icon-input" onChange={(e) => onChangeUploadPhoto?.(e)}/>
              </label>
            </div>
          </div>
        </div>
        <div className="editInfo-modal-input">
          <div className="modal-input-username">
            <AuthInput 
              value={personInfo.real_name} name='username' label='名稱' className='input-username-input' onChange={(realNameInputValue) => onChangePersonInfo({
                ...personInfo,
                real_name: realNameInputValue
                })}
            />
            <div className="input-username-count">{personInfo.real_name.toString().length}/50</div>
          </div>
          
          <div className="modal-input-introduction">
            <label htmlFor='introduction' className="input-introduction-label">自我介紹</label>
            <textarea id='introduction' className='input-introduction-textarea' rows='6' cols='100' placeholder="請輸入自我介紹" value={personInfo.remark} onChange={(remarkTextareaValue) => onChangePersonInfo({
              ...personInfo,
              remark: remarkTextareaValue.target.value
              })
            }></textarea>
            <div className="input-introduction-count">{personInfo.remark? personInfo.remark.toString().length : 0}/160</div>
          </div>
        </div>
        <Button className='editInfo-modal-btn' onClick={() => onClickEditInfo?.()}>儲存</Button>
      </Modal>
    </div>
  )
}