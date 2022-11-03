import { slot } from 'ts-event-bus'

export interface Target {
    id: number,
    path: string,
    type: 'object' | 'function'
}

export interface TargetResponse extends Target {
    val: any
}

const CSComm = {
    req: slot<Target, TargetResponse>(),
    res: slot<TargetResponse>(),
    disconnect: slot<number>()
}

export default CSComm;