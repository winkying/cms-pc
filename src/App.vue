<template>
	<div id="app" class="height100">
		<el-row class="height100">
			<el-col :span="2" class="height100">
				<div class="left-side">
					<left-side></left-side>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="main-content">
					<main-content :module-context="moduleContext"></main-content>
				</div>
			</el-col>
			<el-col :span="2">
				<div class="module-edit">
					<module-edit :module-context="moduleContext"></module-edit>
				</div>
			</el-col>
		</el-row>

		
	
	</div>
</template>

<script>

import Vue from 'vue'
import leftSide from './components/left-side.vue'
import mainContent from './components/main-content.vue'
import moduleEdit from './components/module-edit.vue'
import moduleContext from './common/module-context.js'
import Directives from './common/Directives.js'

Vue.mixin(Directives);

window.bus = new Vue();

export default {
	data() {
		return {
			moduleContext: moduleContext
		}
	},
	components: { leftSide, mainContent, moduleEdit },
	mounted:function(){
		this.$http.get('/mock/pageInfo.json').then(function(res){
			console.log(res.body);
		});
	},
	methods: {

	}
}

//console.log($("#app").length);
</script>

<style lang="less">
.height100{
	height:100%;
}
html,body,#app{
	width:100%;
	height:100%;
}
.left-side {
	width: 80px;
	background-color: #34373e;
	height:100%;
}
</style>
