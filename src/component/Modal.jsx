import { styled } from 'styled-components'
import modalCancel from '../images/_base/modalCancel.png'
import Button from './Button'
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
  display: none;
  border-radius: 14px;
  position: absolute;
  top: 56px;
  left: 0px;
  background-color: white;
  z-index: 101;

  .modal-header {
    padding: 16px;
    border-bottom: 1px solid rgba(230, 236, 240, 1);
    display: flex;

    .modal-header-cancel {
      width: 24px;
      height: 24px;
      cursor: pointer;
      opacity: .7;

      &:hover {
        opacity: 1;
      }
    }
    .modal-header-title {
      font-weight: 700;
      line-height: 26px;
      font-size: 18px;
      margin-left: 24px;
    }
  }
  .modal-btn-typeA, .modal-btn-typeB {
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
  .modal-btn-typeB {
    top: 10px;
  }
  &.active {
    display: inline;
  }
`

const Modal = ({ active, onClickModalCancel, children, className, btnText, title, type}) => {
  if (type === 'typeA') {
    return (
      <StyledModalContainer className={clsx(className, { active: active })}>
        <div className="modal-header">
          <img src={modalCancel} alt='modalCancel' className="modal-header-cancel" onClick={() => onClickModalCancel?.()} />
          <div className="modal-header-title">{title? title: ''}</div>
        </div>
        {children}
        <Button className='modal-btn-typeA'>{btnText}</Button>
      </StyledModalContainer>
    )
  } else {
    return (
      <StyledModalContainer className={clsx(className, { active: active })}>
        <div className="modal-header">
          <img src={modalCancel} alt='modalCancel' className="modal-header-cancel" onClick={() => onClickModalCancel?.()} />
          <div className="modal-header-title">{title? title: ''}</div>
        </div>
        {children}
        <Button className='modal-btn-typeB'>{btnText}</Button>
      </StyledModalContainer>
    )
  }
  
}

const ModalBackground = ({active}) => {
  return (
    <StyledModalBackground className={clsx('', { active: active })}></StyledModalBackground>
  )
}

export { ModalBackground , Modal}