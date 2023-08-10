import Button from "./Button"
import userPhoto from '../images/userPhoto.png'
import { Photo } from "./common/photo.styled"
import { useEffect, useState } from "react"
import { getUsers } from "../api/info"
import ButtonHollow from "./Button-hollow"

const RightContainer = ({onClick}) => {
  const [ userList, setUserList ] = useState([])
  const adminToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FkbWluYXBpLmJhbGwxODguY2MvYWRtaW4vbG9naW4iLCJpYXQiOjE2OTE2Mzk4NDUsImV4cCI6MTY5MTgxMjY0NSwibmJmIjoxNjkxNjM5ODQ1LCJqdGkiOiJVbFJ4amlFMjNXcnFCb28wIiwic3ViIjoiMjUiLCJwcnYiOiJjODI5MjIzODM1ZDExMTM4ZjA4YWNlNTZmZmE2NjI4YmMyNjgzY2I1In0.u2v2srj3SlpsAzbuC2Lep0M7TCW7gv92qdtDv43kj7w'

  useEffect(() => {
    const getUsersAsync = async () => {
      try {
        const res = await getUsers(adminToken)
        
        if (res) {
          setUserList(res)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUsersAsync()
  },[])

  return (
    <div className="rightContainer">
      <div className="rightContainer-area">
        <div className="rightContainer-area-title">推薦跟隨</div>
        <div className="rightContainer-area-list">
          {userList.map((user) => {
            let short_account_id = ''
            let short_account = ''
            if (user.email_status === 1) {
              short_account = user.account.slice(0,6) + ' ...'
            } else {
              short_account = user.account.slice(0,8) + ' ...'
            }
            
            if (user.account_id.toString().length >= 6) {
              short_account_id = user.account_id.toString().slice(0,6) + '...'
            }
            if (user.email_status === 1) {
              return(
                <div className="area-list-followList" key={short_account_id}>
                  <Photo src={userPhoto} alt="" className="followList-img" />
                  <div className="followList-content">
                    <div className="followList-content-username">{short_account}</div>
                    <div className="followList-content-account">@{short_account_id}</div>
                  </div>
                  <Button className="followList-content-btn" onClick={() => {onClick?.(user.account_id)}}>正在跟隨</Button>
                </div>
              )
            } else {
              return(
                <div className="area-list-followList" key={short_account_id}>
                  <Photo src={userPhoto} alt="" className="followList-img" />
                  <div className="followList-content">
                    <div className="followList-content-username">{user.account}</div>
                    <div className="followList-content-account">@{user.account_id}</div>
                  </div>
                  <ButtonHollow className="followList-content-btn-hollow" onClick={() => {onClick?.(user.account_id)}}>跟隨</ButtonHollow>
                </div>
              )
            }
            
          })}
        </div>
      </div>
    </div>
  )
}

export default RightContainer