import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs4-modal/lib/components/modal";
import { UserStore } from '../../store/user.store';
import { Router } from "@angular/router";
import { UserService } from '../../_service/user.service';
import { AppConstant } from 'app/share/app.constant';

declare var $: any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dash-board', title: 'Dashboard', icon: 'ti-panel', class: '' },
    // { path: 'absorption', title: 'Absorption', icon: 'ti-user', class: '' },
    { path: 'reprint', title: 'Reprint', icon: 'ti-pencil-alt2', class: '' },
    // { path: 'getfile', title: 'GetFile', icon: 'ti-export', class: '' },
    { path: 'subscriptionreport', title: 'Report', icon: 'ti-text', class: '' },
    { path: 'loginstatus', title: 'VIB-STATUS', icon: 'ti-settings', class: '' },
    { path: 'LOGOUT', title: 'LOGOUT', icon: 'ti-shift-left', class: 'active-pro' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.sass']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    @ViewChild("LogoutModal")
    logoutModal: ModalComponent;

    machineId = this.userStore.machineId;
    branchCode = AppConstant.branchCode;
    evnName = AppConstant.evnName;

    constructor(private userStore: UserStore, private router: Router, private userService:UserService) {

    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    onShowLogoutModal() {
        this.logoutModal.open('lg')
    }

    onClickLogout() {
        this.userService.logoutTeller(this.userStore.lastLogin)
        .subscribe(
            res => {
                console.log('Logout Success');
            },
            error => {
                console.log('Logout Error=>', error);
            },
        () => {
            this.userStore.clearData();
            this.router.navigate(['/']);
        });
    }
}

