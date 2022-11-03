import { ServerConfig } from "../../ClientContext";
import axios from "axios";

export default class HTTP {
  private ax;

  constructor(private config : ServerConfig, private authorizaionHeader : string) {
    this.setup();
  }

  public setup(){
    axios.defaults.baseURL = this.config.path + this.config.apiVersion + "/";
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.authorizaionHeader;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    // need to pass id token as well
    this.ax = axios;
  }

  public async get(...args) {
    return (await this.ax.get(...args)).data;
  }

  public post(...args) {
    return this.ax.post(...args);
  }

  
}