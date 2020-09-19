import {isNullOrUndefined} from "util";
import {Bank} from "./bank";
import {PaymentType} from "./transaction";

/**
 * Created by SyndereN on 12/30/2016.
 */
export class BankAccount {
    bank: Bank;
    custCif: string;
    idType: string;
    accountName: string = '';
    accountNumber: string = '';
    accountType: string;
    productCode: string;
    ProductDesc: string;
    branchCode: string;
    branchName: string;
    accountStatusCode: string;
    accountStatusDesc: string;
    accountOpenDate: string;
    principalBalance: number;
    holdAmt: string;
    odAmt: string;
    availBalance: number;
    balance: number;
    unclearAmt: string;
    accruIntAmt: string;
    lastTxAmount: string;
    lastTxType: string;
    lastTxDate: string;
    lastTransaction: any;
    enable: boolean = true;
    phoneNumber: string = '';
    depositDetail: any;
    chequeType: string = '';
    ///////////////////////////
    isSearchByNumber: boolean = false;

    public static parseJSONArray(data: any) {
        const inquiryAccountList = data.data.inquiryAccountList.inquiryAccount;
        const list = new Array();
        for (const InquiryAccount of inquiryAccountList) {
            list.push(new BankAccount(InquiryAccount));
        }
        return list;
    }

    static getAccountTypeCash() {
        const bankAccount = new BankAccount();
        bankAccount.accountType = PaymentType.Cash;
        bankAccount.bank.bg_image = './assets/kiatnakin/image/bg_money.png';
        bankAccount.bank.font_color = '#000000';
        bankAccount.bank.image = './assets/kiatnakin/image/cash.png';

        return bankAccount;
    }

    static getAccountTypeCheque() {
        const bankAccount = new BankAccount();
        bankAccount.accountType = PaymentType.Cheque;
        bankAccount.bank = Bank.paymentChannel()[1];
        bankAccount.bank.bg_image = './assets/kiatnakin/image/bg_cheque.png';
        bankAccount.accountName = bankAccount.bank.name;
        return bankAccount;
    }

    constructor(jsonData?: any) {

        this.bank = new Bank(null);
        this.bank.image = "./assets/kiatnakin/image/icon_transfer_default.png";
        this.bank.font_color = "#FFF";

        if (!isNullOrUndefined(jsonData)) {
            this.custCif = jsonData.custCif;
            this.idType = jsonData.idType;
            this.accountName = jsonData.accountName;
            this.accountNumber = jsonData.accountNo;
            this.accountType = jsonData.accountType;
            this.productCode = jsonData.productCode;
            this.branchCode = jsonData.branchCode;
            this.branchName = jsonData.branchName;
            this.accountStatusCode = jsonData.accountStatusCode;
            this.accountStatusDesc = jsonData.accountStatusDesc;
            this.accountOpenDate = jsonData.accountOpenDate;
            this.principalBalance = jsonData.principalBalance;
            this.holdAmt = jsonData.holdAmt;
            this.odAmt = jsonData.odAmt;
            this.availBalance = jsonData.availBalance;
            this.balance = jsonData.availBalanceNet;
            this.unclearAmt = jsonData.unclearAmt;
            this.accruIntAmt = jsonData.accruIntAmt;
            this.lastTxAmount = jsonData.lastTxAmount;
            this.lastTxType = jsonData.lastTxType;
            this.lastTxDate = jsonData.lastTxDate;
            this.lastTransaction = jsonData.lastTransaction;

            this.setKKBank();

            if (jsonData.hasOwnProperty("depositDetailList")) {
                const depositDetail = jsonData.depositDetailList.depositDetail;
                if (!isNullOrUndefined(depositDetail) &&
                    depositDetail.constructor === Array) {
                    this.depositDetail = depositDetail;
                }
            }
        }
    }

    setKKBank() {
        this.bank = Bank.paymentChannel()[1];
    }

    isStatusOpen() {
        if (this.bank.code === "069") {
            return this.accountStatusCode === "8"
        }
        return true;
    }

    getProductCode() {
        let productCode = "";
        if (!isNullOrUndefined(this.accountNumber)) {
            productCode = this.accountNumber.substring(4, 7);
        }
        return productCode;
    }

}
