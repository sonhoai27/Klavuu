export default () => {
  const tempDate = new Date()
  const month = tempDate.getMonth() > 8 ? (tempDate.getMonth() + 1) : `0${tempDate.getMonth() + 1}`
  const day = tempDate.getDate() > 9 ? tempDate.getDate() : `0${tempDate.getDate()}`
  const hours = tempDate.getHours()
  const minutes = tempDate.getMinutes();
  const seconds = tempDate.getUTCMilliseconds()

  return `${tempDate.getFullYear()}${month}${day}${seconds}${minutes}${hours}`
}
