// Don't automatically add unit to these possibly-unitless properties.
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
  'tab-size': true,
  'widows': true,
  'z-index': true,
  'zoom': true
}

/**
 * Add unit to numeric values.
 *
 * @param {Rule} rule
 * @api public
 */
export default function defaultUnit(options = {unit: 'px'}) {
  return rule => {
    const {style, type} = rule
    if (!style || type !== 'regular') return
    for (const prop in style) {
      if (!cssNumber[prop] && typeof style[prop] == 'number' && style[prop] !== 0) {
        style[prop] += options.unit
      }
    }
  }
}
