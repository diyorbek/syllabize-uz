export function isLowerCase(str: string): boolean {
  return str.toLowerCase() === str;
}

/** Generates array of boolean values in which `true` indicates to an upper-case character */
export function generateCaseMap(word: string): boolean[] {
  return word.split('').map((char) => char !== char.toLowerCase());
}

/** Applies casing to syllabized word according to given `caseMap` */
export function applyCaseMap(
  syllables: string[],
  caseMap: boolean[],
): string[] {
  let currentCaseIdx = 0;

  return syllables.map((syllable) => {
    let casedSyllable = '';

    for (const char of syllable) {
      casedSyllable += caseMap[currentCaseIdx] ? char.toUpperCase() : char;
      currentCaseIdx++;
    }

    return casedSyllable;
  });
}
