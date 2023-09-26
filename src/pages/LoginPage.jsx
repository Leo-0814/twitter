import { Link, useNavigate } from 'react-router-dom'
import { AuthContainer, AuthLinkContainer, AuthLinkSpan, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import LogoIcon from '../component/LogoIcon'
import Button from '../component/Button'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { login } from '../api/auth'
import Swal from 'sweetalert2'
import { getInfo, getUsers } from '../api/info'
import { adminLogin } from '../api/admin'
import { Form } from 'antd'
import BasicInput from '../component/BasicInput'
import PassWordInput from '../component/PassWordInput'
import { changeLanguage } from 'i18next'
import Language from '../component/Language.jsx'


const LoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const {t, i18n} = useTranslation()

  const handleFinish = async () => {
    try {
      const { success, token } = await login({account, password})
      const adminToken2 = await adminLogin('superadmin03', 123456, 1478963)
      if (success && adminToken2) {
        localStorage.setItem('token', token)
        localStorage.setItem('adminToken2', adminToken2)
        Swal.fire({
          icon: 'success',
          title: t("normal.login.success"),
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
          position: 'top'
        })
        navigate('/home')
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
        navigate('/home')
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken2')
      }
      
    }
    checkTokenAsync()
  },[navigate])

  // 設定default語系
  useEffect(() => {
    const defaultLang = localStorage.getItem('defaultLanguage')
    changeLanguage(defaultLang)
  },[])

  return (
    <div className='loginContainer'>
      <LogoIcon></LogoIcon>
      <AuthTitle>{t("normal.login")} L.N. BooK</AuthTitle>
      <Language
        placement='bottom'
        className='lang-btn'
        showText={false}
      ></Language>
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
          placeholder={t("normal.inputAccount")} 
          label={t("normal.account")} 
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          rules={[
            {
              required: true,
              message: t("normal.accountRequired"),
            },
            {
              min: 6,
              max: 16,
              message: t("normal.accountLimit"),
            },
          ]}
        />
        <PassWordInput
          name='password' 
          placeholder={t("normal.inputPassword")} 
          label={t("normal.password")} 
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          rules={[
            {
              required: true,
              message: t("normal.passwordRequired"),
            },
            {
              min: 6,
              max: 16,
              message: t("normal.passwordLimit"),
            },
          ]}
        />
        <Button htmlType="submit" className='authBtn'>{t("normal.login")}</Button>
      </Form>
      <AuthLinkContainer className='login-linkContainer'>
        <Link to='/signup'>
          <AuthLinkText >{t("normal.signUp")}</AuthLinkText>
        </Link>
        <AuthLinkSpan >． </AuthLinkSpan>
        <Link to='https://leo-0814.github.io/twitteradmin' target="_blank">
          <AuthLinkText>{t("normal.backstageLogin")}</AuthLinkText>
        </Link>
        {/* <button onClick={() => changeLanguage('en')}>切換英文</button>
        <button onClick={() => changeLanguage('cn')}>切換中文</button> */}
      </AuthLinkContainer>
    </div>
  )
}

export default LoginPage