import * as moment from "moment";
import {BankAccount} from "./bankAccount";
import {Fee} from "./fee";
import {TermDepositList} from "./termDepositList";
import {isNullOrUndefined} from "util";

export let ReceiveType = {
    BankAC: "BANKAC",
    NationID: "NATID",
    MobileID: "MSISDN",
};


export let PaymentType = {
    FundTransfer: "01",
    Cash: "02",
    Cheque: "03"
};


export let TransactionStatus = {
    selectType: "S1",
    inputData: "S2",
    confirmation: "S3",
    complete: "S4",
    Cashto: "S5",
    ScanCheque: "S6",
    scan_wait: "scan_wait",
    scan_success: "S7",
    scan_false: "S8",
    inputCheque: "S9",
    close: "S10",
    AddCheque: 'S11',
    Chequeto: "S12",
    Addbarcode: "S13",
    generateOtp: "generateOtp",
    favorite: "favorite"
};

export class Transaction {

    public status = TransactionStatus;

    from: BankAccount;
    to: BankAccount;
    fee: Fee;
    fromFix: boolean = false;
    toFix: boolean = false;
    referenceNo: string;
    amount: string = null;
    barcode_no: string = null;
    totalAmount: number;
    effectiveDate;
    transactionDateTime;
    currentStatus: any;
    receiveType: string = ReceiveType.BankAC;
    paymentType: string = PaymentType.FundTransfer;
    paymentTypeFee: string = PaymentType.FundTransfer;
    selectedIndexPrincipal = null;
    selectedTermDepositList?: TermDepositList;
    loginfrom: string = null;
    ignoreAccountNO: string;
    Inputfrom: string;
    channel_type: boolean = false;
    balanceAvailable;
    transactionType;

    /////STATE////
    isSelectingAccount: boolean = false;
    isCheque: boolean = false;
    //////////////
    constructor() {

        this.effectiveDate = moment();
        this.transactionDateTime = moment();
        this.from = new BankAccount();
        this.to = new BankAccount();
        this.fee = new Fee();
    }

    isPenaltyFlag() {

        if (isNullOrUndefined(this.selectedTermDepositList)) {
            return 'N';
        }

        const today = this.transactionDateTime;
        const maturityDate = this.selectedTermDepositList.maturityDate;
        const days = maturityDate.diff(today, 'days', true);
        return days < 0 ? "Y" : "N";
    }

}