import { Link, useNavigate } from 'react-router-dom'
import AuthInput from '../component/AuthInput'
import { AuthContainer, AuthLinkContainer, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import LogoIcon from '../component/LogoIcon'
import Button from '../component/Button'
import { useEffect, useState } from 'react'
import { register } from '../api/auth'
import Swal from 'sweetalert2'
import { editInfo, getInfo, getUsers } from '../api/info'
import { adminLogin } from '../api/admin'

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
      const adminToken = await adminLogin('superadmin03', 123456, 1478963)

      if (success && adminToken) {
        localStorage.setItem('token', token)
        localStorage.setItem('adminToken', adminToken)
        const { account_id } = await getInfo(token)
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
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 確認token
  useEffect(() => {
    const checkTokenAsync = async () => {
      const token = localStorage.getItem('token')
      const adminToken = localStorage.getItem('adminToken')
      if (!token || !adminToken) {
        return
      }

      const resGetInfo = await getInfo(token)
      const resGetUsers = await getUsers(adminToken)
      if (resGetInfo && resGetUsers) {
        navigate('/promotion')
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken')
      }
    }
    checkTokenAsync()
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