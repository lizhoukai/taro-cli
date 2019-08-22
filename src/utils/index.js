/**
 * 过滤小数点位数
 * @param {String || Number} n [原始数值]
 * @param {Number} pos [过滤几位小数]
 */
export function fomatFloat(n, pos) {
  return Math.floor(n * Math.pow(10, pos)) / Math.pow(10, pos)
}
