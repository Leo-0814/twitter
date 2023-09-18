import userPhoto from '../images/userPhoto.png'
import ownPhoto from '../images/ownPhoto.png'
import reply from '../images/_base/reply.png'
import like from '../images/_base/like.png'
import likeActive from '../images/_base/likeActive.png'
import { styled } from 'styled-components'
import { Photo } from './common/photo.styled'
import { timeDifferent } from './common/time'
import { Link } from 'react-router-dom'

const StyledPostCard = styled.div`
  width: 100%;
  padding: 6px 5px 6px 19px;
  border-bottom: 1px solid rgba(230, 236, 240, 1);
  display: flex;
  overflow-x: hidden;

  .post-card-data {
    margin-left: 5px;
    margin-top: 5px;

    .card-data-header {
      display: flex;

      & > a {
        text-decoration: none;
        color: black;
      }

      .data-header-username {
        font-weight: 700;
        font-size: 16px;
        line-height: 26px;
        margin-right: 5px;
        cursor: pointer;

        &:hover {
          opacity: .9;
        }
      }
      .data-header-account {
        color: rgba(108, 117, 125, 1);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
      }
      .data-header-dot {
        color: rgba(108, 117, 125, 1);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
      }
      .data-header-time {
        color: rgba(108, 117, 125, 1);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
      }
    }
    .card-data-content {
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
      margin: 5px 0;
    }
    .card-data-footer {
      display: flex;
      align-items: center;

      .data-footer-item {
        display: flex;
        align-items: center;
        margin-right: 30px;

        .footer-item-icon {
          width: 16px;
          height: 16px;
          margin-right: 5px;
          cursor: pointer;
        }
        .footer-item-count {
          font-weight: 600;
          font-size: 14px;
          line-height: 14px;
          color: rgba(108, 117, 125, 1);
        }
      }
    }
  }

`


const PostCard = ({ onClickReply, postData, onClickLike, personInfo, userData, onClickName, className}) => {
  const timeDif = timeDifferent(postData.getTime)
  const isLike = postData.like.includes(personInfo.account_id)

  return (
    <StyledPostCard className={className}>
      {userData.account_id? postData.account_id === personInfo.account_id? 
        <Photo src={ownPhoto} alt="ownPhoto" />
        : <Photo src={userPhoto} alt="userPhoto" />
        : <Photo src={postData.account === personInfo.account? ownPhoto: userPhoto} alt="userPhoto" />
      }
      <div className='post-card-data' >
        <div className='card-data-header' >
          <Link to={`/information/${postData.account_id}`}><div className='data-header-username' onClick={() => onClickName?.()}>{postData.real_name}</div></Link>
          <div className='data-header-account' >@{postData.account}</div>
          <span className='data-header-dot'>．</span>
          <div className='data-header-time'>{timeDif}</div>
        </div>
        <div className='card-data-content' >{postData.content}</div>
        <div className='card-data-footer' >
          <div className='data-footer-item' >
            <img className='footer-item-icon' src={reply} alt="reply" onClick={() => onClickReply?.(postData.id)}/>
            <div className='footer-item-count' >{postData.reply.length}</div>
          </div>
          <div className='data-footer-item'>
            <img className='footer-item-icon' src={isLike ? likeActive : like} alt="like" onClick={() => onClickLike?.(postData.id)}/>
            <div className='footer-item-count' >{postData.like.length}</div>
          </div>
        </div>
      </div>
    </StyledPostCard>
  )
}

export default PostCard