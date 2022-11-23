export default (a: bigint) => {
  let ca = a;
  const ret: bigint[] = [];
  while (!(ca % 2n)) {
    ret.push(2n);
    ca /= 2n;
  }
  let i = 3n;
  loop: while (ca !== 1n) {
    const ra = calSqrt(ca);
    for (; i < ra; i += 2n) {
      if (!(ca % i)) {
        ret.push(i);
        ca /= i;
        continue loop;
      }
    }
    ret.push(ca);
    break;
  }
  return ret;
};
