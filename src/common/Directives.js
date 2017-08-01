import Vue from 'vue'

export default {
    directives: {
        'dragZone': {
            bind: function (el, binding, vnode) {
                var groupName = binding.arg,
                    dragConfig = binding.value;

                if (Array.isArray(dragConfig)) {
                    window.drakeService.draggable(groupName, el, dragConfig);
                } else {
                    window.drakeService.draggable(groupName, el, dragConfig.list, dragConfig.before);
                }
            }
        },
        'dropZone': {
            bind: function (el, binding) {
                var groupName = binding.arg,
                    droppingFunc = binding.value;
                window.drakeService.droppable(groupName, el, droppingFunc);
            }
        },
        'linkTo':{
            bind:function(el,binding){
                console.log(binding.value);
            }
        }
    }
}