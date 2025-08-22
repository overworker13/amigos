export function DateFormat(date, format = "d.m.Y") {
  if (date === null || date === undefined || date === "") return ""

  if (typeof date === "string") {
    date = new Date(date)
  }

  let day = date.getDate() + ""
  if (day.length === 1) day = "0" + day

  let month = date.getMonth() + 1 + ""
  if (month.length === 1) month = "0" + month

  let hour = date.getHours() + ""
  if (hour.length === 1) hour = "0" + hour

  let minutes = date.getMinutes() + ""
  if (minutes.length === 1) minutes = "0" + minutes

  format = format.replace("d", day)
  format = format.replace("m", month)
  format = format.replace("Y", date?.getFullYear())
  format = format.replace("H", hour)
  format = format.replace("i", minutes)

  return format
}
