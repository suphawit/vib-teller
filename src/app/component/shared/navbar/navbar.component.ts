import { Component, OnInit, Renderer, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ROUTES } from '../../sidebar/sidebar.component';
import { UserStore } from '../../../store/user.store';
import { ModalComponent } from "ng2-bs4-modal/lib/components/modal";

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit, AfterViewInit {
    @ViewChild("LogoutModal")
    logoutModal: ModalComponent;

    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    @ViewChild("navbar-cmp") button;

    constructor(
        private router: Router,
        location: Location,
        private renderer: Renderer,
        private element: ElementRef,
        private userStore: UserStore) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    ngAfterViewInit() {
        $(".nav-item a").on("click", function () {
            $(".nav-item.active").removeClass("active");
            $(this).parent().addClass("active");
        });
    }

    getTitle() {
        let titlee = window.location.hash;
        titlee = titlee.substring(2);
        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    sidebarToggle() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];

        if (this.sidebarVisible === false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    onClickLogout() {
        this.userStore.clearData();
        this.router.navigate(['/']);
    }
    onShowLogoutModal() {
        console.log('Show');
        this.logoutModal.open('lg')
        this.onClickLogout();
    }
}
