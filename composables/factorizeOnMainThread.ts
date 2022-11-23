export default (a: bigint) => {
  let ca = a;
  const ret: bigint[] = [];
  loop: while (ca !== 1n) {
    const ra = calSqrt(ca);
    for (var i = 2n; i < ra; i++) {
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
