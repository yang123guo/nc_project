import moment from 'moment';

//得到某个日期后几个天是哪天
export function getDay(date, number, format) {
    const newDate = moment(date).add(number, 'days').format(format);
    return newDate; 
};


//得到某个日期后几个月是哪天
// date = [2010, 0, 31];
export function getMonth(date, number, format) {
    const newDate = moment(date).add(number, 'months').format(format);
    return newDate; 
};


//得到某个日期后几年是哪天
export function getYear(date, number, format) {
    const newDate = moment(date).add(number, 'years').format(format);
    return newDate;
};


