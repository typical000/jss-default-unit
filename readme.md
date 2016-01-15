![JSS logo](https://avatars1.githubusercontent.com/u/9503099?v=3&s=60)

## JSS plugin that adds default custom unit to numeric values where needed

This plugin lets you omit the unit from values of style properties.

[Demo](http://jsstyles.github.io/jss-examples/index.html#plugin-jss-default-unit) -
[JSS](https://github.com/jsstyles/jss)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/jsstyles/jss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Usage example

```javascript
import jss from 'jss'
import defaultUnit from 'jss-default-unit'

jss.use(defaultUnit('px'))

let sheet = jss.createStyleSheet({
  container: {
    'font-size': 20,
    'z-index': 1,
    'line-height': 1.2
  }
})
```

```javascript
console.log(sheet.toString())
```
```css
.jss-0-0 {
  font-size: 20px;
  z-index: 1;
  line-height: 1.2;
}
```

```javascript
console.log(sheet.classes)
```
```javascript
{ container: "jss-0-0" }
```

## Issues

File a bug against [jsstyles/jss prefixed with \[jss-default-unit\]](https://github.com/jsstyles/jss/issues/new?title=[jss-px]%20).

## Run tests

```bash
npm i
npm run test
```

## License

MIT
