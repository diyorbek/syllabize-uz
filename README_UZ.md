# syllabize-uz

[![](https://github.com/Diyorbek/syllabize-uz/workflows/Build/badge.svg?branch=master)](https://github.com/diyorbek/syllabize-uz/actions)
[![](https://codecov.io/gh/Diyorbek/syllabize-uz/branch/master/graph/badge.svg)](https://codecov.io/gh/diyorbek/syllabize-uz)
[![](https://img.shields.io/npm/v/syllabize-uz)](https://npmjs.com/syllabize-uz)
[![](https://img.shields.io/npm/types/syllabize-uz)](https://npmjs.com/syllabize-uz)
[![](https://img.shields.io/bundlephobia/minzip/syllabize-uz)](https://bundlephobia.com/result?p=syllabize-uz)
[![](https://img.shields.io/npm/l/syllabize-uz)](https://npmjs.com/syllabize-uz)

Oʻzbekcha soʻzlarni boʻgʻinlarga ajratish. [Fonetika.Uz](https://fonetika.uz/) da ishlatilgan.

### Oʻqish

- [English](https://github.com/diyorbek/syllabize-uz/blob/master/README.md)

## Oʻrnatish

NPM

```
npm install syllabize-uz
```

Yarn

```
yarn add syllabize-uz
```

## Foydalanish

Lotin alifbosidagi soʻzlar uchun: `syllabize(word)`

Kirill alifbosidagi soʻzlar uchun: `syllabizeCyrillic(word)`

```js
import { syllabize, syllabizeCyrillic } from 'syllabize-uz';

const syllablesLatin = syllabize('olmaxon'); // ["ol", "ma", "xon"]
const syllablesCyrillic = syllabizeCyrillic('мўъжизавий'); // ["мўъ", "жи", "за", "вий"]

console.log(syllablesLatin.join('-')); // "ol-ma-xon"
console.log(syllabizeCyrillic.join('-')); // "мўъ-жи-за-вий"
```
