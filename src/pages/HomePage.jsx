import home from '../images/_base/home.png'
import information from '../images/_base/information.png'
import setting from '../images/_base/setting.png'
import logOut from '../images/_base/logOut.png'
import logo from '../images/Logo.png'
import answer from '../images/_base/answer.png'
import follow from '../images/_base/follow.png'
import { LogoIcon } from '../component/common/logo.styled'
import Button from '../component/Button'

const HomePage = () => {
  return (
    <div className="mainContainer">
      <div className="leftContainer">
        <LogoIcon src={logo} alt="" className="logo" />
        <div className="leftContainer-list">
          <div className="leftContainer-list-item">
            <img src={home} alt="home" className="leftContainer-list-icon" />
            <div className="leftContainer-list-text">首頁</div>
          </div>
          <div className="leftContainer-list-item">
            <img src={information} alt="information" className="leftContainer-list-icon" />
            <div className="leftContainer-list-text">個人資料</div>
          </div>
          <div className="leftContainer-list-item">
            <img src={setting} alt="setting" className="leftContainer-list-icon" />
            <div className="leftContainer-list-text">設定</div>
          </div>
          <Button className="leftContainer-list-postBtn">推文</Button>
          <div className="leftContainer-list-item leftContainer-list-logOut">
            <img src={logOut} alt="logOut" className="leftContainer-list-icon" />
            <div className="leftContainer-list-text">登出</div>
          </div>
        </div>
      </div>

      <div className="centerContainer">
        <div className="centerContainer-title">首頁</div>
        <div className="centerContainer-posting">
          <LogoIcon src={logo} alt="" className="posting-img" />
          <div className="posting-content">有什麼新鮮事?</div>
          <Button className='posting-btn'>推文</Button>
        </div>
        <div className="centerContainer-post">
          <div className="post-card">
            <LogoIcon src={logo} alt="" className="post-card-img" />
            <div className="post-card-data">
              <div className="card-data-header">
                <div className="data-header-userName">Apple</div>
                <div className="data-header-account">@apple</div>
                <span className='data-header-dot'>．</span>
                <div className="data-header-time">3小時</div>
              </div>
              <div className="card-data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
              <div className="card-data-footer">
                <div className="data-footer-item">
                  <img src={answer} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">13</div>
                </div>
                <div className="data-footer-item">
                  <img src={follow} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">76</div>
                </div>
              </div>
            </div>
          </div>
          <div className="post-card">
            <LogoIcon src={logo} alt="" className="post-card-img" />
            <div className="post-card-data">
              <div className="card-data-header">
                <div className="data-header-userName">Apple</div>
                <div className="data-header-account">@apple</div>
                <span className='data-header-dot'>．</span>
                <div className="data-header-time">3小時</div>
              </div>
              <div className="card-data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
              <div className="card-data-footer">
                <div className="data-footer-item">
                  <img src={answer} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">13</div>
                </div>
                <div className="data-footer-item">
                  <img src={follow} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">76</div>
                </div>
              </div>
            </div>
          </div>
          <div className="post-card">
            <LogoIcon src={logo} alt="" className="post-card-img" />
            <div className="post-card-data">
              <div className="card-data-header">
                <div className="data-header-userName">Apple</div>
                <div className="data-header-account">@apple</div>
                <span className='data-header-dot'>．</span>
                <div className="data-header-time">3小時</div>
              </div>
              <div className="card-data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
              <div className="card-data-footer">
                <div className="data-footer-item">
                  <img src={answer} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">13</div>
                </div>
                <div className="data-footer-item">
                  <img src={follow} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">76</div>
                </div>
              </div>
            </div>
          </div>
          <div className="post-card">
            <LogoIcon src={logo} alt="" className="post-card-img" />
            <div className="post-card-data">
              <div className="card-data-header">
                <div className="data-header-userName">Apple</div>
                <div className="data-header-account">@apple</div>
                <span className='data-header-dot'>．</span>
                <div className="data-header-time">3小時</div>
              </div>
              <div className="card-data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
              <div className="card-data-footer">
                <div className="data-footer-item">
                  <img src={answer} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">13</div>
                </div>
                <div className="data-footer-item">
                  <img src={follow} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">76</div>
                </div>
              </div>
            </div>
          </div>
          <div className="post-card">
            <LogoIcon src={logo} alt="" className="post-card-img" />
            <div className="post-card-data">
              <div className="card-data-header">
                <div className="data-header-userName">Apple</div>
                <div className="data-header-account">@apple</div>
                <span className='data-header-dot'>．</span>
                <div className="data-header-time">3小時</div>
              </div>
              <div className="card-data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
              <div className="card-data-footer">
                <div className="data-footer-item">
                  <img src={answer} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">13</div>
                </div>
                <div className="data-footer-item">
                  <img src={follow} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">76</div>
                </div>
              </div>
            </div>
          </div>
          <div className="post-card">
            <LogoIcon src={logo} alt="" className="post-card-img" />
            <div className="post-card-data">
              <div className="card-data-header">
                <div className="data-header-userName">Apple</div>
                <div className="data-header-account">@apple</div>
                <span className='data-header-dot'>．</span>
                <div className="data-header-time">3小時</div>
              </div>
              <div className="card-data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
              <div className="card-data-footer">
                <div className="data-footer-item">
                  <img src={answer} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">13</div>
                </div>
                <div className="data-footer-item">
                  <img src={follow} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">76</div>
                </div>
              </div>
            </div>
          </div>
          <div className="post-card">
            <LogoIcon src={logo} alt="" className="post-card-img" />
            <div className="post-card-data">
              <div className="card-data-header">
                <div className="data-header-userName">Apple</div>
                <div className="data-header-account">@apple</div>
                <span className='data-header-dot'>．</span>
                <div className="data-header-time">3小時</div>
              </div>
              <div className="card-data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
              <div className="card-data-footer">
                <div className="data-footer-item">
                  <img src={answer} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">13</div>
                </div>
                <div className="data-footer-item">
                  <img src={follow} alt="" className="footer-item-icon" />
                  <div className="footer-item-count">76</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rightContainer"></div>
    </div>
  )
}

export default HomePage