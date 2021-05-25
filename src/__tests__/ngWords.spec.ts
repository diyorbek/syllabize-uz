import { unifyCyrillicNG } from '../exceptions/ngWords';
import { unifyBigrams } from '../helpers/latinBigramHelpers';
import {
  N_TILDE_SMALL as n_,
  O_TILDE_SMALL as o_,
} from '../utils/characterCollection';

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
    ${'tongi'}           | ${`to${n_}i`}
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
    ${'inglizning'}     | ${`inglizni${n_}`}
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

describe('cyrillic `NG`-word splitting and exceptions', () => {
  test.each`
    input                | output
    ${'кўнгил'}          | ${`кў${n_}ил`}
    ${'кўнгилсиз'}       | ${`кў${n_}илсиз`}
    ${'бекўнгилдан'}     | ${`бекў${n_}илдан`}
    ${'бодрингингнинг'}  | ${`бодри${n_}и${n_}ни${n_}`}
    ${'пулингиз'}        | ${`пули${n_}из`}
    ${'пулингизга'}      | ${`пули${n_}изга`}
    ${'тунги'}           | ${`тунги`}
    ${'тонги'}           | ${`то${n_}и`}
    ${'денгиздан'}       | ${`де${n_}издан`}
    ${'олингизи'}        | ${`оли${n_}изи`}
    ${'олингизидан'}     | ${`оли${n_}изидан`}
    ${'олингизларининг'} | ${`оли${n_}изларини${n_}`}
    ${'сингилингизнинг'} | ${`си${n_}или${n_}изни${n_}` /* It has grammar mistake, just for testing purposes.*/}
  `('[$input] should be transformed into [$output]', ({ input, output }) => {
    const result = unifyCyrillicNG(input);

    expect(result).toBe(output);
  });
});

describe('cyrillic `NG`-ended nouns with suffixes and exceptions', () => {
  test.each`
    input               | output
    ${'инглизнинг'}     | ${`инглизни${n_}`}
    ${'бодрингингнинг'} | ${`бодри${n_}и${n_}ни${n_}`}
    ${'рангингнинг'}    | ${`ра${n_}и${n_}ни${n_}`}
    ${'тенгингнинг'}    | ${`те${n_}и${n_}ни${n_}`}
    ${'гарангингнинг'}  | ${`гара${n_}и${n_}ни${n_}`}
    ${'гурунгингнинг'}  | ${`гуру${n_}и${n_}ни${n_}`}
    ${'тонгингнинг'}    | ${`то${n_}и${n_}ни${n_}`}
    ${'мингингнинг'}    | ${`ми${n_}и${n_}ни${n_}`}
    ${'рингингнинг'}    | ${`ри${n_}и${n_}ни${n_}`}
    ${'енгингнинг'}     | ${`е${n_}и${n_}ни${n_}`}
    ${'енгизлар'}       | ${`е${n_}излар`}
    ${'гўнгингнинг'}    | ${`гў${n_}и${n_}ни${n_}`}
  `('[$input] should be transformed into [$output]', ({ input, output }) => {
    const result = unifyCyrillicNG(input);

    expect(result).toBe(output);
  });
});
