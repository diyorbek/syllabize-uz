import {
  S_CEDILLA_SMALL,
  C_CEDILLA_SMALL,
  G_BREVE_SMALL,
  O_TILDE_SMALL,
  APOSTROPHE,
  TURNED_COMMA,
  N_TILDE_SMALL,
} from './characterCollection';
import { unifyNG } from './exceptions/ngWords';
import { splitReplacements } from './exceptions/exceptionalCombinations';

function isLowerCase(str: string) {
  return str.toLowerCase() === str;
}

/**
 * Make letter combinations a single special character.
 * Fix apostrophes.
 */
export function unifyBigrams(word: string): string {
  return unifyNG(
    word
      .toLowerCase()
      .replace(/sh/g, S_CEDILLA_SMALL)
      .replace(/ch/g, C_CEDILLA_SMALL)
      .replace(/g[ʻʼ’'`‘]/g, G_BREVE_SMALL)
      .replace(/o[ʻʼ’'`‘]/g, O_TILDE_SMALL)
      .replace(/[ʻ'`‘’]/g, APOSTROPHE),
  );
}

/**  Replace the special character with their corresponding letter combination */
export function splitBigrams(text: string): string {
  return splitReplacements(
    text
      .replace(new RegExp(G_BREVE_SMALL, 'g'), `g${TURNED_COMMA}`)
      .replace(new RegExp(O_TILDE_SMALL, 'g'), `o${TURNED_COMMA}`)
      .replace(new RegExp(S_CEDILLA_SMALL, 'g'), 'sh')
      .replace(new RegExp(C_CEDILLA_SMALL, 'g'), 'ch')
      .replace(new RegExp(N_TILDE_SMALL, 'g'), 'ng'),
  );
}

const latinWordValidateRegExp = new RegExp(
  `[^a-zA-Z\\-${
    APOSTROPHE +
    TURNED_COMMA +
    S_CEDILLA_SMALL +
    C_CEDILLA_SMALL +
    G_BREVE_SMALL +
    O_TILDE_SMALL +
    N_TILDE_SMALL
  }]`,
);

/**
 * Checks if given word consists of latin word characters
 * and internally used special characters.
 * Throws exception if word is not valid.
 */
export function validateLatinWord(word: string): void | never {
  if (latinWordValidateRegExp.test(word)) {
    throw new Error('Given string contains non-word-character.');
  }
}

/** Generates array of boolean values in which `true` indicates to an upper-case character */
export function generateCaseMap(word: string): boolean[] {
  return word.split('').map((char) => char !== char.toLowerCase());
}

/** Applies casing to syllabized word according to given `caseMap` */
export function applyCaseMap(
  syllables: string[],
  caseMap: boolean[],
): string[] {
  let currentCaseIdx = 0;

  return syllables.map((syllable) => {
    let casedSyllable = '';

    for (const char of syllable) {
      casedSyllable += caseMap[currentCaseIdx] ? char.toUpperCase() : char;
      currentCaseIdx++;
    }

    return casedSyllable;
  });
}

const cyrillicWordValidateRegExp = /[^\u0400-\u04FF\-]/i;

/**
 * Checks if given word consists of cyrillic word characters
 * and internally used special characters.
 * Throws exception if word is not valid.
 */
export function validateCyrillicWord(word: string): void | never {
  if (cyrillicWordValidateRegExp.test(word)) {
    throw new Error('Given string contains non-word-character.');
  }
}

/**
 * Drops soft sign and makes its left-ajacent
 * letter upper-case for later indication
 */
export function hideSoftSign(cyrillicWord: string): string {
  return cyrillicWord
    .toLowerCase()
    .replace(/[\u0400-\u04FF]ь/gi, (matchString) =>
      matchString.charAt(0).toUpperCase(),
    );
}

/**
 * Adds soft sign to the right of upper-case character
 */
export function recoverSoftSign(cyrillicWord: string): string {
  return cyrillicWord.replace(/[\u0400-\u04FF]/gi, (char) =>
    isLowerCase(char) ? char : `${char.toLowerCase()}ь`,
  );
}

/**
 * Splits cyrillic vovels with 2 phonemas (я,ё,ю,е)
 * into 2 letters (ya,yo,yu,ye) to correctly calculate
 * consonant distance between 2 vovels.
 */
export function extractCyrillicVovelConsonant(cyrillicWord: string): string {
  return cyrillicWord
    .replace(/^е/gi, 'yе')
    .replace(/[аеёиоуэюяў]е/gi, (matchString) => `${matchString.charAt(0)}yе`)
    .replace(/я/gi, 'yа')
    .replace(/ё/gi, 'yо')
    .replace(/ю/gi, 'yу');
}

/**
 * Splits cyrillic vovels with 2 phonemas (я,ё,ю,е)
 * into 2 letters (ya,yo,yu,ye) to correctly calculate
 * consonant distance between 2 vovels.
 */
export function unifyExtractCyrillicVovelConsonant(
  cyrillicWord: string,
): string {
  return cyrillicWord
    .replace(/yе/gi, 'е')
    .replace(/yа/gi, 'я')
    .replace(/yо/gi, 'ё')
    .replace(/yу/gi, 'ю');
}
