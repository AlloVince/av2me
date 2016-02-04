import chai from 'chai';
import * as exceptions from "./../../src/exceptions";
chai.should();
let assert = chai.assert;

describe('Exception', () => {
    describe('Logic', () => {
        it('should extends stand', function () {
            assert.instanceOf(new exceptions.LogicException(), exceptions.StandardException);
        });
    });
});
