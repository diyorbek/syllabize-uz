# syllabize-uz

[![](https://github.com/diyorbek/syllabize-uz/workflows/Build/badge.svg?branch=master)](https://github.com/Diyorbek/syllabize-uz/actions)
[![](https://codecov.io/gh/diyorbek/syllabize-uz/branch/master/graph/badge.svg)](https://codecov.io/gh/Diyorbek/syllabize-uz)
[![](https://img.shields.io/npm/v/syllabize-uz)](https://npmjs.com/syllabize-uz)
[![](https://img.shields.io/npm/types/syllabize-uz)](https://npmjs.com/syllabize-uz)
[![](https://img.shields.io/bundlephobia/minzip/syllabize-uz)](https://bundlephobia.com/result?p=syllabize-uz)
[![](https://img.shields.io/npm/l/syllabize-uz)](https://npmjs.com/syllabize-uz)

Library for dividing Uzbek words into syllables. Used at [Fonetika.Uz](https://fonetika.uz/).

### Read in

- [Oʻzbekcha](https://github.com/diyorbek/syllabize-uz/blob/master/README_UZ.md)

## Installation

NPM

```
npm install syllabize-uz
```

Yarn

```
yarn add syllabize-uz
```

UNPKG

```html
<script src="https://unpkg.com/syllabize-uz/dist-umd/index.min.js"></script>
```

## Usage

Importing:

```js
import { syllabize } from 'syllabize-uz';
```

When using UNPKG distribution:

```html
<script src="https://unpkg.com/syllabize-uz/dist-umd/index.min.js"></script>
<script>
  const { syllabize } = syllabizeUz;
</script>
```

For words in latin alphabet use: `syllabize(word)`

For words in cyrillic alphabet use: `syllabizeCyrillic(word)`

```js
import { syllabize, syllabizeCyrillic } from 'syllabize-uz';

const syllablesLatin = syllabize('olmaxon'); // ["ol", "ma", "xon"]
const syllablesCyrillic = syllabizeCyrillic('мўъжизавий'); // ["мўъ", "жи", "за", "вий"]

console.log(syllablesLatin.join('-')); // "ol-ma-xon"
console.log(syllabizeCyrillic.join('-')); // "мўъ-жи-за-вий"
```
