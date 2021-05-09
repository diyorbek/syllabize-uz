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

describe('preserve casing', () => {
  test.each`
    input                 | output
    ${'A'}                | ${'A'}
    ${'ABAA'}             | ${'A-BA-A'}
    ${'G’azab'}           | ${`G${tcm}a-zab`}
    ${'OG’IZ'}            | ${`O-G${tcm}IZ`}
    ${'O’G’RI'}           | ${`O${tcm}G${tcm}-RI`}
    ${'O’g’ri'}           | ${`O${tcm}g${tcm}-ri`}
    ${'o’G’RI'}           | ${`o${tcm}G${tcm}-RI`}
    ${'TO’G’RI'}          | ${`TO${tcm}G${tcm}-RI`}
    ${'tO’g’ri'}          | ${`tO${tcm}g${tcm}-ri`}
    ${'Shior'}            | ${'Shi-or'}
    ${'SHOIR'}            | ${'SHO-IR'}
    ${'HASHAR'}           | ${'HA-SHAR'}
    ${'HAShAR'}           | ${'HA-ShAR'}
    ${'HAsHAR'}           | ${'HA-sHAR'}
    ${'HACHIR'}           | ${'HA-CHIR'}
    ${'HAcHIR'}           | ${'HA-cHIR'}
    ${'HaChIr'}           | ${'Ha-ChIr'}
    ${'iSHla'}            | ${'iSH-la'}
    ${'iShla'}            | ${'iSh-la'}
    ${'Chaqir'}           | ${'Cha-qir'}
    ${'CHaqir'}           | ${'CHa-qir'}
    ${'CHAQIR'}           | ${'CHA-QIR'}
    ${'ChAQIR'}           | ${'ChA-QIR'}
    ${'MINGGA'}           | ${'MING-GA'}
    ${'KELIng'}           | ${'KE-LIng'}
    ${'keliNG'}           | ${'ke-liNG'}
    ${'toNGi'}            | ${'to-NGi'}
    ${'toNgi'}            | ${'to-Ngi'}
    ${'tonGi'}            | ${'to-nGi'}
    ${'iNglizninG'}       | ${'iN-gliz-ninG'}
    ${'mELodRamalarniNg'} | ${'mE-Lo-dRa-ma-lar-niNg'}
  `('[$input] should be split into [$output]', ({ input, output }) => {
    expect(syllabize(input).join('-')).toBe(output);
  });
});
