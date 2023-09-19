import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import cn from "../locales/cn.json";
import en from "../locales/en.json";

const resources = {
  en: { translation: en },
  cn: { translation: cn },
}

i18n
  .use(initReactI18next)  // 將 i18next 傳入 react-i18next 裡面
  .init({ // 實例化 initReactI18next
    resources,
    // 當目前的語言檔找不到對應的字詞時，會用 fallbackLng (en) 作為預設語言
    fallbackLng: "cn",
    // 預設語言
    lng: "cn",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;