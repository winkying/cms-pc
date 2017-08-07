<template>
    <el-form :model="vars">
        <el-form-item label="" v-for="(img,iIdx) in vars.images" :key="img">
            <el-row>
                <el-col :span="8">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="preview" :on-remove="remove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-col>
                <el-col :span="16">
                    
                </el-col>
            </el-row>
    
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: ['vars', 'data'],
    data: () => {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            formLabelWidth: '120px',
            test: 'http://cdn.oudianyun.com/lyf-local/trunk/back-cms/1500272396652_1708_81.jpg@base@tag=imgScale&q=80',
            test1: 'http://cdn.oudianyun.com/lyf-local/trunk/back-cms/1500281874924_3834_86.jpg@base@tag=imgScale&q=80'
        }
    },
    methods: {
        remove: (file, fileList) => {
            console.log(file);
        },
        preview: (file) => {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
}
</script>

<style>

</style>
