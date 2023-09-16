import { useEffect, useState } from "react"
import Button from "../component/Button"
import LeftContainer from "../component/LeftContainer"
import settingActive from '../images/_base/settingActive.png'
import { editInfo, getInfo, getUsers } from "../api/info"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import BasicInput from "../component/BasicInput"
import PassWordInput from "../component/PassWordInput"
import { Form } from "antd"

const SettingPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [ personInfo, setPersonInfo ] = useState({
    account_id: '',
    account: '',
    real_name: '',
    email: '',
    remark: '',
    mobile: '',
    new_login_password: '',
    new_login_password_confirmation: '',
  }) 
  
  const area_code = ''
  const user_level_id = 22

  // 點擊儲存更改個人資料
  const handleFinish = async () => {
    const adminToken2 = localStorage.getItem('adminToken2')
    
    try {
      const res = await editInfo({area_code, user_level_id, adminToken2, ...personInfo})

      if (res) {
        setPersonInfo((prop) => {
          return {
            ...prop,
            new_login_password: '',
            new_login_password_confirmation: '',
          }
        })
        Swal.fire({
          icon: 'success',
          title: '儲存成功',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
          position: 'top'
        })
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
        navigate('/login')
        return
      }
      
      const resGetInfo = await getInfo(token)
      const resGetUsers = await getUsers(adminToken2)
      if (resGetInfo && resGetUsers) {
        setPersonInfo((prop) => {
          return {
            ...prop,
            email: resGetInfo.email,
            account: resGetInfo.account,
            real_name: resGetInfo.real_name,
            account_id: resGetInfo.account_id,
            remark: resGetInfo.remark,
          }
        })
        form.setFieldsValue({
          account: resGetInfo.account,
          username: resGetInfo.real_name,
          email: resGetInfo.email,
        })
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken2')
        navigate('/login')
      }
    }
    checkTokenAsync()
  },[navigate, form])
  
  return (
    <div className="mainContainer">
      <LeftContainer setting={settingActive} account_id={personInfo.account_id} isClickAtSetting={true}></LeftContainer>
      <div className="settingContainer">
        <div className="setting-title">帳戶設定</div>
        <div className="setting-form">
          <Form
            form={form}
            name="setting"
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            requiredMark={false}
            layout="vertical"
          >
            <BasicInput 
              name='account' 
              placeholder='請輸入帳號' 
              label='帳號' 
              readOnly
            />
            <BasicInput 
              name='username' 
              placeholder='請輸入使用者名稱' 
              label='名稱' 
              onChange={(userNameInputValue) => setPersonInfo({
                ...personInfo,
                real_name: userNameInputValue
              })}
              rules={[
                {
                  required: true,
                  message: '名稱為必填',
                },
              ]}
            />
            <BasicInput 
              name='email' 
              placeholder='請輸入Email' 
              label='Email' 
              onChange={(emailInputValue) => setPersonInfo({
                ...personInfo,
                email: emailInputValue
              })}
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
            <PassWordInput 
              name='password' 
              placeholder='請設定密碼' 
              label='密碼' 
              onChange={(newPasswordInputValue) => setPersonInfo({
                ...personInfo,
                new_login_password: newPasswordInputValue
              })}
              rules={[
                {
                  min: 6,
                  max: 16,
                  message: '密碼需介於6~16字元',
                },
              ]}
            />
            <PassWordInput 
              name='prePassword' 
              placeholder='請再次輸入密碼' 
              label='密碼確認' 
              onChange={(confirmNewPasswordInputValue) => setPersonInfo({
                ...personInfo,
                new_login_password_confirmation: confirmNewPasswordInputValue
              })}
              dependencies={['password']}
              rules={[
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
            <Button htmlType="submit" className='settingBtn'>儲存</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SettingPage