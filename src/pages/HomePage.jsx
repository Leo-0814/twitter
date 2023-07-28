import home from '../images/_base/home.png'
import information from '../images/_base/information.png'
import setting from '../images/_base/setting.png'
import logOut from '../images/_base/logOut.png'
import logo from '../images/Logo.png'
import { LogoIcon } from '../component/common/logo.styled'
import Button from '../component/Button'

const HomePage = () => {
  return (
    <div className="mainContainer">
      <div className="leftContainer">
        <LogoIcon src={logo} alt="" className="logo" />
        <div className="leftContainer-list">
          <div className="leftContainer-list-item">
            <img src={home} alt="home" className="leftContainer-list-icon" />
            <div className="leftContainer-list-text">首頁</div>
          </div>
          <div className="leftContainer-list-item">
            <img src={information} alt="information" className="leftContainer-list-icon" />
            <div className="leftContainer-list-text">個人資料</div>
          </div>
          <div className="leftContainer-list-item">
            <img src={setting} alt="setting" className="leftContainer-list-icon" />
            <div className="leftContainer-list-text">設定</div>
          </div>
          <Button className="leftContainer-list-postBtn">推文</Button>
          <div className="leftContainer-list-item leftContainer-list-logOut">
            <img src={logOut} alt="logOut" className="leftContainer-list-icon" />
            <div className="leftContainer-list-text">登出</div>
          </div>
        </div>
      </div>

      <div className="centerContainer">
        <div className="centerContainer-title">首頁</div>
        <div className="centerContainer-posting">
          <LogoIcon src={logo} alt="" className="posting-img" />
          <textarea name="" id="" cols="30" rows="2" className="posting-textarea">
          </textarea>
          <Button className='posting-btn'>推文</Button>
        </div>
        <div className="centerContainer-post">
          <div className="post-card">
            <LogoIcon src={logo} alt="" className="post-img" />
            <div className="post-userName">Apple</div>
            <div className="post-account">@apple</div>
            <span></span>
          </div>
        </div>
      </div>
      <div className="rightContainer"></div>
    </div>
  )
}

export default HomePage