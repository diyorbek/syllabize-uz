export function findVovelIndices(
  str: string,
  vovels: string | string[],
): number[] {
  const vovelIndices: number[] = [];
  const wordLength = str.length;

  for (let index = 0; index < wordLength; index++) {
    const char = str[index];

    if (vovels.includes(char)) {
      vovelIndices.push(index);
    }
  }

  return vovelIndices;
}

export function splitByVovels(str: string, vovelsIndices: number[]): string[] {
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
