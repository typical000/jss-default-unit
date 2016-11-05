import expect from 'expect.js'
import expand from 'jss-expand'
import {create} from 'jss'

import defaultUnit from './index'

describe('jss-default-unit', () => {
  let jss

  beforeEach(() => {
    jss = create().use(defaultUnit({'min-width': 'pc'}))
  })

  describe('unitless values', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          zoom: 1
        }
      }, {named: false})
    })

    it('should add rule', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  zoom: 1;\n' +
        '}'
      )
    })
  })

  describe('values with px units', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          width: 10
        }
      }, {named: false})
    })

    it('should add rule', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  width: 10px;\n' +
        '}'
      )
    })
  })

  describe('values with ms units', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          'animation-duration': 200
        }
      }, {named: false})
    })

    it('should add rule', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  animation-duration: 200ms;\n' +
        '}'
      )
    })
  })

  describe('values with % units', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          'transform-origin-x': 50
        }
      }, {named: false})
    })

    it('should add rule', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  transform-origin-x: 50%;\n' +
        '}'
      )
    })
  })

  describe('leave non-regular rules unchanged', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        '@font-face': {
          'font-family': 'MyHelvetica',
          src: 'local("Helvetica")'
        },
        '@media print': {
          button: {
            'border-left': 1,
            border: 3
          }
        },
        '@keyframes id': {
          from: {top: 0},
          '30%': {top: 30},
          '60%, 70%': {top: 80}
        }
      }, {named: false})
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        '@font-face {\n' +
        '  font-family: MyHelvetica;\n' +
        '  src: local("Helvetica");\n' +
        '}\n' +
        '@media print {\n' +
        '  button {\n' +
        '    border-left: 1px;\n' +
        '    border: 3px;\n' +
        '  }\n' +
        '}\n' +
        '@keyframes id {\n' +
        '  from {\n' +
        '    top: 0;\n' +
        '  }\n' +
        '  30% {\n' +
        '    top: 30px;\n' +
        '  }\n' +
        '  60%, 70% {\n' +
        '    top: 80px;\n' +
        '  }\n' +
        '}'
      )
    })
  })

  describe('comma-separated values', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          'background-size': [10, 15]
        }
      }, {named: false})
    })

    it('should add rule', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  background-size: 10px, 15px;\n' +
        '}'
      )
    })
  })

  describe('comma-separated values', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          'background-size': [[10, 5]]
        }
      }, {named: false})
    })

    it('should add rule', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  background-size: 10px 5px;\n' +
        '}'
      )
    })
  })

  describe('customized units via options object', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          'min-width': 20
        }
      }, {named: false})
    })

    it('should add rule', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  min-width: 20pc;\n' +
        '}'
      )
    })
  })

  describe('ignore falsy values', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          padding: 10,
          margin: null
        }
      }, {named: false})
    })

    it('should add rule', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  padding: 10px;\n' +
        '}'
      )
    })
  })

  describe('add default units to fallbacks', () => {
    let sheet

    beforeEach(() => {
      const localJss = create().use(defaultUnit(), expand())
      sheet = localJss.createStyleSheet({
        a: {
          padding: 0,
          fallbacks: {
            padding: 5
          }
        },
        b: {
          padding: 0,
          fallbacks: [
            {padding: 5},
            {padding: 10}
          ]
        }
      }, {named: false})
    })

    it('should add rule', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
      expect(sheet.getRule('b')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  padding: 5px;\n' +
        '  padding: 0;\n' +
        '}\n' +
        'b {\n' +
        '  padding: 5px;\n' +
        '  padding: 10px;\n' +
        '  padding: 0;\n' +
        '}'
      )
    })
  })

  describe('add default units in combination with expand plugin', () => {
    let sheet

    beforeEach(() => {
      const localJss = create().use(defaultUnit({'padding-top': 'rem'}), expand())
      sheet = localJss.createStyleSheet({
        a: {
          padding: {
            top: 5,
            left: 0,
            right: 10,
            bottom: 15
          }
        }
      }, {named: false})
    })

    it('should add rule', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  padding: 5rem 10px 15px 0;\n' +
        '}'
      )
    })
  })

  describe('add default units in combination with expand plugin (objects inside arrays)', () => {
    let sheet

    beforeEach(() => {
      const localJss = create().use(defaultUnit(), expand())
      sheet = localJss.createStyleSheet({
        a: {
          transition: [{
            timingFunction: 'linear',
            delay: 100,
            property: 'opacity',
            duration: 200
          }, {
            timingFunction: 'linear',
            property: 'transform',
            duration: 300
          }]
        }
      }, {named: false})
    })

    it('should add rule', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  transition: opacity 200ms linear 100ms, transform 300ms linear;\n' +
        '}'
      )
    })
  })
})
