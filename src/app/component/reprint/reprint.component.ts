import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs4-modal/lib/components/modal";
import { DataService } from '../../_service/data.service';
import { HardwareService } from "../../_service/hardware.service";
import { AppConstant } from '../../share/app.constant';
import { Pager } from '../../_model/pager';
import { LogReqForm } from '../../_model/logreqform';
import { LogService } from '../../_service/log.service';
import { Router } from '../../../../node_modules/@angular/router';
import { PreviewPdfService } from '../../_service/preview-pdf.service';
import * as moment from 'moment';
@Component({
  selector: 'vib-reprint',
  templateUrl: './reprint.component.html',
  styleUrls: ['./reprint.component.sass']
})
export class ReprintComponent implements OnInit {

  @ViewChild('modal')
  modal: ModalComponent;
  public errormessage = "";

  public txn_date_from = moment().format('YYYY-MM-DD').toString();
  public txn_date_to = moment().format('YYYY-MM-DD').toString();
  public dataList: LogReqForm[];
  public p: number = 1;
  public card_no: string = '';
  // public txn_date_from: string = '';
  // public txn_date_to: string = '';
  public tmp_txn_date_from: string = "";
  public tmp_txn_date_to: string = "";
  public tmp_card_no: string = "";
  public isPreviewPDF: boolean = false;
  public id: string = '';
  public ID_NO: string = '';
  public ID_TYPE: string = '';
  public LOG_REQ_ID: string = '';
  public pager: Pager = {
    keyword : "",
    pageNumber: 1,
    limitPage: 10,
    pageTotal: 0,
    sortColumn: "",
    sortOrder: "",
    rowFrom: 0,
    rowTo: 0,
    rowTotal: 0,
  };


  constructor(private dataService: DataService,
    private hardwareService: HardwareService,
    private logService: LogService,
    private route: Router,
    private previewPdfService: PreviewPdfService) {
      this.dataList = new Array<LogReqForm>();
     }

  ngOnInit() {
    // this.getDataList();
    this.dataList = null;
  }


  public clearData() {
    this.txn_date_from = moment().format('YYYY-MM-DD').toString();
    this.txn_date_to = moment().format('YYYY-MM-DD').toString();
    this.card_no = '';
    this.dataList = null;
  }

  public searchDataList() {
    //date from & date to must be not null!!!
    const DateFrom = new Date(this.txn_date_from);
    const DateTo = new Date(this.txn_date_to);
    if ((this.txn_date_from === '' || this.txn_date_to === '') && this.card_no === '') {
      this.errormessage = 'กรุณาเลือกวันที่ทำรายการ';
      this.modal.open('lg');
      return;
    }
    //date from must less than or equal date to
    if (DateFrom > DateTo) {
      this.errormessage = 'กรุณาเลือกวันที่เริ่มทำรายการน้อยกว่าวันที่สิ้นสุด';
      this.modal.open('lg');
      return;
    }
    const dateDiff = Math.ceil((DateTo.getTime() - DateFrom.getTime()) / (1000 * 3600 * 24) );
    if (dateDiff > 30) {
      this.errormessage = 'กรุณาเลือกวันที่ทำรายการไม่เกิน 30 วัน';
      this.modal.open('lg');
      return;
    }
    if (this.card_no !== '' && !this.checkIDCardFormat(this.card_no)) {
      this.errormessage = 'กรุณาระบุเลขที่บัตรประชาชนให้ถูกต้อง';
      this.modal.open('lg');
      return;
    }
    this.pager.pageNumber = 1;
    let req_date_from = '';
    let req_date_to = '';
    if (this.txn_date_from !== '') {
        req_date_from = moment(this.txn_date_from).format('DD/MM/YYYY');
    }
    if (this.txn_date_to !== '') {
        req_date_to = moment(this.txn_date_to).format('DD/MM/YYYY');
    }
    const json = {
      "id_no": this.card_no,
      "id_type": "001",
      "branch_code": AppConstant.branchCode,
      "page_number": this.pager.pageNumber,
      "limit_page": this.pager.limitPage,
      "txn_date_from": req_date_from,
      "txn_date_to": req_date_to
    };
    this.dataService.GetListPDF(json)
      .subscribe(
        data => {
          this.pager.pageNumber = data.data.pager.pageNumber;
          this.pager.limitPage = data.data.pager.limitPage;
          this.pager.pageTotal = data.data.pager.pageTotal;
          this.pager.rowFrom = data.data.pager.rowFrom;
          this.pager.rowTotal = data.data.pager.rowTotal;
          this.dataList = data.data.list as LogReqForm[];

          this.tmp_txn_date_from = this.txn_date_from;
          this.tmp_txn_date_to = this.txn_date_to;
          this.tmp_card_no = this.card_no;
        },
        error => {
          console.log('%c GetListPDF => Error ', 'background: #DC143C; color: #FFFFFF', error);
          this.errormessage = 'ไม่พบข้อมูล'
          this.modal.open('lg')
        }
      )
  }

