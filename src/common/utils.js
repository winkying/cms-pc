import Vue from "vue";

var utils = {
  
    /**
     * 获得主机名
     * 如果当前完整url是：http://pintuan.test.odianyun.com/my-center/home.html?p=1
     * 返回：http://pintuan.test.odianyun.com
     */
    getHost: function () {
        //location.host = abc.com:8888
        //location.hostname = abc.com
        var url = location.protocol + "//" + location.host;
        return url;
    },

    /**
     * 获得相对url
     * 如果当前完整url是：http://pintuan.test.odianyun.com/my-center/home.html?p=1
     * 返回：/my-center/home.html?p=1
     */
    getRelatedUrl: function () {
        return location.pathname + (location.search || "") + (location.hash || "");
    },

    /**
     * 根据团单号构造去支付url
     */
    getPayUrl: function (orderCode, param) {
        var url = location.protocol + "//" + location.host;

        param = param || '';

        url = "${redirectPath}/pay/pay-way.html?orderCode="+orderCode + param;

        if(Vue.browser.weixin()) {
            url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Vue.mallSettings.getAppId() + "&redirect_uri="+encodeURIComponent(url)+"&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect"
        }


        return url;
    },

    getWeixinAuthUrl : function (url) {
        url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Vue.mallSettings.getAppId() + "&redirect_uri="+encodeURIComponent(url)+"&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect"
        return url;
    },

    /**
     * 根据团单号构造支付成功的返回的页面url
     */
    getPayBackUrl: function (orderCode) {
        var url = location.protocol + "//" + location.host;

        url += "${contextPath}/pay/pay-success.html?orderCode="+orderCode;

        return url;
    },

    /**
     * url参数格式化
     * 例：?param=1
     * 参数得到方式：paramsObj.param
     */
    paramsFormat: function(url) {
        var qInd = url.indexOf('?');
        var sharpInd = url.indexOf('#'); //路由
        var search = "";
        var paramsList = [];
        var paramsObj = {};

        if (qInd >= 0) {
            if (sharpInd > 0) {
                search = url.substring(qInd + 1, sharpInd);
            } else {
                search = url.substring(qInd + 1);
            }
            paramsList = search.split('&');
            for (var ind in paramsList) {
                var param = paramsList[ind];
                if(param) {
                    var pind = param.indexOf("=");
                    if (pind >= 0) {
                        paramsObj[param.substring(0, pind)] = param.substr(pind + 1);
                    } else {
                        paramsObj[param] = "";
                    }
                }

            }
        }
        return paramsObj;
    },

    /**
     * 获取url hash的值
     * 例：/details.html?itemid=1#sort=asc&price=100
     * 返回: {sort: "asc", price: 100 }
     */
    hashFormat: function (url) {
        var hashObj = {};
        var sind = url.indexOf('#');
        if (sind >= 0) {
            var hstr = url.substring(sind+1);
            var paramsList = hstr.split("&");
            for(var i=0; i<paramsList.length; i++) {
                var param = paramsList[i];
                var pind = param.indexOf("=");
                if (pind>=0) {
                    hashObj[param.substring(0, pind)] = param.substr(pind + 1);
                } else {
                    hashObj[param] = "";
                }
            }
        }

        return hashObj;
    },

    /**
     * 返回时间的天、时、分、秒
     * param : 秒
     */
    getHhmmss: function (time) {
        time = parseInt(time);
        if(time <= 0) time = 0;
        var s = time >= 60 ? time%60 : time;
        var m = parseInt((time>=3600?time%3600:time)/60);
        var h = parseInt((time>=86400?time%86400:time)/3600);
        var d = parseInt(time/86400);
        h = h<10 ? '0'+h : h;
        m = m<10 ? '0'+m : m;
        s = s<10 ? '0'+s : s;

        return {
            d: d,
            h: h,
            m: m,
            s: s
        }
    },

    /**
     * 显示提示信息
     */
    showTips: function(msg) {
        $.tips({
            content: msg,
            stayTime: 2000,
            type: "info"
        });
    },

    /**
     * 比较版本号大小
     */
    compareVersionSize: function (oldv, newv) {
        var oldArr = oldv.split('.');
        var newArr = newv.split('.');

        for(var i=0; i<newArr.length; i++) {
            var oldnum = parseInt(oldArr[i]);
            var newnum = parseInt(newArr[i]);
            if(oldnum > newnum) {
                return false;
            }
        }
        return true;
    },

    /**
     * 对象合并
     */
    mergeObj : function(...sources) {
        return Object.assign({}, ...sources);
    },

    // 埋点封装
    safeMode : function(fn) {
        var _fn = new Function();
        try {
            let evl = eval(fn);
            _fn = typeof evl === 'function' ? evl : _fn;
        } catch (e) {
            		// console.log(e)
        }
        return (...args) => _fn.call(this, ...args)
    },
    // 针对地址对象转成字符串
    convertToString: function (obj) {
        if(typeof obj != 'object'){
            return '';
        }
        var string='';
        for(var item in obj){
            string += item + '=' + (obj[item] || '') +'&'
        }
        return string.substring(0,string.lastIndexOf('&'))
    },
};

Vue.utils = utils;
