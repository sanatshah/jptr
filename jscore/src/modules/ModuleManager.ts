import AppManager from "./appManager/AppManager";
import ClientContext from "./clientContext/ClientContext";
import Notification from "./notification/Notification";
import Log from "./log/Log";
import Comm from "./comm/Comm";
import Matrix from "./matrix/Matrix";
import Web3 from "./web3/Web3";
import Social from "./social/Social";

export default class ModuleManager {
    public appManager?: AppManager;
    public clientContext?: ClientContext;
    public notification?: Notification;
    public log?: Log;
    public comm?: Comm;
    public matrix?: Matrix;
    public web3?: Web3;
    public social?: Social;
}