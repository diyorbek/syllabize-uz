import { O_TILDE_SMALL as o_, N_TILDE_SMALL } from '../characterCollection';

// [EN] Words where 'NG' comes as a single consonant. This list is not complete. Feel free to send PR for improvements.
// [UZ] 'NG' tovush sifatida kelgan so'zlar. Ro'yhat to'liq emas. Agar tuzatish kiritishni xohlasangiz bemalol PR jonatishingiz mumkin.
const NG_WORDS = [
  `k${o_}ngil`,
  'singil',
  'dengiz',
  'bodring',
  'rang',
  'teng',
  'garang',
  'gurung',
  'tong',
  'ming',
  'ring',
  'yeng', // noun
  `g${o_}ng`,
];

const SUFFIXES = ['ning', 'ni', 'ga', 'da', 'dan'];
const SUFFIXES_JOIN = SUFFIXES.join('|');

const NG_WORDS_JOIN = NG_WORDS.join('|');
const NG_REGX = new RegExp(
  `${NG_WORDS_JOIN}|[ia]ng(iz)?(${SUFFIXES_JOIN})?(lar?)?i?(${SUFFIXES_JOIN})?$`,
  'g',
);

/** Replace `ng` bigram with a special character */
export function unifyNG(word: string): string {
  const match = word.match(NG_REGX);

  if (match) {
    match.forEach((m) => {
      word = word.replace(m, m.replace(/ng/g, N_TILDE_SMALL));
    });
  }

  return word;
}
