
import { Component, OnInit, ViewChild, Renderer, ElementRef } from '@angular/core';
import { ModalComponent } from "ng2-bs4-modal/lib/components/modal";
import { AppConstant } from '../../share/app.constant';

@Component({
    selector: 'vib-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    public version = '';
    constructor() {
    }

    ngOnInit() {
        this.version = AppConstant.appVersion;
    }
}
