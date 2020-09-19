import { debug, isNullOrUndefined, isNull } from "util";
import { LocalStorage } from "ngx-webstorage";
import * as moment from 'moment';
import { environment } from 'environments/environment';
import { Month } from "../_model/month";


/**
 * Created by imac on 3/14/2017 AD.
 */

export const Environment = environment;

export class Utils {

    @LocalStorage()
    static runningNumber: number;

    static months: Month[];

    constructor() {
        this.prepareMonth();
    }

    static validateNationalID(id): boolean {

        if (!isNullOrUndefined(id)) {

            let sum: number;
            let i: number;
            if (id.length !== 13) {
                return false;
            }

            for (i = 0, sum = 0; i < 12; i++) {
                sum += parseFloat(id.charAt(i)) * (13 - i);
            }

            if ((11 - sum % 11) % 10 !== parseFloat(id.charAt(12))) {
                return false;
            }
            else {
                return true;
            }

        }
        else {
            return false;
        }
    }

    static convertDate(date: string, fromFormat: string, toFormat: string) {
        return moment(date, fromFormat).format(toFormat);
    }

    static AnnoDominiYeartoBuddhistYear(year) {
        return moment('2017', 'YYYY').add(543, 'years').year().toString()
    }

    static getDatePickerOption(minDate = null, maxDate = null) {
        moment.locale('th');

        const option = {
            monthFormat: "MMM , YYYY",
            format: "DD/MM/YYYY",
            weekdayNames: {
                su: 'อาทิตย์',
                mo: 'จันทร์',
                tu: 'อังคาร',
                we: 'พุธ',
                th: 'พฤหัส',
                fr: 'ศุกร์',
                sa: 'เสาร์'
            },
            min: minDate,
            max: maxDate,
            dayBtnFormat: "D",
            monthBtnFormat: "MMMM",
            disableKeypress: true
        }
        return option;
    }

    static setPadZero(value: any, size: number) {

        while (value.length < (size || 2)) {
            value = "0" + value;
        }
        return value;
    }

    static toStringNumber(numberWithFormat: string) {
        return numberWithFormat.split(',').join('');
    }

    static getCountDigit(number_string) {
        if (isNullOrUndefined(number_string)) {
            return 0;
        }

        const digitAmount = number_string.split('.')[1];
        return isNullOrUndefined(digitAmount) ? 0 : digitAmount.length;
    }

