import numericProps from './numericProps'

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
      if (!numericProps[prop] && typeof style[prop] == 'number' && style[prop] !== 0) {
        style[prop] += options.unit
      }
    }
  }
}
