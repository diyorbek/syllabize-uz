import { syllabize } from '../index';
import { unifyDigrams } from '../utils';
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

describe('`NG`-word splitting', () => {
  test.each`
    input                | output
    ${'ko`ngil'}         | ${`k${o_}${n_}il`}
    ${'ko`ngilsiz'}      | ${`k${o_}${n_}ilsiz`}
    ${'beko`ngildan'}    | ${`bek${o_}${n_}ildan`}
    ${'bodringingdan'}   | ${`bodri${n_}i${n_}dan`}
    ${'pulingiz'}        | ${`puli${n_}iz`}
    ${'pulingizga'}      | ${`puli${n_}izga`}
    ${'tungi'}           | ${`tungi`}
    ${'rangi'}           | ${`ra${n_}i`}
    ${'dengizdan'}       | ${`de${n_}izdan`}
    ${'olingizi'}        | ${`oli${n_}izi`}
    ${'olingizidan'}     | ${`oli${n_}izidan`}
    ${'olingizlaridan'}  | ${`oli${n_}izlaridan`}
    ${'olingizlarining'} | ${`oli${n_}izlarini${n_}`}
    ${'singilingizning'} | ${`si${n_}ili${n_}izni${n_}` /* It has grammar mistake, just for testing purposes.*/}
  `('[$input] should be split into [$output]', ({ input, output }) => {
    const result = unifyDigrams(input);

    expect(result).toBe(output);
  });
});

describe('exeptional words', () => {
  test.each`
    input                                         | output
    ${'kongressokongressmilligrammininggrammasi'} | ${`kon-gress-o-kon-gress-mil-li-gramm-i-ning-gram-ma-si`}
    ${'-kongress-'}                               | ${`kon-gress`}
    ${'inglizlarga'}                              | ${`in-gliz-lar-ga`}
    ${'kilogrammfonogrammang'}                    | ${`ki-lo-gramm-fo-no-gram-mang`}
    ${'dramanglama'}                              | ${`dra-mang-la-ma`}
  `('[$input] should be split into [$output]', ({ input, output }) => {
    expect(syllabize(input).join('-')).toBe(output);
  });
});
