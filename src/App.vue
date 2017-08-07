<template>
	<div id="app" class="height100">
		<el-row class="height100">
			<el-col :span="2" class="height100">
				<div class="left-side">
					<left-side :config="config"></left-side>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="main-content">
					<main-content :module-context="moduleContext" :module-seq="moduleList"></main-content>
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

var urlParams = Vue.utils.paramsFormat(location.href);

export default {
	data() {
		return {
			moduleContext: moduleContext,
			config: {},
			moduleList: []
		}
	},
	components: { leftSide, mainContent, moduleEdit },
	mounted: function () {
		this.$http.get('/cms/cmsPageRead/getPageInfo.do?pageId=' + urlParams.pageId).then(res => {
			if (res.data.code == 0) {
				this.config = {
					"id": res.data.data.id,
					"name": res.data.data.name,
					"displayTitle": res.data.data.displayTitle,
					"cmsThemeId": res.data.data.cmsThemeId,
					"bgImg": res.data.data.bgImg,
					"bgRepeat": res.data.data.bgRepeat,
					"bgColor": res.data.data.bgColor,
					"type": res.data.data.type,
					"showSections": res.data.data.showSections,
					"startDate": res.data.data.startDate,
					"endDate": res.data.data.endDate,
					"shareTitle": res.data.data.shareTitle,
					"shareImg": res.data.data.shareImg,
					"shareDesc": res.data.data.shareDesc,
					"companyId": res.data.data.companyId,
				}
				_.each(res.data.data.moduleList, function (val, idx) {
					try {
						if (typeof val.variables == 'string') {
							val.variables = JSON.parse(decodeURIComponent(val.variables));
						}
					} catch (e) {
						throw new Error('variables parse error');
					}
					//未每个栏目增加后台编辑部分属性(同旧版moduleContext())
					Vue.set(val, 'showEdit', false);
					Vue.set(val, 'showEditDialog', false);
				})
				this.moduleList = [...res.data.data.moduleList];
			}
		})
	},
	methods: {

	}
}

//console.log($("#app").length);
</script>

<style lang="less">
.height100 {
	height: 100%;
}

html,
body,
#app {
	width: 100%;
	height: 100%;
}

.left-side {
	width: 80px;
	background-color: #34373e;
	height: 100%;
}
</style>
