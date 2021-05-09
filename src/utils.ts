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

const wordValidateRegExp = new RegExp(
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
 * Checks if given word consists of word characters
 * and internally used special characters.
 * Throws exception if word is not valid.
 */
export function validateWord(word: string): void | never {
  if (wordValidateRegExp.test(word)) {
    throw new Error('Given string contains non-word-character.');
  }
}

export type PickProp<T, K extends keyof T> = {
  [key in keyof Omit<T, K>]?: never;
};

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
