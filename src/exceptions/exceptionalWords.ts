import { normalizeExceptionalCombination } from './exceptionalCombinations';
import { PickProp } from '../utils';

// [EN] Exceptional word variant structure.
// [UZ] Instisno so'z struktura variantlarisi.
interface ExceptionBase {
  alternative?: string;
  always?: string[];
  isSingleSyllable?: boolean;
}

/**
 * [EN] Alternative word with normalizations in some combinations.
 *
 * [UZ] Ba'zi harf kombinatsiyalari normalizatsiya qilingan muqobil so'z.
 * */
interface Alternative extends PickProp<ExceptionBase, 'alternative'> {
  alternative: string;
}

/**
 * [EN] The syllabification is always true regardless of its variantions.
 *
 * [UZ] Bo'g'inga ajratish so'z variatsiyasidan qat'iy nazar ko'rsatilgandek bo'ladi.
 * */
interface Always extends PickProp<ExceptionBase, 'always'> {
  always: string[];
}

/**
 * [EN] Consider the word as a single syllable.
 *
 * [UZ] Berilgan so'z bitta bo'g'in sifatida qaraladi.
 * */
interface SingleSyllable extends PickProp<ExceptionBase, 'isSingleSyllable'> {
  isSingleSyllable: boolean;
}

type Exception = Alternative | Always | SingleSyllable;

// [EN] Exceptional words' list. This list is not complete. Feel free to send pull request for improvements.
// [UZ] Instisno so'zlar ro'yhati. Ro'yhat to'liq emas. Agar tuzatish kiritishni xohlasangiz bemalol pull-request jonatishingiz mumkin.
export const EXCEPTIONAL_WORDS: Record<string, Exception> = {
  ['gramm']: { isSingleSyllable: true },
  ['drama']: { alternative: normalizeExceptionalCombination('drama', 'dr') },
  ['ingliz']: { alternative: normalizeExceptionalCombination('ingliz', 'gl') },
  ['gramma']: { alternative: normalizeExceptionalCombination('gramma', 'gr') },
  ['kongress']: {
    always: ['kon', 'gress'],
  },
};