  public getDataList() {
    //Check Input Form Search
    // if (!this.validateFormSerchReprint()) {
    //   return false;
    // }
    const json = {
      "id_no": this.tmp_card_no,
      "id_type": "001",
      "branch_code": AppConstant.branchCode,
      "page_number": this.pager.pageNumber,
      "limit_page": this.pager.limitPage,
      "txn_date_from": this.tmp_txn_date_from !== '' ? moment(this.tmp_txn_date_from).format('DD/MM/YYYY') : '',
      "txn_date_to": this.tmp_txn_date_to !== '' ? moment(this.tmp_txn_date_to).format('DD/MM/YYYY') : ''
    };
    this.dataService.GetListPDF(json)
      .subscribe(
        data => {
          this.pager.pageNumber = data.data.pager.pageNumber;
          this.pager.limitPage = data.data.pager.limitPage;
          this.pager.pageTotal = data.data.pager.pageTotal;
          this.pager.rowFrom = data.data.pager.rowFrom;
          this.pager.rowTotal = data.data.pager.rowTotal;
          this.dataList = data.data.list as LogReqForm[];
        }, error => {
          console.log('%c GetListPDF => Error ', 'background: #DC143C; color: #FFFFFF', error);
        }
      )
  }

  public validateFormSerchReprint(): boolean {
    let checkFlag: boolean = true;
    //date from & date to must be not null!!!
    const DateFrom = new Date(this.txn_date_from);
    const DateTo = new Date(this.txn_date_to);
    if ((this.txn_date_from === '' || this.txn_date_to === '') && this.card_no === '') {
      this.errormessage = 'กรุณาเลือกวันที่ทำรายการ';
      this.modal.open('lg');
      checkFlag = false;
      return checkFlag;
    }
    //date from must less than or equal date to
    if (DateFrom > DateTo) {
      this.errormessage = 'กรุณาเลือกวันที่เริ่มทำรายการน้อยกว่าวันที่สิ้นสุด';
      this.modal.open('lg');
      checkFlag = false;
      return checkFlag;
    }
    const dateDiff = Math.ceil((DateTo.getTime() - DateFrom.getTime()) / (1000 * 3600 * 24) );
    if (dateDiff > 30) {
      this.errormessage = 'กรุณาเลือกวันที่ทำรายการไม่เกิน 30 วัน';
      this.modal.open('lg');
      checkFlag = false;
      return checkFlag;
    }
    if (this.card_no !== '' && !this.checkIDCardFormat(this.card_no)) {
      this.errormessage = 'กรุณาระบุเลขที่บัตรประชาชนให้ถูกต้อง';
      this.modal.open('lg');
      checkFlag = false;
      return checkFlag;
    }
    return checkFlag;
  }

  public onPrint(id, ID_NO, ID_TYPE, LOG_REQ_ID) {
    $('#' + id).attr("disabled", "true");
    console.log(ID_NO);
    console.log(ID_TYPE);
    console.log(LOG_REQ_ID);
    this.dataService.ReprintPDF(ID_NO, ID_TYPE, LOG_REQ_ID)
      .subscribe(
        data => {
          const fileName = data.data.namePDF;
          const base64PDF = data.data.content;
          this.openPDF(base64PDF, fileName);
          // this.onRequestPrintPDF(base64PDF, id);
          $('#' + id).removeAttr("disabled");
        }, error => {
          console.log('%c onPrint => Error ', 'background: #DC143C; color: #FFFFFF', error);
          $('#' + id).removeAttr("disabled");
        }
      )
  }

  public openPDF(base64: string, fileName: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const objectUrl = URL.createObjectURL(blob);

    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }

  public onRequestPrintPDF(base64data, id) {
    this.hardwareService.connectHardware();
    const data = {
      "cmd": "printerSendQueryPdf",
      "params": {
        "doc": "PRINT_BASE64_PDF",
        "base64data": base64data
      }
    };
    const json = JSON.stringify(data);
    this.hardwareService.requestPrintPDF(json);
    setTimeout(() => {
      $('#' + id).show();
    }, 3000);
  }

  getPageNumber(index: number): number {
    let r: number;
    r = (Number(this.pager.rowFrom) + Number(index));
    return r;
  }

  searchClick() {
    this.pager.pageNumber = 1;
    this.getDataList();
  }

  onKeyup() {
    this.pager.pageNumber = 1;
    this.getDataList();
  }

  goToPage(n: number): void {
    this.pager.pageNumber = n;
    if (!this.getDataList()) {
      return;
    }
  }

 public previewPDF(ID_NO, ID_TYPE, LOG_REQ_ID, reportName) {
    this.previewPdfService.cardIdNo = ID_NO;
    this.previewPdfService.idType = ID_TYPE;
    this.previewPdfService.logReqId = LOG_REQ_ID;
    this.previewPdfService.reportName = reportName;
    this.route.navigate(['/previewPDF']);
 }

  checkIDCardFormat(id): boolean {
    console.log("checkIDCardFormat : " + id);
    if (id.length !== 13) {
      return false;
    }
    let i;
    let sum;
    for (i = 0, sum = 0; i < 12; i++) {
      sum += parseFloat(id.charAt(i)) * (13 - i);
    }
    if ((11 - sum % 11) % 10	!==	parseFloat(id.charAt(12))) {
      return false;
    }
    return true;
  }

  onNext(): void {
    this.pager.pageNumber++;
    if (!this.getDataList()) {
      return;
    }
  }

  onPrev(): void {
    this.pager.pageNumber--;
    if (!this.getDataList()) {
      return;
    }
  }

}
