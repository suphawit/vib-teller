import {isNullOrUndefined} from "util";

export class Fee {

    detail = {
        sequence: "",
        feeCode: "",
        feeDetails: "",
        transfereeFee: "",
        tax: ""
    };

    amount: number = 0;
    refExt: string;
    ReceivingAccountDisplayName: string;
    feeDetailList;

    constructor(jsonData?: any) {

        if (!isNullOrUndefined(jsonData)) {

            if (jsonData.hasOwnProperty("arr_result")) {

                this.amount = jsonData.sum_amount;

            }
            else {
                let detail = jsonData.TransferList.TransferDetail;
                this.feeDetailList = [jsonData.TransferList.TransferDetail];
                if (jsonData.TransferList.TransferDetail.constructor === Array) {
                    // detail = jsonData.TransferList.TransferDetail.filter(fee => fee.RecommendFlag === 'Y')[0];
                    detail = jsonData.TransferList.TransferDetail[0];
                    this.feeDetailList = jsonData.TransferList.TransferDetail;
                }

                this.ReceivingAccountDisplayName = jsonData.Receiving.ReceivingAccountName;
                this.setFeeDetail(detail);

            }
        }
    }

    setFeeDetail(detail) {

        if (!isNullOrUndefined(detail)) {
            this.detail.sequence = detail.FeeDetailList.FeeDetail.Sequence;
            this.detail.feeCode = detail.FeeDetailList.FeeDetail.FeeCode;
            this.detail.feeDetails = detail.FeeDetailList.FeeDetail.FeeDetails;
            this.detail.tax = detail.FeeDetailList.FeeDetail.Tax;
            this.detail.transfereeFee = detail.FeeDetailList.FeeDetail.TransfereeFee;

            this.amount = detail.FeeDetailList.FeeDetail.FeeAmount;
            this.refExt = detail.ReferenceExt;


        }
    }
}