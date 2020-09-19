import { Injectable } from '@angular/core';
import { Environment, Utils } from "../share/utils";
import { Observable } from 'rxjs/Rx';
import { isNullOrUndefined } from "util";
import { WebSocketService } from "../share/websocket.service";
import { HWSocket } from "../share/app.constant";

type requestCallback = (data: any) => any;

@Injectable()
export class HardwareService {

    private url = Environment.domainHardware;
    private isRequestingEDC: boolean = false;
    private socket: SocketIOClient.Socket;

    constructor() {

    }

    public connectHardware() {
        this.connect(Environment.domainHardware);
        console.log("connectHardware on ", this.url);
    }

    private connect(url?: string) {

        if (!isNullOrUndefined(url)) {
            if (!isNullOrUndefined(this.socket)) {
                this.socket.disconnect();
            }
            this.socket = null;
            this.url = url;
        }

        if (!this.socket || !this.socket.connected) {

            this.socket = new WebSocketService().connect(this.url, {
                forceNew: false,
                timeout: 500,
                reconnectionDelay: 5000
            });

            this.isRequestingEDC = false;

            this.socket.once("connect", () => {
                console.log("HardwareService connect");
            });

            this.socket.once("disconnect", () => {
                console.log("HardwareService Disconnected");
            });
        }
    }

    public disconnect() {

        if (!isNullOrUndefined(this.socket) && this.socket.connected) {
            this.socket.disconnect();
        }
    }

    public requestSmartCardReader() {
        const that = this;
        if (isNullOrUndefined(that.socket) || !that.socket.connected) {
            that.connect(Environment.domainHardware);
            const sleep = function sleep(milliseconds) {
                const start = new Date().getTime();
                for (let i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds) {
                        break;
                    }
                }
            }
            sleep(1500)
        }
        return new Observable<any>(observer => {

            this.socket.removeAllListeners();
            this.socket.emit(HWSocket.COMMAND.SEND_COMMAND, HWSocket.REQUEST.SMART_CARD);

            this.socket.on(HWSocket.EVENT.SMART_CARD, (data) => {
                observer.next(data);
            });
        });
    }

    public requestFingerScan(onPrepare: requestCallback,
        onCapture: requestCallback,
        onSuccess: requestCallback,
        onError: requestCallback) {
    }

    public requestPIN(onStatus?: requestCallback,
        onSuccess?: requestCallback,
        onError?: requestCallback) {
    }

    public requestPrintSlip(jsonData: any) {
        this.socket.emit(HWSocket.COMMAND.PRINT_SLIP_REQUEST, jsonData);
    }

    public requestPrintSlipWithThermal(jsonData: any) {
        this.socket.emit(HWSocket.COMMAND.PRINT_SLIP_REQUEST, jsonData);
    }

    public requestPrintPDF(jsonData: any) {
        console.log('requestPrintPDF');
        console.log('json to print : ' + JSON.stringify(jsonData));
        this.socket.emit(HWSocket.COMMAND.PRINT_PDF_REQUEST, jsonData);
    }

    public requestPrintPaper(jsonData: any) {
        this.socket.emit(HWSocket.COMMAND.PRINT_PDF_REQUEST, jsonData);
    }

    movePopupToFullScreen() {

        this.connect();

        setTimeout(() => {
            this.socket.emit("movepopup");
            this.disconnect();
        }, 500);
    }
}
