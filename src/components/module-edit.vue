<template>
    <el-dialog :title="moduleContext.customName" :visible.sync="moduleContext.showEditDialog" :before-close="handleClose">
        <span slot="header" class="dialog-header">
            <el-form :model="vars">
                <el-form-item label=""></el-form-item>
            </el-form>
        </span>
        <component :is="moduleContext.templateCode+'_bk'" :vars="vars" :data="data"></component>
        <span slot="footer" class="dialog-footer">
            <el-button @click="moduleContext.showEditDialog = false">取 消</el-button>
            <el-button type="primary" @click="saveModule">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import Vue from 'vue'
import h5_multipic_bk from './v1/h5_multipic-bk.vue'
import goodsR1c2Bk from './v1/goods-r1c2-bk.vue'

export default {
    props: ['moduleContext'],
    components: { h5_multipic_bk, goodsR1c2Bk },
    data: () => {
        return {

        }
    },
    computed: {
        vars: function () {
            return _.cloneDeep(_.assign({}, this.moduleContext.variables), true);
        },
        data: function () {
            return _.cloneDeep(_.assign({}, this.moduleContext.moduleData), true);
        }
    },
    mounted: function () {

    },
    methods: {
        handleClose(done) {
            //reset()
        },
        saveModule() {
            this.moduleContext.showEditDialog = false;
            //数组可以这么传
            this.moduleContext.moduleData.moduleDataList = [...this.data.goods];
            this.moduleContext.moduleData.categoryList = [...this.data.category];
            //嵌套对象不可以？
            //同步moduleContext对象，
            _.assign(this.moduleContext, _.cloneDeep({ variables: this.vars, moduleData: this.data }, true));
            //但是不会同步到moduleSeq中，视图不会更新，通过事件通知
            window.bus.$emit('vars-change', _.cloneDeep(this.vars));
            //_.assign(this.moduleContext, _.cloneDeep({vars:this.vars,data:this.data},true));
            //save moduleContext
        }
    }
}
</script>

<style>

</style>
