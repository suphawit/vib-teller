import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from "@angular/router";
import { UserStore } from '../store/user.store';


@Injectable()
export class LoggedInGuard implements CanActivate {


    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private userStore: UserStore) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.userStore.isLogged()){
            return true
        }
        else{
            this.router.navigate(["/"]);
            return false
        }
    }
}
