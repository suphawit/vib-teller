import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

/**
 * Created by Palomar on 10/10/2016 AD.
 */


@Injectable()
export class AppConstant {
    static appVersion: string = "2.0.0.6";
    static company: string = "kiatnakin";
    // static machine_id = 'VIB004';
    static branchCode: string = "0003";
    static evnName: string = "UAT";
}

@Injectable()
export class HWSocket {

    static EVENT = {
        EDC_DISCONNECT: "edc-disconnected",
        EDC_ERROR: "edc-error",
        SMART_CARD_DATA: "edc-sc-data",
        SMART_CARD_STATUS: "edc-sc-status",
        PIN_DATA: "edc-kb-data",
        PIN_STATUS: "edc-kb-status",
        FINGER_DATA: "fg-data",
        FINGER_STATUS: "fg-status",
        FINGER_ERROR: "fg-error",
        IMAGE_DATA: "img-data",
        IMAGE_ERROR: "img-error",
        CAMERA_ERROR: "cam-error",
        PRINT_STATUS: "print-status",
        PRINT_ERROR: "print-error",
        CONNECTION_ERROR: "connect_error",

        CAMERA: "camera",
        SNAPSHOTCAMERA: "snapshotDocument",
        FINGER_SCAN: "fingerScan",
        PRINTER: "printer",
        SMART_CARD: "smartcard"
    };

    static COMMAND = {
        SMART_CARD_REQUEST: "sendCommand",
        FINGER_SCAN_REQUEST: "sendCommand",
        FINGER_SCAN_CLOSE: "sendCommand",
        PIN_REQUEST: "sendCommand",
        MICR_SCAN_REQUEST: "sendCommand",
        PRINT_REQUEST: "sendCommand",
        PRINT_SLIP_REQUEST: "sendCommand",
        SEND_COMMAND: "sendCommand",
        PRINT_PDF_REQUEST: "sendCommand",
    };

    static REQUEST = {
        MICR: "{ \"cmd\" : \"snapshotCamera\", \"params\" : { \"process\" : \"micr\" }}",
        BARCODE: "{ \"cmd\" : \"snapshotCamera\", \"params\" : { \"process\" : \"barcode\" }}",
        PAPER_DETACT: "{ \"cmd\" : \"snapshotCamera\", \"params\" : { \"process\" : \"paper\" }}",
        // MICR: "{ \"cmd\" : \"cameraCaptureMICR\"}",
        // BARCODE: "{ \"cmd\" : \"cameraCaptureBarcode\"}",
        // PAPER_DETACT: "{ \"cmd\" : \"cameraCapturePapar\"}",
        // SMART_CARD: "{ \"cmd\" : \"smartcardGetIDCardThai\"}",
        SMART_CARD: "{ \"cmd\" : \"smartcardGetIDCardThaiDopa\"}",
        SMART_CARD_CLOSE: "{ \"cmd\" : \"smartcardForceClose\"}",
        MAGNETIC_READER: "{ \"cmd\" : \"magneticGetData\"}"
    };

    static HW_CODE = {
        CONNECTED: "0000",
        DISCONNECTED: "9999",
        EDC_READY: "0001",
        EDC_REQUESTING: "-1000"
    };

    static SMART_CARD_CODE = {
        SUCCESS: "0000",
        READING: "0002",
        FOUND_SMART_CARD: "0004",
        AID_ERROR: "9004",
        NO_CHIP: "9009",
        CHIP_ERROR: "9010",
        TIMEOUT: "9097"
    };

    static FINGER_SCAN_CODE = {
        SUCCESS: "0000",
        CONNECTED: "0001",
        PREPARE_CATURE: "0002",
        CAPTURED: "0003 ",
        NOT_CONNECT: "9001",
        TIMEOUT_EXPIRED: "9002",
        SPOOF_DETECTED: "9003",
        LENTEN_DETECTED: "9004"

    };

    static IMAGE_CODE = {
        SUCCESS: "0000"
    };

    static PRINT_CODE = {
        SUCCESS: "0000",
        DISCONNECT: "90000"
    };

    static PIN_CODE = {
        SUCCESS: "0000",
        USER_CANCEL: "9002",
        TIMEOUT: "9097",
        LENGTH_NOT_MATCH: "9100"
    };
}

@Injectable()
export class JSONKey {

    static ResponseStatus = "ResponseStatus";
    static ResponseCode = "ResponseCode";
    static ResponseMessage = "ResponseMessage";

