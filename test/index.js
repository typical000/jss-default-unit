'use strict'

var jss = jss.create();

QUnit.module('defaultUnit plugin', {
  beforeEach: function () {
    jss.use(jssDefaultUnit.default({'min-width': 'pc'}))
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

QUnit.test('values with px units', function (assert) {
  var ss = jss.createStyleSheet({
    a: {width: 10}
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  width: 10px;\n}', 'px added')
})

QUnit.test('values with ms units', function (assert) {
  var ss = jss.createStyleSheet({
    a: {'animation-duration': 200}
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  animation-duration: 200ms;\n}', 'ms added')
})

QUnit.test('values with % units', function (assert) {
  var ss = jss.createStyleSheet({
    a: {'transform-origin-x': 50}
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  transform-origin-x: 50%;\n}', '% added')
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

QUnit.test('comma-separated values', function (assert) {
  var ss = jss.createStyleSheet({
    a: {'background-size': [10, 15]}
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  background-size: 10px, 15px;\n}', 'has px units')
})

QUnit.test('space-separated values', function (assert) {
  var ss = jss.createStyleSheet({
    a: {'background-size': [[10, 15]]}
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  background-size: 10px 15px;\n}', 'has px units')
})

QUnit.test('space-separated values (advanced)', function (assert) {
  var ss = jss.createStyleSheet({
    a: {border: [[1, 'solid', 'red'], [1, 'solid', 'blue']]}
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  border: 1px solid red, 1px solid blue;\n}', 'has px units')
})

QUnit.test('values in objects', function (assert) {
  var ss = jss.createStyleSheet({
    a: {
      width: 5,
      fallbacks: {
        'background-size': [[10, 5]]
      }
    }
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  background-size: 10px 5px;\n  width: 5px;\n}', 'has px units')
})

QUnit.test('customized units via options object', function (assert) {
  var ss = jss.createStyleSheet({
    a: {'min-width': 20}
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  min-width: 20pc;\n}', 'has pica unit')
})

QUnit.test('ignore falsy values', function (assert) {
  var ss = jss.createStyleSheet({
    a: {padding: 10, margin: null}
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  padding: 10px;\n}', 'has padding, no margin')
})
