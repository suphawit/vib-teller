import {EventEmitter} from "@angular/core";

export class NotificationService {

    private updateWaitingApproveTransactionEmitter: EventEmitter<any> = new EventEmitter<any>();

    updateWaitingApproveTransaction(transaction: any) {
        this.updateWaitingApproveTransactionEmitter.emit(transaction);
    }

    listenerUpdateWaitingApproveTransaction() {
        return this.updateWaitingApproveTransactionEmitter;
    }
}