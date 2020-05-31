function findVovels(word: string): number[] {
  const vovelPositions: number[] = [];
  const vovels = /[aoueiö]/;
  const wordLength = word.length;

  for (let index = 0; index < wordLength; index++) {
    const char = word[index];

    if (vovels.test(char)) {
      vovelPositions.push(index);
    }
  }

  return vovelPositions;
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

export function syllabify(word: string): string[] {
  const vovels = findVovels(word);
  const syllables = fragmentize(word, vovels);

  return syllables;
}
