<template>
    <div class="main-content" :class="{'blank':moduleSeq.length==0}" v-drop-zone:initing="addModule" v-drag-zone:sort="moduleSeq" v-drop-zone:sort="exchange">
        <div class="module-wrapper" v-for="(m,midx) in moduleSeq" :key="m.code" @mouseenter="setEditShow(m,true)" @mouseleave="setEditShow(m,false)">
            <div class="module-mask-wrapper" v-show="m.showEdit">
                <div class="module-mask"></div>
                <i class="el-icon el-icon-edit" @click="editModule(m)"></i>
            </div>
            <component :is="m.templateCode" :module="m"></component>
        </div>
    </div>
</template>


<script>
import Vue from 'vue'
import h5_multipic from './v1/h5_multipic.vue'
import goodsR1c2 from './v1/goods-r1c2.vue'

var urlParams = Vue.utils.paramsFormat(location.href);

export default {
    props: ['moduleContext','moduleSeq'],
    components: { h5_multipic, goodsR1c2 },
    data: () => {
        return {
            placeholder: '拖放至此处',
        }
    },
    mounted: function () {
        var self = this;



        window.bus.$on('vars-change', function (newVars) {
            var tempModule = _.find(self.moduleSeq, function (ms) {
                return ms.moduleId === self.moduleContext.moduleId;
            });
            _.assign(tempModule.vars, newVars);
        });
    },
    methods: {
        addModule(m, idx) {
            this.$set(m, 'showEdit', false);
            this.$set(m, 'showEditDialog', false);
            this.saveModule(m, idx).then(result => {
                if (result.body.code == 0) {
                    m.moduleId = result.body.data;
                    m.sort = idx;
                    //商品及分类数据
                    /* m.data = _.assign.extend({}, data);
                    m.cates = _.assign({}, goods); */
                    this.moduleSeq.splice(idx, 0, m);
                    //更改所有受影响的sort字段
                    _.each(this.moduleSeq, function (v, k) {
                        if (k >= idx) {
                            v.sort++;
                        }
                    });
                }
            });


        },
        setEditShow(m, bl) {
            m.showEdit = bl;
        },
        saveModule: function (m, idx) {
            return this.$http.post('/cms/cmsModuleTemplateWrite/saveModule.do',{
                pageId: urlParams.pageId,
                customName: m.customName,
                templateCode: m.templateCode,
                templateVer: m.templateVer,
                sort: idx,
                isChange: 0,
                variables: encodeURIComponent(JSON.stringify(m.variables || {}))
            })
        },
        editModule(m) {
            // 生成moduleContext 并传递到弹窗中
            m.showEditDialog = true;
            _.assign(this.moduleContext, m);
        },
        exchange(oriObj, newIdx) {
            var currentIdx = this.moduleSeq.indexOf(oriObj);
            if (currentIdx == newIdx || currentIdx + 1 == newIdx) {
                //拖动是间隔一位序号，0=>2？
                return;
            }
            if (newIdx >= currentIdx) {
                this.moduleSeq.splice(newIdx, 0, oriObj);
                this.moduleSeq.splice(currentIdx, 1);
            } else {
                this.moduleSeq.splice(currentIdx, 1);
                this.moduleSeq.splice(newIdx, 0, oriObj);
            }
        }
    }
}
</script>

<style scoped>
.placeholder {
    text-align: center;
    padding-top: 100px;
    font-size: 48px;
    color: #999;
}

.el-icon {
    font-size: 36px;
    position: absolute;
    z-index: 9999;
    cursor: pointer;
    color: white;
}

.main-content {
    min-height: 600px;
    background-color: #eee;
    position: relative;
}

.blank:after {
    content: '拖放至此处';
    position: absolute;
    padding: 120px 50px;
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    vertical-align: middle;
    text-align: center;
}

.module-mask-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    top: 0;
    z-index: 600;
    width: 100%;
    height: 100%;
    _position: absolute;
    _top: expression_r(document.documentElement.clientHeight+document.documentElement.scrollTop-this.offsetHeight);
}

.module-wrapper {
    position: relative;
}

.module-mask {
    height: 100%;
    width: 100%;
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
    background: #000;
}
</style>
