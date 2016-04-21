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


test('leave non-regular rules unchanged', function () {
  var ss = jss.createStyleSheet({
    '@font-face': {
      'font-family': 'MyHelvetica',
      src: 'local("Helvetica")'
    }
  })
  equal(ss.toString(), '@font-face {\n  font-family: MyHelvetica;\n  src: local("Helvetica");\n}')

  ss = jss.createStyleSheet({
    '@media print': {
      button: {
        'border-left': 1,
        'border': 3
      }
    }
  })
  equal(ss.toString(), '@media print {\n  .button--jss-0-4 {\n    border-left: 1px;\n    border: 3px;\n  }\n}')

  ss = jss.createStyleSheet({
    '@keyframes id': {
      from: {top: 0},
      '30%': {top: 30},
      '60%, 70%': {top: 80}
    }
  })
  equal(ss.toString(), '@keyframes id {\n  from {\n    top: 0;\n  }\n  30% {\n    top: 30px;\n  }\n  60%, 70% {\n    top: 80px;\n  }\n}')
})
