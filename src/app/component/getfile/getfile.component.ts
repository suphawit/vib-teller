import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../_service/data.service';
import { HardwareService } from "../../_service/hardware.service";
import { ModalComponent } from "ng2-bs4-modal/lib/components/modal";

@Component({
  selector: 'vib-getfile',
  templateUrl: './getfile.component.html',
  styleUrls: ['./getfile.component.sass']
})
export class GetfileComponent implements OnInit {

  @ViewChild('modal')
  modal: ModalComponent;
  public errormessage = "";
  public dataList: {};
  public dataShowList = new Array();
  public p: number = 1;
  public account_no: string = '';
  public date: string;
  public Modal: boolean = false;
  public Show: boolean = false;
  public View: boolean = false;
  public imageURL: string;
  public Content: string;
  public haveData: boolean = false;

  constructor(private dataService: DataService,
    private hardwareService: HardwareService) { }

  ngOnInit() {
    this.getDataList();
  }

  public onShowModal($event) {
    this.dataShowList = [];
    this.Modal = true;
    this.Show = true;
    this.View = false;
    this.account_no = $event;
    this.dataService.GetFileList($event)
      .subscribe(DATA => {
        DATA.data.directory.forEach(element => {
          this.dataService.GetFileList(this.account_no, element)
            .subscribe(
              DATAVALUE => {
                DATAVALUE.data.allFiles.forEach(value => {
                  this.dataShowList.push({ 'file': value, 'date': element });
                })
                console.log(this.dataShowList);
              }, ERROR => {
                this.errormessage = 'ไม่พบข้อมูล'
                // this.errormessage = ERROR.responseStatus.responseMessage
              }
            )
        });
      });
  }

  public getDataList() {
    this.dataService.GetFileList()
      .subscribe(
        data => {
          this.dataList = data.data.directory
        }, error => {
          this.errormessage = 'ไม่พบรายการข้อมูล'
          // this.errormessage = error.responseStatus.responseMessage
        }
      )
  }

  public onViewFiles(selectorValue) {
    this.dataService.DownloadFiles(this.account_no, selectorValue.date, selectorValue.file)
      .subscribe(
        data => {
          this.Show = false;
          this.View = true;
          this.Content = data.data.content;
          this.imageURL = 'data:image/jpg;base64,' + data.data.content;
        }, error => {
          this.errormessage = error.responseStatus.responseMessage
          this.modal.open('lg')
        }
      )
  }

  public onPrint(selectorValue) {
    console.log(selectorValue);
    // this.dataService.DownloadFiles(this.account_no, selectorValue.date, selectorValue.file)
    //   .subscribe(
    //     data => {
    this.onRequestPrintFile(this.Content);
    // }, error => {
    //   this.errormessage = error.responseStatus.responseMessage
    //   this.modal.open('lg')
    // }
    // )
  }

  public onRequestPrintFile(base64data) {
    this.hardwareService.connectHardware();
    console.log(base64data);
    const data = {
      "cmd": "printerSendQueryJpg",
      "params": {
        "doc": "PRINT_BASE64_JPG",
        "base64data": base64data
      }
    };
    const json = JSON.stringify(data);
    this.hardwareService.requestPrintPaper(json);
  }

  public onCloseModal() {
    this.Modal = false;
    this.Show = false;
  }
}
