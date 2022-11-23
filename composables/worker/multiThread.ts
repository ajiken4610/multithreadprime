addEventListener("message", (e) => {
  let {
    number: ca,
    start: i,
    end,
    finalThread,
  } = e.data as {
    number: bigint;
    start: bigint;
    end: bigint;
    finalThread: boolean;
  };
  for (; i < end; i += 2n) {
    if (!(ca % i)) {
      postMessage({ result: i, ca });
      return;
    }
  }
  postMessage({ result: finalThread ? ca : false, ca });
});
