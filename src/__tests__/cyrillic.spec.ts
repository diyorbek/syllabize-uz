import { syllabize } from '../syllabizeCyrillic';

describe('general', () => {
  test.each`
    input            | output
    ${'А'}           | ${'А'}
    ${'АБАА'}        | ${'А-БА-А'}
    ${'Ғазаб'}       | ${'Ға-заб'}
    ${'ОҒИЗ'}        | ${'О-ҒИЗ'}
    ${'Ўғри'}        | ${'Ўғ-ри'}
    ${'ўҒРИ'}        | ${'ўҒ-РИ'}
    ${'Шиор'}        | ${'Ши-ор'}
    ${'ШОИР'}        | ${'ШО-ИР'}
    ${'ҲАшАР'}       | ${'ҲА-шАР'}
    ${'Чақир'}       | ${'Ча-қир'}
    ${'келиН'}       | ${'ке-лиН'}
    ${'таямма'}      | ${'та-ям-ма'}
    ${'таёмма'}      | ${'та-ём-ма'}
    ${'таюмма'}      | ${'та-юм-ма'}
    ${'талямма'}     | ${'тал-ям-ма'}
    ${'талёмма'}     | ${'тал-ём-ма'}
    ${'талюмма'}     | ${'тал-юм-ма'}
    ${'трельяжга'}   | ${'трель-яж-га'}
    ${'тальвег'}     | ${'таль-вег'}
    ${'таъкидламоқ'} | ${'таъ-кид-ла-моқ'}
    ${'ҳайъат'}      | ${'ҳайъ-ат'}
    ${'мўъжизавий'}  | ${'мўъ-жи-за-вий'}
    ${'меъёрдалик'}  | ${'меъ-ёр-да-лик'}
  `('[$input] should be split into [$output]', ({ input, output }) => {
    expect(syllabize(input).join('-')).toBe(output);
  });
});
