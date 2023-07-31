import { Link } from 'react-router-dom'
import AuthInput from '../component/AuthInput'
import logo from '../images/logo.png'
import { AuthContainer, AuthLinkContainer, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import { LogoIcon } from '../component/common/logo.styled'
import Button from '../component/Button'


const SignUpPage = () => {
  return (
    <AuthContainer>
      <LogoIcon src={logo} alt="logo"/>
      <AuthTitle>建立你的帳號</AuthTitle>
        <AuthInput 
          value='' name='account' placeholder='請輸入帳號' label='帳號' className='authInput' 
        />
        <AuthInput 
          value='' name='username' placeholder='請輸入使用者名稱' label='名稱' className='authInput' 
        />
        <AuthInput 
          value='' name='email' placeholder='請輸入Email' label='Email' type='email' className='authInput' 
        />
        <AuthInput 
          value='' name='password' placeholder='請設定密碼' label='密碼' type='number' className='authInput' 
        />
        <AuthInput 
          value='' name='prePassword' placeholder='請再次輸入密碼' label='密碼確認' type='number' className='authInput' 
        />

      <Button className='authBtn'>註冊</Button>

      <AuthLinkContainer>
        <Link to='/login'>
          <AuthLinkText >取消</AuthLinkText>
        </Link>
      </AuthLinkContainer>
    </AuthContainer>
  )
}

export default SignUpPage