<template>
    <div class="left-side">
        <template-group></template-group>
        <!-- <themes></themes> -->
        <!-- <page-config></page-config> -->
    </div>
</template>

<script>
import templateGroup from './template-group.vue'
import themes from './themes.vue'
import pageConfig from './page-config.vue'

export default {
    components:{templateGroup, themes, pageConfig}
}
</script>

<style>
  .left-side{
      padding-top: 20px;
      position:fixed;
<<<<<<< HEAD
      height:100%;
=======
>>>>>>> 70c1ac254b4784630777ff62d7430604ab229f42
  }
</style>
