import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { DataService } from '../../_service/data.service';
import { UserStore } from '../../store/user.store';
import { AppConstant } from '../../share/app.constant';
import { isNullOrUndefined } from 'util';
import { HardwareService } from '../../_service/hardware.service'; import { environment } from 'environments/environment.prod';
;

@Component({
  selector: 'vib-loginstatus',
  templateUrl: './loginstatus.component.html',
  styleUrls: ['./loginstatus.component.sass']
})
export class LoginstatusComponent implements OnInit {

  public machine_id: string = '';
  public branch_code: string = '';
  public TellerStatus: boolean = false;
  public AuthorStatus: boolean = false;
  public Author_USER_FULLNAME: string = '';
  public Teller_USER_FULLNAME: string = '';
  public Author_LastLogin: string = '';
  public Teller_LastLogin: string = '';
  private windowVideoCall;
  private timerCheckWindowVideoCall;

  constructor(private userService: UserService, private userStore: UserStore, private dataService: DataService, private hardwareService: HardwareService) { }

  ngOnInit() {
    this.machine_id = this.userStore.machineId;
    this.branch_code = AppConstant.branchCode;
    this.getProfile();
  }

  getProfile() {
    this.dataService.TellerLoginStatus().subscribe(data => {
      const dataArray = data.data;
      dataArray.tellerItemInfo.forEach(teller => {
        if (teller.roleName === 'BR_AUTHOR') {
          this.AuthorStatus = true;
          this.Author_USER_FULLNAME = teller.userFullname;
          this.Author_LastLogin = teller.lastupdDtm;
        }
        if (teller.roleName === 'BR_TELLER') {
          this.TellerStatus = true;
          this.Teller_USER_FULLNAME = teller.userFullname;
          this.Teller_LastLogin = teller.lastupdDtm;
        }
      });
    },
      error => {
        console.log("response Code", error.responseStatus.responseCode);
        console.log("repsonse Message", error.responseStatus.responseMessage);
        console.log("repsonse Message Original", error.responseStatus.responseMessageOriginal);
      }
    )
  }

  getProfile2() {
    if (!isNullOrUndefined(this.userStore.AuthorProfile)) {
      this.AuthorStatus = true;
      this.Author_USER_FULLNAME = this.userStore.AuthorProfile.USER_FULLNAME;
      this.Author_LastLogin = this.userStore.AuthorProfile.LASTUPD_DTM;
    }

    if (!isNullOrUndefined(this.userStore.TellerProfile)) {
      this.TellerStatus = true;
      this.Teller_USER_FULLNAME = this.userStore.TellerProfile.USER_FULLNAME;
      this.Teller_LastLogin = this.userStore.TellerProfile.LASTUPD_DTM;
    }
  }

  OpenVIB() {
    const that = this;
    environment.domainVIB = 'http://192.168.2.16:5200/#/kk';
    const strWindowFeatures = "location=0,toolbar=0,fullscreen=1";
    const remoteAddress = encodeURIComponent("http://localhost:5200/#/kk/remote")
    this.windowVideoCall = window.open(`${environment.domainVIB}&ip=${remoteAddress}`, "VIB", strWindowFeatures);
    this.hardwareService.movePopupToFullScreen();
  }
}
