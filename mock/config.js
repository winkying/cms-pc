const path = require('path');
const config = {
    '/cmsModuleTemplateRead/getTemplateList.do':{
        method: 'get',
        data: './templateList.json',
        target: 'http://localhost:3000'
    },
    '/api/templateListByVer':{
        method: 'post',
        data: './getTemplateListByVer.json',
        target: 'http://localhost:3000'
    }
}

for(let item in config){
    if (config.hasOwnProperty(item)){
        config[item].path = path.resolve(__dirname, config[item].data);
    }
}

module.exports = config;