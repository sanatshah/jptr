

export default class SSE { 
  private es;

  constructor() {}

  public async newSource(sourcePath : string) {

    this.es = new EventSource(sourcePath);

    return new Promise((resolve, reject) => {
    
      this.es.onmessage = (opened) => {
        resolve(opened);
      }

      this.es.onerror = (error) => {
        reject(error);
      }

    })

  }

  public on(...args){
    if (args.length === 1) {
      this.es.onmessage = (message) => {
        args[0](message)
      }
    } else {
      this.es.addEventListener(args[0], args[1]);
    }
  }

  public error(cb) {
    this.es.onerror(cb);
  }

  public close() {
    this.es.close();
  }

}
