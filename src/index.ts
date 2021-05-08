import { unifyBigrams, splitBigrams, validateWord } from './utils';
import { APOSTROPHE, VOVELS } from './characterCollection';
import { EXCEPTIONAL_WORDS } from './exceptions/exceptionalWords';

function findVovelIndices(word: string): number[] {
  const vovelIndices: number[] = [];
  const wordLength = word.length;

  for (let index = 0; index < wordLength; index++) {
    const char = word[index];

    if (VOVELS.includes(char)) {
      vovelIndices.push(index);
    }
  }

  return vovelIndices;
}

function splitByVovels(str: string, vovelsIndices: number[]): string[] {
  if (vovelsIndices.length <= 1) {
    return [str];
  }

  const syllables: string[] = [];
  const distance = vovelsIndices[1] - vovelsIndices[0];

  const syllableLength =
    vovelsIndices[0] + (distance < 3 ? 1 : distance < 4 ? 2 : 3);

  const syllable = str.substring(0, syllableLength);

  syllables.push(syllable);

  const nextVovelsIndices = vovelsIndices
    .slice(1)
    .map((vovelIndex) => vovelIndex - syllable.length);

  const next = splitByVovels(str.slice(syllableLength), nextVovelsIndices);

  syllables.push(...next);

  return syllables;
}

function splitIntoSyllables(fragment: string): string[] {
  if (fragment.length === 0) {
    return [];
  }

  const syllables: string[] = [];

  let start = 0;
  // Use same memory slot inside for loop
  let substring: string;
  let syllablesOfSubstring: string[];

  for (let i = 0; i <= fragment.length; i++) {
    if (
      fragment[i] === APOSTROPHE ||
      fragment[i] === '-' ||
      i === fragment.length
    ) {
      substring = fragment.substring(start, i);
      syllablesOfSubstring = splitByVovels(
        substring,
        findVovelIndices(substring),
      );

      if (
        syllablesOfSubstring[syllablesOfSubstring.length - 1].length &&
        fragment[i] === APOSTROPHE
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

export function syllabize(word: string): string[] {
  if (word.length === 0) {
    return [];
  }

  const unifiedWord = unifyBigrams(word);

  validateWord(unifiedWord);

  // Map exceptionals with their indices in given word
  const exceptionalsIndices = new Map<number, string>();

  // Use same memory slot inside for-loop
  let regex: RegExp;
  let regexMatchArray: RegExpExecArray | null;
  let fragmentInCurrentIndex: string | undefined;

  for (const exceptional in EXCEPTIONAL_WORDS) {
    regex = new RegExp(exceptional, 'g');

    if (unifiedWord.match(regex)) {
      while ((regexMatchArray = regex.exec(unifiedWord)) !== null) {
        fragmentInCurrentIndex = exceptionalsIndices.get(regexMatchArray.index);

        if (!fragmentInCurrentIndex) {
          exceptionalsIndices.set(regexMatchArray.index, exceptional);
        } else if (fragmentInCurrentIndex.length < exceptional.length) {
          // Prioritize longer word
          exceptionalsIndices.set(regexMatchArray.index, exceptional);
        }
      }
    }
  }

  // Sort indices in order not to lose the original sequence
  const sortedExceptionalsIndices = Array.from(exceptionalsIndices).sort(
    (a, b) => a[0] - b[0],
  );

  // #region Fragmentize
  /**
   * Fragmentize the word into parts which can be syllabized independently.
   * Integrate non array fragments into one part.
   * Fragments type `string | string []` because
   * exceptionals which present ready syllables are kept as is.
   */
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
  // #endregion

  const syllables: string[] = [];

  fragments.forEach((fragment) => {
    if (typeof fragment === 'string') {
      syllables.push(...splitIntoSyllables(fragment));
    } else {
      syllables.push(...fragment);
    }
  });

  return syllables.map(splitBigrams);
}
