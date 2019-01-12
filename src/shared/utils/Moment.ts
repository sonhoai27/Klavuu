export default () => {
  const tempDate = new Date()
  return `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`
}
