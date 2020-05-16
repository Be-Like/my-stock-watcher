/**
 * Returns string formatted number
 * @param { number } value The value to be converted
 * @param { number } decimalCount The precision of the value
 * @param { char } decimal The character representing split between whole and fractional numbers
 * @param { char } thousands The character represented for every three characters in a number
 * @returns { string } formatted number
 */
export const formatNumber = (
    value,
    decimalCount = 0,
    decimal = '.',
    thousands = ','
) => {
  const negSign = value < 0 ? '-' : ''

  let i = parseInt(value = Math.abs(Number(value) || 0).toFixed(decimalCount)).toString()
  let j = (i.length > 3) ? i.length % 3 : 0

  return negSign +
    (j ? i.substr(0, j) + thousands : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
    (decimalCount ? decimal + Math.abs(value - i).toFixed(decimalCount).slice(2) : '')
}

let monthNames = [
  "Jan","Feb","Mar",
  "Apr","May","Jun",
  "Jul","Aug","Sep",
  "Oct","Nov","Dec"
]

/**
 * Format date to MMM DD, YYYY string
 * @param { Date } passedDate The date to be formatted as MMM DD, YYY
 * @returns { String } formatted date as MMM DD, YYYY
 */
export const formatDate = passedDate => {
  let date = new Date(passedDate)

  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()

  return `${monthNames[month]} ${day}, ${year}`
}

/**
 * Format time as standard or military
 * @param { Date } passedDate The date to format time from
 * @param { Boolean } standard Is this standard or military time
 * @returns { String } The string time
 */
export const formatTime = (passedDate, standard = false) => {
  let date = new Date(passedDate)

  let hour = date.getHours()
  let minute = date.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  let second = date.getSeconds()
  second = second < 10 ? '0' + second : second

  if (standard) {
    return
  } else {
    hour = hour < 10 ? `0${hour}` : hour
    return `${hour}:${minute}:${second}`
  }
}
