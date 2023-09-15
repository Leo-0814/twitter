import clsx from "clsx"
import leftArrow from '../images/_base/leftArrow.png'
import userPhoto from '../images/userPhoto.png'
import ownPhoto from '../images/ownPhoto.png'
import reply from '../images/_base/reply.png'
import like from '../images/_base/like.png'
import likeActive from '../images/_base/likeActive.png'
import ReplyCard from "./ReplyCard"
import { Modal } from "./Modal"
import { Photo } from "./common/photo.styled"
import Button from './Button'
import { Link } from "react-router-dom"

export const ReplyListContainer = ({isOpenReplyPage, isOpenReplyModal, onClickOpenReplyPage, onClickOpenReplyModal, postId, postList, onClick, personInfo, replyModalInputValue, onChange, onClickReply, onClickName}) => {
  if (postList.length === 0 || !postId) {
    return
  }

  let postData = postList.filter(post => post.id === postId)
  postData = postData[0]
  const isLike = postData.like.includes(personInfo.account_id)

  return (
    <div className={clsx("replyListContainer", { reply: isOpenReplyPage })}>
      <div className="replyList-header">
        <img src={leftArrow} alt="leftArrow" className="replyList-header-back" onClick={() => onClickOpenReplyPage?.(false)} />
        <div className="replyList-header-title">推文</div>
      </div>
      <div className="replyList-content">
        <div className="replyList-content-header">
          <Photo src={postData.account === personInfo.account? ownPhoto: userPhoto} alt="" className="content-header-photo" />
          <div className="content-header-data">
            <Link to={`/information/${postData.account_id}`}><div className="header-data-username" onClick={() => onClickName?.()}>{postData.real_name}</div></Link>
            <div className="header-data-account">@{postData.account}</div>
          </div>
        </div>
        <div className="replyList-content-text">{postData.content}</div>
        <div className="replyList-content-footer">{postData.create_at}</div>
      </div>
      <div className="replyList-actionCount">
        <div className="replyList-actionCount-item">
          <div className="actionCount-item-count">{postData.reply.length}<span className="actionCount-item-span">回覆</span></div>
        </div>
        <div className="replyList-actionCount-item">
          <div className="actionCount-item-count">{postData.like.length}<span className="actionCount-item-span">喜歡次數</span></div>
        </div>
      </div>
      <div className="replyList-action">
        <img src={reply} alt="reply" className="replyList-action-icon" onClick={() => onClickOpenReplyModal?.(true)} />
        <img src={isLike ? likeActive : like} alt="like" className="replyList-action-icon" onClick={() => onClick?.(postData.id)}/>
      </div>
      <div className="replyList-reply">
        {postData.reply.map((item) => {
          return (
            <ReplyCard key={item.id} type='typeA' postData={postData} replyData={item} personInfo={personInfo}></ReplyCard>
          )
        })}
      </div>
      <Modal active={isOpenReplyModal} onClickModalCancel={() => onClickOpenReplyModal?.(false)} className='replyList-reply-modal' btnText='回覆' type='typeA'>
        <ReplyCard className='reply-modal-replyCard' replyData={postData} personInfo={personInfo} postData={postData}></ReplyCard>
        <div className="reply-modal-ownReply">
          <Photo src={ownPhoto} alt="ownPhoto" className="modal-ownReply-img" />
          <textarea rows='8' cols='100' className="modal-ownReply-textarea" placeholder='推你的回覆' value={replyModalInputValue} onChange={(replyModalInputValue) => onChange?.(replyModalInputValue)}></textarea>
        </div>
        <Button className='reply-modal-btn' onClick={() => onClickReply?.(postData.id)}>回覆</Button>
      </Modal>
    </div>
  )
}
