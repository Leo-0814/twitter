import { Link } from 'react-router-dom'
import AuthInput from '../component/AuthInput'
import Logo from '../images/Logo.png'
import { AuthButton, AuthContainer, AuthLinkContainer, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import { LogoIcon } from '../component/common/logo.styled'


const SignUpPage = () => {
  return (
    <AuthContainer>
      <LogoIcon src={Logo} alt="logo"/>
      <AuthTitle>建立你的帳號</AuthTitle>
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

      <AuthButton>註冊</AuthButton>

      <AuthLinkContainer>
        <Link to='/login'>
          <AuthLinkText >取消</AuthLinkText>
        </Link>
      </AuthLinkContainer>
    </AuthContainer>
  )
}

export default SignUpPage