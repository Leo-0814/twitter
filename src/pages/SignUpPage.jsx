import { Link, useNavigate } from 'react-router-dom'
import { AuthContainer, AuthLinkContainer, AuthLinkText, AuthTitle } from '../component/common/auth.styled'
import LogoIcon from '../component/LogoIcon'
import Button from '../component/Button'
import { useEffect, useState } from 'react'
import { register } from '../api/auth'
import Swal from 'sweetalert2'
import { editInfo, getInfo, getUsers } from '../api/info'
import { adminLogin } from '../api/admin'
import BasicInput from '../component/BasicInput'
import PassWordInput from '../component/PassWordInput'
import { Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from 'i18next'
import Language from '../component/Language.jsx'

const SignUpPage = () => {
  const [account, setAccount] = useState('')
  const [real_name, setRealName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const {t, i18n} = useTranslation()
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

  // 設定default語系
  useEffect(() => {
    const defaultLang = localStorage.getItem('defaultLanguage')
    if (!defaultLang) {
      localStorage.setItem('defaultLanguage', 'cn')
    }
    changeLanguage(defaultLang)
  },[])

  return (
    <AuthContainer>
      <LogoIcon></LogoIcon>
      <AuthTitle>{t("normal.createAccount")}</AuthTitle>
      <Language
        placement='bottom'
      ></Language>
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
        <BasicInput 
          name='username' 
          placeholder={t("normal.inputUserName")}
          label={t("normal.userName")} 
          onChange={(userNameInputValue) => setRealName(userNameInputValue)}
          rules={[
            {
              required: true,
              message: t("normal.userNameRequired"),
            },
          ]}
        />
        <BasicInput 
          name='email' 
          placeholder={t("normal.inputEmail")}  
          label={t("normal.email")} 
          onChange={(emailInputValue) => setEmail(emailInputValue)}
          rules={[
            {
              type: 'email',
              message: t("normal.email.formatError"),
            },
            {
              required: true,
              message: t("normal.emailRequired"),
            },
          ]}
        />
        <PassWordInput 
          name='password' 
          placeholder={t("normal.setPassword")}
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
        <PassWordInput 
          name='prePassword' 
          placeholder={t("normal.confirmPassword.again")}
          label={t("normal.confirmPassword")}
          onChange={(confirmPasswordInputValue) => setConfirmPassword(confirmPasswordInputValue)}
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: t("normal.ConfirmPasswordRequired"),
            },
            ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t("normal.confirmPassword.different")));
            },
          }),
          ]}
        />

      <Button htmlType="submit" className='authBtn'>{t("normal.signup")}</Button>
      </Form>
      <AuthLinkContainer>
        <Link to='/login'>
          <AuthLinkText >{t("normal.cancel")}</AuthLinkText>
        </Link>
      </AuthLinkContainer>
    </AuthContainer>
  )
}

export default SignUpPage