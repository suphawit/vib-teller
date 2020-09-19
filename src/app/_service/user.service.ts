import { Injectable } from '@angular/core';
import { API } from "../core/API";
import { UserStore } from '../store/user.store';
import { isNullOrUndefined } from 'util';
import { AppConstant, ConstantVIB } from '../share/app.constant';

@Injectable()
export class UserService {

    constructor(private api: API, private userStore: UserStore, private constantVIB: ConstantVIB, ) { }

    loginTeller(username, password, machineId) {
        /**u: login0001015 p: Gdupi9bok8bo*/
        const param = {
            "username": username,
            "password": password,
        }
        return this.api.postWithLoginTeller("tellerauthentication", param, machineId)
    }

    logoutTeller(username) {
        const param = {
            "userName": username
        };
        return this.api.postWithHeader("tellerLogout", param)
    }

    updateSubscription(id, status) {

        const param = {
            "machine_id": this.userStore.machineId,
            "tran_id": id,
            "status": status,
            "teller_id": this.userStore.userProfile
        }

        return this.api.postApprove("approvesubscription", param)
    }

    getApproveSubscrptionList(status = null) {

        let param = {}
        if (!isNullOrUndefined(status)) {
            param = {
                "status": status
            }
        }
        return this.api.postApprove("getapprovesubscription", param)
    }

    getRepostSubscription(reportDate) {
        console.log(encodeURI(`ReportSubScription?report_date=${reportDate}&branch_code=${this.userStore.userBranchNo}&branch_name=-`));
        const param = {
            "txn_date": reportDate
        };
        return this.api.postWithHeader("ReportSubScription", param);
        //return this.api.getURL(encodeURI( `ReportSubScription?report_date=${reportDate}&branch_code=${this.userStore.userBranchNo}&branch_name=-`) )
    }

    getVibBranch() {
        const param = {};
        return this.api.postWithHeader("GetVibBranch", param);
    }
    getVibMachineRegister(branchCode) {
        const param = { branch_code: branchCode };
        return this.api.postWithHeader("GetVibMachineRegister", param);
    }
}