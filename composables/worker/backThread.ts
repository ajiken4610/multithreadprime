addEventListener("message", (e) => {
  const a = e.data as bigint;
  let ca = a;
  loop: while (ca !== 1n) {
    const ra = calSqrt(ca);
    for (var i = 2n; i < ra; i++) {
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
