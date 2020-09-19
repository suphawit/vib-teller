import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';
import { Router } from '../../../../node_modules/@angular/router';
import { HardwareService } from "../../_service/hardware.service";
import { DataService } from '../../_service/data.service';
import { PreviewPdfService } from '../../_service/preview-pdf.service';
import { LogService } from '../../_service/log.service';

@Component({
  selector: 'vib-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.sass']
})
export class PreviewPdfComponent implements OnInit, OnDestroy {
  public subscription = new Subscription();
  public base64PDF: string;
  public pdf: string;
  public errormessage: string;

  constructor(private dataService: DataService,
    private previewPdfService: PreviewPdfService,
    private hardwareService: HardwareService,
    private logService: LogService,
    private route: Router) {
  }

  ngOnInit() {
    this.previewPDF();
  }

  public previewPDF() {
    this.logService.writeLog("PreviewPdfComponent", "Request Call API ReprintPDF");

    this.subscription.add(
      this.dataService.ReprintPDF(this.previewPdfService.cardIdNo, this.previewPdfService.idType, this.previewPdfService.logReqId).subscribe(
        data => {
          this.base64PDF = data.data.content;
          this.pdf = 'data:application/pdf;base64,' + this.base64PDF;
          this.logService.writeLog("PreviewPdfComponent", "Response Call API ReprintPDF");
          data = null;
        }, error => {
          this.errormessage = 'ไม่สามารถ Preview เอกสารได้'
        }
      )
    )
  }

  public onPrint() {
    $('#btn_on_print').hide();
    this.hardwareService.connectHardware();
    const data = {
      "cmd": "printerSendQueryPdf",
      "params": {
        "doc": "PRINT_BASE64_PDF",
        "base64data": this.base64PDF
      }
    };
    const json = JSON.stringify(data);
    this.hardwareService.requestPrintPDF(json);
    setTimeout(() => {
      $('#btn_on_print').show();
    }, 3000);
  }

  public onDownload() {
    this.dataService.ReprintPDF(this.previewPdfService.cardIdNo, this.previewPdfService.idType, this.previewPdfService.logReqId)
      .subscribe(
        data => {
          const fileName = data.data.namePDF;
          const base64PDF = data.data.content;
          this.openPDF(base64PDF, fileName);
          // this.onRequestPrintPDF(base64PDF, id);
        }, error => {
          console.log('%c onPrint => Error ', 'background: #DC143C; color: #FFFFFF', error);
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

  ngOnDestroy(): void {
    this.base64PDF = null;
    this.errormessage = null;
    this.pdf = null;
    this.subscription.unsubscribe();
    this.subscription = null;
    this.dataService = null;
    this.previewPdfService = null;
    this.hardwareService = null;
    this.logService = null;
    this.route = null;
  }

  goBack() {
    this.route.navigate(['/reprint']);
  }
}