'use strict'

QUnit.module('Px plugin', {
    setup: function () {
        jss.use(jssPx)
    },
    teardown: function () {
        jss.plugins.registry = []
    }
})

test('unitless values', function () {
    var ss = jss.createStyleSheet({
        a: {zoom: 1}
    }, {named: false})
    equal(ss.toString(), 'a {\n  zoom: 1;\n}', 'is number')
})

test('values with units', function () {
    var ss = jss.createStyleSheet({
        a: {width: 10}
    }, {named: false})
    equal(ss.toString(), 'a {\n  width: 10px;\n}', 'px added')
})

