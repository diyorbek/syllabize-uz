import { unifyDigrams, splitDigrams, validateWord } from './utils';
import { APOSTROPHE, VOVELS } from './characterCollection';

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

function fragmentize(fragment: string, vovelsIndices: number[]): string[] {
  if (vovelsIndices.length <= 1) {
    return [fragment];
  }

  const syllables: string[] = [];
  const distance = vovelsIndices[1] - vovelsIndices[0];

  const syllableLength =
    vovelsIndices[0] + (distance < 3 ? 1 : distance < 4 ? 2 : 3);

  const syllable = fragment.substr(0, syllableLength);

  syllables.push(syllable);

  const nextVovelsIndices = vovelsIndices
    .slice(1)
    .map((vovelIndex) => vovelIndex - syllable.length);

  const next = fragmentize(fragment.slice(syllableLength), nextVovelsIndices);

  syllables.push(...next);

  return syllables;
}

function fragmentizeSubstr(str: string, start: number, end?: number) {
  const part = str.substring(start, end);

  return fragmentize(part, findVovelIndices(part));
}

export function syllabize(word: string): string[] {
  if (word.length === 0) {
    return [];
  }

  const unifiedWord = unifyDigrams(word);

  validateWord(unifiedWord);

  const syllabized: string[][] = [];

  let start = 0;
  let syllables: string[];

  for (let i = 0; i < unifiedWord.length; i++) {
    if (unifiedWord[i] === APOSTROPHE || unifiedWord[i] === '-') {
      syllables = fragmentizeSubstr(unifiedWord, start, i);

      if (unifiedWord[i] === APOSTROPHE) {
        syllables[syllables.length - 1] += unifiedWord[i];
      }

      syllabized.push(syllables);
      start = i + 1;
    }
  }

  syllables = fragmentizeSubstr(unifiedWord, start);
  syllabized.push(syllables);

  return new Array<string>()
    .concat(...syllabized)
    .map((syllable) => splitDigrams(syllable));
}
