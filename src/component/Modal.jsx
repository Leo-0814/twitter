import { styled } from 'styled-components'
import modalCancel from '../images/_base/modalCancel.png'
import logo from '../images/logo.png'
import Button from './Button'
import { LogoIcon } from './common/logo.styled'
import clsx from 'clsx'

const StyledModalBackground = styled.div`
  display: none;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 100;

  &.active {
    display: inline;
  }
`

const StyledModalContainer = styled.div`
  .modal {
    display: none;
    width: 100%;
    height: 300px;
    border-radius: 14px;
    position: absolute;
    top: 56px;
    left: 0px;
    background-color: white;
    z-index: 101;

    .modal-cancel {
      width: 24px;
      height: 24px;
      margin: 16px;
      cursor: pointer;
    }

    .modal-posting {
      border-top: 1px solid rgba(230, 236, 240, 1);
      padding: 6px 24px;
      display: flex;
      align-items: start;

      .modal-posting-textarea {
        border: none;
        resize: none;
        margin-top: 10px;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        &::placeholder {
          font-size: 16px;
          font-weight: 400;
          line-height: 26px;
        }

        &:focus {
          outline: none;
        }
      }

      .modal-posting-btn {
        position: absolute;
        bottom: 16px;
        right: 16px;
        width: 64px;
        height: 40px;
        padding: 0;
        font-weight: 400;
        line-height: 24px;
        font-size: 16px;
      }
    }
    &.active {
      display: inline;
    }
  }
`

const Modal = ({active, onCancel}) => {
  return (
    <StyledModalContainer>
      <div className={clsx('modal', { active: active })}>
        <img src={modalCancel} alt='modalCancel' className="modal-cancel" onClick={() => onCancel?.()}/>
        <div className="modal-posting">
            <LogoIcon src={logo} alt="logo" className="modal-posting-img" />
            <textarea rows='6' cols='100' className="modal-posting-textarea" placeholder='有什麼新鮮事?'></textarea>
            <Button className='modal-posting-btn'>推文</Button>
        </div>
      </div>
    </StyledModalContainer>
  )
}

const ModalBackground = ({active}) => {
  return (
    <StyledModalBackground className={clsx('', { active: active })}></StyledModalBackground>
  )
}

export { ModalBackground , Modal}