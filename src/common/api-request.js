import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);
//https://github.com/vuejs/vue-resource/issues/314
var templateJson = window['template'] || window['frontTemplate'] || {};
var host = templateJson.host || '';
var resource = Vue.resource('',{},{
    loadPage: {method: 'GET', url: host + '/cmsPageRead/getPageInfo.do'},
    saveModule: {method: 'POST', url: host + '/cmsModuleTemplateWrite/saveModule.do'},
    updateModules: {method: 'POST', url: host + '/cmsModuleTemplateWrite/updateModule.do'},
    listTemplates: {method: 'GET', url: host + '/cmsModuleTemplateRead/getTemplateList.do'},
    loadTemplateDefs: {method: 'POST', url: host + '/cmsModuleTemplateRead/getTemplateListByVer.do'},
    publish: {method: 'GET', url: host + '/cmsPageWrite/publish.do'},
    verifyPublish: {method: 'GET', url: host + '/cmsPageRead/hasPublishedIndexPage.do'},
    saveAsTemplate: {method: 'POST', url: host + '/cmsTPageWrite/saveTPage.do'}
});


function ApiRequest(){
    this.loadingCount = 0;
    this.loginErrorCount = 0;
    this.timeoutMonitor = null;
    this.resource = resource;
    return this.resource;
}



/**
 * 返回成功处理
 * 返回失败处理（包含返回99跳转登录）
 * 加载动画
 */

Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if (typeof response.headers['content-type'] != 'undefined') {
            response.headers['Content-Type'] = response.headers['content-type'];
        }
    });
});
/**
 * 后台部分
 * 前台部分
 * 第三方
 */

export default new ApiRequest();