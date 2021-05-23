import { EXCEPTIONAL_WORDS } from '../exceptions/exceptionalWords';

export function findExceptionals(unifiedWord: string): Map<number, string> {
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

  return exceptionalsIndices;
}
