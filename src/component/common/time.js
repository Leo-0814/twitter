export const timeDifferent = (lastTime, t) => {
  const nowTime = new Date()
  const timeReduce = nowTime.getTime() - lastTime
  
  if (timeReduce / 1000 < 60) {
    const sec = Math.floor(timeReduce / 1000)
    return `${sec}${t("normal.sec")}${t("normal.ago")}`
  } else if (timeReduce / 1000 / 60 < 60) {
    const min = Math.floor(timeReduce / 1000 / 60)
    return `${min}${t("normal.min")}${t("normal.ago")}`
  } else if (timeReduce / 1000 / 60 / 60 < 24) {
    const hour = Math.floor(timeReduce / 1000 / 60 / 60)
    return `${hour}${t("normal.hour")}${t("normal.ago")}`
  } else {
    const day = Math.floor(timeReduce / 1000 / 60 / 60 / 24)
    return `${day}${t("normal.day")}${t("normal.ago")}`
  } 
}