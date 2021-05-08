import {
  R_CEDILLA_SMALL,
  L_ACUTE_SMALL,
  R_ACUTE_SMALL,
  M_HOOK_SMALL,
} from '../characterCollection';

type EXCEPTIONAL_COMBINATION = 'dr' | 'gr' | 'gl' | 'mm';

// Exceptional combinations and their unique special character
const EXCEPTIONAL_COMBINATIONS: Record<EXCEPTIONAL_COMBINATION, string> = {
  ['dr']: R_CEDILLA_SMALL,
  ['gr']: R_ACUTE_SMALL,
  ['gl']: L_ACUTE_SMALL,
  ['mm']: M_HOOK_SMALL,
};

// Inverse key-value pairs of `EXCEPTIONAL_COMBINATIONS`
const EXCEPTIONAL_COMBINATIONS_REPLACEMENTS: Record<
  string,
  EXCEPTIONAL_COMBINATION
> = {};

for (const key in EXCEPTIONAL_COMBINATIONS) {
  const combination = key as EXCEPTIONAL_COMBINATION;
  const replacement = EXCEPTIONAL_COMBINATIONS[combination];

  EXCEPTIONAL_COMBINATIONS_REPLACEMENTS[replacement] = combination;
}

const EXCEPTION_REPLACEMENT_REGEX = new RegExp(
  Object.values(EXCEPTIONAL_COMBINATIONS).join('|'),
  'g',
);

/** Unifies exceptional combination with its corresponding special character */
export function normalizeExceptionalCombination(
  word: string,
  combination: EXCEPTIONAL_COMBINATION,
): string {
  const replacement = EXCEPTIONAL_COMBINATIONS[combination];

  if (replacement) {
    return word.replace(combination, replacement);
  }

  return word;
}

/** Replaces special characters with their corresponding exceptional combination. */
export function splitReplacements(word: string): string {
  return word.replace(
    EXCEPTION_REPLACEMENT_REGEX,
    (replacement) =>
      EXCEPTIONAL_COMBINATIONS_REPLACEMENTS[replacement] || replacement,
  );
}
