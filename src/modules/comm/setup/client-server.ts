import { autorun } from "mobx";
import { Target } from "../slots/client-server";

export default function ClientServerInit(core, comm) {
    const self = core;

    comm.disconnect.on((id) => {
        const disposer = this.disposers.get(id);
  
        if (!disposer) {
          return;
        }
  
        disposer();
      })
  
        comm.req.on((target: Target) => {
        const { path, type, id} = target;

        //get path from requester
        const observablePathSplit = path.split(".");
        observablePathSplit.shift();

        let obj;
        let prop;

        //find the value
        const val = observablePathSplit.reduce((obs, value) => {
            obj = obs;
            prop = value;
            return obs[value];
        }, self);

        if (type === 'function') {
            const funcRes = val.call(self);
            return {
                id,
                path,
                type,
                val: funcRes
            };
        } 

        this.disposers.set(id, autorun(() => {
            const retObj = {
                id,
                path,
                type,
                val: obj[prop] 
            }

            comm.res(retObj);
        }));

        return {
            id,
            path, 
            type,
            val
        };
    })
}