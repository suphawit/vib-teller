import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { NotificationService } from "../../_service/notification.service";
import { Router } from "@angular/router";
import { UserStore } from '../../store/user.store';
import { ModalComponent } from "ng2-bs4-modal/lib/components/modal";
import { AppConstant } from 'app/share/app.constant';

@Component({
    selector: 'vib-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.sass']
})
export class NavigationBarComponent implements OnInit, AfterViewInit {
    @ViewChild("LogoutModal")
    logoutModal: ModalComponent;

    countWaitingApproveTransaction: number = 0;

    constructor(private notificationService: NotificationService,
        public router: Router,
        public userStore: UserStore) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        $(".nav-item a").on("click", function () {
            $(".nav-item.active").removeClass("active");
            $(this).parent().addClass("active");
        });
    }

    onShowLogoutModal() {
        this.logoutModal.open('lg')
    }

    onClickNavigate(value) {
        this.router.navigate([value]);
    }

    onClickLogout() {
        this.userStore.clearData();
        this.router.navigate(['/']);
    }
}
