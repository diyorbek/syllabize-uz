import { syllabize } from '../index';

import { APOSTROPHE as aps, TURNED_COMMA as tcm } from '../characterCollection';

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
