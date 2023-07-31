import logo from '../images/logo.png'
import { LogoIcon } from '../component/common/logo.styled'
import Button from '../component/Button'
import LeftContainer from '../component/LeftContainer'
import RightContainer from '../component/RightContainer'
import PostCard from '../component/PostCard'
import homeActive from '../images/_base/homeActive.png'
import modalCancel from '../images/_base/modalCancel.png'
import { useState } from 'react'

const HomePage = () => {
  const [postingModal, setPostingModal] = useState(false)

  return (
    <>
      <div className="mainContainer">
        <LeftContainer home={homeActive} >'</LeftContainer>

        <div className="centerContainer">
          <div className="centerContainer-title">首頁</div>
          <div className="centerContainer-posting">
            <LogoIcon src={logo} alt="logo" className="posting-img" />
            <div className="posting-content">有什麼新鮮事?</div>
            <Button className='posting-btn' onClick={() => setPostingModal(true)}>推文</Button>
          </div>
          <div className="centerContainer-post">
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
          </div>
        </div>
        
        <RightContainer></RightContainer>
      </div>

      <div className="modalContainer">
        <div className="modal">
          <img src={modalCancel} className="modal-cancel" />
          <div className="modal-posting">
              <LogoIcon src={logo} alt="logo" className="modal-posting-img" />
              <textarea className="modal-posting-content" placeholder='有什麼新鮮事?'></textarea>
              <Button className='modal-posting-btn'>推文</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage