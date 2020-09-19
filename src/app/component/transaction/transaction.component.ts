import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SocketService} from "../../_service/socket.service";
import {NotificationService} from "../../_service/notification.service";

@Component({
    selector: 'vib-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.sass']
    // ,styles: [
    //     `:host(.transaction-container-fluid-h-100){
    //             height: 100% !important
    //             }
    //     `
    // ],
    // encapsulation: ViewEncapsulation.None
})
export class TransactionComponent implements OnInit {
    items = Array();

    constructor(private socketService: SocketService,
                private notificationService: NotificationService) {

    }

    ngOnInit() {

        this.listenerNotificationService()
    }

    listenerNotificationService(){
        this.notificationService.listenerUpdateWaitingApproveTransaction()
        .subscribe(
            transaction => {
                console.log(transaction)
                this.items.push(transaction);   
            }
        );
    }

    listenerRequestApproveTransaction() {
        this.socketService.listenRequestApproveTransaction()
            .subscribe(
                (transaction: any) => {
                    
                    this.items.push(transaction);
                    this.notifyUpdateWaitingApproveTransaction();
                },
                error => {
                    console.log(error);
                }
            );
    }

    notifyUpdateWaitingApproveTransaction() {
        
    }

    onClickTransactionDetail($event) {

        $event.preventDefault();
        return false;
    }

    onClickUpdateTransaction(status: string, id: string) {
        
    }
}
