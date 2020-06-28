import { unifyDigrams, splitDigrams, validateWord } from './utils';
import { APOSTROPHE, VOVELS } from './characterCollection';
import { EXCEPTIONAL_WORDS } from './exeptions';

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

  if (EXCEPTIONAL_WORDS[fragment]) {
    return EXCEPTIONAL_WORDS[fragment];
  }

  const syllables: string[] = [];

  let start = 0;
  // Using same memory slot inside for loop
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

  if (EXCEPTIONAL_WORDS[word]) {
    return EXCEPTIONAL_WORDS[word];
  }

  // Make letter combinations a single special character
  const unifiedWord = unifyDigrams(word);

  // Checks if given word consists of word characters.
  // Tests against internally used special characters.
  validateWord(unifiedWord);

  // Map exeptionals with their indices in given word
  const exceptionalsIndices = new Map<number, string>();

  // Using same memory slot inside for-loop
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

  const fragments: string[] = [];
  let start = 0;

  for (let i = 0; i <= sortedExceptionalsIndices.length; i++) {
    let exeptional: string | undefined;
    let indexOfExeptional: number | undefined;

    if (sortedExceptionalsIndices[i]) {
      [indexOfExeptional, exeptional] = sortedExceptionalsIndices[i];
    }

    const fragment = unifiedWord.substring(start, indexOfExeptional);

    if (fragment.length) {
      fragments.push(fragment);
    }

    if (exeptional && indexOfExeptional !== undefined) {
      fragments.push(exeptional);
      start = indexOfExeptional + exeptional.length;
    }
  }

  const syllables = fragments.map(splitIntoSyllables);
  const flattenedSyllables = new Array<string>().concat(...syllables);

  // Return replacing the special character with their corresponding letter combination
  return flattenedSyllables.map(splitDigrams);
}
