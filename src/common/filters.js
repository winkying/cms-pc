import Vue from 'vue'




Vue.filter('currency',function(value,_currency,decimals){
      var digitsRE = /(\d{3})(?=\d)/g;
    value = parseFloat(value);
      if (!isFinite(value) || !value && value !== 0) return '';
      _currency = _currency != null ? _currency : '$';
      decimals = decimals != null ? decimals : 2;
      var stringified = Math.abs(value).toFixed(decimals);
      var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
      var i = _int.length % 3;
      var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
      var _float = decimals ? stringified.slice(-1 - decimals) : '';
      var sign = value < 0 ? '-' : '';
      return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
});

Vue.filter('dateYMD',function(value,options){
    var date = new Date(value);
    var year = date.getFullYear();
    var mon = ('0'+(date.getMonth()+1)).slice(-2);
    var day = ('0'+date.getDate()).slice(-2);
    return year+'.'+mon+'.'+day;
});