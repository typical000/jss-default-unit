'use strict'

QUnit.module('defaultUnit plugin', {
  setup: function () {
    jss.use(jssDefaultUnit.default({unit: 'px'}))
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

