import { Dropdown } from "antd"
import './style.css'
import { CaretDownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import flag_tw from '../../images/flag/taiwan.png'
import flag_us from '../../images/flag/united_states.png'


const LANG_LIST = ['cn', 'en'] // 未來要打API拿
const LANG_DATA = {
  cn: {
    flag: flag_tw,
    text: '繁體中文'
  },
  en: {
    flag: flag_us,
    text: 'English'
  },
}
const items = []
const getItems = (lists) => {
  lists.forEach(lang => {
    return (
      items.push({
        key: lang,
        label: (
          <div className="item">
            <img src={LANG_DATA[lang].flag} alt="flag" className="item-flag"/>
            <span className="item-text">{LANG_DATA[lang].text}</span>
          </div>
        ),
      })
    )
  })
}

const Language = ({placement, className, showText}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [defaultLang, setDefaultLang] = useState('cn') 

  // 切換語系
  const onClick = (e) => {
    localStorage.setItem('defaultLanguage', e.key)
    window.location.reload()
  }

  // 產語系列表
  useEffect(() => {
    const defaultLangLocal = localStorage.getItem('defaultLanguage')
    if (!defaultLangLocal) {
      localStorage.setItem('defaultLanguage', 'cn')
    } else {
      setDefaultLang(defaultLangLocal)
    }
    if (items.length === 0) {
      getItems(LANG_LIST)
    }
  },[defaultLang])

  return (
    <div className={`wrapper ${className}`}>
      <Dropdown 
        menu={{ items, onClick }}
        trigger={['click']}
        // autoAdjustOverflow={false} // 下拉框被遮挡时自动调整位置
        placement={placement}
        onOpenChange={(e) => setIsOpen(e)}
      >
        <div className="current-language">
          <img src={LANG_DATA[defaultLang].flag} alt="flag" className="current-language-flag"/>
          { showText? (
            <span className="current-language-text">{LANG_DATA[defaultLang].text}</span>
          ) : ''}
          <CaretDownOutlined 
            rotate={isOpen? 180: 0}
            className="arrow"
          /> 
        </div>
      </Dropdown>
    </div>
  )
}

export default Language