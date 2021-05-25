import { splitReplacements } from '../exceptions/exceptionalCombinations';
import { unifyLatinNG } from '../exceptions/ngWords';
import {
  APOSTROPHE,
  C_CEDILLA_SMALL,
  G_BREVE_SMALL,
  N_TILDE_SMALL,
  O_TILDE_SMALL,
  S_CEDILLA_SMALL,
  TURNED_COMMA,
} from '../utils/characterCollection';

/**
 * Make letter combinations a single special character.
 * Fix apostrophes.
 */
export function unifyBigrams(word: string): string {
  return unifyLatinNG(
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
