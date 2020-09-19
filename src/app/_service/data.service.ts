import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { API } from "../core/API";
import { AppConstant } from '../share/app.constant';
import { UserStore } from '../store/user.store';

@Injectable()
export class DataService {

    constructor(private api: API, private userStore: UserStore) { }

    saveFile(account_no, content) {
        let param = {};
        param = {
            "machine_id": this.userStore.machineId,
            "account_no": account_no,
            "documents": [{
                    "content": content
                }]
        };
        console.log(param);
        return this.api.postVIB("savefile", param);
    }

    ReprintPDF(ID_NO, ID_TYPE, LOG_REQ_ID) {
        let param = {};
        param = {
            "id_no": ID_NO,
            "id_type": ID_TYPE,
            "log_req_id": LOG_REQ_ID,
        }
        return this.api.postWithHeader("ReprintPDF", param);
    }

    GetListPDF(param: any) {
        return this.api.postWithHeader("GetListPDF", param);
    }

    GetFileList(account_no: string = '', date: string = '') {
        let param = {};
        param = {
            "machine_id": this.userStore.machineId,
            "account_no": account_no,
            "date": date
        }
        return this.api.postVIB("getlistfiles", param);
    }

    DownloadFiles(account_no, date, file) {
        let param = {};
        param = {
            "machine_id": this.userStore.machineId,
            "account_no": account_no,
            "date": date,
            "file": file,
        }
        return this.api.postVIB("downloadFiles", param);
    }

    GetAccountDetailByAccountNo(account_no: string = '') {
        let param = {};
        param = {
            "ACCOUNT_NO": account_no,
        }
        return this.api.postVIB("getaccountdetailbyaccountno", param);
    }

    // CheckTellerAuthen() {
    //     const param = {
    //         "machine_id": this.userStore.machineId
    //     }
    //     return this.api.postVIB("CheckTellerAuthen", param);
    // }

    TellerLoginStatus() {
        const param = {}
        return this.api.postVIBWithHeader("tellerLoginStatus", param);
    }
}