'use strict'

// Don't automatically add 'px' to these possibly-unitless properties.
// Borrowed from jquery.
var cssNumber = {
    'column-count': true,
    'fill-opacity': true,
    'flex-grow': true,
    'flex-shrink': true,
    'font-weight': true,
    'line-height': true,
    'opacity': true,
    'order': true,
    'orphans': true,
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
module.exports = function (rule) {
    var style = rule.style

    if (!style) return

    for (var prop in style) {
        if (!cssNumber[prop] && typeof style[prop] == 'number') {
            style[prop] += 'px'
        }
    }
}
