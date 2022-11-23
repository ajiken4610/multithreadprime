import MultiThreadWorker from "./worker/multiThread?worker&inline";

const calNext = (
  worker: MultiThreadWorker,
  number: bigint,
  start: bigint,
  chunkSize: bigint
) => {
  let end = start + chunkSize;
  const sqrt = calSqrt(number);
  let finalThread;
  if ((finalThread = end > sqrt)) {
    end = sqrt;
  }
  worker.postMessage({ number, start, end: end, finalThread });
  return end + 1n;
};

export default (
  a: bigint,
  workerCount: number,
  callback: (a: bigint | false) => any,
  chunkSize = 4194303n
) => {
  const workers: Worker[] = [];
  let ca = a;
  while (!(ca % 2n)) {
    callback(2n);
    ca /= 2n;
  }
  let start = 3n;

  let currentResult = -1n;
  let stoppedThreadCount = 0;

  for (var i = 0; i < workerCount; i++) {
    const worker = new MultiThreadWorker();
    worker.addEventListener("message", (e) => {
      const a = e.data as { ca: bigint; result: bigint | false };
      if (currentResult !== -1n || a.result !== false) {
        if (a.result !== false)
          // 答えの可能性がある。
          currentResult =
            currentResult > a.result
              ? a.result
              : currentResult === -1n
              ? a.result
              : currentResult;

        stoppedThreadCount++;
        if (stoppedThreadCount === workerCount) {
          stoppedThreadCount = 0;
          ca /= currentResult;
          start = currentResult;
          callback(currentResult);
          if (ca !== 1n) {
            for (const cWorker of workers) {
              start = calNext(cWorker, ca, start, chunkSize);
            }
            currentResult = -1n;
          } else {
            for (const worker of workers) {
              worker.terminate();
            }
            callback(false);
          }
        }
      } else {
        if (ca !== 1n) {
          start = calNext(worker, ca, start, chunkSize);
        }
      }
    });
    workers.push(worker);
  }
  for (const cWorker of workers) {
    start = calNext(cWorker, ca, start, chunkSize);
  }
};
