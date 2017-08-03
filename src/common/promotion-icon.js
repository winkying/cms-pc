import Vue from "vue";

Vue.directive("promotionIcon", {
    bind: function(value) {
        //console.log(value);
    },
    update: function (value) {
        var className = '';
        switch(value) {
            case 1:
                className = 'bgff3939';
                break;
            case 7:
                className = 'bgd9c62a';
                break;
            case 8:
                className = 'bgfe2b2b';
                break;
            case 1002:
            case 1004:
                className = 'bg9d9afe';
                break;
            case 1001:
            case 1003:
                className = 'bgb3be07';
                break;
            case 1005:
            case 1006:
                className = 'bge9a5a5';
                break;
            case 1012:
                className = 'bg9ba0fe';
                break;
            case 1013:
                className = 'bgd1cf14';
                break;
            case 1014:
            case 1015:
                className = 'bg7279f9';
                break;
            case 1016:
            case 1017:
                className = 'bge18b66';
                break;
            case 1018:
            case 1019:
                className = 'bgb9be67';
                break;
            case 1022:
                className = 'bgff6900';
                break;
            case 2001:
                className = 'bgff6900';
                break;
            case 2002:
                className = 'bgff6900';
                break;
            case 3001:
                className = 'bgff6900';
                break;
            default:
        }
        this.el.className = this.el.className  + ' ' + className;
    }
});


