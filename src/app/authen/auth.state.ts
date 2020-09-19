import { AuthStateModel, Login, Logout, LoginSuccess } from "./auth.actions";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { UserService } from "../_service/user.service";
import { UserStore } from "../store/user.store";
import { Router } from "@angular/router";

@State<AuthStateModel>({
    name: 'auth'
    // ,
    // defaults: {

    // }
})
export class AuthState {

    @Selector()
    static token(state: AuthStateModel) { return state.accessToken; }

    constructor(private userService: UserService, private router: Router, private userStore: UserStore) { }

    @Action(Login)
    async login({ getState, setState, patchState, dispatch }: StateContext<AuthStateModel>, action: Login) {
        const res = await this.userService.loginTeller(action.username, action.password, action.machineId).toPromise();
        if (res.responseStatus.responseCode == 200) {
            patchState({ accessToken: res.data.USER_FULLNAME });
            this.router.navigate(['/dash-board']);
        } 
    }


    // @Action(LoginSuccess)
    // loginSuccess({ dispatch }: StateContext<AuthStateModel>) {
    //     dispatch(new Navigate(['']))
    // }

    // @Action(LoginFailure)
    // loginFailure({ dispatch }: StateContext<AuthStateModel>) {
    //     dispatch(new Navigate(['']))
    // }

    // @Action(Logout)
    // logout({ setState, getState }: StateContext<AuthStateModel>) {
    //     const { token } = getState();
    //     return this.authService.logout(token).pipe(tap(() => {
    //         setState({});
    //     });
    // }

}