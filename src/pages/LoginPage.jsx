import { Link } from 'react-router-dom'
import AuthInput from '../component/AuthInput'
import Logo from '../images/Logo.png'
import { AuthButton, AuthContainer, AuthInputContainer, AuthLinkContainer, AuthLinkSpan, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import { LogoIcon } from '../component/common/logo.styled'


const LoginPage = () => {
  return (
    <AuthContainer>
      <LogoIcon src={Logo} alt="logo"/>
      <AuthTitle>登入 Alphitter</AuthTitle>
      <AuthInputContainer>
        <AuthInput />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput />
      </AuthInputContainer>

      <AuthButton>登入</AuthButton>

      <AuthLinkContainer>
        <Link to='/login'>
          <AuthLinkText>註冊</AuthLinkText>
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