import userPhoto from '../images/userPhoto.png'
import { styled } from 'styled-components'
import { Photo } from './common/photo.styled'

const StyledReplyCard = styled.div`
  width: 100%;
  padding: 6px 5px 6px 24px;
  border-bottom: 1px solid rgba(230, 236, 240, 1);
  display: flex;

  .reply-card-data {
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
        white-space: nowrap;
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


const ReplyCard = ({type, className}) => {
  if (type === 'typeA') {
    return (
      <StyledReplyCard className={className}>
        <Photo src={userPhoto} alt="" />
        <div className='reply-card-data' >
          <div className='card-data-header' >
            <div className='data-header-username' >Devon Lane</div>
            <div className='data-header-account' >@devon_lane</div>
            <span className='data-header-dot'>．</span>
            <div className='data-header-time'>3小時</div>
          </div>
          <div className="card-data-target">回覆<span className='data-target-span'>@apply</span></div>
          <div className='card-data-content' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
        </div>
      </StyledReplyCard>
    )
  } else {
    return (
      <StyledReplyCard className={className}>
        <Photo src={userPhoto} alt="" />
        <div className='reply-card-data' >
          <div className='card-data-header' >
            <div className='data-header-username' >Devon Lane</div>
            <div className='data-header-account' >@devon_lane</div>
            <span className='data-header-dot'>．</span>
            <div className='data-header-time'>3小時</div>
          </div>
          <div className='card-data-content' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
          <div className="card-data-target">回覆給<span className='data-target-span'>@apply</span></div>
        </div>
      </StyledReplyCard>
    )
  }
}

export default ReplyCard