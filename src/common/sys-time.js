
import Vue from "vue";


Vue.getSysTime = function(fun){
    "use strict";
    var url =  '/api/realTime/getTimestamp?nocache=' + (new Date().getTime());
    Vue.api.get(url, null, (res) => {
        if(fun){
            fun(res);
        }
    })

}


