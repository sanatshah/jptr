import AppManager from "./appManager/AppManager";
import ClientContext from "./clientContext/ClientContext";
import Notification from "./notification/Notification";
import Log from "./log/Log";
import Comm from "./comm/Comm";
import Matrix from "./matrix/Matrix";

export default class ModuleManager {
    public appManager?: AppManager;
    public clientContext?: ClientContext;
    public notification?: Notification;
    public log?: Log;
    public comm?: Comm;
    public matrix?: Matrix;
}