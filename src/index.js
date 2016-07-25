import defaultUnits from './defaultUnits'

/**
 * Recursive deep style passing function
 *
 * @param {String} current property
 * @param {(Object|Array|Number|String)} property value
 * @param {Object} options
 * @return {(Object|Array|Number|String)} resulting value
 */
function iterate(prop, value, options) {
  let convertedValue = value
  switch (value.constructor) {
    case Object:
      for (const innerProp in value) {
        value[innerProp] = iterate(innerProp, value[innerProp], options)
      }
      break
    case Array:
      for (let i = 0; i < value.length; i++) {
        value[i] = iterate(prop, value[i], options)
      }
      break
    case Number:
      convertedValue = addUnit(prop, value, options)
      break
    default:
      break
  }
  return convertedValue
}

/**
 * Check if default unit must be added
 *
 * @param {String} current property
 * @param {(Object|Array|Number|String)} property value
 * @param {Object} options
 * @return {String} string with units
 */
function addUnit(prop, value, options) {
  if (typeof value == 'number' && value !== 0) {
    value += options[prop] || defaultUnits[prop] || ''
  }
  return value
}

/**
 * Add unit to numeric values.
 *
 * @param {Rule} rule
 * @api public
 */
export default function defaultUnit(options = {}) {
  return rule => {
    const {style, type} = rule
    if (!style || type !== 'regular') return
    for (const prop in style) {
      style[prop] = iterate(prop, style[prop], options)
    }
  }
}