    static animate(elementId: string, animation: string) {

        return new Promise((resolve) => {
            if ($(elementId).length === 0) {
                resolve();
            }
            else {
                $(elementId).show().addClass(`animated ${animation}`);
                $(elementId).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    resolve();
                });
            }
        });
    }

    static removeClass(elementId: string, className: string) {
        $(elementId).removeClass(className);
    }

    static splitMICRNumber(micrNumber) {
        const data = micrNumber.split("@");

        if (data.length < 2 || isNullOrUndefined(data[2])) {
            return null;
        }
        const bank_code = data[2].split("-")[0];

        const temp = data[2].split("-")[1];
        if (isNullOrUndefined(temp)) {
            return null;
        }
        const office_no = temp.split("[")[0];
        const account_no = temp.split("[")[1];
        if (isNullOrUndefined(data[3])) {
            return null;
        }
        const cheque_type = data[3];

        return {
            cheque_no: data[1],
            bank_code: this.setPadZero(bank_code, 3),
            branch_code: office_no,
            account_no: account_no,
            chequeType: cheque_type
        }
    }

    static getClientIP() {
        return window.location.hostname;
    }

    static idCardformat(idcard) {
        let idcardtxt = '';
        const format = '0-0000-00000-00-0'.split("");
        const value = idcard.split("");
        let i = 0;
        format.forEach(function (data2, index) {
            if (data2 === '0') {
                idcardtxt = idcardtxt + value[index - i];
            } else if (data2 === '-') {
                const data3 = '-';
                idcardtxt = idcardtxt + data3;
                i++;
            }
        })
        return idcardtxt;
    }

    static subDistrict(district) {
        let districtstr = ''
        if (!isNullOrUndefined(district)) {
            if (district.match('เขต')) {
                districtstr = district.substring(3);
            } else if (district.match('อำเภอ')) {
                districtstr = district.substring(5);
            } else {
                districtstr = district;
            }
        }
        return districtstr;
    }

    static subSubDistrict(subdistrict) {
        let subdistrictstr = '';
        if (!isNullOrUndefined(subdistrict)) {
            if (subdistrict.match('แขวง')) {
                subdistrictstr = subdistrict.substring(4);
            } else if (subdistrict.match('ตำบล')) {
                subdistrictstr = subdistrict.substring(4);
            } else {
                subdistrictstr = subdistrict
            }
        }
        return subdistrictstr;
    }

    static subProvince(province) {
        let provincestr = '';
        if (!isNullOrUndefined(province)) {
            if (province.match('จังหวัด')) {
                provincestr = province.substring(7);
            } else {
                provincestr = province;
            }
        }
        return provincestr;
    }

    static subVillage(village) {
        let villagestr = '';
        if (!isNullOrUndefined(village)) {
            villagestr = village.substring(8);
        }
        return villagestr
    }

    static getshotMonth(month) {
        const result = Utils.months.filter(m => m.monthNo === month);
        return result[0].monthShortTh;
    }

    static getshotMonthEN(month) {
        const result = Utils.months.filter(m => m.monthNo === month);
        return result[0].monthShortEn;
    }

    static getMinusYearEn(year) {
        const years = year - 543;
        return years
    }

    static getMonthtoNumber(month) {
        const result = Utils.months.filter(m => m.monthFullTh === month);
        return result[0].monthNo;
    }

    static getMonthShottoNumber(month) {
        const result = Utils.months.filter(m => m.monthShortTh === month);
        return result[0].monthNo;
    }

    static getMonthtoShotMonth(month) {
        const result = Utils.months.filter(m => m.monthFullTh === month);
        return result[0].monthShortTh;
    }

    static changeDateFormat(value) {
        const date = value.sum.split('/');

        const days = date[0];
        const months = date[1];
        const year = date[2];

        const years = year - 543;
        const dates = years + '-' + months + '-' + days;
        return dates
    }

    static changeDateFormat2(value) {
        const date = value.split('/');
        const day = date[0];
        const mounth = Utils.getshotMonth(date[1]);
        const year = new Date(date[2]).getFullYear() + 543;
        const dates = day + " " + mounth + " " + year;
        return dates
    }

    static minus3Months() {
        const today = new Date();
        today.setMonth(today.getMonth() - 3)
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();

        let Months: string;
        let Days: string;
        if (month.toString().length === 1) {
            Months = '0' + month.toString();
        } else {
            Months = month.toString();
        }

        if (day.toString().length === 1) {
            Days = '0' + day.toString();
        } else {
            Days = day.toString();
        }
        return year + '-' + Months + '-' + Days;
    }

    static checkIsEmail(value) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    static markAccountNumber(accountNo) {
        let mark = "";
        function replaceRange(s, start, end, substitute) {
            return s.substring(0, start) + substitute + s.substring(end);
        }
        //let mark = "x".repeat(accountNo.length - 4)
        if (accountNo.length === 14) {
            mark = "xxxxxxxxxx"
        } else {
            mark = "xxxxxx"
        }

        return replaceRange(accountNo, 0, accountNo.length - 4, mark);

    }

    static replaceEnter(Text) {
        return Text.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }

    static shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    static validate(evt) {
        const theEvent = evt || window.event;
        let key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        const regex = /[0-9|/]/;
        // if (!regex.test(key)) {
        if (key >= 32 && !/^\d+$/.test(String.fromCharCode(key))) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) { theEvent.preventDefault() };
        }
    }

    public prepareMonth() {
        if (isNullOrUndefined(Utils.months)) {
            Utils.months = new Array[12];
            Utils.months[0] = new Month('01', 'ม.ค.', 'Jan', 'มกราคม');
            Utils.months[1] = new Month('02', 'ก.พ.', 'Feb', 'กุมภาพันธ์');
            Utils.months[2] = new Month('03', 'มี.ค.', 'Mar', 'มีนาคม');
            Utils.months[3] = new Month('04', 'เม.ย.', 'Apr', 'เมษายน');
            Utils.months[4] = new Month('05', 'พ.ค.', 'May', 'พฤษภาคม');
            Utils.months[5] = new Month('06', 'มิ.ย.', 'Jun', 'มิถุนายน');
            Utils.months[6] = new Month('07', 'ก.ค.', 'Jul', 'กรกฏาคม');
            Utils.months[7] = new Month('08', 'ส.ค.', 'Aug', 'สิงหาคม');
            Utils.months[8] = new Month('09', 'ก.ย.', 'Sep', 'กันยายน');
            Utils.months[9] = new Month('10', 'ต.ค.', 'Oct', 'ตุลาคม');
            Utils.months[10] = new Month('11', 'พ.ย.', 'Nov', 'พฤษจิกายน');
            Utils.months[11] = new Month('12', 'ธ.ค.', 'Dec', 'ธันวาคม');
        }
    }
}
