import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs4-modal/lib/components/modal";
import { Router } from "@angular/router";
import { UserService } from '../../_service/user.service';
import { UserStore } from '../../store/user.store';

@Component({
    selector: 'vib-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    @ViewChild('modal')
    modal: ModalComponent;
    public message = "";
    public username = "";
    public password = "";
    public machineId = "--- กรุณาเลือก ---";
    public selectedMachine: "";
    public branchLists: any = [];
    public machineLists: any = [];
    public disabledMachine = true;
    constructor(private router: Router, public userService: UserService, public userStore: UserStore) {
    }

    ngOnInit() {
        this.getVibBranch()
    }

    onKeyEnterPress(event) {
        if (event.key === 'Enter') {
            this.onClickLogin();
        }
    }

    onClickLogin() {
        if (this.username.length === 0 || this.password.length === 0) {
            return
        }
        const MACHINE_ID = this.machineId === "--- กรุณาเลือก ---" ? "" : this.machineId;
        this.userService.loginTeller(this.username, this.password, MACHINE_ID).subscribe(res => {
            this.userStore.userProfile = res.data
            switch (this.userStore.userProfile.ROLE_NAME) {
                case 'BR_AUTHOR':
                    this.userStore.AuthorProfile = this.userStore.userProfile;
                    break;
                case 'BR_TELLER':
                    this.userStore.TellerProfile = this.userStore.userProfile;
                    break;
            }
            this.userStore.machineId = MACHINE_ID
            this.userStore.userBranchNo = res.data.BRANCH_NO
            //this.userStore.accessToken = res.data.USER_FULLNAME
            this.userStore.accessToken = res.data.USER_ID
            this.userStore.lastLogin = res.data.USER_ID
            this.router.navigate(['/dash-board']);
        },
            error => {
                this.message = error.responseStatus.responseMessage
                this.modal.open('lg')
            }
        )
    }

    // GET BRANCH VIB
    getVibBranch() {
        this.userService.getVibBranch().subscribe(response => {
            if (response.header.success) {
                this.branchLists = response.data
            } else {
                this.message = response.responseStatus.responseMessage
                this.modal.open('lg')
            }
        }, error => {
            this.message = error.responseStatus.responseMessage
            this.modal.open('lg')
        });
    }

    // GET MACHINE REGISTER FOR BRANCH ID
    getVibMachineRegister(branchCode) {
        this.userService.getVibMachineRegister(branchCode).subscribe(response => {
            if (response.header.success) {
                this.machineLists = response.data
            } else {
                this.message = response.responseStatus.responseMessage
                this.modal.open('lg')
            }
        }, error => {
            this.message = error.responseStatus.responseMessage
            this.modal.open('lg')
        });
    }

    // CHANG BRANCH
    changeBranch(data) {
        if (data === '--- กรุณาเลือก ---') {
            this.disabledMachine = true;
            this.machineId = "--- กรุณาเลือก ---";
        } else {
            this.machineId = "--- กรุณาเลือก ---";
            this.getVibMachineRegister(data);
            this.disabledMachine = false;
        }
    }
}
