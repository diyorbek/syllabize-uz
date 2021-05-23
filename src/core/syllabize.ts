import { CharType } from '../utils/characterCollection';
import { fragmentize } from './fragmentize';
import { splitIntoSyllables } from './splitIntoSyllables';

export function syllabize(unifiedWord: string, charType: CharType): string[] {
  const fragments = fragmentize(unifiedWord);
  const syllables: string[] = [];

  fragments.forEach((fragment) => {
    if (typeof fragment === 'string') {
      syllables.push(...splitIntoSyllables(fragment, charType));
    } else {
      syllables.push(...fragment);
    }
  });

  return syllables;
}
