declare module "*?worker" {
  class WorkerShim extends Worker {
    constructor();
  }
  export = WorkerShim;
}
