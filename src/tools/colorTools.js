/**
 * #FFFFFF 轉數字
 *
 * @param {string} hex
 * @return {number}
 */
const hexToNumber = hex => {
  return hex.charAt(0) === '#' ? `0x${hex.slice(1)}` * 1 : hex * 1
}

/**
 * 數字轉 #FFFFFF
 *
 * @param {*} num
 * @return {*}
 */
const numberToHex = num => {
  let _str = num.toString(16)
  while (_str.length < 6) {
    _str = `0${_str}`
  }
  return `#${_str}`
}

export { hexToNumber, numberToHex }
