// import { State, Action, StateContext, Selector } from '@ngxs/store';
// import { UserService } from '../_service/user.service'
// import { ConfirmLogin, LoginSuccess, LoginFailure } from './login.actions';
// import { Login } from './login.model';

// export class LoginStateModel {
//   loginForm: {
//       model: Login,
//       dirty: false,
//       status: '',
//       errors: {}
//   };
// }

// @State<LoginStateModel>({
//   name: 'login',
//   defaults: {
//       loginForm: {
//           model: undefined,
//           dirty: false,
//           status: '',
//           errors: {}
//       }
//   }
// })
// export class LoginState {

//   constructor(private userService: UserService) { }

//   @Selector()
//   static getLogin(state: LoginStateModel) {
//       return state.loginForm.model
//   }

//   @Action(ConfirmLogin, { cancelUncompleted: true })
//   async login({ getState, dispatch }: StateContext<LoginStateModel>) {
//       const state = getState();
//       const model = state.loginForm.model
//       const data =  await this.userService.loginTeller(model.userName, model.password).toPromise();
//       console.log(data);
//       if ( data.responseStatus.responseCode == 200) {
//           dispatch(new LoginSuccess())
//       } else {
//           dispatch(new LoginFailure())
//       }
//   }


//   // @Action(LoginSuccess)
//   // loginSuccess( { dispatch }: StateContext<LoginStateModel>) {
//   //     dispatch(new Navigate(['']))
//   // }

//   // @Action(LoginFailure)
//   // loginFailure( { getState, patchState, dispatch }: StateContext<LoginStateModel>) {
//   //     dispatch(new Navigate(['']))
//   // }
// }