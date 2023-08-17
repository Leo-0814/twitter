import clsx from "clsx"
import leftArrow from '../images/_base/leftArrow.png'
import userPhoto from '../images/userPhoto.png'
import reply from '../images/_base/reply.png'
import like from '../images/_base/like.png'
import ReplyCard from "./ReplyCard"
import { Modal } from "./Modal"
import { Photo } from "./common/photo.styled"
import { Button } from "style-components"

export const ReplyListContainer = ({isOpenReplyPage, isOpenReplyModal, onClickOpenReplyPage, onClickOpenReplyModal, postData}) => {
  return (
    <div className={clsx("replyListContainer", { reply: isOpenReplyPage })}>
      <div className="replyList-header">
        <img src={leftArrow} alt="leftArrow" className="replyList-header-back" onClick={() => onClickOpenReplyPage?.(false)} />
        <div className="replyList-header-title">推文</div>
      </div>
      <div className="replyList-content">
        <div className="replyList-content-header">
          <Photo src={userPhoto} alt="" className="content-header-photo" />
          <div className="content-header-data">
            <div className="header-data-username">{postData.real_name}</div>
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
      <Modal active={isOpenReplyModal} onClickModalCancel={() => onClickOpenReplyModal?.(false)} className='replyList-reply-modal' btnText='回覆' type='typeA'>
        <ReplyCard className='reply-modal-replyCard'></ReplyCard>
        <div className="reply-modal-ownReply">
          <Photo src={userPhoto} alt="logo" className="modal-ownReply-img" />
          <textarea rows='8' cols='100' className="modal-ownReply-textarea" placeholder='推你的回覆'></textarea>
        </div>
        <Button className='reply-modal-btn'>推文</Button>
      </Modal>
    </div>
  )
}
