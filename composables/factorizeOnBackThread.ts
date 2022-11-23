import BackThreadWorker from "./worker/backThread?worker&inline";

export default (a: bigint, callback: (a: bigint | false) => any) => {
  const worker = new BackThreadWorker();
  worker.addEventListener("message", (e) => {
    if (e.data === false) {
      worker.terminate();
    }
    callback(e.data);
  });
  worker.postMessage(a);
};
