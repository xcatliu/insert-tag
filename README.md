# insert-tag

[![Build Status](https://travis-ci.org/xcatliu/insert-tag.svg?branch=master)](https://travis-ci.org/xcatliu/insert-tag) [![Greenkeeper badge](https://badges.greenkeeper.io/xcatliu/insert-tag.svg)](https://greenkeeper.io/)

Insert tag to the specific position of a xml/html string:

```html
<a>xxx<b>yyy</b>zzz<a>
```

to

```html
<a>xx<mark>x<b>yy</b></mark><b>y</b>zzz<a>
```

## Getting started

### Installation

```bash
npm install insert-tag --save
```

### Usage

```js
import insertTag from 'insert-tag';

insertTag('<a>xxx<b>yyy</b>zzz<a>', '<mark>', [0, 2, 0, 5]);
// <a>xx<mark>x<b>yy</b></mark><b>y</b>zzz<a>
```

`[0, 2, 0, 5]` meas from *line 0, column 2* to *line 0, column 5*

For more examples, please see [tests](./test/index.ts)

## Tests

```bash
npm run test
```
