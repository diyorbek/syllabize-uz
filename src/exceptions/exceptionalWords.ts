import { normalizeExceptionalCombination } from './exceptionalCombinations';

/**
 * [EN] Alternative word with normalizations in some combinations.
 *
 * [UZ] Ba'zi harf kombinatsiyalari normalizatsiya qilingan muqobil so'z.
 * */
interface Alternative {
  alternative: string;
  always?: never;
}

/**
 * [EN] The syllabification is always true regardless of its variantions.
 *
 * [UZ] Bo'g'inga ajratish so'z variatsiyasidan qat'iy nazar ko'rsatilgandek bo'ladi.
 * */
interface Always {
  alternative?: never;
  always: string[];
}

type Exception = Alternative | Always;

// [EN] Exceptional words' list. This list is not complete. Feel free to send pull request for improvements.
// [UZ] Instisno so'zlar ro'yhati. Ro'yhat to'liq emas. Agar tuzatish kiritishni xohlasangiz bemalol pull-request jonatishingiz mumkin.
export const EXCEPTIONAL_WORDS: Record<string, Exception> = {
  ['gramm']: { always: ['gramm'] },
  ['drama']: { alternative: normalizeExceptionalCombination('drama', 'dr') },
  ['ingliz']: { alternative: normalizeExceptionalCombination('ingliz', 'gl') },
  ['gramma']: { alternative: normalizeExceptionalCombination('gramma', 'gr') },
  ['kongress']: { always: ['kon', 'gress'] },
  ['kadr']: { always: ['kadr'] },
};
