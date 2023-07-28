import Button from "./Button"
import { LogoIcon } from "./common/logo.styled"
import logo from '../images/logo.png'

const RightContainer = () => {
  return (
    <div className="rightContainer">
      <div className="rightContainer-area">
        <div className="rightContainer-area-title">推薦跟隨</div>
        <div className="rightContainer-area-followList">
          <LogoIcon src={logo} alt="" className="followList-img" />
          <div className="followList-content">
            <div className="followList-content-username">Pizza Hut</div>
            <div className="followList-content-account">@ouzzahut</div>
          </div>
          <Button className="followList-content-btn">正在跟隨</Button>
        </div>
        <div>
          <div className="rightContainer-area-followList">
            <LogoIcon src={logo} alt="" className="followList-img" />
            <div className="followList-content">
              <div className="followList-content-username">Pizza Hut</div>
              <div className="followList-content-account">@ouzzahut</div>
            </div>
            <Button className="followList-content-btn">正在跟隨</Button>
          </div>
          <div className="rightContainer-area-followList">
            <LogoIcon src={logo} alt="" className="followList-img" />
            <div className="followList-content">
              <div className="followList-content-username">Pizza Hut</div>
              <div className="followList-content-account">@ouzzahut</div>
            </div>
            <Button className="followList-content-btn">正在跟隨</Button>
          </div>
          <div className="rightContainer-area-followList">
            <LogoIcon src={logo} alt="" className="followList-img" />
            <div className="followList-content">
              <div className="followList-content-username">Pizza Hut</div>
              <div className="followList-content-account">@ouzzahut</div>
            </div>
            <Button className="followList-content-btn">正在跟隨</Button>
          </div>
          <div className="rightContainer-area-followList">
            <LogoIcon src={logo} alt="" className="followList-img" />
            <div className="followList-content">
              <div className="followList-content-username">Pizza Hut</div>
              <div className="followList-content-account">@ouzzahut</div>
            </div>
            <Button className="followList-content-btn">正在跟隨</Button>
          </div>
          <div className="rightContainer-area-followList">
            <LogoIcon src={logo} alt="" className="followList-img" />
            <div className="followList-content">
              <div className="followList-content-username">Pizza Hut</div>
              <div className="followList-content-account">@ouzzahut</div>
            </div>
            <Button className="followList-content-btn">正在跟隨</Button>
          </div>
          <div className="rightContainer-area-followList">
            <LogoIcon src={logo} alt="" className="followList-img" />
            <div className="followList-content">
              <div className="followList-content-username">Pizza Hut</div>
              <div className="followList-content-account">@ouzzahut</div>
            </div>
            <Button className="followList-content-btn">正在跟隨</Button>
          </div>
          <div className="rightContainer-area-followList">
            <LogoIcon src={logo} alt="" className="followList-img" />
            <div className="followList-content">
              <div className="followList-content-username">Pizza Hut</div>
              <div className="followList-content-account">@ouzzahut</div>
            </div>
            <Button className="followList-content-btn">正在跟隨</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightContainer