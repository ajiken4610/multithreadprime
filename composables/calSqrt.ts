export default (a: bigint) => {
  let b = a;
  let c: bigint;
  let d: bigint = 0n;
  while (b !== (c = (b + a / b) / 2n) && c !== d) {
    d = b;
    b = c;
  }
  return b;
};
