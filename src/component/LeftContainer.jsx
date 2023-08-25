import { LogoIcon } from "./common/logo.styled"
import logo from '../images/logo.png'
import logOut from '../images/_base/logOut.png'
import Button from "./Button"
import { Link, useNavigate } from "react-router-dom"
import baseHome from '../images/_base/home.png'
import baseInformation from '../images/_base/information.png'
import baseSetting from '../images/_base/setting.png'
import { clsx } from "clsx"
import { logout } from "../api/auth"

const LeftContainer = ({home, information, setting, onClickPost,  isClickAtSetting, onClickInfoTab}) => {
  const navigate = useNavigate()

  const handleClick = async () => {
    const token = localStorage.getItem('token')
    try {
      await logout(token)
      localStorage.removeItem('token')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }  
  return (
    <div className="leftContainer">
      <LogoIcon src={logo} alt="" className="leftContainer-logo" />
      <div className="leftContainer-list">
        <Link to='/home'className="leftContainer-list-item">
          <img src={home? home: baseHome} alt="home" className="leftContainer-list-icon" />
          <div className={clsx('leftContainer-list-text', { active: home })}>首頁</div>
        </Link>
        <Link to={`/information`} className="leftContainer-list-item" onClick={() => onClickInfoTab?.()}>
          <img src={information? information: baseInformation} alt="information" className="leftContainer-list-icon" />
          <div className={clsx('leftContainer-list-text', { active: information })}>個人資料</div>
        </Link>
        <Link to='/setting' className="leftContainer-list-item">
          <img src={setting? setting: baseSetting} alt="setting" className="leftContainer-list-icon" />
          <div className={clsx('leftContainer-list-text', { active: setting })}>設定</div>
        </Link>
        <Link to='/promotion' className="leftContainer-list-item">
          <img src={setting? setting: baseSetting} alt="setting" className="leftContainer-list-icon" />
          <div className={clsx('leftContainer-list-text', { active: setting })}>輪播圖</div>
        </Link>
        {isClickAtSetting? 
          <Link to={`/home?from=setting`}><Button className="leftContainer-list-postBtn" onClick={() => onClickPost?.()}>推文</Button></Link>: 
          <Button className="leftContainer-list-postBtn" onClick={() => onClickPost?.()}>推文</Button>
        }

        <div className="leftContainer-list-item leftContainer-list-logOut" onClick={handleClick}>
          <img src={logOut} alt="logOut" className="leftContainer-list-icon" />
          <div className="leftContainer-list-text">登出</div>
        </div>
      </div>
    </div>
  )
}

export default LeftContainer