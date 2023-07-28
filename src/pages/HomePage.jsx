import logo from '../images/logo.png'
import { LogoIcon } from '../component/common/logo.styled'
import Button from '../component/Button'
import LeftContainer from '../component/LeftContainer'
import RightContainer from '../component/RightContainer'
import PostCard from '../component/PostCard'

const HomePage = () => {
  return (
    <div className="mainContainer">
      <LeftContainer></LeftContainer>

      <div className="centerContainer">
        <div className="centerContainer-title">首頁</div>
        <div className="centerContainer-posting">
          <LogoIcon src={logo} alt="logo" className="posting-img" />
          <div className="posting-content">有什麼新鮮事?</div>
          <Button className='posting-btn'>推文</Button>
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
  )
}

export default HomePage