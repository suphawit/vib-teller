import {Component, NgZone, ViewChild, OnInit} from '@angular/core';
import { UserStore } from './store/user.store';
import { Environment } from './share/utils';
import { Router } from '@angular/router';
import { SocketService } from './_service/socket.service';
import { ModalComponent } from 'ng2-bs4-modal/lib/components/modal';
import { isNullOrUndefined } from 'util';
import { NotificationService } from './_service/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

    idleTime;
    @ViewChild('SubscriptionApproveModal')
    subscriptionApproveModal: ModalComponent;
    getApproveSubscriptionInteval
    itemApproveSubscription
    timeout = 0

    constructor(
        public zone: NgZone,
        private router: Router,
        private socketService: SocketService,
        private notificationService: NotificationService,
        public userStore: UserStore) {
        this.socketService.connect()
        // this.setIdleTimeout()
    }
    private setIdleTimeout() {

        const that = this;
        // this.resetTimer();
        $(document).ready(function () {
            //Increment the idle time counter every minute.
            setInterval(function () {
                that.zone.run(() => {
                    that.idleTime -= 1;
                    if (that.idleTime <= 0) {
                        that.userStore.logout()
                        that.router.navigate(['/']);
                    }
                });

            }, 1000); // 1 sec

            //Zero the idle timer on mouse movement.
            $(this).mousedown(function (e) {
                // console.log("mouseDown");
                that.resetTimer();
            });
            $(this).keypress(function (e) {
                // console.log("keypress");
                that.resetTimer();
            });

            document.onmousemove = function (e) {
                // console.log("onmousemove");
                that.resetTimer();
            }
            document.ontouchmove = function (e) {
                // console.log("ontouchmove");
                that.resetTimer();
            }

        });
    }
    resetTimer() {
        this.idleTime = Environment.idleTimeout;
    }

    ngOnInit() {

        this.onGetApproveSubscription()
    }

    onShowApproveSubscriptionModal() {
        this.subscriptionApproveModal.open('lg')
    }

    onGetApproveSubscription() {


        console.log('onGetApproveSubscription')
        const context = this
        this.socketService.socketConnectedEmitter
          .subscribe(
              (isConnected: boolean) => {
                  console.log("isConnected", isConnected)
                  if (isConnected) {

                      this.socketService.listenRequestApproveTransaction()
                        .subscribe(
                          res => {

                            if (!context.userStore.isLogged()) {
                                return
                            }
                            const data = res

                            if (!isNullOrUndefined(data) && context.itemApproveSubscription == null) {
                                context.timeout = 5
                                context.itemApproveSubscription = data
                                context.onShowApproveSubscriptionModal()

                              }
                              context.notificationService.updateWaitingApproveTransaction(data)
                          },
                          error => {
                            console.log(error)
                          }
                        )
                  }
              }
          )

      }

  onSubmitSubsciption($event) {

    this.subscriptionApproveModal.close()
    this.itemApproveSubscription = null
    this.timeout = 0
  }

}


