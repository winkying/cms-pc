import Vue from 'vue'
/**
 * Created by Administrator on 2016/6/27.
 */
//JS操作cookies方法!
//写cookies



Vue.cookie = {
    /**
     * 设置cookie，默认过期时间一年
     * @param domain 可选，默认读取配置文件定义的值
     */
    setCookie: function setCookie(name, value, domain) {
        var days = 365;
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        //空字符串也是有效的domain值（当前域名）
        if (!domain  && domain !== "") {
            domain = "${domain}";
        }
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/; domain=" + domain ;
    },

    /**
     * 获取指定name的cookie值
     */
    getCookie: function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },

    /**
     * 删除指定域名下的cookie
     * 删除cookie要求domain，name，path都要和设置的时候一致。
     * @param domain 可选，默认读取配置文件定义的值
     */
    delCookie: function delCookie(name, domain) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1000000);
        //空字符串也是有效的domain值（当前域名）
        if (!domain  && domain !== "") {
            domain = "${domain}";
        }
        document.cookie = name + "=;expires=" + exp.toGMTString() + "; path=/; domain=" + domain ;
    }
}