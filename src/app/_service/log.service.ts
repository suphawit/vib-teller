export class LogService {
    public log = [];

    constructor() { }

    public writeLog(service, remark) {
        const datetime = new Date().toISOString()
        const json = {
            "datetime": datetime,
            "service": service,
            "remark": remark
        }

        this.log.push(json);
        if (this.log.length > 50) {
            this.log.shift();
        }
    }
}