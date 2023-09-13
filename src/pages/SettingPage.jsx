import { useEffect, useState } from "react"
import AuthInput from "../component/AuthInput"
import Button from "../component/Button"
import LeftContainer from "../component/LeftContainer"
import settingActive from '../images/_base/settingActive.png'
import { editInfo, getInfo, getUsers } from "../api/info"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const SettingPage = () => {
  const navigate = useNavigate()
  const [ personInfo, setPersonInfo ] = useState({
    account_id: '',
    account: '',
    real_name: '',
    email: '',
    remark: '',
    mobile: '',
    new_login_password: '',
    new_login_password_confirmation: '',
  }) 
  
  const area_code = ''
  const user_level_id = 22

  // 點擊儲存更改個人資料
  const handleClick = async () => {
    const adminToken2 = localStorage.getItem('adminToken2')
    
    try {
      const res = await editInfo({area_code, user_level_id, adminToken2, ...personInfo})

      if (res) {
        setPersonInfo((prop) => {
          return {
            ...prop,
            new_login_password: '',
            new_login_password_confirmation: '',
          }
        })
        Swal.fire({
          icon: 'success',
          title: '儲存成功',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
          position: 'top'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  // 確認token
  useEffect(() => {
    const checkTokenAsync = async () => {
      const token = localStorage.getItem('token')
      const adminToken2 = localStorage.getItem('adminToken2')
      if (!token || !adminToken2) {
        navigate('/login')
        return
      }
      
      const resGetInfo = await getInfo(token)
      const resGetUsers = await getUsers(adminToken2)
      if (resGetInfo && resGetUsers) {
        setPersonInfo((prop) => {
          return {
            ...prop,
            email: resGetInfo.email,
            account: resGetInfo.account,
            real_name: resGetInfo.real_name,
            account_id: resGetInfo.account_id,
            remark: resGetInfo.remark,
          }
        })
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken2')
        navigate('/login')
      }
    }
    checkTokenAsync()
  },[navigate])
  
  return (
    <div className="mainContainer">
      <LeftContainer setting={settingActive} account_id={personInfo.account_id} isClickAtSetting={true}></LeftContainer>
        <div className="settingContainer">
          <div className="setting-title">帳戶設定</div>
          <div className="setting-form">
            <AuthInput 
              value={personInfo.account} name='account' placeholder='請輸入帳號' label='帳號' readOnly
            />
            <AuthInput 
              value={personInfo.real_name} name='username' placeholder='請輸入使用者名稱' label='名稱' onChange={(userNameInputValue) => setPersonInfo({
                ...personInfo,
                real_name: userNameInputValue
              })}
            />
            <AuthInput 
              value={personInfo.email} name='email' placeholder='請輸入Email' label='Email' type='email' onChange={(emailInputValue) => setPersonInfo({
                ...personInfo,
                email: emailInputValue
              })}
            />
            <AuthInput 
              value={personInfo.new_login_password} name='password' placeholder='請設定密碼' label='密碼' type='number' onChange={(newPasswordInputValue) => setPersonInfo({
                ...personInfo,
                new_login_password: newPasswordInputValue
              })}
            />
            <AuthInput 
              value={personInfo.new_login_password_confirmation} name='prePassword' placeholder='請再次輸入密碼' label='密碼確認' type='number' onChange={(confirmNewPasswordInputValue) => setPersonInfo({
                ...personInfo,
                new_login_password_confirmation: confirmNewPasswordInputValue
              })}
            />
          </div>
          <Button className='settingBtn' onClick={handleClick}>儲存</Button>
        </div>
    </div>
  )
}

export default SettingPage