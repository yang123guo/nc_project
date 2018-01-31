/*
 * @method   重写Number类型的fixed方法(四舍五入)
 * @origin   https://github.com/tianxiangbing/toFixed/blob/master/src/index.js 
 * @author   add by yangguoqiang @18/01/31
 * @params 
 *     d     {Number.Int}   小数位截取 
 * @return   {String}       数字截取后的字符串形式
 * @demo     123.321.toFixed(2)
 */
Number.prototype.toFixed = function (d) {
    var s = this + "";
    if (!d) d = 0;
    d = parseInt(d);
    if (s.indexOf(".") == -1) s += ".";
    s += new Array(d + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
        if (a == d + 2) {
            a = s.match(/\d/g);
            if ((pm !== '-' && parseInt(a[a.length - 1]) > 4) || (pm === "-" && parseInt(a[a.length - 1]) > 5)) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] == 10) {
                        a[i] = 0;
                        b = i != 1;
                    } else break;
                }
            }
            s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
        } if (b) s = s.substr(1);
        return (pm + s).replace(/\.$/, "");
    } 
    return this + "";
};