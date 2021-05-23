import { isLowerCase } from '../utils/casing';

/**
 * Drops soft sign and makes its left-ajacent
 * letter upper-case for later indication
 */
export function hideSoftSign(cyrillicWord: string): string {
  return cyrillicWord
    .toLowerCase()
    .replace(/[\u0400-\u04FF]ь/gi, (matchString) =>
      matchString.charAt(0).toUpperCase(),
    );
}

/**
 * Adds soft sign to the right of upper-case character
 */
export function recoverSoftSign(cyrillicWord: string): string {
  return cyrillicWord.replace(/[\u0400-\u04FF]/gi, (char) =>
    isLowerCase(char) ? char : `${char.toLowerCase()}ь`,
  );
}

/**
 * Splits cyrillic iotas (vovels with 2 phonemas: я,ё,ю,е)
 * into 2 letters (ya,yo,yu,ye) to correctly calculate
 * consonant distance between 2 vovels.
 */
export function extractIotaConsonants(cyrillicWord: string): string {
  return cyrillicWord
    .replace(/^е/gi, 'yе')
    .replace(/[аеёиоуэюяў]е/gi, (matchString) => `${matchString.charAt(0)}yе`)
    .replace(/я/gi, 'yа')
    .replace(/ё/gi, 'yо')
    .replace(/ю/gi, 'yу');
}

/**
 * Unifies split cyrillic iotas (vovels with 2 phonemas: ya,yo,yu,ye)
 * into corresponding cyrillic letters (я,ё,ю,е)
 */
export function recoverIotas(cyrillicWord: string): string {
  return cyrillicWord
    .replace(/yе/gi, 'е')
    .replace(/yа/gi, 'я')
    .replace(/yо/gi, 'ё')
    .replace(/yу/gi, 'ю');
}
