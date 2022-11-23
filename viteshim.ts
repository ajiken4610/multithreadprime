declare module "*?worker&inline" {
  class WorkerShim extends Worker {
    constructor();
  }
  export = WorkerShim;
}
