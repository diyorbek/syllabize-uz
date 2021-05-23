import { EXCEPTIONAL_WORDS } from '../exceptions/exceptionalWords';
import { findExceptionals } from './findExceptionals';

/**
 * Fragmentize the word into parts which can be syllabized independently.
 * Integrate non array fragments into one part.
 * Fragments type `string | string []` because
 * exceptionals which present ready syllables are kept as is.
 */
export function fragmentize(unifiedWord: string): Array<string | string[]> {
  // Map exceptionals with their indices in given word
  const exceptionalsIndices = findExceptionals(unifiedWord);

  // Sort indices in order not to lose the original sequence
  const sortedExceptionalsIndices = Array.from(exceptionalsIndices).sort(
    (a, b) => a[0] - b[0],
  );

  const fragments: Array<string | string[]> = [];
  let fragmentStartIndex = 0;

  for (let i = 0; i <= sortedExceptionalsIndices.length; i++) {
    let exceptional: string | undefined;
    let indexOfExceptional: number | undefined;

    if (sortedExceptionalsIndices[i]) {
      [indexOfExceptional, exceptional] = sortedExceptionalsIndices[i];
    }

    const fragment = unifiedWord.substring(
      fragmentStartIndex,
      indexOfExceptional,
    );

    if (fragment.length) {
      if (typeof fragments[fragments.length - 1] === 'string') {
        fragments[fragments.length - 1] += fragment;
      } else {
        fragments.push(fragment);
      }
    }

    if (exceptional && indexOfExceptional !== undefined) {
      const { alternative, always } = EXCEPTIONAL_WORDS[exceptional];

      if (alternative) {
        if (typeof fragments[fragments.length - 1] === 'string') {
          fragments[fragments.length - 1] += alternative;
        } else {
          fragments.push(alternative);
        }
      } else if (always) {
        fragments.push(always);
      } else {
        fragments.push(exceptional);
      }

      fragmentStartIndex = indexOfExceptional + exceptional.length;
    }
  }

  return fragments;
}
