<template>
    <el-dialog :title="moduleContext.customName" :visible.sync="moduleContext.showEditDialog"  :before-close="handleClose">
        <component :is="moduleContext.componentCode+'-bk'" :vars="vars" :data="data"></component>
        <span slot="footer" class="dialog-footer">
            <el-button @click="moduleContext.showEditDialog = false">取 消</el-button>
            <el-button type="primary" @click="saveModule">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import Vue from 'vue'
import h5MultipicBk from './v1/h5-multipic-bk.vue'
import goodsR1c2Bk from './v1/goods-r1c2-bk.vue'

export default {
    props:['moduleContext'],
    components:{h5MultipicBk, goodsR1c2Bk},
    data:()=>{
        return{

        }
    },
    computed:{
        vars:function(){
            return _.cloneDeep(_.assign({}, this.moduleContext.vars), true);
        },
        data:function(){
            return _.cloneDeep(_.assign({}, this.moduleContext.data), true);
        }
    },
    methods:{
        handleClose(done) {
            //reset()
        },
        saveModule(){
            this.moduleContext.showEditDialog = false;
            debugger;
            //数组可以这么传
            this.moduleContext.data.goods = [...this.data.goods];
            this.moduleContext.data.category = [...this.data.category];
            //嵌套对象不可以？
            //同步moduleContext对象，
            _.assign(this.moduleContext, _.cloneDeep({vars:this.vars,data:this.data},true));
            //但是不会同步到moduleSeq中，视图不会更新，通过事件通知
            window.bus.$emit('vars-change',_.cloneDeep(this.vars));
            //_.assign(this.moduleContext, _.cloneDeep({vars:this.vars,data:this.data},true));
            //save moduleContext
        }
    }
}
</script>

<style>

</style>
