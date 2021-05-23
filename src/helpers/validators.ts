import {
  APOSTROPHE,
  C_CEDILLA_SMALL,
  G_BREVE_SMALL,
  N_TILDE_SMALL,
  O_TILDE_SMALL,
  S_CEDILLA_SMALL,
  TURNED_COMMA,
} from '../utils/characterCollection';

const cyrillicWordValidateRegExp = /[^\u0400-\u04FF\-]/i;
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

export function validateWord(word: string, validator: RegExp): void | never {
  if (validator.test(word)) {
    throw new Error('Given string contains non-word-character.');
  }
}

/**
 * Checks if given word consists of cyrillic word characters
 * and internally used special characters.
 * Throws exception if word is not valid.
 */
export function validateCyrillicWord(word: string): void | never {
  validateWord(word, cyrillicWordValidateRegExp);
}

/**
 * Checks if given word consists of latin word characters
 * and internally used special characters.
 * Throws exception if word is not valid.
 */
export function validateLatinWord(word: string): void | never {
  validateWord(word, latinWordValidateRegExp);
}
