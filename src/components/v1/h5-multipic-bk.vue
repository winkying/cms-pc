<template>
    <el-form :model="vars">
        <el-form-item label="图片地址" :label-width="formLabelWidth">
            <el-input v-model="vars.images[0].src" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: ['vars', 'data'],
    data: () => {
        return {
            formLabelWidth: '120px',
            test: 'http://cdn.oudianyun.com/lyf-local/trunk/back-cms/1500272396652_1708_81.jpg@base@tag=imgScale&q=80',
            test1:'http://cdn.oudianyun.com/lyf-local/trunk/back-cms/1500281874924_3834_86.jpg@base@tag=imgScale&q=80'
        }
    }
}
</script>

<style>

</style>
