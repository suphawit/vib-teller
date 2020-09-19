import { Injectable } from '@angular/core';
import { API } from "../core/API";
import { AppConstant, ConstantVIB } from '../share/app.constant';
import { UserStore } from '../store/user.store';

@Injectable()
export class MasterDataService {

  constructor(
    private api: API,
    private constantVIB: ConstantVIB,
    private userStore: UserStore,
  ) { }

  getInquiryApproveList(param) {
    const url = this.constantVIB.SERVICE_NAME.GET_INQUIRY_APPROVE_LIST;
    const request = { date: param }
    return this.api.postHeaderVIBToService(url, request);
  }
  updateApproveList(STATUS, TXN_ID) {
    const url = this.constantVIB.SERVICE_NAME.UPDATE_APPROVE_LIST;
    const request = {
      txn_id: TXN_ID,
      status: STATUS,
      user_id: this.userStore.userProfile.USER_ID
    }
    return this.api.postHeaderVIBToService(url, request);
  }
}
