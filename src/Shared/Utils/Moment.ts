export default () => {
  const tempDate = new Date()
  return `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`
}

export const MomentDateTime = () => {
  const currentDate = new Date()

  const month = currentDate.getMonth() > 8
                ? (currentDate.getMonth() + 1)
                : `0${currentDate.getMonth() + 1}`
  const day = currentDate.getDate() > 9 ? currentDate.getDate() : `0${currentDate.getDate()}`
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds()

  return `${currentDate.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
