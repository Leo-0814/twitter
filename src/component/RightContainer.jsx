import Button from "./Button"
import userPhoto from '../images/userPhoto.png'
import { Photo } from "./common/photo.styled"
import ButtonHollow from "./Button-hollow"
import { useTranslation } from "react-i18next"

const RightContainer = ({onClick, userList}) => {
  const {t} = useTranslation()

  return (
    <div className="rightContainer">
      <div className="rightContainer-area">
        <div className="rightContainer-area-title">{t("normal.follow.recommend")}</div>
        <div className="rightContainer-area-list">
          {userList.map((user) => {
            let short_account_id = ''
            let short_account = ''
            if (user.email_status === 1) {
              short_account = user.account.slice(0,6) + ' ...'
              short_account_id = user.account_id.toString().slice(0,6) + '...'
            } else {
              short_account = user.account.slice(0,10) + ' ...'
              short_account_id = user.account_id.toString()
            }

            if (user.email_status === 1) {
              return(
                <div className="area-list-followList" key={short_account_id}>
                  <Photo src={userPhoto} alt="" className="followList-img" />
                  <div className="followList-content">
                    <div className="followList-content-username">{short_account}</div>
                    <div className="followList-content-account">@{short_account_id}</div>
                  </div>
                  <Button className="followList-content-btn" onClick={() => {onClick?.(user.account_id)}}>{t("normal.following")}</Button>
                </div>
              )
            } else {
              return(
                <div className="area-list-followList" key={short_account_id}>
                  <Photo src={userPhoto} alt="" className="followList-img" />
                  <div className="followList-content">
                    <div className="followList-content-username">{short_account}</div>
                    <div className="followList-content-account">@{short_account_id}</div>
                  </div>
                  <ButtonHollow className="followList-content-btn-hollow" onClick={() => {onClick?.(user.account_id)}}>{t("normal.follow")}</ButtonHollow>
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