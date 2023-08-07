import { Link, useNavigate } from 'react-router-dom'
import AuthInput from '../component/AuthInput'
import logo from '../images/logo.png'
import { AuthContainer, AuthLinkContainer, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import { LogoIcon } from '../component/common/logo.styled'
import Button from '../component/Button'
import { useState } from 'react'
import { register } from '../api/auth'
import Swal from 'sweetalert2'


const SignUpPage = () => {
  const [account, setAccount] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const invite_code= "32033018"
  const currency = 'BRL'
  const navigate = useNavigate()

const handleClick = async () => {
  if (account.length === 0 || userName.length === 0 || email.length === 0 || password.length === 0 || confirm_password.length === 0) {
    return
  }

  try {
    const { success, token } = await register({
      account, userName, email, password, confirm_password, currency, invite_code
    })

    if (success) {
      localStorage.setItem('token', token)
      Swal.fire({
        icon: 'success',
        title: '註冊成功',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1000,
        position: 'top'
      })
      navigate('/home')
    }
  } catch (error) {
    console.log(error)
  }
}

  return (
    <AuthContainer>
      <LogoIcon src={logo} alt="logo"/>
      <AuthTitle>建立你的帳號</AuthTitle>
        <AuthInput 
          value={account} name='account' placeholder='請輸入帳號' label='帳號' className='authInput' onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        <AuthInput 
          value={userName} name='username' placeholder='請輸入使用者名稱' label='名稱' className='authInput' onChange={(userNameInputValue) => setUserName(userNameInputValue)}
        />
        <AuthInput 
          value={email} name='email' placeholder='請輸入Email' label='Email' type='email' className='authInput' onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
        <AuthInput 
          value={password} name='password' placeholder='請設定密碼' label='密碼' type='number' className='authInput' onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        <AuthInput 
          value={confirm_password} name='prePassword' placeholder='請再次輸入密碼' label='密碼確認' type='number' className='authInput' onChange={(confirmPasswordInputValue) => setConfirmPassword(confirmPasswordInputValue)}
        />

      <Button className='authBtn' onClick={handleClick}>註冊</Button>

      <AuthLinkContainer>
        <Link to='/login'>
          <AuthLinkText >取消</AuthLinkText>
        </Link>
      </AuthLinkContainer>
    </AuthContainer>
  )
}

export default SignUpPage