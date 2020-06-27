import {
  S_CEDILLA_SMALL,
  C_CEDILLA_SMALL,
  G_BREVE_SMALL,
  O_TILDE_SMALL,
  APOSTROPHE,
  TURNED_COMMA,
  N_TILDE_SMALL,
} from './characterCollection';
import { NGwords } from './exeptions';

const SUFFIXES = ['ning', 'ni', 'ga', 'da', 'dan'];
const SUFFIXES_JOIN = SUFFIXES.join('|');

const NG_WORDS_JOIN = NGwords.join('|');

const NG_REGX = new RegExp(
  `${NG_WORDS_JOIN}|[ia]ng(iz)?(${SUFFIXES_JOIN})?(lar?)?i?(${SUFFIXES_JOIN})?$`,
  'g',
);

export function unifyNG(word: string): string {
  const match = word.match(NG_REGX);

  if (match) {
    match.forEach((m) => {
      word = word.replace(m, m.replace(/ng/g, N_TILDE_SMALL));
    });
  }

  return word;
}

export function unifyDigrams(word: string): string {
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

export function splitDigrams(text: string): string {
  return text
    .replace(new RegExp(G_BREVE_SMALL, 'g'), `g${TURNED_COMMA}`)
    .replace(new RegExp(O_TILDE_SMALL, 'g'), `o${TURNED_COMMA}`)
    .replace(new RegExp(S_CEDILLA_SMALL, 'g'), 'sh')
    .replace(new RegExp(C_CEDILLA_SMALL, 'g'), 'ch')
    .replace(new RegExp(N_TILDE_SMALL, 'g'), 'ng');
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

export function validateWord(word: string): void | never {
  if (wordValidateRegExp.test(word)) {
    throw new Error('Given string contains non-word-character.');
  }
}
