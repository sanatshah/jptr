import { GenericChannel } from 'ts-event-bus'

export class Electron {}

/*
export class Electron extends GenericChannel {
    private _ws: WebSocket | null = null
    private _host: string

    constructor(host: string) {
        super()
        this._host = host
        this._init()
    }

    private _init(): void {
        const ws = new WebSocket(this._host)

        ws.onopen = (e: Event) => {
            this._connected()
            this._ws = ws
        }

        ws.onerror = (e: Event) => {
            this._ws = null
            this._error(e)
            this._disconnected()
            setTimeout(() => {
                this._init()
            }, 2000)
        }

        ws.onclose = (e: CloseEvent) => {
            if (ws === this._ws) {
                this._ws = null
                this._disconnected()
                this._init()
            }
        }

        ws.onmessage = (e: MessageEvent) => {
            this._messageReceived(e.data)
        }
    }
}*/