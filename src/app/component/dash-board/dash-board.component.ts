import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { isNullOrUndefined } from 'util';
import { SocketService } from '../../_service/socket.service';
import { NotificationService } from '../../_service/notification.service';
import { DataService } from '../../_service/data.service';
import { MasterDataService } from '../../_service/master-data.service';
import { DatePipe } from '@angular/common';
import { ModalComponent } from "ng2-bs4-modal/lib/components/modal";
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'vib-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.sass']
})
export class DashBoardComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;
  errorMessage = "";
  successMessage = "";
  responseError = false;
  responseSuccess = false;
  dataApproveLists: any = [];
  approveStatus: any = [];
  userId: any = [];
  // errorMessage = "";
  message = "";
  interval: any;

  constructor(
    private userService: UserService,
    private socketService: SocketService,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private masterDataService: MasterDataService,
    private dataService: DataService,
    private userStore: UserStore,
  ) { }

  ngOnInit() {
    this.getInquiryApproveList();
    this.interval = setInterval(() => {
      if (this.userStore.accessToken !== null) {
        this.getInquiryApproveList();
      }
    }, 120000);
  }

  public getInquiryApproveList() {
    this.masterDataService.getInquiryApproveList(this.datePipe.transform(new Date, 'dd/MM/yyyy')).subscribe(response => {
      console.log('RESPONSE INQUIRY', response)
      if (response.header.success) {
        this.dataApproveLists = response.data.approveList;
      }
    }, error => {
      this.message = error.responseStatus.responseMessage
      this.modal.open('md')
    });
  }

  updateApproveList(DATA, TXN_ID) {
    let STATUS = DATA === 'Approved' ? 'A' : 'R';
    this.masterDataService.updateApproveList(STATUS, TXN_ID).subscribe(response => {
      if (response.header.success) {
        this.message = response.responseStatus.responseMessage
        this.modal.open('md')
      }
      this.getInquiryApproveList();
    }, error => {
      this.message = error.responseStatus.responseMessage
      this.modal.open('md')
    });
  }
}