import { syllabize as syllabizeCore } from './core/syllabize';
import { splitCyrillicNG, unifyCyrillicNG } from './exceptions/ngWords';
import {
  extractIotaConsonants,
  hideSoftSign,
  recoverIotas,
  recoverSoftSign,
} from './helpers/cyrillicHelpers';
import { splitBigrams, unifyBigrams } from './helpers/latinBigramHelpers';
import { validateCyrillicWord, validateLatinWord } from './helpers/validators';
import { applyCaseMap, generateCaseMap } from './utils/casing';

export function syllabize(word: string): string[] {
  if (word.length === 0) {
    return [];
  }

  const unifiedWord = unifyBigrams(word);

  validateLatinWord(unifiedWord);

  const caseMap = generateCaseMap(word);
  const syllables = syllabizeCore(unifiedWord, 'latin').map(splitBigrams);

  return applyCaseMap(syllables, caseMap);
}

export function syllabizeCyrillic(word: string): string[] {
  if (word.length === 0) {
    return [];
  }

  validateCyrillicWord(word);

  const caseMap = generateCaseMap(word);
  const unifiedWord = extractIotaConsonants(
    hideSoftSign(unifyCyrillicNG(word)),
  );
  const syllables = syllabizeCore(unifiedWord, 'cyrillic').map((syllable) =>
    recoverIotas(recoverSoftSign(splitCyrillicNG(syllable))),
  );

  return applyCaseMap(syllables, caseMap);
}
