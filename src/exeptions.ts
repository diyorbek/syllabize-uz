import { O_TILDE_SMALL as o_ } from './characterCollection';

// [EN] Words where 'NG' comes as a single consonant. This list is not complete. Feel free to send PR for improvements.
// [UZ] 'NG' tovush sifatida kelgan so'zlar. Ro'yhat to'liq emas. Agar tuzatish kiritishni xohlasangiz bemalol PR jonatishingiz mumkin.
export const NGwords = [
  `k${o_}ngil`,
  'singil',
  'dengiz',
  'bodring',
  'rang',
  'teng',
  'garang',
  'gurung',
];

// [EN] Exceptional words' list. This list is not complete. Feel free to send PR for improvements.
// [UZ] Instisno so'zlar ro'yhati. Ro'yhat to'liq emas. Agar tuzatish kiritishni xohlasangiz bemalol PR jonatishingiz mumkin.
export const EXCEPTIONAL_WORDS: Record<string, string[]> = {
  ['drama']: ['dra', 'ma'],
  ['ingliz']: ['in', 'gliz'],
  ['gramma']: ['gram', 'ma'],
  ['gramm']: ['gramm'],
  ['kongress']: ['kon', 'gress'],
};
