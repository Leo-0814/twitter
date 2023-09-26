import LogoIcon from './LogoIcon'
import logOut from '../images/_base/logOut.png'
import Button from "./Button"
import { Link, useNavigate } from "react-router-dom"
import baseHome from '../images/_base/home.png'
import baseInformation from '../images/_base/information.png'
import baseSetting from '../images/_base/setting.png'
import basePromotion from '../images/_base/setting.png'
import post from '../images/_base/post.png'
import { clsx } from "clsx"
import { logout } from "../api/auth"
import Language from './Language.jsx'
import { useTranslation } from 'react-i18next';

const LeftContainer = ({home, information, setting, onClickPost,  isClickAtSetting, onClickInfoTab}) => {
  const navigate = useNavigate()
  const {t} = useTranslation()

  const handleClick = async () => {
    const token = localStorage.getItem('token')
    try {
      await logout(token)
      localStorage.removeItem('token')
      localStorage.removeItem('adminToken2')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }  
  return (
    <div className="leftContainer">
      <LogoIcon className='leftContainer-logo'></LogoIcon>
      <div className="leftContainer-list">
        <Link to='/home'className="leftContainer-list-item">
          <img src={home? home: baseHome} alt="home" className="leftContainer-list-icon" />
          <div className={clsx('leftContainer-list-text', { active: home })}>{t("normal.home")}</div>
        </Link>
        <div className="leftContainer-list-item leftContainer-list-item-post" onClick={() => onClickPost?.()}>
          <img src={post} alt="post" className="leftContainer-list-icon" />
        </div>
        <Link to={`/information`} className="leftContainer-list-item" onClick={() => onClickInfoTab?.()}>
          <img src={information? information: baseInformation} alt="information" className="leftContainer-list-icon" />
          <div className={clsx('leftContainer-list-text', { active: information })}>{t("normal.info")}</div>
        </Link>
        <Link to='/setting' className="leftContainer-list-item">
          <img src={setting? setting: baseSetting} alt="setting" className="leftContainer-list-icon" />
          <div className={clsx('leftContainer-list-text', { active: setting })}>{t("normal.setting")}</div>
        </Link>
        {isClickAtSetting? 
          <Link to={`/home?from=setting`}><Button className="leftContainer-list-postBtn" onClick={() => onClickPost?.()}>{t("normal.post")}</Button></Link>: 
            <Button className="leftContainer-list-postBtn" onClick={() => onClickPost?.()}>{t("normal.post")}</Button>
        }

        <div className="leftContainer-list-item leftContainer-list-footer" >
          <Language
            placement='top'
            className='lang-btn'
            showText={true}
          ></Language>
          <div className='list-item-logout' onClick={handleClick}>
            <img src={logOut} alt="logOut" className="leftContainer-list-icon" />
            <div className="leftContainer-list-text">{t("normal.logout")}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftContainer