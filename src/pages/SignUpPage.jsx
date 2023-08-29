import { Link, useNavigate } from 'react-router-dom'
import AuthInput from '../component/AuthInput'
import logo from '../images/logo.png'
import { AuthContainer, AuthLinkContainer, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import LogoIcon from '../component/LogoIcon'
import Button from '../component/Button'
import { useEffect, useState } from 'react'
import { register } from '../api/auth'
import Swal from 'sweetalert2'
import { editInfo, getInfo } from '../api/info'

const SignUpPage = () => {
  const [account, setAccount] = useState('')
  const [real_name, setRealName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const invite_code= "32033018"
  const currency = 'BRL'
  const area_code = ''
  const mobile = ''
  const user_level_id = 22

  const handleClick = async () => {
    if (account.length === 0 || real_name.length === 0 || email.length === 0 || password.length === 0 || confirm_password.length === 0) {
      return
    }

    try {
      const { success, token } = await register({
        account, password, confirm_password, currency, invite_code
      })

      if (success) {
        localStorage.setItem('token', token)
        const { account_id } = await getInfo(token)
        
        const adminToken = localStorage.getItem('adminToken')
        const res = await editInfo({area_code, mobile, user_level_id, adminToken, account_id, email, real_name})

        if (res) {
          navigate('/promotion')
          Swal.fire({
            icon: 'success',
            title: '註冊成功',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1000,
            position: 'top'
          })
        } else {
          localStorage.removeItem('adminToken')
          navigate('/adminlogin')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getInfoAsync = async () => {
      const adminToken = localStorage.getItem('adminToken')
      if (!adminToken) {
        navigate('/adminlogin')
        return
      }

      const token = localStorage.getItem('token')
      if (!token) {
        return
      }

      const res = await getInfo(token)
      if (res) {
        navigate('/promotion')
      }
    }
    getInfoAsync()
  },[navigate])

  return (
    <AuthContainer>
      <LogoIcon></LogoIcon>
      <AuthTitle>建立你的帳號</AuthTitle>
        <AuthInput 
          value={account} name='account' placeholder='請輸入帳號' label='帳號' className='authInput' onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        <AuthInput 
          value={real_name} name='username' placeholder='請輸入使用者名稱' label='名稱' className='authInput' onChange={(userNameInputValue) => setRealName(userNameInputValue)}
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