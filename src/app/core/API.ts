import { Http, Response, RequestOptions } from '@angular/http'
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Environment, Utils } from '../share/utils';
import { AppConstant, ConstantVIB } from '../share/app.constant';
import { UserStore } from '../store/user.store';
import { DatePipe } from '@angular/common'

const responseCode = {
    success: 200,
    failure: 1
};

@Injectable()
export class API {
    apiVIB = Environment.domainAPI;
    apiApprove = "http://localhost:5800/api/"
    REF_ID = this.datePipe.transform(new Date, 'yyyyMMddhhmmssS');

    constructor(
        private http: Http,
        private userStore: UserStore,
        private datePipe: DatePipe,
        private constantVIB: ConstantVIB,
    ) { }

    private getHeader(header: any) {
        header["Content-Type"] = "application/json;charset=utf-8";
        header["Access-Control-Allow-Origin"] = "*";
        return header;
    }

    private getHeaderNewVIB(): Headers {
        const header = new Headers();
        header.append('Content-Type', 'application/json;charset=utf-8');
        const refId = this.datePipe.transform(new Date, 'yyyyMMddhhmmssS');
        header.append('ReferenceNo', refId);
        header.append('TokenAccess', this.userStore.accessToken);
        header.append('MachineId', this.userStore.machineId);
        return header;
    }

    // GENARETE HEADER LOGIN TELLER TO VIB
    private getHeaderLoginTeller(machineId): Headers {
        const header = new Headers();
        header.append('Content-Type', 'application/json;charset=utf-8');
        const refId = this.datePipe.transform(new Date, 'yyyyMMddhhmmssS');
        header.append('ReferenceNo', refId);
        header.append('TokenAccess', this.userStore.accessToken);
        header.append('MachineId', machineId);
        return header;
    }

    // POST TO LOGIN TELLER WITH HEADER
    postWithLoginTeller(method, param, machineId) {
        const url = this.getURL(method);
        console.info('%c API Service => Requesting ', 'background: #0000CD; color: #FFFFFF', url);
        console.log('Header', this.getHeaderLoginTeller(machineId));
        console.log('Body', param);
        return this.http.post(url, param, { headers: this.getHeaderLoginTeller(machineId) }).map(this.extractData)
    }

    getURL(path) {
        return `${this.apiVIB}${path}`
    }

    postApprove(path, param) {
        const url = `${this.apiApprove}${path}`;
        console.debug("API Service", "=> Requesting", url, param);
        return this.http.post(url, param).map(this.extractData)
    }

    postVIB(path, param) {
        const url = `${this.apiVIB}${path}`;
        console.info('%c API Service => Requesting ', 'background: #0000CD; color: #FFFFFF', url, param);
        return this.http.post(url, param).map(this.extractData);
    }

    postVIBWithHeader(path, param) {
        const url = `${this.apiVIB}${path}`;
        console.info('%c API Service => Requesting ', 'background: #0000CD; color: #FFFFFF', url, param);
        return this.http.post(url, param, { headers: this.getHeaderNewVIB() }).map(this.extractData);
    }

    post(method, param) {
        const url = this.getURL(method);
        console.info('%c API Service => Requesting ', 'background: #0000CD; color: #FFFFFF', url, param);
        return this.http.post(url, param).map(this.extractData)
    }

    postWithHeader(method, param) {
        const url = this.getURL(method);
        console.info('%c API Service => Requesting ', 'background: #0000CD; color: #FFFFFF', url);
        console.log('Header', this.getHeaderNewVIB());
        console.log('Body', param);
        return this.http.post(url, param, { headers: this.getHeaderNewVIB() }).map(this.extractData)
    }

    get(method) {
        const url = this.getURL(method);
        console.debug("API Service", "=> Requesting", url);
        return this.http.get(url).map(this.extractData)
    }

    private extractData(res: Response) {
        console.info('%c API Service => Response ', 'background: #008000; color: #FFFFFF', res.url, res.json());
        const body = res.json();
        if (body.header.success !== true) {
            console.info('%c API Service => Response ', 'background: #DC143C; color: #FFFFFF', body);
            throw body;
        }
        return body || {};
    }

    // FUNCTION SET DATA PARAM TO SERVICE VIB
    postHeaderVIBToService(url: string, param: any) {
        const httpOptions = this.generateHeader();
        return this.http.post(url, param, { headers: httpOptions }).map(this.extractData);
    }

    // FUNCTION SET HEADER TO SERVICE VIB
    private generateHeader(): Headers {
        const header = new Headers();
        header.append('Content-Type', 'application/json;charset=utf-8');
        header.append('ReferenceNo', this.REF_ID);
        header.append('TokenAccess', this.userStore.accessToken);
        header.append('MachineId', this.userStore.machineId);
        return header;
    }
}