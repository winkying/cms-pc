import Vue from "vue";

//是否在网，true为在网，false为断网
//依赖浏览器特定事件
let online = true;


Vue.network = {
    //如果在网返回true
    isOnline: function () {
        return online;
    },

    //如果断网返回true
    isOffline: function () {
        return !online;
    }
}

window.ononline  = function () {
    online = true;
}

window.onoffline = function () {
    online = false;
}

