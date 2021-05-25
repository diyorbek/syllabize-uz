import {
  N_TILDE_SMALL,
  O_TILDE_SMALL as o_,
} from '../utils/characterCollection';

// [EN] Words where 'NG' comes as a single consonant. This list is not complete. Feel free to send PR for improvements.
// [UZ] 'NG' tovush sifatida kelgan so'zlar. Ro'yhat to'liq emas. Agar tuzatish kiritishni xohlasangiz bemalol PR jonatishingiz mumkin.
const NG_WORDS = [
  [`k${o_}ngil`, 'кўнгил'],
  ['singil', 'сингил'],
  ['dengiz', 'денгиз'],
  ['bodring', 'бодринг'],
  ['rang', 'ранг'],
  ['teng', 'тенг'],
  ['garang', 'гаранг'],
  ['gurung', 'гурунг'],
  ['tong', 'тонг'],
  ['ming', 'минг'],
  ['ring', 'ринг'],
  ['yeng', 'енг'], // noun
  [`g${o_}ng`, 'гўнг'],
];

const SUFFIXES = [
  ['ning', 'нинг'],
  ['ni', 'ни'],
  ['ga', 'га'],
  ['da', 'да'],
  ['dan', 'дан'],
];

const LATIN_SUFFIXES_JOIN = SUFFIXES.map(([latin]) => latin).join('|');
const LATIN_NG_WORDS_JOIN = NG_WORDS.map(([latin]) => latin).join('|');
const LATIN_NG_REGX = new RegExp(
  `${LATIN_NG_WORDS_JOIN}|[ia]ng(iz)?(${LATIN_SUFFIXES_JOIN})?(lar?)?i?(${LATIN_SUFFIXES_JOIN})?$`,
  'gi',
);

/** Replace `ng` bigram with a special character */
export function unifyLatinNG(word: string): string {
  return word.replace(LATIN_NG_REGX, (matchString) =>
    matchString.replace(/ng/gi, N_TILDE_SMALL),
  );
}

const CYRILLIC_SUFFIXES_JOIN = SUFFIXES.map(([, cyr]) => cyr).join('|');
const CYRILLIC_NG_WORDS_JOIN = NG_WORDS.map(([, cyr]) => cyr).join('|');
const CYRILLIC_NG_REGX = new RegExp(
  `${CYRILLIC_NG_WORDS_JOIN}|[иа]нг(из)?(${CYRILLIC_SUFFIXES_JOIN})?(лар?)?и?(${CYRILLIC_SUFFIXES_JOIN})?$`,
  'gi',
);

/** Replace `нг` bigram with a special character */
export function unifyCyrillicNG(word: string): string {
  return word.replace(CYRILLIC_NG_REGX, (matchString) =>
    matchString.replace(/нг/gi, N_TILDE_SMALL),
  );
}

export function splitCyrillicNG(word: string): string {
  return word.replace(new RegExp(N_TILDE_SMALL, 'g'), 'нг');
}
