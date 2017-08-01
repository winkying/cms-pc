<template>
    <el-row>
        <el-col :span="24">
            <el-table :data="data.goods" ref="goodsTable" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column property="code" label="商品编码" width="120"></el-table-column>
                <el-table-column label="时间" width="120">
                    <template scope="scope">{{scope.row.date}}</template>
                </el-table-column>
                <el-table-column property="name" label="商品名称" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column label="优先级" width="120">
                    <template scope="scope">
                        <el-input v-model="scope.row.priority" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="info" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: ['module'],
    computed: {
        vars: function () {
            return this.module.vars;
        },
        data:function(){
            return this.module.data;
        }
    },
    methods:{
        handleEdit:(idx,row)=>{

        },
        handleDelete:(idx,row)=>{
            
        }
    }
}
</script>