import { Component, OnInit } from '@angular/core';
import { UserStore } from '../../store/user.store';
import { UserService } from '../../_service/user.service';
import * as moment from 'moment'

@Component({
  selector: 'vib-report-subscription',
  templateUrl: './report-subscription.component.html',
  styleUrls: ['./report-subscription.component.sass']
})
export class ReportSubscriptionComponent implements OnInit {

  public reportDate = moment().format('YYYY-MM-DD').toString()
  public options
  constructor(public userStore: UserStore, public userService: UserService) { }

  ngOnInit() {
  }

  export() {
    const date = moment(this.reportDate).format('DD/MM/YYYY');
    this.userService.getRepostSubscription(date)
    .subscribe(
      data => {
        const byteCharacters = atob(data.data.content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const objectUrl = URL.createObjectURL(blob);

        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = objectUrl;
        a.download = data.data.fileName;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      },
      error => {
        console.log('%c getRepostSubscription => Error ', 'background: #DC143C; color: #FFFFFF', error);
      }
    );
  }

}
