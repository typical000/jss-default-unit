## Default value unit plugin for JSS

This plugin adds `px` to values for [jss](https://github.com/jsstyles/jss).

Take a look at [examples](http://jsstyles.github.io/jss-extend/examples/index.html) directory.


```javascript
exports.styles = {
    button: {
        'font-size': 20,
        'z-index': 1,
        'line-height': 1.2
    }
}
```
```css
button {
    font-size: 20px;
    z-index: 1;
    line-height: 1.2
}
```

## Register plugin

```javascript
var jss = require('jss')
var px = require('jss-px')
jss.use(px)
```

## Run tests

### Locally
```bash
npm i
open test/local.html
```
### From github

[Tests](https://jsstyles.github.com/jss-px/test)

## License

MIT
