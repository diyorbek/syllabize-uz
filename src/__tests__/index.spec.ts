import { syllabize } from '../index';

const APOSTROPHE = String.fromCharCode(700);
const TURNED_COMMA = String.fromCharCode(699);

test.each`
  input            | output                                     | length
  ${''}            | ${''}                                      | ${0}
  ${'a'}           | ${'a'}                                     | ${1}
  ${'aoueioʻ'}     | ${'a-o-u-e-i-oʻ'}                          | ${6}
  ${'abab'}        | ${'a-bab'}                                 | ${2}
  ${'abbaba'}      | ${'ab-ba-ba'}                              | ${3}
  ${'abbb'}        | ${'abbb'}                                  | ${1}
  ${'bbbb'}        | ${'bbbb'}                                  | ${1}
  ${'abbaa'}       | ${'ab-ba-a'}                               | ${3}
  ${"aa'ba"}       | ${`a-a${APOSTROPHE}-ba`}                   | ${3}
  ${'aa`ba'}       | ${`a-a${APOSTROPHE}-ba`}                   | ${3}
  ${'aa’ba'}       | ${`a-a${APOSTROPHE}-ba`}                   | ${3}
  ${'babbab'}      | ${'bab-bab'}                               | ${2}
  ${'bshabbbabch'} | ${'bshabb-babch'}                          | ${2}
  ${'gʻab’bbabb'}  | ${`g${TURNED_COMMA}ab${APOSTROPHE}-bbabb`} | ${2}
  ${'g`ab’bbabb'}  | ${`g${TURNED_COMMA}ab${APOSTROPHE}-bbabb`} | ${2}
  ${'g’ab’bbabb'}  | ${`g${TURNED_COMMA}ab${APOSTROPHE}-bbabb`} | ${2}
  ${"g'ab’bbabb"}  | ${`g${TURNED_COMMA}ab${APOSTROPHE}-bbabb`} | ${2}
  ${'bbab-bbabb'}  | ${'bbab--bbabb'}                           | ${2}
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
