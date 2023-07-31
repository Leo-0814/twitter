import { LogoIcon } from "./common/logo.styled"
import logo from '../images/logo.png'
import logOut from '../images/_base/logOut.png'
import Button from "./Button"
import { Link } from "react-router-dom"
import baseHome from '../images/_base/home.png'
import baseInformation from '../images/_base/information.png'
import baseSetting from '../images/_base/setting.png'

const LeftContainer = ({home, information, setting}) => {
  return (
    <div className="leftContainer">
      <LogoIcon src={logo} alt="" className="leftContainer-logo" />
      <div className="leftContainer-list">
        <Link to='/home'className="leftContainer-list-item">
          <img src={home || baseHome} alt="home" className="leftContainer-list-icon" />
          <div className={{home}?"leftContainer-list-text active" : 'leftContainer-list-text'}>首頁</div>
        </Link>
        <Link to='/information' className="leftContainer-list-item">
          <img src={information || baseInformation} alt="information" className="leftContainer-list-icon" />
          <div className={{information}?"leftContainer-list-text active" : 'leftContainer-list-text'}>個人資料</div>
        </Link>
        <Link to='/setting' className="leftContainer-list-item">
          <img src={setting || baseSetting} alt="setting" className="leftContainer-list-icon" />
          <div className={{setting}?"leftContainer-list-text active" : 'leftContainer-list-text'}>設定</div>
        </Link>
        <Button className="leftContainer-list-postBtn">推文</Button>

        {/* 登出以後要改回來 */}
        <Link to='/login' className="leftContainer-list-item leftContainer-list-logOut">
          <img src={logOut} alt="logOut" className="leftContainer-list-icon" />
          <div className="leftContainer-list-text">登出</div>
        </Link>
      </div>
    </div>
  )
}

export default LeftContainer