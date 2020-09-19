import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { isNullOrUndefined } from 'util';
import { SocketService } from '../../_service/socket.service';

/**
 * status : w = waiting for approve, r = reject, a = approve
 */
@Component({
    selector: 'approve-subscription',
    templateUrl: './approve-subscription.component.html',
    styleUrls: ['./approve-subscription.component.sass']
})
export class ApproveSubscriptionComponent implements OnInit, OnChanges {

    @Output('onSubmit')
    onSubmitEmit = new EventEmitter()

    @Input()
    itemApprove
    @Input()
    timeoutCounter = 0

    interval

    constructor(private userService: UserService,
        private socketService: SocketService) {

    }

    ngOnInit() {

        // this.startTimer(this.timeoutCounter);
        if (isNullOrUndefined(this.itemApprove)) {
            //this.itemApprove.content = 'Open Account';
        } else {
            if (isNullOrUndefined(this.itemApprove) || this.itemApprove.content === '') {
                this.itemApprove.content = 'Open Account';
            }
        }
    }

    ngOnChanges(simple: SimpleChanges) {
        const timeoutCounter: SimpleChange = simple.timeoutCounter
        if (!isNullOrUndefined(timeoutCounter)) {
            let value = timeoutCounter.currentValue

            setTimeout(() => {
                this.startTimer(value * 60);
            }, 500)
        }
    }
    startTimer(duration) {
        if (!isNullOrUndefined(this.interval)) {
            clearInterval(this.interval)
        }

        if (duration == 0) {
            return
        }
        const display = document.querySelector('#countdown');
        let timer = duration, minutes, seconds
        const context = this

        this.interval = setInterval(function () {
            minutes = parseInt((timer / 60).toString(), 10)
            seconds = parseInt((timer % 60).toString(), 10)

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (timer <= 0) {
                clearInterval(this.interval)
                context.onTimeUp()
                return
            }

            if (--timer < 0) {
                timer = duration
            }

        }, 1000)
    }

    onClickApprove() {
        this.onUpdateApproveStatus('a', true)
    }

    onTimeUp() {
        this.onUpdateApproveStatus('r', false)
    }

    onClickReject() {
        this.onUpdateApproveStatus('r', false)
    }


    onUpdateApproveStatus(status, isApproved) {
        const context = this

        this.socketService.submitApproveTransaction(this.itemApprove.tran_id, status)
            .subscribe(
                res => {
                    context.onSubmitEmit.emit(isApproved)
                },
                error => {
                    console.log(error)
                    alert("ไม่สามารถทำรายการได้ กรุณาลองใหม่อีก")
                }
            )
    }
}
