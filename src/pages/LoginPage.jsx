import { Link, useNavigate } from 'react-router-dom'
import AuthInput from '../component/AuthInput'
import { AuthContainer, AuthLinkContainer, AuthLinkSpan, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import LogoIcon from '../component/LogoIcon'
import Button from '../component/Button'
import { useEffect, useState } from 'react'
import { login } from '../api/auth'
import Swal from 'sweetalert2'
import { getInfo, getUsers } from '../api/info'
import { adminLogin } from '../api/admin'


const LoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleClick = async () => {
    if (account.length === 0 || password.length === 0) {
      return
    }

    try {
      const { success, token } = await login({account, password})
      const adminToken2 = await adminLogin('superadmin03', 123456, 1478963)
      if (success && adminToken2) {
        localStorage.setItem('token', token)
        localStorage.setItem('adminToken2', adminToken2)
        Swal.fire({
          icon: 'success',
          title: '登入成功',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
          position: 'top'
        })
        navigate('/promotion')
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 確認token
  useEffect(() => {
    const checkTokenAsync = async () => {
      const token = localStorage.getItem('token')
      const adminToken2 = localStorage.getItem('adminToken2')
      if (!token || !adminToken2) {
        return
      }

      const resGetInfo = await getInfo(token)
      const resGetUsers = await getUsers(adminToken2)
      if (resGetInfo && resGetUsers) {
        navigate('/promotion')
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken2')
      }
    }
    checkTokenAsync()
  },[navigate])

  return (
    <AuthContainer>
      <LogoIcon></LogoIcon>
      <AuthTitle>登入 Alphitter</AuthTitle>
        <AuthInput 
          value={account} name='account' placeholder='請輸入帳號' label='帳號' className='authInput' onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        <AuthInput 
          value={password} name='password' placeholder='請輸入密碼' label='密碼' type='number' className='authInput' onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />

      <Button className='authBtn' onClick={handleClick}>登入</Button>

      <AuthLinkContainer className='login-linkContainer'>
        <Link to='/signup'>
          <AuthLinkText >註冊</AuthLinkText>
        </Link>
        <AuthLinkSpan >． </AuthLinkSpan>
        <Link to='https://leo-0814.github.io/twitteradmin' target="_blank">
          <AuthLinkText>後台登入</AuthLinkText>
        </Link>
      </AuthLinkContainer>
    </AuthContainer>
  )
}

export default LoginPage