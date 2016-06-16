import numericProps from './numericProps'

/**
 * Recursive deep style passing function
 *
 * @param {(Object|Number|String)} value
 * @param {Object} options
 * @return {Object} resulting style
 */
function passStyle(style, options) {
  for (const prop in style) {
    switch (style[prop].constructor) {
      case Object:
        passStyle(style[prop], options)
        break
      case Array:
        for (const item in style[prop]) {
          style[prop][item] = checkForNumber(prop, style[prop][item], options)
        }
        break
      case Number:
        style[prop] = checkForNumber(prop, style[prop], options)
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
 * @param {(Object|Number|String)} item value
 * @param {Object} options
 * @return {String} string with units
 */
function checkForNumber(prop, item, options) {
  if (!numericProps[prop] && typeof item == 'number' && item !== 0) {
    item += options.unit
  }
  return item
}

/**
 * Add unit to numeric values.
 *
 * @param {Rule} rule
 * @api public
 */
export default function defaultUnit(options = { unit: 'px' }) {
  return rule => {
    const { style, type } = rule
    if (!style || type !== 'regular') return
    passStyle(style, options)
  }
}
