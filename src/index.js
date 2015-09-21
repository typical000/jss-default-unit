// Don't automatically add 'px' to these possibly-unitless properties.
// Borrowed from jquery.
const cssNumber = {
  'animation-iteration-count': true,
  'box-ordinal-group': true,
  'column-count': true,
  'fill-opacity': true,
  'flex': true,
  'flex-grow': true,
  'flex-order': true,
  'flex-shrink': true,
  'font-weight': true,
  'line-height': true,
  'opacity': true,
  'order': true,
  'orphans': true,
  'stop-opacity': true,
  'tab-size': 1,
  'widows': true,
  'z-index': true,
  'zoom': true
}

/**
 * Add px to numeric values.
 *
 * @param {Rule} rule
 * @api public
 */
export default function jssPx(rule) {
  const style = rule.style

  if (!style) return

  for (let prop in style) {
    if (!cssNumber[prop] && typeof style[prop] == 'number') {
      style[prop] += 'px'
    }
  }
}
