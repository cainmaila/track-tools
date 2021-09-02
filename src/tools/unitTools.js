function unitToKey(unit) {
  switch (unit) {
    case 'm':
      return 0
    case 'cm':
      return 1
    case 'mm':
      return 2
    case 'ft':
      return 3
    case 'in':
      return 4
    default:
      return 0
  }
}

function keyToUnit(key) {
  switch (key) {
    case 0:
      return 'm'
    case 1:
      return 'cm'
    case 2:
      return 'mm'
    case 3:
      return 'ft'
    case 4:
      return 'in'
    default:
      return 'm'
  }
}

/* m/單位 */
function toMsc(unit) {
  switch (unit) {
    case 'm':
      return 1
    case 'cm':
      return 0.01
    case 'mm':
      return 0.001
    case 'ft':
      return 0.3048
    case 'in':
      return 0.0254
    default:
      return 1
  }
}

/* 某單位 轉 m */
function unitToM(len, unit) {
  return len * toMsc(unit)
}

/* m 轉 某單位 */
function mToUnit(m, unit) {
  return m / toMsc(unit)
}

/* px 轉 m */
function pxToM(px, sc, unit) {
  return (px / sc) * toMsc(unit)
}

/* m 轉 px */
function mToPx(m, sc, unit) {
  return mToUnit(m, unit) * sc
}

export { unitToKey, keyToUnit, toMsc, pxToM, mToPx, unitToM, mToUnit }
