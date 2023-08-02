import clsx from 'clsx'
import logo from '../images/logo.png'
import Button from './Button'
import ButtonHollow from './Button-hollow'
import { LogoIcon } from "./common/logo.styled"
import { styled } from 'styled-components'

const StyledFollowCard = styled.div`
  width: 100%;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(230, 236, 240, 1);
  display: flex;

  .follow-card-data {
    margin-left: 3px;
    margin-top: 5px;

    .card-data-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .data-header-username {
        font-weight: 700;
        font-size: 16px;
        line-height: 26px;
        margin-right: 5px;
        white-space: nowrap;
      }
      .btn-isFollow {
        display: none;
        width: 96px;
        padding: 0px;
        height: 40px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;

        &.active {
          display: inline;
        }
      }
      .btn-unFollow {
        display: none;
        width: 64px;
        padding: 0px;
        height: 40px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;

        &.active {
          display: inline;
        }
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


const FollowCard = ({className, isFollow, onClick}) => {
  return (
    <StyledFollowCard className={className}>
      <LogoIcon src={logo} alt="" />
      <div className='follow-card-data' >
        <div className='card-data-header' >
          <div className='data-header-username' >Devon Lane</div>
          <Button className={clsx('btn-isFollow', {active: isFollow})} onClick={() => onClick?.()}>正在跟隨</Button>
          <ButtonHollow className={clsx('btn-unFollow', {active: !isFollow})} onClick={() => onClick?.()}>跟隨</ButtonHollow>
        </div>
        <div className='card-data-content' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
      </div>
    </StyledFollowCard>
  )
}

export default FollowCard