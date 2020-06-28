import {
  R_CEDILLA_SMALL,
  L_ACUTE_SMALL,
  R_ACUTE_SMALL,
  M_HOOK_SMALL,
} from '../characterCollection';

const EXCEPTIONAL_COMBINATIONS: Record<string, string> = {
  ['dr']: R_CEDILLA_SMALL,
  ['gr']: R_ACUTE_SMALL,
  ['gl']: L_ACUTE_SMALL,
  ['mm']: M_HOOK_SMALL,
};

const EXCEPTIONAL_COMBINATIONS_REPLACEMENTS: Record<string, string> = {};
for (const combination in EXCEPTIONAL_COMBINATIONS) {
  EXCEPTIONAL_COMBINATIONS_REPLACEMENTS[
    EXCEPTIONAL_COMBINATIONS[combination]
  ] = combination;
}

const EXCEPTION_REPLACEMENT_REGEX = new RegExp(
  Object.values(EXCEPTIONAL_COMBINATIONS).join('|'),
  'g',
);

export function normalizeExceptionalCombination(
  word: string,
  combination: string,
): string {
  const replacement = EXCEPTIONAL_COMBINATIONS[combination];

  if (replacement) {
    return word.replace(combination, replacement);
  }

  return word;
}

export function splitReplacements(word: string): string {
  return word.replace(
    EXCEPTION_REPLACEMENT_REGEX,
    (replacement) =>
      EXCEPTIONAL_COMBINATIONS_REPLACEMENTS[replacement] || replacement,
  );
}
