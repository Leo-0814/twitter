import AuthInput from "../component/AuthInput"
import Button from "../component/Button"
import LeftContainer from "../component/LeftContainer"

const SettingPage = () => {
  return (
    <div className="mainContainer">
      <LeftContainer></LeftContainer>
        <div className="settingContainer">
          <div className="setting-title">帳戶設定</div>
          <div className="setting-form">
            <AuthInput 
              value='' name='account' placeholder='請輸入帳號' label='帳號'
            />
            <AuthInput 
              value='' name='username' placeholder='請輸入使用者名稱' label='名稱'
            />
            <AuthInput 
              value='' name='email' placeholder='請輸入Email' label='Email' type='email'
            />
            <AuthInput 
              value='' name='password' placeholder='請設定密碼' label='密碼' type='number'
            />
            <AuthInput 
              value='' name='prePassword' placeholder='請再次輸入密碼' label='密碼確認' type='number'
            />
          </div>
          <Button className='settingBtn'>儲存</Button>
        </div>
    </div>
  )
}

export default SettingPage