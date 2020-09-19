import { Component, OnInit, ViewChild } from '@angular/core';
import { Utils, Environment } from '../../../app/share/utils'
import { Http } from '@angular/http';
import { SocketService } from "../../_service/socket.service";
import { DataService } from "../../_service/data.service";
import { HardwareService } from "../../_service/hardware.service";
import { Absorption } from '../../_model/absorption';
import { AppConstant } from '../../share/app.constant';
import { isNullOrUndefined } from 'util';
import { ModalComponent } from "ng2-bs4-modal/lib/components/modal";

@Component({
  selector: 'vib-absorption',
  templateUrl: './absorption.component.html',
  styleUrls: ['./absorption.component.sass']
})
export class AbsorptionComponent implements OnInit {

  @ViewChild('modal')
  modal: ModalComponent;
  public errormessage = "";
  public absorp = new Absorption();
  public dataList = [];
  public Modal: boolean = false;
  public imgName: string = '';
  public Fails: boolean = false;
  public Show: boolean = false;
  public Progress: boolean = false;
  public View: boolean = false;
  public PDF: boolean = false;
  public Selector: boolean = false;
  public UrlOutPut: string = Environment.domainImageOutput;
  public imageURL: string;
  public Content: string = "";
  public ScanFalse: boolean = false;
  public count: number = 0;
  public accountTrue = false;
  public angle = 360;
  public cw: number = 0;
  public ch: number = 0;
  public cx: number = 0;
  public cy: number = 0;
  public wi: number = 0;
  public hi: number = 0;
  public tempImg: any;
  public MaxCanvas = 600;
  public ratio = 0;
  public dataType = '';
  public tempImageUrl = '';

  constructor(
    private socketService: SocketService,
    private dataService: DataService,
    private http: Http,
    private hardwareService: HardwareService
  ) {
    this.StartData();
    this.socketService.connectVIB();
  }

  ngOnInit() {

  }

  public StartData() {
    if (Array.isArray(this.dataList) === false) {
      this.dataList = [this.dataList];
    }
    this.dataList.push({
      imageURL: "./assets/images/Default_img.png",
      last: true
    })
  }

  public validate(event) {
    if (event.length !== 14) {
      this.accountTrue = false;
    }
    Utils.validate(event);
  }

  public onMock() {
    const that = this;
    this.http.get('./assets/mockup/citizen4.txt')
      .subscribe(data => {
        this.Modal = true;
        this.Show = true;
        this.Content = data.text();
        this.imageURL = 'data:image/jpeg;base64,' + data.text();
        const image = document.createElement("img");
        image.src = this.imageURL;
        image.onload = function () {
          that.ratio = that.calRatio(image.width, image.height);
          that.cw = that.calWidth(image.width, that.ratio);
          that.ch = that.calHeight(image.height, that.ratio);
          that.cx = (that.MaxCanvas - that.cw) / 2
          that.cy = (that.MaxCanvas - that.ch) / 2
        }
        this.RotateIMG();
      });
  }

