addEventListener("message", (e) => {
  let ca = e.data;
  while (!(ca % 2n)) {
    postMessage(2n);
    ca /= 2n;
  }
  let i = 3n;
  loop: while (ca !== 1n) {
    const ra = calSqrt(ca);
    for (; i < ra; i += 2n) {
      if (!(ca % i)) {
        postMessage(i);
        ca /= i;
        continue loop;
      }
    }
    postMessage(ca);
    break;
  }
  postMessage(false);
});
