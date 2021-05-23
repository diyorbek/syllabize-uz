import {
  APOSTROPHE,
  CharType,
  CYRILLIC_HARD_SIGN,
  CYRILLIC_VOVELS,
  LATIN_VOVELS,
} from '../utils/characterCollection';
import { findVovelIndices, splitByVovels } from './splitByVovels';

export function splitIntoSyllables(
  fragment: string,
  charType: CharType,
): string[] {
  if (fragment.length === 0) {
    return [];
  }

  const syllables: string[] = [];
  const stopSign = charType === 'latin' ? APOSTROPHE : CYRILLIC_HARD_SIGN;
  const vovels = charType === 'latin' ? LATIN_VOVELS : CYRILLIC_VOVELS;

  let start = 0;
  // Use same memory slot inside for loop
  let substring: string;
  let syllablesOfSubstring: string[];

  for (let i = 0; i <= fragment.length; i++) {
    if (
      fragment[i] === stopSign ||
      fragment[i] === '-' ||
      i === fragment.length
    ) {
      substring = fragment.substring(start, i);
      syllablesOfSubstring = splitByVovels(
        substring,
        findVovelIndices(substring, vovels),
      );

      if (
        syllablesOfSubstring[syllablesOfSubstring.length - 1].length &&
        fragment[i] === stopSign
      ) {
        syllablesOfSubstring[syllablesOfSubstring.length - 1] += fragment[i];
      }

      if (syllablesOfSubstring[syllablesOfSubstring.length - 1].length) {
        syllables.push(...syllablesOfSubstring);
      }

      start = i + 1;
    }
  }

  return syllables;
}
