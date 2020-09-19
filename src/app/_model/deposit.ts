import {PaymentType, Transaction} from "./transaction";
import {InterestRate} from "./interestRate";
import {FrequencyTerm} from "./frequencyTerm";

export let DepositType = {
    CASH_CASA: "Cash_CASA",
    CASH_TD: "Cash_TD",
    CASA_InterBank: "CASA_InterBank",
    CHEQUE_CASA: "BankerChq_CASA",
    CHEQUE_TD: "BankerChq_TD",
    OTHERBANKCHEQUE_CASA: "OtherBankerChq_CASA",
    OTHERBANKCHEQUE_TD: "OtherBankerChq_TD",
};

export class Deposit extends Transaction {

    referenceNo: string;
    amount: string = null;
    totalAmount: number;
    selectedTDTerm?: any;
    selectedTDTermTitle?: string;
    selectedFrequency?: FrequencyTerm;
    interestRate?: InterestRate;

    public updateDepositType() {

        const sourceType = this.from.accountType;
        const destinationType = this.to.accountType;

        const CASA = ["CA", "SA"];
        const TD = ["TD"];

        this.checkPaymentTypeCashCASA(sourceType, destinationType, CASA);
        // if (PaymentType.Cash === sourceType && CASA.indexOf(destinationType) !== -1) {
        //     this.transactionType = DepositType.CASH_CASA;
        //     if (this.to.isSearchByNumber) {
        //         this.transactionType = DepositType.CASA_InterBank;
        //     }
        // }

        this.checkPaymentTypeCashTD(sourceType, destinationType, TD);
        // if (PaymentType.Cash === sourceType && TD.indexOf(destinationType) !== -1) {
        //     this.transactionType = DepositType.CASH_TD;
        // }

        this.checkPaymentTypeChequeCASA(sourceType, destinationType, CASA);
        // if (PaymentType.Cheque === sourceType && CASA.indexOf(destinationType) !== -1) {
        //     if (this.from.bank.isKiatnakinBank()) {
        //         this.transactionType = DepositType.CHEQUE_CASA;
        //     }
        //     else {
        //         this.transactionType = DepositType.OTHERBANKCHEQUE_CASA;
        //     }
        // }

        this.checkPaymentTypeChequeTD(sourceType, destinationType, TD);
        // if (PaymentType.Cheque === sourceType && TD.indexOf(destinationType) !== -1) {

        //     if (this.from.bank.isKiatnakinBank()) {
        //         this.transactionType = DepositType.CHEQUE_TD;
        //     }
        //     else {
        //         this.transactionType = DepositType.OTHERBANKCHEQUE_TD;
        //     }
        // }

        //console.log("transactionType", this.transactionType);
        return;
    }

    public checkPaymentTypeCashCASA(sourceType, destinationType, CASA) {
        if (PaymentType.Cash === sourceType && CASA.indexOf(destinationType) !== -1) {
            this.transactionType = DepositType.CASH_CASA;
            if (this.to.isSearchByNumber) {
                this.transactionType = DepositType.CASA_InterBank;
            }
        }
    }

    public checkPaymentTypeCashTD(sourceType, destinationType, TD) {
        if (PaymentType.Cash === sourceType && TD.indexOf(destinationType) !== -1) {
            this.transactionType = DepositType.CASH_TD;
        }
    }

    public checkPaymentTypeChequeCASA(sourceType, destinationType, CASA) {
        if (PaymentType.Cheque === sourceType && CASA.indexOf(destinationType) !== -1) {
            if (this.from.bank.isKiatnakinBank()) {
                this.transactionType = DepositType.CHEQUE_CASA;
            } else {
                this.transactionType = DepositType.OTHERBANKCHEQUE_CASA;
            }
        }
    }

    public checkPaymentTypeChequeTD(sourceType, destinationType, TD) {
        if (PaymentType.Cheque === sourceType && TD.indexOf(destinationType) !== -1) {
            if (this.from.bank.isKiatnakinBank()) {
                this.transactionType = DepositType.CHEQUE_TD;
            } else {
                this.transactionType = DepositType.OTHERBANKCHEQUE_TD;
            }
        }
    }
}
