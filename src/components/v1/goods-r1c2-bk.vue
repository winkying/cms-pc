<template>
    <div>
        <el-form :model="column" ref="goodsForm" label-width="90px">
            <el-form-item label="栏目标题">
                <el-input v-model="column.title" size="small"></el-input>
            </el-form-item>
            <el-form-item label="展示时效">
                <el-radio-group v-model="column.timeliness" size="small">
                    <el-radio :label="1">保持一直展示</el-radio>
                    <el-radio :label="2">按时效展示</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="展示样式">
                <el-radio-group v-model="column.style" size="small">
                    <el-radio :label="2">一行2个</el-radio>
                    <el-radio :label="3">一行3个</el-radio>
                    <el-radio :label="4">一行4个</el-radio>
                    <el-radio :label="5">一行5个</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="展示商品数">
                <el-input v-model="column.displayNum" size="small"></el-input>
            </el-form-item>
            <el-form-item label="排序规则">
                <el-select v-model="column.rule" size="small">
                    <el-option label="价格" :value="1"></el-option>
                    <el-option label="销量" :value="2"></el-option>
                    <el-option label="时间" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选品方式">
                <el-radio-group v-model="column.goodsType" size="small">
                    <el-radio :label="1">手动选品</el-radio>
                    <el-radio :label="2">促销选品</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-row :gutter="20">
            <el-col>
                <el-button type="info" size="small">添加商品</el-button>
                <el-button type="info" size="small">商品导入</el-button>
                <el-button type="info" size="small">表格下载</el-button>
            </el-col>
    
        </el-row>
        <el-row>
            <el-form :inline="true">
                <el-col :span="4">
                    <el-form-item>
                        <el-button type="danger" size="small">批量删除</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="13" :offset="7">
                    <el-form-item>
                        <div style="width:120px;">
                            <el-select v-model="search.type" size="small">
                                <el-option label="商品编码" value="code"></el-option>
                                <el-option label="商品名称" value="name"></el-option>
                                <el-option label="商品分类" value="cate"></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="search.value" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" @click.native="search" size="small">查询</el-button>
                    </el-form-item>
                </el-col>
    
            </el-form>
        </el-row>
    
        <el-table ref="goodsTable" :data="goodsTableData0" border @selection-change="handleSelectionChange">
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
        <el-row>
            <el-pagination size="small"></el-pagination>
        </el-row>
        <el-row :gutter="20">
            <el-col>
                <el-button type="info" size="small" @click="submit">确定</el-button>
                <el-button size="small">取消</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['vars', 'data'],
    data: function () {
        return {
            column: {
                titile: '',
                timeliness: 1,
                style: 3,
                displayNum: 100,
                goodsType: 1,
                rule: 2
            },
            search: {
                type: 'code',
                value: ''
            },
            goodsTableData0: [
                {
                    date: '2016-05-03',
                    name: 'To爱说的发顺丰撒发撒分撒发撒的发生m',
                    address: 'No. 189, Grove St, Los Angeles',
                    code: 'abcd12345',
                    priority: 99
                }, {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                    code: 'khjdghfg',
                    priority: 99
                }, {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                    code: 'gffgdfgds',
                    priority: 22
                }, {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                    code: 'abcd12rqewrwr345',
                    priority: 15
                }, {
                    date: '2016-05-08',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                    code: 'dsfssdfssdfs',
                    priority: 7
                }, {
                    date: '2016-05-06',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                    code: 'abcd1dfsf2345',
                    priority: 3
                }, {
                    date: '2016-05-07',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                    code: 'sdfssdfsd',
                    priority: 11
                }
            ],
        }

    },
    methods: {
        handleSelectionChange: function (val) {
            this.data.goods = val;
        },
        handleEdit: function (index, row) {
            alert(index);
        },
        handleDelete: function (index, row) {
            this.goodsTableData0.splice(index, 1);
        },
        submit: function () {
            this.data.goods = [...this.multipleSelection];
        },
    }
}
</script>
