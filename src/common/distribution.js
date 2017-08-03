import Vue from "vue";

//上家的sharecode
const SHANGJIA_SHARE_CODE = "shareCode";
//当前用户的sharecode, 对于普通用户该值是他的上家分销商的sharecode。
const CURUSER_SHARE_CODE = "s_currentsharecode";
//当前分销商的id
const DISTRIBUTOR_ID = "distributorId";
//当前分销商信息
const CUR_DISTRIBUTOR = "currDistributor";

/**
 * 统一分销相关的操作
 */
class Distribution {
    /**
     * 获取当前分销商ID
     */
    getDistributorId () {
        return  Vue.sessionStorage.getItem(DISTRIBUTOR_ID) || "";
    }

    /**
     * 设置当前分销商ID
     */
    setDistributorId (id) {
        if (id) {
            Vue.sessionStorage.setItem(DISTRIBUTOR_ID, id);
        }
    }

    /**
     * 获取当前分销商的信息
     */
    getCurDistributor() {
        return Vue.sessionStorage.getItem(CUR_DISTRIBUTOR);
    }

   /**
     * 设置当前分销商的信息
     */
    setCurDistributor(data) {
        if (data) {
            Vue.sessionStorage.setItem(CUR_DISTRIBUTOR, data);
        }
    }

    /**
     * 获取当前用户的上家sharecode，目前上家的sharecode会存储在cookie里。
     */
    getInviterShareCode() {
        return Vue.cookie.getCookie(SHANGJIA_SHARE_CODE || "")
    }

    /**
     * 设置上家的sharecode
     */
    setInviterShareCode(shareCode) {
        if (shareCode) {
            Vue.cookie.setCookie(SHANGJIA_SHARE_CODE, shareCode);
        }
    }

    /**
     * 获取当前用户的sharecode，当前用户的sharecode会存在sessionStorage里。
     */
    getCurUserShareCode() {
        return Vue.sessionStorage.getItem(CURUSER_SHARE_CODE) || "";
    }

    /**
     * 设置当前用户的sharecodee
     */
    setCurUserShareCode(shareCode) {
        if (shareCode) {
            Vue.sessionStorage.setItem(CURUSER_SHARE_CODE, shareCode);
        }
    }

    /**
     * 清除用户的分销商信息
     */
    clearCurrentDistributionData() {
        /**
         * 20170706增加清除上级sharecode（影响未知），修复详情页普通用户分享普通商品，
         * 注册不应该带sharecode，绑定到默认分销商下级，
         * 应该清除session和cookie中的shareCode
         */
        Vue.sessionStorage.removeItem(SHANGJIA_SHARE_CODE);
        Vue.cookie.delCookie('shareCode');

        Vue.sessionStorage.removeItem(CURUSER_SHARE_CODE);
        Vue.sessionStorage.removeItem(DISTRIBUTOR_ID);
        Vue.sessionStorage.removeItem(CUR_DISTRIBUTOR);
    }

    /**
     * 重新获取并设置用户的分销商信息
     */
    loadCurrentDistributionData(callback, failCallback) {
        var url = '/api/seller/distributor/currDistributor';
        var param = {
            ut: Vue.auth.getUserToken(),
            unionid: Vue.weixin.getUnionid(),
            shareCode: this.getInviterShareCode()
        };

        Vue.api.get(url, param, (res) => {
            var data = res.data;
            if (data && data.id) {
                this.setCurUserShareCode(data.shareCode);
                this.setDistributorId(data.id);
                this.setCurDistributor(data);
            }

            if (callback) {
                callback(data);
            }

        }, () => {
            //错误处理
            if (failCallback) {
                failCallback();
            }
        });
    }
}

Vue.distribution = new Distribution();
