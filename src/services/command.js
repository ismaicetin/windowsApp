String.prototype.timestimpConvert = function (str) {
    var timestimp = parseInt(this.toString())
    var dd = new Date(timestimp);

    var yil = dd.getFullYear()
    var ay = dd.getMonth() + 1
    var gun = dd.getDate()
    //format "2020-04-20" 
    ay = "0" + ay;
    gun = "0" + gun;
    return `${yil}-${ay.substr(-2)}-${gun.substr(-2)}`
};


Date.prototype.YilAyGun = function () {

    var yil = this.getFullYear()
    var ay = this.getMonth() + 1
    var gun = this.getDate()
    //format "2020-04-20" 
    ay = "0" + ay;
    gun = "0" + gun;
    return `${yil}-${ay.substr(-2)}-${gun.substr(-2)}`
};


String.prototype.stingTODate = function () {
    var data = this.toString()
    var res = data.slice(0, 13);
    var micro = data.slice(13, data.length);
    var date = Number(res)
    var dd = new Date(date);

    if (micro != "") micro = "." + micro
    else micro = ".000"
    var str = dd.toISOString().replace(/[A-Z.]/g, " ").trim() + micro
    return str
};

String.prototype.StringToCurrency= function () {
    var deger=this.toString();
    var value = parseFloat(deger.replace(/,/g, ""))
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    return value 
}

String.prototype.CurrencyToFloat= function () {
    var deger=this.toString();
    var value = parseFloat(deger.replace(/,/g, ""))
        .toFixed(2) ;
    return value 
}


String.prototype.AmountCurrency= function () {
    var deger=this.toString();
    var value = parseFloat(deger.replace(/,/g, ""))
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    return value 
}

String.prototype.CurrencyToInt= function () {
    var deger=this.toString();
    var value = parseFloat(deger.replace(/,/g, ""))
        .toFixed(0) ;
    return value 
}
// String.prototype.StringToCurrency=()=>{
//     var value = parseFloat(this.toString().replace(/,/g, ""))
//         .toFixed(2)
//         .toString()
//         .replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
//     return value 
// }