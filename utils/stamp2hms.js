/**
 * 将时间戳（秒）转换为时分秒,
 * H:mm:ss,
 * 3661 => 1:01:01
 * @param value
 * @returns
 */
export function parseTimestamp(value) {
  if (value === 0) return '';

  const m = Math.floor(value / 60);
  const s = value % 60;

  const sTem = s < 10 ? `0${s}` : s.toString();
  let mTem = m < 10 ? `0${m}` : m.toString();

  if (m >= 60) {
    const h = Math.floor(m / 60);
    const _m = m % 60;

    mTem = _m < 10 ? `0${_m}` : _m.toString();

    return `${h}:${mTem}:${sTem}`;
  } else {
    return `${mTem}:${sTem}`;
  }
}
