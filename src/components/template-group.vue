<template>
    <div class="left-side-module-wrapper" :class="{'active':active}">
        <el-popover @show="show" @hide="hide" ref="popoverTemplate" placement="right" width="225" offset="27" title="选择所需模板，并拖动到相应位置" trigger="click">
            <el-collapse v-model="collapse">
                <el-collapse-item :title="gp.name" v-for="(gp, gidx) in templateGroupSeq" :key="gp.group" :name="gp.group">
                    <el-row :gutter="10" type="flex"  v-drag-zone:initing="gp.templateSeq">
                        <el-col :span="8" v-for="(template,tidx) in gp.templateSeq" :key="template.code">
                            <a class="template-item">
                                <img :src="template.previewImg">
                                <span>{{template.name}}</span>
                            </a>
                        </el-col>
                    </el-row>
                </el-collapse-item>
            </el-collapse>
        </el-popover>
        <el-button type="text" v-popover:popoverTemplate class="left-side-module">
            <i class="el-icon el-icon-menu"></i>
            <span>模块</span>
        </el-button>
    
    </div>
</template>

<script>
export default {
    props: ['moduleContext'],
    data: () => {
        return {
            active: false,
            showTemplate: false,
            collapse: [1, 2, 3, 4],
            templateGroupSeq: [
                { group: 1, name: '通用', hide: false, templateSeq: [] },
                { group: 2, name: '商品', hide: false, templateSeq: [] },
                { group: 3, name: '营销', hide: false, templateSeq: [] },
                { group: 4, name: '导航', hide: false, templateSeq: [] }
            ],
        }
    },
    mounted: function () {
        debugger;
        this.$http.get('/mock/templateList.json').then((res) => {
            if (res.body.code == 0) {
                var groupObj = _.groupBy(res.body.data, function (d) {
                    return d.groupType//{1:[],2:[],3:[],4:[]}
                });
                _.each(this.templateGroupSeq, function (val, key) {
                    val.templateSeq.push(...groupObj[key + 1]);
                });
            }
        });
    },
    methods: {
        show: function () {
            this.active = true;
        },
        hide: function () {
            this.active = false;
        }
    }
}
</script>

<style lang="less">
.el-popover[x-placement^=right] {
    margin-left: 22px;
}

.el-collapse-item__content {
    padding: 0!important;
}
.el-row--flex{
    flex-flow:row wrap;
    margin-left: 0!important;
    margin-right: 0!important;
    margin-top: 10px;
}
.el-collapse-item__wrap {
    background-color: #ffffff!important;
    border-bottom: 1px solid #dfe6ec;
}
.el-popover{
    border:0!important;
}
.el-collapse-item__header{
    background-color: #ebedf3;
}
.left-side-module-wrapper {
    text-align: center;
    height: 40px;
    position: relative;
    .popover {
        left: 68px;
    }
    &.active:before {
        content: '';
        position: absolute;
        display: block;
        width: 4px;
        height: 100%;
        background-color: #2082f8;
    }
}

.template-item {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 60px;
    height: 69px;
    background-color: #ebedf3;
    padding-top: 10px;
    border-color: #dee1e7;
    box-sizing: border-box;
    margin-bottom: 10px;
    cursor: move;
    img {
        width: 26px;
        height: 22px;
    }
}

.left-side-module {
    width: 36px;
    color: #aeafb2;
    padding: 0!important;
    border-radius: 0!important;
    position: relative;
    &:hover {
        border-color: #ffffff;
        color: #ffffff;
    }
    &:focus {
        border-color: #ffffff;
        color: #ffffff;
    }
    .el-icon {
        display: block!important;
        margin-bottom: 10px;
    }
    .el-icon+span {
        margin-left: 0!important;
    }
}

.group-name {
    height: 36px;
    line-height: 36px;
    background-color: #ebedf3;
    font-size: 14px;
}
</style>