import _ from 'lodash';

/**
 * 数字转整数 如 100000 转为10万
 * @param {需要转化的数} num
 * @param {需要保留的小数位数} point
 */
export function tranNumber(num, point = 1) {
  const numStr = num.toString();
  num = _.toNumber(num);

  // 大于8位数是亿
  if (numStr.length > 8) {
    const decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
    return parseFloat(parseInt((num / 100000000).toString()) + '.' + decimal) + '亿';
  }

  // 大于6位数是十万 (以10W分割 10W以下全部显示)
  if (numStr.length >= 5) {
    const decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point);
    return parseFloat(parseInt((num / 10000).toString()) + '.' + decimal) + '万';
  }

  return numStr;
}
