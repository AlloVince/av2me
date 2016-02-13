import * as exceptions from './exceptions';
import FooException from './foo';

console.log(exceptions.StandardException.crc32('111111'));

let e = new exceptions.LogicException();
console.log(e.code())
let r = new exceptions.RuntimeException();
console.log(r.code())
let n = new FooException();
console.log(n.code())
