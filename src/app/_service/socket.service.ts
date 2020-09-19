import { Injectable } from '@angular/core';
import { isNullOrUndefined } from "util";
import { Observable } from "rxjs/Observable";
import { EventEmitter } from "@angular/core";
import { HWSocket, AppConstant } from "../share/app.constant";
import { environment } from "../../environments/environment";
import { UserStore } from "../store/user.store";

@Injectable()
export class SocketService {

    // private url = "http://192.168.10.115:5000/";
    private url = environment.socketTellerAbsorption + this.userStore.machineId;
    private socket: SocketIOClient.Socket;
    socketConnectedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private userStore: UserStore) {
        // this.connect();
    }

    public connect(url?: string) {

        if (!isNullOrUndefined(url)) {
            console.log(url);
            if (!isNullOrUndefined(this.socket)) {
                this.socket.disconnect();
            }
            this.socket = null;
            this.url = url;
        }

        if (!this.socket || !this.socket.connect()) {
            this.socket = io.connect(this.url, {
                forceNew: false,
                timeout: 500,
                reconnectionDelay: 2000
            });

            this.socket.on("connect", () => {
                console.log("Socket connect: " + this.url);
                this.socketConnectedEmitter.emit(true);
            });

            this.socket.on("disconnect", () => {
                console.log("Socket Disconnected");
                this.socketConnectedEmitter.emit(false);
            });
        }
    }

    public disconnect() {
        if (!isNullOrUndefined(this.socket) && this.socket.connected) {
            this.socket.disconnect();
        }
    }

    listenRequestApproveTransaction() {

        const that = this;

        return new Observable((observer) => {

            this.socket.removeListener("request_approve");
            this.socket.on("request_approve", (data) => {
                if (data.machine_id === this.userStore.machineId) {
                    observer.next(data);
                }
            });
        });
    }

    submitApproveTransaction(id: string, status: string) {
        const that = this;

        return new Observable((observer) => {

            this.socket.removeListener("sent_approve");
            const param = {
                "machine_id": this.userStore.machineId,
                "tran_id": id,
                "status": status
            }

            console.log(JSON.stringify(param));
            this.socket.emit("sent_approve", JSON.stringify(param));
            observer.next()
            observer.complete();
        });
    }

    public sendAbsorptionTransaction(transactionType: string) {
        const that = this;
        return new Observable(observer => {

            if (isNullOrUndefined(that.socket) || !that.socket.connected) {
                observer.error({ code: HWSocket.HW_CODE.DISCONNECTED });
                observer.complete();
                that.connect();
                return;
            }

            this.socket.removeAllListeners();

            // const tellerTransaction = this.onSetData(transaction);

            const jsonData = {
                // id: transaction.referenceNo,
                // transactionType: transactionType,
                // data: transaction,
                status: "Waiting for approve"
            };


            console.info("======= para ======= ", JSON.stringify(jsonData));
            this.socket.emit("request_approve", jsonData);
            this.socket.on("", (data) => {
                observer.next(data);
                observer.complete();
            });
        });
    }

    public connectVIB() {
        this.connect(environment.socketTellerAbsorption + this.userStore.machineId);
        console.log("connectVIB on ", this.url);
    }

    public onSendStatusToVIB(status, accountNo) {
        const machine_id = this.userStore.machineId;
        return new Observable(
            observer => {

                const json = {
                    machine_id: machine_id,
                    accountNo: accountNo,
                    status: status
                };

                this.socket.emit("message", json);
                this.socket.on("message", (data) => {
                    observer.next(data);
                    observer.complete();
                });
            });
    }
}