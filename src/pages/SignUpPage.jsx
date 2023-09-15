import { Link, useNavigate } from 'react-router-dom'
import { AuthContainer, AuthLinkContainer, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import LogoIcon from '../component/LogoIcon'
import Button from '../component/Button'
import { useEffect, useState } from 'react'
import { register } from '../api/auth'
import Swal from 'sweetalert2'
import { editInfo, getInfo, getUsers } from '../api/info'
import { adminLogin } from '../api/admin'
import BasicAuthInput from '../component/BasicAuthInput'
import PassWordAuthInput from '../component/PassWordAuthInput'
import { Form } from 'antd'

const SignUpPage = () => {
  const [account, setAccount] = useState('')
  const [real_name, setRealName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const invite_code= "32033018"
  const currency = 'BRL'
  const area_code = ''
  const mobile = ''
  const user_level_id = 22

  const handleFinish = async () => {
    try {
      const { success, token } = await register({
        account, password, confirm_password, currency, invite_code
      })
      const adminToken2 = await adminLogin('superadmin03', 123456, 1478963)

      if (success && adminToken2) {
        localStorage.setItem('token', token)
        localStorage.setItem('adminToken2', adminToken2)
        const { account_id } = await getInfo(token)
        const res = await editInfo({area_code, mobile, user_level_id, adminToken2, account_id, email, real_name})

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
      <AuthTitle>建立你的帳號</AuthTitle>
      <Form
        form={form}
        name="signup"
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        requiredMark={false}
        layout="vertical"
      >
        <BasicAuthInput 
          value={account} 
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
        <BasicAuthInput 
          value={real_name} 
          name='username' 
          placeholder='請輸入使用者名稱' 
          label='名稱' 
          onChange={(userNameInputValue) => setRealName(userNameInputValue)}
          rules={[
            {
              required: true,
              message: '名稱為必填',
            },
          ]}
        />
        <BasicAuthInput 
          value={email} 
          name='email' 
          placeholder='請輸入Email' 
          label='Email' 
          onChange={(emailInputValue) => setEmail(emailInputValue)}
          rules={[
            {
              type: 'email',
              message: 'Email格式錯誤',
            },
            {
              required: true,
              message: 'Email為必填',
            },
          ]}
        />
        <PassWordAuthInput 
          value={password} 
          name='password' 
          placeholder='請設定密碼' 
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
        <PassWordAuthInput 
          value={confirm_password} 
          name='prePassword' 
          placeholder='請再次輸入密碼' 
          label='密碼確認' 
          onChange={(confirmPasswordInputValue) => setConfirmPassword(confirmPasswordInputValue)}
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '確認密碼為必填',
            },
            ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('與密碼不一致'));
            },
          }),
          ]}
        />

      <Button htmlType="submit" className='authBtn'>註冊</Button>
      </Form>
      <AuthLinkContainer>
        <Link to='/login'>
          <AuthLinkText >取消</AuthLinkText>
        </Link>
      </AuthLinkContainer>
    </AuthContainer>
  )
}

export default SignUpPage