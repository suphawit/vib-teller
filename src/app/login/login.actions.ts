export class ConfirmLogin {
    static readonly type = '[LOGIN] ConfirmLogin'
    constructor(username: string, password: string) { }
}

export class LoginSuccess {
    static readonly type = '[Item] Login Success'
    constructor() { }
}

export class LoginFailure {
    static readonly type = '[Item] Login Failure'
    constructor() { }
}
