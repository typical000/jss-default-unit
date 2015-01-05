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
    var ss = new jss.StyleSheet({
        a: {zoom: 1}
    })
    equal(ss.toString(), 'a {\n  zoom: 1;\n}', 'is number')
})

test('values with units', function () {
    var ss = new jss.StyleSheet({
        a: {width: 10}
    })
    equal(ss.toString(), 'a {\n  width: 10px;\n}', 'px added')
})

