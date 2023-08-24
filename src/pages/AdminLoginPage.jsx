import { Link, useNavigate } from 'react-router-dom'
import AuthInput from '../component/AuthInput'
import logo from '../images/logo.png'
import { AuthContainer, AuthLinkContainer, AuthLinkSpan, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import { LogoIcon } from '../component/common/logo.styled'
import Button from '../component/Button'
import { useEffect, useState } from 'react'
import { login } from '../api/auth'
import Swal from 'sweetalert2'
import { getInfo, getUsers } from '../api/info'
import { adminLogin } from '../api/admin'


const AdminLoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const gcode = 1478963
  const navigate = useNavigate()

  const handleClick = async () => {
    if (account.length === 0 || password.length === 0) {
      return
    }

    try {
      const adminToken = await adminLogin({account, password, gcode})
      if (adminToken) {
        localStorage.setItem('adminToken', adminToken)
        Swal.fire({
          icon: 'success',
          title: '登入成功',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
          position: 'top'
        })
        navigate('/login')
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 判斷adminToken是否生效
  useEffect(() => {
    const getUsersAsync = async () => {
      const adminToken = localStorage.getItem('adminToken')
      if (!adminToken) {
        return
      }

      const res = await getUsers(adminToken)
      if (res) {
        navigate('/login')
      } else {
        localStorage.removeItem('adminToken')
      }
    }
    getUsersAsync()
  },[navigate])

  return (
    <AuthContainer>
      <LogoIcon src={logo} alt="logo"/>
      <AuthTitle>登入 Alphitter後台</AuthTitle>
        <AuthInput 
          value={account} name='account' placeholder='請輸入帳號' label='帳號' className='authInput' onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        <AuthInput 
          value={password} name='password' placeholder='請輸入密碼' label='密碼' type='number' className='authInput' onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />

      <Button className='authBtn' onClick={handleClick}>登入</Button>
    </AuthContainer>
  )
}

export default AdminLoginPage