import { unifyBigrams } from '../utils';
import {
  O_TILDE_SMALL as o_,
  N_TILDE_SMALL as n_,
} from '../characterCollection';

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
