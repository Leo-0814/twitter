import { Link, useNavigate } from 'react-router-dom'
import { AuthContainer, AuthLinkContainer, AuthLinkSpan, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import LogoIcon from '../component/LogoIcon'
import Button from '../component/Button'
import { useEffect, useState } from 'react'
import { login } from '../api/auth'
import Swal from 'sweetalert2'
import { getInfo, getUsers } from '../api/info'
import { adminLogin } from '../api/admin'
import { Form } from 'antd'
import BasicInput from '../component/BasicInput'
import PassWordInput from '../component/PassWordInput'


const LoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleFinish = async () => {
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

  const handleFinishFailed = (e) => {
    console.log('finishFailed', e)
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
        <Form
          form={form}
          name="login"
          // initialValues={{
          //   remember: true,
          // }}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          requiredMark={false}
          layout="vertical"
        >
          <BasicInput 
            name='account' 
            placeholder='請輸入帳號' 
            label='帳號' 
            onChange={(accountInputValue) => setAccount(accountInputValue)}
            rules={[
              {
                required: true,
                message: '帳號為必填',
              },
              {
                min: 6,
                max: 16,
                message: '帳號需介於6~16字元',
              },
            ]}
          />
          <PassWordInput
            name='password' 
            placeholder='請輸入密碼' 
            label='密碼' 
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
            rules={[
              {
                required: true,
                message: '密碼為必填',
              },
              {
                min: 6,
                max: 16,
                message: '密碼需介於6~16字元',
              },
            ]}
          />
          <Button htmlType="submit" className='authBtn'>登入</Button>
        </Form>
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