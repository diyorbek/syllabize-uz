import { O_TILDE_SMALL } from './characterCollection';

// This structures should be taken as a single syllable
// in their combinational versions
export const SINGLE_SYLLABLE = ['gramm[^a]'];

// [EN] Words where 'NG' comes as a single consonant. This list is not complete. Feel free to send PR for improvements.
// [UZ] 'NG' tovush sifatida kelgan so'zlar. Ro'yhat to'liq emas. Agar tuzatish kiritishni xohlasangiz bemalol PR jonatishingiz mumkin.
export const NGwords = [
  `k${O_TILDE_SMALL}ngil`,
  'singil',
  'dengiz',
  'bodring',
  'rang',
  'teng',
  'gurung',
];

// [EN] Exeptional words' list. This list is not complete. Feel free to send PR for improvements.
// [UZ] Instisno so'zlar ro'yhati. Ro'yhat to'liq emas. Agar tuzatish kiritishni xohlasangiz bemalol PR jonatishingiz mumkin.
export const EXEPTIONAL_WORDS = {
  [`ingliz`]: ['in', 'gliz'],
  [`kilogramm`]: ['ki', 'lo', 'gramm'],
  [`milligramm`]: ['mil', 'li', 'gramm'],
  [`kongress`]: ['kon', 'gress'],
};