  public RotateIMG() {
    const that = this;
    const image = document.createElement("img");

    image.src = this.imageURL;
    console.log(this.imageURL);
    image.onload = function () {
      const canvas: any = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(that.cx, that.cy, that.cw, that.ch);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, that.MaxCanvas, that.MaxCanvas);
      ctx.translate(that.MaxCanvas / 2, that.MaxCanvas / 2);
      ctx.rotate(that.angle * (Math.PI / 180));
      that.angle = 90;
      ctx.translate(-that.MaxCanvas / 2, -that.MaxCanvas / 2);
      ctx.drawImage(image, that.cx, that.cy, that.cw, that.ch);
    }
  }

  public calRatio(width, height) {
    let ratio = 0;
    if (width >= height) {
      ratio = width / this.MaxCanvas;
    } else {
      ratio = height / this.MaxCanvas;
    }
    return ratio;
  }

  public calWidth(width, ratio) {
    return width / ratio;
  }

  public calHeight(height, ratio) {
    return height / ratio
  }

  public calY() {
    return (this.MaxCanvas - this.cy) / 2;
  }

  public calX() {
    return (this.MaxCanvas - this.cw) / 2;
  }

  public onRequestVIB(status) {

    if (this.accountTrue === true) {
      if (status === 'back') {
        this.Modal = false;
      } else {
        this.Modal = true;
      }

      this.Progress = true;
      this.Fails = false;
      this.socketService.onSendStatusToVIB(status, this.absorp.accountNo)
        .subscribe(
          (data: any) => {
            console.log(data.status);
            switch (data.status) {
              case "Success":
                const that = this;
                this.ScanFalse = false;
                this.Modal = true;
                this.Progress = false;
                this.Show = true;
                this.imageURL = 'data:image/jpeg;base64,' + data.base64;
                this.Content = data.base64;
                const image = document.createElement("img");
                image.src = this.imageURL;
                image.onload = function () {
                  that.ratio = that.calRatio(image.width, image.height);
                  that.cw = that.calWidth(image.width, that.ratio);
                  that.ch = that.calHeight(image.height, that.ratio);
                  that.cx = (that.MaxCanvas - that.cw) / 2
                  that.cy = (that.MaxCanvas - that.ch) / 2
                }
                this.RotateIMG();
                break;
              case "back":
                this.Modal = false;
                this.Progress = false;
                this.Show = false;
                break;
              case "ScanFalse":
                this.Modal = true;
                this.Progress = false;
                this.Fails = true;
                this.ScanFalse = true;
                break;
              case "stopTimer":
                this.Modal = true;
                this.Progress = false;
                this.Show = true;
                break;
              default:
                break;
            }
          },
          Error => {

          }
        )
    } else {
      this.checkAccount();
    }
  }

  public onShowView(data) {
    this.Modal = true;
    this.View = true;
    this.Progress = false
    this.Show = false;
    this.imageURL = data;
    console.log(data);

    // this.imgName = data.im
  }

  public onShowModal(imgName) {
    this.Modal = true;
    this.Show = true;
    this.imgName = imgName;
  }

  public onCloseModal() {
    this.Modal = false;
    this.Show = false;
    this.View = false;
    this.Progress = false;
    this.onRequestVIB('back');
  }

  public onRequestPrintFile(base64data, id) {
    console.log(base64data);
    $('#' + id).hide();
    this.hardwareService.connectHardware();
    const data = {
      "cmd": "printerSendQueryJpg",
      "params": {
        "doc": "PRINT_BASE64_JPG",
        "base64data": base64data[1]
      }
    };
    const json = JSON.stringify(data);
    this.hardwareService.requestPrintPaper(json);
    setTimeout(() => {
      $('#' + id).show();
    }, 3000);
  }

  public onRetryValue() {
    this.Fails = false;
    this.Progress = true;
    if (this.Show === true) {
      this.Show = false;
      this.onRequestVIB('Teller_request_Absorption')
    } else {
      this.onRequestVIB("Retry");
    }

  }

  public onSaveValue() {
    console.log('sendDocument');
    const base64data = '';

    const canvas: any = document.getElementById("myCanvas");
    const that = this;
    this.imageURL = canvas.toDataURL('image/jpeg');
    this.Content = canvas.toDataURL('image/jpeg').split('data:image/jpeg;base64,');
    const image = document.createElement("img");
    image.src = this.imageURL;
    image.onload = function () {
      const ratio = 370 / 225;
      const cw = that.calWidth(image.width, 3);
      that.imageURL = canvas.toDataURL('image/jpeg');
    }

    this.count++;
    this.dataService.saveFile(this.absorp.accountNo, this.Content)
      .subscribe(
        data => {
          this.Modal = false;
          this.Show = false;
          this.PDF = false;
          this.angle = 360;
          const dataHW = {
            no: this.count,
            imageURL: this.imageURL,
            content: this.Content
          }
          console.log(dataHW);
          this.dataList.splice(this.dataList.length - 1, 0, dataHW);
        },
        Error => {

        }
      );
  }

  public checkAccount() {
    this.dataService.GetAccountDetailByAccountNo(this.absorp.accountNo)
      .subscribe(
        DATA => {
          this.errormessage = 'บัญชีสามารถใช้งานได้';
          this.modal.open('lg')
          this.accountTrue = true;
        }, Error => {
          this.errormessage = 'ไม่พบบัญชี หรือ เลขบัญชีไม่ถูกต้อง';
          this.modal.open('lg')
        }
      )
  }

}
