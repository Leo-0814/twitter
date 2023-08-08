import { useEffect, useState } from "react"
import AuthInput from "../component/AuthInput"
import Button from "../component/Button"
import LeftContainer from "../component/LeftContainer"
import settingActive from '../images/_base/settingActive.png'
import { editInfo, getInfo } from "../api/info"



const SettingPage = () => {
  const [ personInfo, setPersonInfo ] = useState({
    id: '',
    account: '',
    real_name: '',
    email: '',
    new_login_password: '',
    new_login_password_confirmation: '',
  }) 
  const adminToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FkbWluYXBpLmJhbGwxODguY2MvYWRtaW4vbG9naW4iLCJpYXQiOjE2OTE0NjY1MjksImV4cCI6MTY5MTYzOTMyOSwibmJmIjoxNjkxNDY2NTI5LCJqdGkiOiJabmdxZjVXVlRJclpuekYzIiwic3ViIjoiMjUiLCJwcnYiOiJjODI5MjIzODM1ZDExMTM4ZjA4YWNlNTZmZmE2NjI4YmMyNjgzY2I1In0.VS-1Px66ifJ2BJzG4l5OMSmUN59gxIOruzIAx53yl1w'
  const area_code = ''
  const mobile = ''
  const user_level_id = 22

  const handleClick = async () => {
    try {
      const res = await editInfo({area_code, mobile, user_level_id, adminToken, ...personInfo})
      console.log(res)
      if (res) {
        window.location.reload()
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    const getInfoAsync = async () => {
      const token = localStorage.getItem('token')

      try {
        const { account, real_name, email, account_id
 } = await getInfo(token)
        setPersonInfo({
          account,
          real_name,
          email,
          id: account_id
        })
      } catch (error) {
        console.log(error)
      }
    }
    getInfoAsync()
  },[])
 console.log(personInfo)
  return (
    <div className="mainContainer">
      <LeftContainer setting={settingActive}></LeftContainer>
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