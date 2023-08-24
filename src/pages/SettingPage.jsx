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
    const adminToken = localStorage.getItem('adminToken')
    
    try {
      const res = await editInfo({area_code, user_level_id, adminToken, ...personInfo})

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

  // 初始拿個人資料
  useEffect(() => {
    const getInfoAsync = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      try {
        const { account, real_name, email, account_id, remark
 } = await getInfo(token)
        setPersonInfo((prop) => {
          return {
          ...prop,
          account,
          real_name,
          email,
          account_id,
          remark,
        }})
      } catch (error) {
        localStorage.removeItem('token')
        console.log(error)
        navigate('/login')
      }
    }
    getInfoAsync()
  }, [navigate])

  // 初始拿用戶列表 > 測adminToken
  useEffect(() => {
    const getUsersAsync = async () => {
      const adminToken = localStorage.getItem('adminToken')

      if (!adminToken) {
        navigate('/adminlogin')
        return
      }

      try {
        const res = await getUsers(adminToken)

        if (!res) {
          localStorage.removeItem('adminToken')
          navigate('/adminlogin')
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUsersAsync()
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