import { Injectable } from '@angular/core';
import { LocalStorage, SessionStorage } from "ngx-webstorage";
import { isNullOrUndefined } from 'util';

@Injectable()
export class UserStore {

    @SessionStorage("accessToken")
    accessToken
    lastLogin

    @SessionStorage("userProfile")
    userProfile
    TellerProfile
    AuthorProfile

    @SessionStorage("userBranchNo")
    userBranchNo

    @SessionStorage("machineId")
    machineId

    public ROLE_NAME: string = "TELLER";

    isLogged() {
        return !isNullOrUndefined(this.accessToken)
    }

    logout() {
        this.clearData()
    }

    clearData() {
        this.userProfile = null
        this.accessToken = null
        this.ROLE_NAME = 'TELLER';
        this.machineId = null;
    }
}