import { syllabize } from '../index';
import { unifyBigrams } from '../utils';
import {
  O_TILDE_SMALL as o_,
  N_TILDE_SMALL as n_,
  APOSTROPHE as aps,
  TURNED_COMMA as tcm,
} from '../characterCollection';

describe('genenal syllablification structure', () => {
  test.each`
    input            | output                     | length
    ${''}            | ${''}                      | ${0}
    ${'a'}           | ${'a'}                     | ${1}
    ${'aoueioʻ'}     | ${'a-o-u-e-i-oʻ'}          | ${6}
    ${'abab'}        | ${'a-bab'}                 | ${2}
    ${'abbaba'}      | ${'ab-ba-ba'}              | ${3}
    ${'abbb'}        | ${'abbb'}                  | ${1}
    ${'bbbb'}        | ${'bbbb'}                  | ${1}
    ${'abbaa'}       | ${'ab-ba-a'}               | ${3}
    ${"aa'ba"}       | ${`a-a${aps}-ba`}          | ${3}
    ${'aa`ba'}       | ${`a-a${aps}-ba`}          | ${3}
    ${'aa’ba'}       | ${`a-a${aps}-ba`}          | ${3}
    ${'babbab'}      | ${'bab-bab'}               | ${2}
    ${'bshabbbabch'} | ${'bshabb-babch'}          | ${2}
    ${'gʻab’bbabb'}  | ${`g${tcm}ab${aps}-bbabb`} | ${2}
    ${'g`ab’bbabb'}  | ${`g${tcm}ab${aps}-bbabb`} | ${2}
    ${'g’ab’bbabb'}  | ${`g${tcm}ab${aps}-bbabb`} | ${2}
    ${"g'ab’bbabb"}  | ${`g${tcm}ab${aps}-bbabb`} | ${2}
    ${'bbab-bbabb'}  | ${'bbab-bbabb'}            | ${2}
    ${'singil'}      | ${'si-ngil'}               | ${2}
  `('[$input] should be split into [$output]', ({ input, output, length }) => {
    const result = syllabize(input);

    expect(result.join('-')).toBe(output);
    expect(result.length).toBe(length);
  });

  test.each(['a4', '"ab', ']a', 'a^3', '><', '#'])(
    'should throw error on invalid word',
    (word) => {
      expect(() => syllabize(word)).toThrowError();
    },
  );
});

describe('`NG`-word splitting and exceptions', () => {
  test.each`
    input                | output
    ${'ko`ngil'}         | ${`k${o_}${n_}il`}
    ${'ko`ngilsiz'}      | ${`k${o_}${n_}ilsiz`}
    ${'beko`ngildan'}    | ${`bek${o_}${n_}ildan`}
    ${'bodringingning'}  | ${`bodri${n_}i${n_}ni${n_}`}
    ${'pulingiz'}        | ${`puli${n_}iz`}
    ${'pulingizga'}      | ${`puli${n_}izga`}
    ${'tungi'}           | ${`tungi`}
    ${'dengizdan'}       | ${`de${n_}izdan`}
    ${'olingizi'}        | ${`oli${n_}izi`}
    ${'olingizidan'}     | ${`oli${n_}izidan`}
    ${'olingizlarining'} | ${`oli${n_}izlarini${n_}`}
    ${'singilingizning'} | ${`si${n_}ili${n_}izni${n_}` /* It has grammar mistake, just for testing purposes.*/}
  `('[$input] should be transformed into [$output]', ({ input, output }) => {
    const result = unifyBigrams(input);

    expect(result).toBe(output);
  });
});

describe('`NG`-ended nouns with suffixes and exceptions', () => {
  test.each`
    input               | output
    ${'bodringingning'} | ${`bodri${n_}i${n_}ni${n_}`}
    ${'rangingning'}    | ${`ra${n_}i${n_}ni${n_}`}
    ${'tengingning'}    | ${`te${n_}i${n_}ni${n_}`}
    ${'garangingning'}  | ${`gara${n_}i${n_}ni${n_}`}
    ${'gurungingning'}  | ${`guru${n_}i${n_}ni${n_}`}
    ${'tongingning'}    | ${`to${n_}i${n_}ni${n_}`}
    ${'mingingning'}    | ${`mi${n_}i${n_}ni${n_}`}
    ${'ringingning'}    | ${`ri${n_}i${n_}ni${n_}`}
    ${'yengingning'}    | ${`ye${n_}i${n_}ni${n_}`}
    ${'yengizlar'}      | ${`ye${n_}izlar` /* verb */}
    ${"go'ngingning"}   | ${`g${o_}${n_}i${n_}ni${n_}`}
  `('[$input] should be transformed into [$output]', ({ input, output }) => {
    const result = unifyBigrams(input);

    expect(result).toBe(output);
  });
});

describe('exceptional words', () => {
  test.each`
    input                                         | output
    ${'kongressokongressmilligrammininggrammasi'} | ${`kon-gress-o-kon-gress-mil-li-gramm-i-ning-gram-ma-si`}
    ${'-kongress-'}                               | ${`kon-gress`}
    ${'inglizlarga'}                              | ${`in-gliz-lar-ga`}
    ${'kilogrammfonogrammang'}                    | ${`ki-lo-gramm-fo-no-gram-mang`}
    ${'dramanglama'}                              | ${`dra-mang-la-ma`}
    ${'kadrimiz'}                                 | ${`kadr-i-miz`}
    ${'kadrlarimiz'}                              | ${`kadr-la-ri-miz`}
  `('[$input] should be split into [$output]', ({ input, output }) => {
    expect(syllabize(input).join('-')).toBe(output);
  });
});
