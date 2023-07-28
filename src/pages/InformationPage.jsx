import ButtonHollow from "../component/Button-hollow"
import LeftContainer from "../component/LeftContainer"
import PostCard from "../component/PostCard"
import RightContainer from "../component/RightContainer"
import leftArrow from '../images/_base/leftArrow.png'
import photo from '../images/photo.png'
import background from '../images/background.png'

const InformationPage = () => {
  return (
    <div className="mainContainer">
      <LeftContainer></LeftContainer>

      <div className="informationContainer">
        <div className="informationContainer-header">
          <img src={leftArrow} alt="leftArrow" className="header-back" />
          <div className="header-content">
            <div className="header-content-username">John Doe</div>
            <div className="header-content-postCount">25 推文</div>
          </div>
        </div>
        <div className="information-self">
          <img src={background} alt="background" className="self-background" />
          <img src={photo} alt="photo1" className="self-photo" />
          <ButtonHollow className='self-btn'>編輯個人資料</ButtonHollow>
          <div className="self-content">
            <div className="self-content-username">John Doe</div>
            <div className="self-content-account">@heyjohn</div>
            <div className="self-content-text">Ipsum is simply dummy text of the printing and typesetting industry.</div>
            <div className="self-content-footer">
              <div className="content-footer-following">34個<span className="footer-following-span">跟隨中</span></div>
              <div className="content-footer-following">59位<span className="footer-following-span">跟隨者</span></div>
            </div>
          </div>
        </div>
        <div className="information-content">
          <div className="content-tabs">
            <div className="content-tab content-tab-active">推文</div>
            <div className="content-tab">回覆</div>
            <div className="content-tab">喜歡的內容</div>
          </div>
          <div className="content-post">
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
          </div>
        </div>
      </div>

      <RightContainer></RightContainer>
    </div>
  )
}

export default InformationPage