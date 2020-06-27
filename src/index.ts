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

function splitIntoSyllables(word: string): string[] {
  if (word.length === 0) {
    return [];
  }

  validateWord(word);

  const syllabized: string[][] = [];

  let start = 0;
  let syllables: string[];

  for (let i = 0; i < word.length; i++) {
    if (word[i] === APOSTROPHE || word[i] === '-') {
      syllables = fragmentizeSubstr(word, start, i);

      if (word[i] === APOSTROPHE) {
        syllables[syllables.length - 1] += word[i];
      }

      syllabized.push(syllables);
      start = i + 1;
    }
  }

  syllables = fragmentizeSubstr(word, start);
  syllabized.push(syllables);

  return new Array<string>().concat(...syllabized);
}

export function syllabize(word: string): string[] {
  if (word.length === 0) {
    return [];
  }

  const unifiedWord = unifyDigrams(word);

  validateWord(unifiedWord);

  const parts: string[] = [];

  for (const exceptional in EXCEPTIONAL_WORDS) {
    if (word.length && word.includes(exceptional)) {
      const [left, rest] = word.split(exceptional);

      parts.push(
        ...splitIntoSyllables(left),
        ...EXCEPTIONAL_WORDS[exceptional],
      );

      word = rest;
    }
  }

  parts.push(...splitIntoSyllables(word));

  return new Array<string>()
    .concat(...parts)
    .map((syllable) => splitDigrams(syllable));
}
