# syllabize-uz

[![](https://github.com/Diyorbek/syllabize-uz/workflows/Build/badge.svg?branch=master)](https://github.com/Diyorbek/syllabize-uz/actions)
[![](https://codecov.io/gh/Diyorbek/syllabize-uz/branch/master/graph/badge.svg)](https://codecov.io/gh/Diyorbek/syllabize-uz)
[![](https://img.shields.io/npm/v/syllabize-uz)](https://npmjs.com/syllabize-uz)
[![](https://img.shields.io/npm/types/syllabize-uz)](https://npmjs.com/syllabize-uz)
[![](https://img.shields.io/bundlephobia/minzip/syllabize-uz)](https://bundlephobia.com/result?p=syllabize-uz)
[![](https://img.shields.io/npm/l/syllabize-uz)](https://npmjs.com/syllabize-uz)

Oʻzbekcha soʻzlarni boʻgʻinlarga ajratish.

### Oʻqish

- [English](https://github.com/Diyorbek/syllabize-uz/blob/master/README.md)

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

Biblioteka yagona funksiyani taqdim qiladi: `syllabize(word)`

```
import { syllabize } from "syllabize-uz";

const syllables = syllabize("olmaxon"); // ["ol", "ma", "xon"]

console.log(syllables.join("-")); // "ol-ma-xon"
```
