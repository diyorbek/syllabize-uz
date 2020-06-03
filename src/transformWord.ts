import {
  S_CEDILLA_SMALL,
  C_CEDILLA_SMALL,
  G_BREVE_SMALL,
  O_TILDE_SMALL,
  APOSTROPHE,
  TURNED_COMMA,
} from './characterCollection';

export function unifyDigrams(word: string): string {
  return word
    .toLowerCase()
    .replace(/sh/g, S_CEDILLA_SMALL)
    .replace(/ch/g, C_CEDILLA_SMALL)
    .replace(/g[ʻʼ’'`‘]/g, G_BREVE_SMALL)
    .replace(/o[ʻʼ’'`‘]/g, O_TILDE_SMALL)
    .replace(/[ʻ'`‘’]/g, APOSTROPHE);
}

export function splitDigrams(text: string): string {
  return text
    .replace(new RegExp(G_BREVE_SMALL, 'g'), `g${TURNED_COMMA}`)
    .replace(new RegExp(O_TILDE_SMALL, 'g'), `o${TURNED_COMMA}`)
    .replace(new RegExp(S_CEDILLA_SMALL, 'g'), 'sh')
    .replace(new RegExp(C_CEDILLA_SMALL, 'g'), 'ch');
}
