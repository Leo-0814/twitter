import LeftContainer from "../component/LeftContainer"
import RightContainer from "../component/RightContainer"
import leftArrow from '../images/_base/leftArrow.png'
import informationActive from '../images/_base/informationActive.png'
import { useEffect, useRef, useState } from "react"
import { ModalBackground } from "../component/Modal"
import clsx from "clsx"
import FollowCard from "../component/FollowCard"
import { getInfo } from "../api/info"
import Swal from "sweetalert2"
import { ReplyListContainer } from "../component/ReplyListContainer"
import { InformationContainer } from "../component/InformationContainer"
import { useNavigate, useParams } from "react-router-dom"
import db from "../configs/config"
import { useTranslation } from "react-i18next"
import { changeLanguage } from "i18next"
import { editInfo, followUser, getUsers } from "../api/admin"

const InformationPage = () => {
  const [ postingModal, setPostingModal ] = useState(false)
  const [ isOpenReplyPage, setIsOpenReplyPage ] = useState(false)
  const [ isOpenReplyModal, setIsOpenReplyModal ] = useState(false)
  const [ isOpenFollowPage, setIsOpenFollowPage ] = useState(false)
  const [ isNotify, setIsNotify ] = useState(false)
  const [ editInfoModal, setEditInfoModal ] = useState(false)
  const [ infoTabControl, setInfoTabControl ] = useState(0)
  const [ followTabControl, setFollowTabControl ] = useState(0)
  const [ isFollow, setIsFollow ]  = useState(false)
  const [ userList, setUserList ] = useState([])
  const [ postList, setPostList ] = useState([])
  const [ personInfo, setPersonInfo ] = useState({
    account_id: '',
    account: '',
    real_name: '',
    remark: '',
    email: '',
    mobile: '',
  })
  const [postingContent, setPostingContent] = useState('')
  const [ backgroundUrl, setBackgroundUrl ] = useState('')
  const [ photoUrl, setPhotoUrl] = useState('')
  const [ replyContainerId, setReplyContainerId ] = useState('')
  const [ userData, setUserData ] = useState({
    account: '',
    account_id: '',
    real_name: '',
    remark: '',
    email_status: '',
  })
  const [ replyModalInputValue, setReplyModalInputValue ] = useState('') 
  const realNameRef = useRef()
  const accountRef = useRef()
  const remarkRef = useRef()
  const params = useParams();
  const navigate = useNavigate()
  const {t} = useTranslation()
  
  const area_code = ''
  const user_level_id = 22
  

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

  // 上傳背景圖
  const handleUploadBackground = (e) => {
    if (!e.target.files[0]) return;
    var reader = new FileReader();
    reader.onload = function () {
      setBackgroundUrl(reader.result);
    };
    reader?.readAsDataURL(e?.target?.files[0]);
    e.target.value = "";
  };

  // 上傳頭貼
  const handleUploadPhoto = (e) => {
    if (!e.target.files[0]) return;
    var reader = new FileReader();
    reader.onload = function () {
      setPhotoUrl(reader.result);
    };
    reader?.readAsDataURL(e?.target?.files[0]);
    e.target.value = "";
  };
  
  //推薦跟隨
  const handleClickFollowUser = async (id) => {
    const adminToken2 = localStorage.getItem('adminToken2')

    try {
      await followUser(id, adminToken2)
      const res = await getUsers(adminToken2)
      setUserList(res)
    } catch (error) {
      console.log(error)
    }
  }

  //編輯個人資料，背景跟頭貼沒有地方儲存，未來優化
  const handleClickEditInfo = async () => {
    if (personInfo.real_name.length === 0) {
      return
    }

    const adminToken2 = localStorage.getItem('adminToken2')

    try {
      const res = await editInfo({ area_code, user_level_id, adminToken2, ...personInfo})

      if (res) {
        // window.location.reload()
        realNameRef.current = personInfo.real_name
        remarkRef.current = personInfo.remark
        setEditInfoModal(false)
        Swal.fire({
          icon: 'success',
          title: t("normal.save.success"),
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

  // 對推文按喜歡
  const handleClickLike = async (postId) => {
    // const token = localStorage.getItem('token')
    // const post = postList.filter(item => item.id === postId)
    // try {
    //   const res = await editPost({post, personInfo, token})
      
    //   if (res) {
    //     setReplyContainerId(res)
    //     const posts = await getPosts()
    //     setPostList(posts)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    let account_id = personInfo.account_id
    let post = postList.filter(post => post.id === postId)
    let postLike = post[0].like

    if (postLike.includes(personInfo.account_id)) {
      db.ref(`posts/${postId}/like/${account_id}`).remove()
    } else {
      db.ref(`posts/${postId}/like`).update({[account_id]: account_id})
    }
  }

  // 回覆推文
  const handleReply = async (postId) => {
    // const token = localStorage.getItem('token')
    // const post = postList.filter(item => item.id === postId)
    // const time = new Date()
    // const getTime = time.getTime()
    // const create_at = time.toLocaleString()

    // try {
    //   const res = await editPost({post, personInfo, token, replyModalInputValue, create_at, getTime})
      
    //   if (res) {
    //     setReplyModalInputValue('')
    //     const posts = await getPosts()
    //     setPostList(posts)
    //     const newPostData = posts.filter(post => post.id === postId)
    //     setReplyContainerId(newPostData[0])
    //     setIsOpenReplyModal(false)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    if (replyModalInputValue.length === 0) {
      return
    }
    let post = postList.filter(post => post.id === postId)
    post = post[0]
    const time = new Date()
    const getTime = time.getTime()
    const create_at = time.toLocaleString()
    const id = post.reply.length
    const fields = {
      account: personInfo.account,
      account_id: personInfo.account_id,
      content: replyModalInputValue,
      create_at,
      getTime,
      id,
      real_name: personInfo.real_name,
    }

    db.ref(`/posts/${postId}/reply`).update({[id]: fields})
    setReplyModalInputValue('')
    setIsOpenReplyModal(false)
  }

  const handleClickEditInfoModal = (isOpenEditInfoModal, form) => {
    setEditInfoModal(isOpenEditInfoModal)
    form.setFieldsValue({
      username: personInfo.real_name,
      introduction: personInfo.remark? personInfo.remark: '',
    })
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
        if (!resGetInfo.remark) {
          resGetInfo.remark = ''
        }
        setPersonInfo(resGetInfo)
        realNameRef.current = resGetInfo.real_name
        accountRef.current = resGetInfo.account
        remarkRef.current = resGetInfo.remark
        setUserList(resGetUsers)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken2')
        navigate('/login')
      }
    }
    checkTokenAsync()
  },[params.account_id, navigate])

  // 初始拿推文
  useEffect(() => {
    // const getPostsAsync = async () => {
    //   try {
    //     const res = await getPosts()
    //     setPostList(res)
        
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // getPostsAsync()
    const getPostsAsync = async () => {
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
  },[params.account_id])

  // 從其他頁面跳轉過來拿userData
  useEffect(() => {
    if (!params.account_id) {
      setUserData({
        account: '',
        account_id: personInfo.account_id,
        real_name: '',
        remark: '',
        email_status: '',
      })
      return
    }
    
    const listenPostList = () => {
      if (postList.length > 0) {
        let userDataTarget = postList.find(post => post.account_id === Number(params.account_id))
        setUserData((preProp) => {
          return ({
            ...preProp,
            account: userDataTarget.account,
            account_id: userDataTarget.account_id,
            real_name: userDataTarget.real_name,
            remark: userDataTarget.remark,
          })
        })
      }
      if (userList.length > 0) {
        let userDataTarget = userList.find(user => user.account_id === Number(params.account_id))
        if (userDataTarget) {
          setUserData((preProp) => {
            return ({
              ...preProp,
              email_status: userDataTarget.email_status,
            })
          })
        }
      }
    }
    listenPostList()
  }, [postList, userList, params.account_id, personInfo.account_id])
  
    // 設定語系
  useEffect(() => {
    const defaultLang = localStorage.getItem('defaultLanguage')
    changeLanguage(defaultLang)
  },[])

  return (
    <>
      <div className="mainContainer">
        <LeftContainer 
          information={params.account_id? Number(params.account_id) === personInfo.account_id? informationActive: '': informationActive} 
          onClickPost={() => {
            setPostingModal(true)
            setIsOpenReplyPage(false)
            setIsOpenFollowPage(false)
            setInfoTabControl(0)
          }}
          account_id={personInfo.account_id}
          onClickInfoTab= {() => {
            setUserData({
              account: '',
              account_id: personInfo.account_id,
              real_name: '',
              remark: '',
              email_status: '',
            })
            setInfoTabControl(0)
            setIsOpenReplyPage(false)
          }}
        ></LeftContainer>


        <InformationContainer
          isOpenReplyPage= {isOpenReplyPage}
          isOpenFollowPage= {isOpenFollowPage}
          realNameRef= {realNameRef}
          accountRef= {accountRef}
          remarkRef= {remarkRef}
          userData= {userData}
          postList= {postList}
          personInfo= {personInfo}
          backgroundUrl= {backgroundUrl}
          photoUrl= {photoUrl}
          onClickEditInfoModal= {handleClickEditInfoModal}
          onClickFollowPage= {(boolean) => setIsOpenFollowPage(boolean)}
          onClickFollowTabControl= {(e) => setFollowTabControl(e)}
          infoTabControl= {infoTabControl}
          onClickInfoTabControl= {(e) => setInfoTabControl(e)}
          onClickReply= {(postId) => {
            setIsOpenReplyPage(true)
            setReplyContainerId(postId)
          }}
          onClickLike= {handleClickLike}
          postingModal= {postingModal}
          onClickPostingModal= {(boolean) => setPostingModal(boolean)}
          postingContent= {postingContent}
          onClickPostingContent= {(boolean) => setPostingContent(boolean)}
          onClickPost= {handleClickPost}
          editInfoModal= {editInfoModal}
          onChangeUploadBackground= {handleUploadBackground}
          onClickBackgroundUrl= {(e) => setBackgroundUrl(e)}
          onChangeUploadPhoto= {handleUploadPhoto}
          onChangePersonInfo= {(personInfo) => setPersonInfo(personInfo)}
          onClickEditInfo= {handleClickEditInfo}
          isFollow= {userData.email_status === 1}
          onClickFollow= {handleClickFollowUser}
          onClickName= {() => setInfoTabControl(0)}
          isNotify= {isNotify}
          onClickNotify= {() => setIsNotify(!isNotify)}
        >
        </InformationContainer>

        <ReplyListContainer
          isOpenReplyPage={isOpenReplyPage} 
          isOpenReplyModal={isOpenReplyModal} 
          onClickOpenReplyPage={(boolean) => setIsOpenReplyPage(boolean)} 
          onClickOpenReplyModal={(boolean) => setIsOpenReplyModal(boolean)} 
          postId={replyContainerId} 
          postList={postList} 
          onClick={handleClickLike} 
          personInfo={personInfo} 
          replyModalInputValue={replyModalInputValue} 
          onChange={(value) => setReplyModalInputValue(value.target.value)} 
          onClickReply={handleReply}
          onClickName={() => {
            setIsOpenReplyPage(false)
            setInfoTabControl(0)
          }}>
        </ReplyListContainer>

        {/* followListContainer */}
        <div className={clsx("followListContainer", { follow: isOpenFollowPage})}>
          <div className="followListContainer-header">
            <img src={leftArrow} alt="leftArrow" className="header-back" onClick={() => setIsOpenFollowPage(false)}/>
            <div className="header-content">
              <div className="header-content-username">John Doe</div>
              <div className="header-content-postCount">25 {t("normal.post")}</div>
            </div>
          </div>
          <div className="followListContainer-tabs">
            <div className={clsx('tabs-tab', {active: followTabControl === 0})} onClick={() => setFollowTabControl(0)}>{t("normal.follower")}</div>
            <div className={clsx('tabs-tab', {active: followTabControl === 1})} onClick={() => setFollowTabControl(1)}>{t("normal.following")}</div>
          </div>
          <div className={clsx('followListContainer-follower', {active: followTabControl === 0})}>
            <FollowCard isFollow={isFollow} onClick={() => setIsFollow(!isFollow)}></FollowCard>
            <FollowCard isFollow={true}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
            <FollowCard isFollow={false}></FollowCard>
          </div>
          <div className={clsx('followListContainer-following', {active: followTabControl === 1})}>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
            <FollowCard isFollow={true} onClick={() => setIsFollow(false)}></FollowCard>
          </div>
        </div>

        <RightContainer onClick={handleClickFollowUser} userList={userList.slice(0, 20)}></RightContainer>
      </div>

      <ModalBackground active={postingModal || isOpenReplyModal || editInfoModal}></ModalBackground>
    </>
  )
}

export default InformationPage