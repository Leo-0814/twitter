import { Link } from 'react-router-dom'
import AuthInput from '../component/AuthInput'
import logo from '../images/Logo.png'
import { AuthContainer, AuthLinkContainer, AuthLinkSpan, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import { LogoIcon } from '../component/common/logo.styled'
import Button from '../component/Button'


const LoginPage = () => {
  return (
    <AuthContainer>
      <LogoIcon src={logo} alt="logo"/>
      <AuthTitle>登入 Alphitter</AuthTitle>
        <AuthInput 
          value='' name='account' placeholder='請輸入帳號' label='帳號'  
        />
        <AuthInput 
          value='' name='password' placeholder='請輸入密碼' label='密碼' type='number' 
        />

      <Button className='authBtn'>登入</Button>

      <AuthLinkContainer className='login-linkContainer'>
        <Link to='/signUp'>
          <AuthLinkText >註冊</AuthLinkText>
        </Link>
        <AuthLinkSpan >． </AuthLinkSpan>
        <Link to='/admin'>
          <AuthLinkText>後台登入</AuthLinkText>
        </Link>
      </AuthLinkContainer>
    </AuthContainer>
  )
}

export default LoginPage