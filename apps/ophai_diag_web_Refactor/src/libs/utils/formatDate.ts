export const formatDate = (dateArray: string, dateTime:boolean = false) => {
  console.log(dateArray)
  if (!dateArray || dateArray.length < 5) return '无效日期'
  const [year, month, day, hour, time] = dateArray
  // 使用 padStart 补零
  const paddedMonth = month.toString().padStart(2, '0')
  const paddedDay = day.toString().padStart(2, '0')
  if(dateTime){
    const paddedHour = hour.toString().padStart(2, '0')
    const paddedTime = time.toString().padStart(2, '0')
    return `${year}-${paddedMonth}-${paddedDay} ${paddedHour}:${paddedTime}`;
  }
  return `${year}-${paddedMonth}-${paddedDay}`
}