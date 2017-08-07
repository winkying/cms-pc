<template>
    <div class="index-image-v1">
        <ul>
            <li v-for="(img,imgk) in vars.images" :key="img.desc">
                <span v-link-to="img.link.data" class="clearfix">
                    <img :src="img.src" :title="img.desc">
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['module'],
    computed:{
        vars:function(){
            return this.module.variables;
        }
    }
}
</script>

<style scoped>
*{
    margin:0;
    padding:0;
}
ul,li{
    list-style: none;
}
.index-image-v1 img{
    width:100%;
    max-height: 100px;
}
</style>
