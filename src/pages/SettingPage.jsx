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
import { useTranslation } from "react-i18next"
import { changeLanguage } from "i18next"
import { logout } from "../api/auth"
import { Photo } from "../component/common/photo.styled"
import ownPhoto from '../images/ownPhoto.png'
import db from "../configs/config"
import { Modal } from "../component/Modal"

const SettingPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const {t} = useTranslation()
  const [ postingModal, setPostingModal ] = useState(false)
  const [ postingContent, setPostingContent ] = useState('')
  const [ postList, setPostList ] = useState([])
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

  const handleClick = async () => {
    const token = localStorage.getItem('token')
    try {
      await logout(token)
      localStorage.removeItem('token')
      localStorage.removeItem('adminToken2')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }  

    // 發文
  const handleClickPost = async () => {
    // if (postingContent.length === 0) {
    //   return
    // }
    // const token = localStorage.getItem('token')
    // const id = postList[0].id + 1
    // const time = new Date()
    // const getTime = time.getTime()
    // const create_at = time.toLocaleString()

    // try {
    //   const res = await createPost({token, id, create_at, getTime, postingContent, ...personInfo})
      
    //   if (res) {
    //     const newPostList = [res,...postList]
    //     setPostList(newPostList)
    //     setPostingContent('')
    //     setPostingModal(false)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    if (postingContent.length === 0) {
      return
    }
    const time = new Date()
    const getTime = time.getTime()
    const create_at = time.toLocaleString()
    const id = postList[0].id + 1

    const fields = {
      account: personInfo.account,
      account_id: personInfo.account_id,
      content: postingContent,
      create_at,
      getTime,
      id,
      real_name: personInfo.real_name,
      like: [],
      reply: [],
    }

    db.ref('/posts').update({[id]: fields})
    setPostingContent('')
    setPostingModal(false)
  }

    // 初始拿推文
  useEffect(() => {
    const getPostsAsync = () => {
    //   try {
    //     const res = await getPosts()
    //     setPostList(res)

    //     if (searchParams.get('from') === 'setting') {
    //       setPostingModal(true)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    db.ref('posts').on('value', snapshot => {
      let data = []
      snapshot.forEach(item => {
        data.push(item.val())
      })
      for (let item in data) {
        let post = data[item]
        if (!post.hasOwnProperty('like')) {
          post['like'] = []
        } else {
          let likeArr = []
          for (let item in post.like) {
            likeArr.push(post.like[item])
          }
          post.like = likeArr
        }
        if (!post.hasOwnProperty('reply')) {
          post['reply'] = []
        } else {
          let replyArr = []
          for (let item in post.reply) {
            replyArr.push(post.reply[item])
          }
          post.reply = replyArr.reverse()
        }
      }
      setPostList(data.reverse())
    })
  }
  getPostsAsync()
},[])

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

    // 設定語系
  useEffect(() => {
    const defaultLang = localStorage.getItem('defaultLanguage')
    changeLanguage(defaultLang)
  },[])
  
  return (
    <div className="mainContainer">
      <LeftContainer 
        setting={settingActive} 
        account_id={personInfo.account_id} 
        isClickAtSetting={true}
        onClickPost={() => {
          console.log(postingModal)
          setPostingModal(true)
        }}
      >
      </LeftContainer>
      <div className="settingContainer">
        <div className="setting-title">{t("normal.infoSetting")}</div>
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
              placeholder={t("normal.inputAccount")}
              label={t("normal.account")}
              readOnly
            />
            <BasicInput 
              name='username' 
              placeholder={t("normal.inputUserName")}
              label={t("normal.userName")} 
              onChange={(userNameInputValue) => setPersonInfo({
                ...personInfo,
                real_name: userNameInputValue
              })}
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
              onChange={(emailInputValue) => setPersonInfo({
                ...personInfo,
                email: emailInputValue
              })}
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
              onChange={(newPasswordInputValue) => setPersonInfo({
                ...personInfo,
                new_login_password: newPasswordInputValue
              })}
              rules={[
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
                  return Promise.reject(new Error(t("normal.confirmPassword.different")));
                },
              }),
              ]}
            />
            <div className='setting-btns'>
              <Button htmlType="submit" className='setting-btns-save'>{t("normal.save")}</Button>
              <u className="setting-btns-logout" onClick={handleClick}>{t("normal.logout")}</u>
            </div>
          </Form>
        </div>
        <Modal active={postingModal} onClickModalCancel={() => setPostingModal(false)} className='settingContainer-posting-modal' btnText={t("normal.post")} type='typeA'>
          <div className="posting-modal-content">
              <Photo src={ownPhoto} alt="ownPhoto" className="modal-content-img" />
            <textarea rows='6' cols='100' className="modal-content-textarea" placeholder={t("normal.whatHappened")} value={postingContent} onChange={(postingModalTextareaValue) => setPostingContent(postingModalTextareaValue.target.value)}></textarea>
          </div>
          <Button className='posting-modal-btn' onClick={handleClickPost}>{t("normal.post")}</Button>
        </Modal>
      </div>
    </div>
  )
}

export default SettingPage