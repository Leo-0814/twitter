import userPhoto from '../images/userPhoto.png'
import reply from '../images/_base/reply.png'
import like from '../images/_base/like.png'
import likeActive from '../images/_base/likeActive.png'
import { styled } from 'styled-components'
import { Photo } from './common/photo.styled'
import { timeDifferent } from './common/time'

const StyledPostCard = styled.div`
  width: 100%;
  padding: 6px 5px 6px 19px;
  border-bottom: 1px solid rgba(230, 236, 240, 1);
  display: flex;

  .post-card-data {
    margin-left: 3px;
    margin-top: 5px;

    .card-data-header {
      display: flex;
      align-items: center;

      .data-header-username {
        font-weight: 700;
        font-size: 16px;
        line-height: 26px;
        margin-right: 5px;
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
          margin-right: 3px;
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


const PostCard = ({ onClickReply, postData, onClickLike, account_id}) => {

  const timeDif = timeDifferent(postData.getTime)
  const isLike = postData.like.includes(account_id)

  return (
    <StyledPostCard>
      <Photo src={userPhoto} alt="userPhoto" />
      <div className='post-card-data' >
        <div className='card-data-header' >
          <div className='data-header-username' >{postData.real_name}</div>
          <div className='data-header-account' >@{postData.account}</div>
          <span className='data-header-dot'>．</span>
          <div className='data-header-time'>{timeDif}</div>
        </div>
        <div className='card-data-content' >{postData.content}</div>
        <div className='card-data-footer' >
          <div className='data-footer-item' >
            <img className='footer-item-icon' src={reply} alt="reply" onClick={() => onClickReply?.(postData)}/>
            <div className='footer-item-count' >{postData.reply_count}</div>
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