'use strict'

QUnit.module('defaultUnit plugin', {
  beforeEach: function () {
    jss.use(jssDefaultUnit.default({unit: 'px'}))
  },
  afterEach: function () {
    jss.plugins.registry = []
  }
})

QUnit.test('unitless values', function (assert) {
  var ss = jss.createStyleSheet({
    a: {zoom: 1}
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  zoom: 1;\n}', 'is number')
})

QUnit.test('values with units', function (assert) {
  var ss = jss.createStyleSheet({
    a: {width: 10}
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  width: 10px;\n}', 'px added')
})


QUnit.test('leave non-regular rules unchanged', function (assert) {
  var ss = jss.createStyleSheet({
    '@font-face': {
      'font-family': 'MyHelvetica',
      src: 'local("Helvetica")'
    }
  })
  assert.equal(ss.toString(), '@font-face {\n  font-family: MyHelvetica;\n  src: local("Helvetica");\n}')

  ss = jss.createStyleSheet({
    '@media print': {
      button: {
        'border-left': 1,
        'border': 3
      }
    }
  }, {named: false})
  assert.equal(ss.toString(), '@media print {\n  button {\n    border-left: 1px;\n    border: 3px;\n  }\n}')

  ss = jss.createStyleSheet({
    '@keyframes id': {
      from: {top: 0},
      '30%': {top: 30},
      '60%, 70%': {top: 80}
    }
  })
  assert.equal(ss.toString(), '@keyframes id {\n  from {\n    top: 0;\n  }\n  30% {\n    top: 30px;\n  }\n  60%, 70% {\n    top: 80px;\n  }\n}')
})

QUnit.test('values in arrays', function (assert) {
  var ss = jss.createStyleSheet({
    a: {padding: [10, 15]}
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  padding: 10px;\n  padding: 15px;\n}', 'is number')
})
