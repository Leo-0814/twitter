import userPhoto from '../images/userPhoto.png'
import ownPhoto from '../images/ownPhoto.png'
import { styled } from 'styled-components'
import { Photo } from './common/photo.styled'
import { timeDifferent } from './common/time'
import { Link } from 'react-router-dom'

const StyledReplyCard = styled.div`
  width: 100%;
  padding: 6px 24px;
  border-bottom: 1px solid rgba(230, 236, 240, 1);
  display: flex;

  .reply-card-data {
    margin-left: 3px;
    margin-top: 5px;

    .card-data-header {
      display: flex;
      align-items: center;

      & > a {
        text-decoration: none;
        color: black;
      }

      .data-header-username {
        font-weight: 700;
        font-size: 16px;
        line-height: 26px;
        margin-right: 5px;
        white-space: nowrap;

        &:hover {
          opacity: .9
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
        white-space: nowrap;
      }
    }
    .card-data-target {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: rgba(108, 117, 125, 1);
      margin: 5px 0;

      .data-target-span {
        color: rgba(255, 102, 0, 1);
        margin-left: 5px;
      }
    }
    .card-data-content {
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
      margin-top: 5px;
    }
  }

`


const ReplyCard = ({type, className, replyData, personInfo, postData, onClickName}) => {
  
  const timeDif = timeDifferent(replyData.getTime)

  if (type === 'typeA') {
    return (
      <StyledReplyCard className={className}>
        <Photo src={replyData.account === personInfo.account? ownPhoto: userPhoto} alt="userPhoto" />
        <div className='reply-card-data' >
          <div className='card-data-header' >
            <Link to={`/information/${replyData.account_id}`}><div className='data-header-username' onClick={() => onClickName?.()}>{replyData.real_name}</div></Link>
            <div className='data-header-account' >@{replyData.account}</div>
            <span className='data-header-dot'>．</span>
            <div className='data-header-time'>{timeDif}</div>
          </div>
          <div className="card-data-target">回覆<span className='data-target-span'>@{postData.account}</span></div>
          <div className='card-data-content' >{replyData.content} </div>
        </div>
      </StyledReplyCard>
    )
  } else {
    return (
      <StyledReplyCard className={className}>
        <Photo src={replyData.account === personInfo.account? ownPhoto: userPhoto} alt="userPhoto" />
        <div className='reply-card-data' >
          <div className='card-data-header' >
            <div className='data-header-username' >{replyData.real_name}</div>
            <div className='data-header-account' >@{replyData.account}</div>
            <span className='data-header-dot'>．</span>
            <div className='data-header-time'>{timeDif}</div>
          </div>
          <div className='card-data-content' >{replyData.content}</div>
          <div className="card-data-target">回覆給<span className='data-target-span'>@{postData.account}</span></div>
        </div>
      </StyledReplyCard>
    )
  }
}

export default ReplyCard