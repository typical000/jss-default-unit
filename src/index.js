import defaultUnits from './defaultUnits'

/**
 * Clones the object and adds a camel cased property version.
 */
function addCamelCasedVersion(obj) {
  const regExp = /(-[a-z])/g
  const replace = str => str[1].toUpperCase()
  const newObj = {}
  for (const key in obj) {
    newObj[key] = obj[key]
    newObj[key.replace(regExp, replace)] = obj[key]
  }
  return newObj
}

const units = addCamelCasedVersion(defaultUnits)

/**
 * Recursive deep style passing function
 *
 * @param {String} current property
 * @param {(Object|Array|Number|String)} property value
 * @param {Object} options
 * @return {(Object|Array|Number|String)} resulting value
 */
function iterate(prop, value, options) {
  if (!value) return value

  let convertedValue = value
  switch (value.constructor) {
    case Object:
      if (prop === 'fallbacks') {
        for (const innerProp in value) {
          value[innerProp] = iterate(innerProp, value[innerProp], options)
        }
        break
      }
      for (const innerProp in value) {
        value[innerProp] = iterate(`${prop}-${innerProp}`, value[innerProp], options)
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
  if (typeof value === 'number' && value !== 0) {
    value += options[prop] || units[prop] || ''
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
  return (rule) => {
    const {style, type} = rule
    if (!style || type !== 'regular') return
    for (const prop in style) {
      style[prop] = iterate(prop, style[prop], addCamelCasedVersion(options))
    }
  }
}
