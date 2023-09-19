import { Dropdown } from "antd"
import './style.css'
import { CaretDownOutlined } from "@ant-design/icons";
import { useState } from "react";

const LANG_LIST = ['CN', 'EN'] // 未來要打API拿
const defaultLang = localStorage.getItem('defaultLanguage')
const lang = {
  cn: {
    flag: 'fi-tw'
  },
  en: {
    flag: 'fi-us'
  },
}
const items = [
  {
    key: 'cn',
    label: (
      <div>
        <span className="fi fi-tw"></span>
        <span className="itemText">繁體中文</span>
      </div>
    ),
  },
  {
    key: 'en',
    label: (
      <div>
        <span className="fi fi-us"></span>
        <span className="itemText">English</span>
      </div>
    ),
  },
];

const Language = ({placement}) => {
  
  const [isOpen, setIsOpen] = useState(false)
  const onClick = (e) => {
    localStorage.setItem('defaultLanguage', e.key)
    window.location.reload()
  }

  return (
    <div className="wrapper">
      <Dropdown 
        menu={{ items, onClick }}
        trigger={['click']}
        autoAdjustOverflow={false} // 下拉框被遮挡时自动调整位置
        placement={placement}
        onOpenChange={(e) => setIsOpen(e)}
      >
        <div>
          <span className={`fi ${lang[defaultLang].flag}`}></span>
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