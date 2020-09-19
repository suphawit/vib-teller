export class AuthStateModel {
    accessToken: string;
    username: string;
    tellerProfile: string;
    authorProfile: string;
}

export class Login {
    static readonly type = '[Auth] Login';
    constructor(public username: string, public password: string, public machineId: string) { }
}

export class LoginSuccess {
    static readonly type = '[Auth] LoginSuccess';
}

export class LoginFail {
    static readonly type = '[Auth] LoginFail';
}

export class Logout {
    static readonly type = '[Auth] Logout';
}