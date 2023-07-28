import { LogoIcon } from "./common/logo.styled"
import logo from '../images/logo.png'
import home from '../images/_base/home.png'
import information from '../images/_base/information.png'
import setting from '../images/_base/setting.png'
import logOut from '../images/_base/logOut.png'
import Button from "./Button"

const LeftContainer = () => {
  return (
    <div className="leftContainer">
      <LogoIcon src={logo} alt="" className="leftContainer-logo" />
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
  )
}

export default LeftContainer