    static Header = "Header";
    static ReferenceNo = "ReferenceNo";
    static ReferenceExt = "ReferenceExt";
    static TransactionDateTime = "TransactionDateTime";
    static ServiceName = "ServiceName";
    static SystemCode = "SystemCode";
    static ChannelID = "ChannelID";

    static InquiryAccountList = "inquiryAccountList";
    static InquiryAccount = "inquiryAccount";
    static AccountNo = "ACCOUNT_NO";
    static Account_No = "account_no";
    static AccountName = "AccountName";
    static AccountType = "AccountType";
    static Amount = "amount";
    static ProductCode = "productCode";
    static ProductDesc = "ProductDesc";
    static BranchCode = "branch_code";
    static BranchName = "BranchName";
    static AccountOpenDate = "AccountOpenDate";
    static AccountStatusCode = "AccountStatusCode";
    static AccountStatusDesc = "AccountStatusDesc";
    static HoldAmt = "HoldAmt";
    static PrincipalBalance = "PrincipalBalance";
    static ODAmt = "ODAmt";
    static AvailBalance = "AvailBalance";
    static AvailBalanceNet = "AvailBalanceNet";
    static UnclearAmt = "UnclearAmt";
    static AccruIntAmt = "AccruIntAmt";
    static LastTxAmount = "LastTxAmount";
    static LastTxType = "LastTxType";
    static LastTxDate = "LastTxDate";
    static BenefitAcct = "BenefitAcct";

    static Username = "username";
    static Password = "password";

    static IDNo = "IDNo";
    static IDType = "IDType";
    static id_type = "id_type";
    static AccountNoFrom = "ACCOUNT_NO_FROM";
    static AccountNoTo = "account_no_to";
    static AccountNoReceiving = "ACCOUNT_NO_RECEIVING";
    static TransferAmount = "TRANSFER_AMOUNT";
    static EffectiveDate = "EFFECTIVE_DATE";
    static PayType = "PAY_TYPE";
    static ReceivingType = "RECEIVING_TYPE";
    static ReceivingValue1 = "RECEIVING_VALUE1";
    static ReceivingValue2 = "RECEIVING_VALUE2";
    static TransferType = "TRANSFER_TYPE";
    static FeeInfo = "FEE_INFO";
    static Sequence = "SEQUENCE";
    static FeeCode = "FEE_CODE";
    static FeeDetails = "FEE_DETAILS";
    static FeeAmount = "FEE_AMOUNT";
    static TransfereeFee = "TRANSFEREE_FEE";
    static Tax = "TAX";
    static Vat = "VAT";
    static fee = "fee_service_charge";
    static status = "status";

    static Term = "Term";
    static TransactionDate = "tran_date";
    static TermMonth = "termMonth";
    static TermDay = "termDay";
    static TermType = "termType";
    static Faequency = "Frequency";

    static BankCode = "BANK_CODE";
    static ReceivingBankCode = "RECEIVING_BANK_CODE";
    static PayTypeOfFee = "PayTypeOfFee";
    static CustomerType = "customer_type";
    static PromotionDate = "promotion_date";
    static CIF_NO = "cif_no";
    static CUS_CIF = "cust_cif";
    static CustomerSegment = "customer_segment";
    static PrincipleAmount = "principalAmt";
    static MaturityDate = "maturityDate";
    static FrequencyInterestPay = "freqInterestPay";
    static PromotionId = "promotion_id";
    static DepNO = "dep_no";
    static MobileNumber = "mobile_no";
    static ClientIP = "client_ip";
    static TokenUUID = "token_uuid";
    static OTP = "otp";
    static PIN = "pin";
}

// CLASS CONSTANT VIB CONNECT TO SERVICE VIB
@Injectable()
export class ConstantVIB {
    DOMAIN_API = environment.domainAPI;
    // MACHINE_ID = environment.machineID;

    SERVICE_NAME: {
        GET_INQUIRY_APPROVE_LIST: string;
        UPDATE_APPROVE_LIST: string;
    }

    // SERVICE NAME
    constructor() {
        this.SERVICE_NAME = {
            GET_INQUIRY_APPROVE_LIST: this.DOMAIN_API + 'InquiryApproveList',
            UPDATE_APPROVE_LIST: this.DOMAIN_API + 'UpdateApproveList',
        }
    }
}