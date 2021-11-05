import millify from 'millify';

export const millifyBigInt = (value) => {
  if (value <= Number.MAX_SAFE_INTEGER) return millify(value)

  let strValue = value.toString()

  if (strValue.length > 18) {
    return strValue.substring(0, strValue.length - 18) + 'Qn'
  }
  if (strValue.length > 15) {
    return strValue.substring(0, strValue.length - 15) + 'Qd'
  }
}