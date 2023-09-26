import clsx from "clsx"
import leftArrow from '../images/_base/leftArrow.png'
import btn_msg from '../images/_base/btn_msg.png'
import btn_notFi from '../images/_base/btn_notFi.png'
import btn_notFi_active from '../images/_base/btn_notFi_active.png'
import { useNavigate } from "react-router-dom"
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
import BasicInput from "./BasicInput"
import { Form } from "antd"
import TextAreaInput from "./TextAreaInput"
import { useTranslation } from "react-i18next"


export const InformationContainer = ({isOpenReplyPage, isOpenFollowPage, realNameRef, accountRef, remarkRef, userData, postList, personInfo, backgroundUrl, photoUrl, onClickEditInfoModal, onClickFollowPage, onClickFollowTabControl, infoTabControl, onClickInfoTabControl, onClickReply, onClickLike, postingModal, onClickPostingModal, postingContent, onClickPostingContent, onClickPost, editInfoModal, onChangeUploadBackground, onClickBackgroundUrl, onChangeUploadPhoto, onChangePersonInfo, onClickEditInfo, isFollow, onClickFollow, onClickName, isNotify, onClickNotify}) => {

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const {t} = useTranslation()

  const handleFinishFailed = (e) => {
    console.log('finishFailed', e)
  }

  return (
    <div className={clsx("informationContainer", { reply: isOpenReplyPage, follow: isOpenFollowPage})}>
      <div className="informationContainer-header">
        <img src={leftArrow} alt="leftArrow" className="header-back" onClick={() => navigate(-1)}/>
        <div className="header-content">
          <div className="header-content-username">{userData.real_name? userData.account_id === personInfo.account_id? personInfo.real_name: userData.real_name: realNameRef.current}</div>
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
            }).length} {t("normal.post")}</div>
        </div>
      </div>
      <div className="overflowWrapper">
        <div className="informationContainer-self">
          <div className="self-picture">
            <img src={backgroundUrl? backgroundUrl: userData.account_id? userData.account_id === personInfo.account_id? baseBackground: userBackground: baseBackground} alt="background" className="self-picture-background" />
            <div className="self-picture-photo">
              <img src={photoUrl? photoUrl: userData.account_id? userData.account_id === personInfo.account_id? ownPhoto: userPhoto: ownPhoto} alt="photo1" className="picture-photo-img" />
            </div>
            {userData.account_id? userData.account_id === personInfo.account_id
              ? 
              <ButtonHollow className='self-picture-btn' onClick={() => onClickEditInfoModal?.(true,form)}>{t("normal.editInfo")}</ButtonHollow>
              : 
              <div className="self-picture-tool">
                <img src={btn_msg} alt="msg" className="picture-tool-msg"/>
                <img src={isNotify? btn_notFi_active: btn_notFi} alt="notify" className="picture-tool-notify" onClick={() => onClickNotify?.()}/>
                {isFollow?
                  <Button className='picture-tool-follow' onClick={() => {onClickFollow?.(userData.account_id)}}>{t("normal.following")}</Button>:
                  <ButtonHollow className='picture-tool-unFollow' onClick={() => {onClickFollow?.(userData.account_id)}}>{t("normal.follow")}</ButtonHollow>
                }
              </div>:
              <ButtonHollow className='self-picture-btn' onClick={() => onClickEditInfoModal?.(true, form)}>{t("normal.editInfo")}</ButtonHollow>
            }
          </div>
          <div className="self-content">
            <div className="self-content-username">{userData.real_name? userData.account_id === personInfo.account_id? personInfo.real_name: userData.real_name: realNameRef.current}</div>
            <div className="self-content-account">@{userData.account? userData.account: accountRef.current}</div>
            <div className="self-content-text">{userData.remark? userData.remark: remarkRef.current}</div>
            <div className="self-content-footer">
              <div className="content-footer-following" onClick={() => {
                onClickFollowPage?.(true)
                onClickFollowTabControl?.(0)}}>34{t("normal.followed.unit")}<span className="footer-following-span">{t("normal.followed")}</span></div>
              <div className="content-footer-following" onClick={() => {
                onClickFollowPage(true) 
                onClickFollowTabControl(1)}}>59{t("normal.follower.unit")}<span className="footer-following-span">{t("normal.follower")}</span></div>
            </div>
          </div>
        </div>
        <div className="informationContainer-tabs">
          <div className={clsx('tabs-tab', {active: infoTabControl === 0})} onClick={() => onClickInfoTabControl(0)}>{t("normal.post")}</div>
          <div className={clsx('tabs-tab', {active: infoTabControl === 1})} onClick={() => onClickInfoTabControl(1)}>{t("normal.reply")}</div>
          <div className={clsx('tabs-tab', {active: infoTabControl === 2})} onClick={() => onClickInfoTabControl(2)}>{t("normal.likeContent")}</div>
        </div>
        {/* tab post */}
        <div className={clsx('informationContainer-post', {active: infoTabControl === 0})}>
          {postList.map((post) => {
            if (!userData.account? post.account === personInfo.account: post.account === userData.account) {
              return (
                <PostCard key={post.id} onClickReply={(postId) => onClickReply?.(postId)} postData={post} personInfo={personInfo} userData={userData} onClickLike={(postDataId) => onClickLike?.(postDataId)} t={t}></PostCard>
              )
            }
          })}
        </div>
        {/* tab reply */}
        <div className={clsx('informationContainer-reply', {active: infoTabControl === 1})}>
          {postList.map(post => { 
            return(
              post.reply.map(item => {
                  if (!userData.account? item.account === personInfo.account: item.account === userData.account) {
                    return (
                      <ReplyCard key={item.id} type='typeA' replyData={item} personInfo={personInfo} postData={post} userData={userData} onClickName={() => onClickName?.()} t={t}></ReplyCard>
                    )
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
                  <PostCard key={post.id} onClickReply={(postId) => onClickReply?.(postId)} postData={post} personInfo={personInfo} userData={userData} onClickLike={(postDataId) => onClickLike?.(postDataId)} onClickName={() => onClickName?.()} t={t}></PostCard>
                )
              }
            } else {
              if (post.like.includes(userData.account_id)) {
                return (
                  <PostCard key={post.id} onClickReply={(postId) => onClickReply?.(postId)} postData={post} personInfo={personInfo} userData={userData} onClickLike={(postDataId) => onClickLike?.(postDataId)} onClickName={() => onClickName?.()} t={t}></PostCard>
                )
              }
            }
          })}
        </div>
      </div>
      {/* 推文modal */}
      <Modal active={postingModal} onClickModalCancel={() => onClickPostingModal?.(false)} className='informationContainer-posting-modal' btnText={t("normal.post")} type='typeA'>
        <div className="posting-modal-content">
          <Photo src={ownPhoto} alt="ownPhoto" className="modal-content-img" />
          <textarea rows='6' cols='100' className="modal-content-textarea" placeholder={t("normal.whatHappened")} value={postingContent} onChange={(postingTextareaValue) => onClickPostingContent?.(postingTextareaValue.target.value)}></textarea>
        </div>
        <Button className='posting-modal-btn' onClick={() => onClickPost?.()}>{t("normal.post")}</Button>
      </Modal>
      {/* 編輯個人資料modal */}
      <Modal active={editInfoModal} onClickModalCancel={() => onClickEditInfoModal?.(false, form)} className='informationContainer-editInfo-modal' btnText={t("normal.save")} title={t("normal.editInfo")} type='typeB'>
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
          <Form
            form={form}
            name="information"
            onFinish={() => onClickEditInfo?.()}
            onFinishFailed={handleFinishFailed}
            requiredMark={false}
            layout="vertical"
          >
            <div className="modal-input-username">
              <BasicInput 
                name='username' 
                placeholder={t("normal.inputUserName")}
                label={t("normal.userName")} 
                maxLength={50}
                onChange={(realNameInputValue) => onChangePersonInfo({
                  ...personInfo,
                  real_name: realNameInputValue
                })}
                rules={[
                  {
                    required: true,
                    message: t("normal.userNameRequired"),
                  },
                ]}
              />
              <div className="input-username-count">{personInfo.real_name? personInfo.real_name.toString().length: 0}/50</div>
            </div>
            
            <div className="modal-input-introduction">
              <TextAreaInput
                name='introduction'
                label={t("normal.intro")}
                // showCount={true}
                maxLength={160}
                placeholder={t("normal.inputIntro")}
                rows={5}
                onChange={(remarkTextareaValue) => onChangePersonInfo({
                  ...personInfo,
                  remark: remarkTextareaValue
                })} 
              >
              </TextAreaInput>
              <div className="input-introduction-count">{personInfo.remark ? personInfo.remark.toString().length : 0}/160</div>
            </div>
          
            <Button className='editInfo-modal-btn' htmlFor='submit'>{t("normal.save")}</Button>
          </Form>
        </div>
      </Modal>
    </div>
  )
}