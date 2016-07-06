import numericProps from './numericProps'

/**
 * Recursive deep style passing function
 *
 * @param {Object} original style
 * @param {Object} options
 * @return {Object} resulting style
 */
function iterate(style, options) {
  for (const prop in style) {
    switch (style[prop].constructor) {
      case Object:
        iterate(style[prop], options)
        break
      case Array:
        for (const item in style[prop]) {
          style[prop][item] = addUnit(prop, style[prop][item], options)
        }
        break
      case Number:
        style[prop] = addUnit(prop, style[prop], options)
        break
      default:
        break
    }
  }
  return style
}

/**
 * Check if default unit must be added
 *
 * @param {String} current property
 * @param {(Object|Number|String)} property value
 * @param {Object} options
 * @return {String} string with units
 */
function addUnit(prop, value, options) {
  if (!numericProps[prop] && typeof value == 'number' && value !== 0) {
    value += options.unit
  }
  return value
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
    iterate(style, options)
  }
}
