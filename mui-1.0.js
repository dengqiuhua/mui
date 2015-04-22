/**
 * MUI 是javascript库，该库封装来大量常用的脚本方法，方便调用
 * Created by dengqiuhua on 15-4-19.
 */


var MUI = function(selector){
    //返回一个对象
    return new MUI.init(selector);
};


//原型
//MUI.fun =
MUI.prototype = {
    version : "1.0",
    selector : "",
    constructor : MUI

};

//MUI.fun.init.prototype = MUI.fun;

//总继承方法
MUI.extend = function(){
    var i,
        copy ,
        target = arguments[0] || {},
        length = arguments.length;

    //浅拷贝
    if(length === 1){
        target = this;
        copy = arguments[0];
    }
    //深拷贝
    if(length === 2){
        copy = arguments[1];
    }

    for( i in copy){
        if(typeof copy[i] === "object"){
            //深拷贝
            target[i] = copy[i].constructor === Array ? [] : {};
            this.extend(target[i],copy[i]);
        }else{

            target[i] = copy[i];
        }
    }

    return target;
};

//扩展功能
MUI.extend({
    isArray : function(obj){
        if(obj!=null){
            return obj.constructor === Array ? true : false;
        }
        return false;
    },
    inArray : function(element , array){
        for(var i in array){
            if(array[i] === element){
                return true;
            }
        }
        return false;
    },
    width : 200,
    show : function(){
        this.removeClass("hide");
        return this;
    },
    hide : function(){
        this.addClass("hide");
        return this;
    },
    addClass : function(className){
        var classCurrent = this.selector.className.split(" ");
        if(!this.inArray(className,classCurrent)){
            classCurrent.push(className);
        }
        this.selector.className = classCurrent.join(" ");
        return this;
    },
    removeClass : function(className){
        var classCurrent = this.selector.className.split(" ");
        if(this.inArray(className,classCurrent)){
            classCurrent.remote(className);
        }
        return this;
    },
    text : function(){

    },
    html : function(html){
        if( typeof html!== "undefined"){
            this.selector.innerHTML = html;
            return this;
        }else{
            return this.selector.innerHTML;
        }
    }

});

//事件
MUI.extend({
    on : function(action,callback){

    },
    onclick : function(callback){
        return this.on("onclick",callback);
    },
    hover : function(callback){
        return this.on("onhover",callback);
    }
});

//ajax
MUI.extend({
    createXMLHttpRequest : function() {
        var XMLHttpReq;
        try {
            XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP
        }
        catch(E) {
            try {
                XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP
            }
            catch(E) {
                XMLHttpReq = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象
            }
        }
        return XMLHttpReq;
    },

    ajax : function(options){
        //默认参数
        var defaults = {
            url : "",
            type : "GET",
            dataType : "json",
            success : function(msg){

            }
        };
        //继承
        defaults = this.extend(options);


        //创建XMLHttpRequest对象
        var XHR = this.createXMLHttpRequest();

        //回调函数
        var processResponse = function() {
            if (XHR.readyState == 4) {
                if (XHR.status == 200) {
                    var text = XHR.responseText;
                    return defaults.success(text);
                    //return text;
                }
            }
            //return;
        };

        XHR.open(defaults.type, defaults.url, true);
        XHR.onreadystatechange = processResponse; //指定响应函数
        XHR.send(null);


    }
});


//初始化选择器
MUI.init = function(selector){
    var element;

    if(!selector){
        return this;
    }
    if(typeof selector === "string"){
        var arraySelector = selector.split(" ");
        element = document.getElementById(arraySelector[0]);
        this.selector = element;

        return this;

    }else{
        return this;
    }
};

//原型指向
MUI.init.prototype = MUI;

//for(var j in MUI){
//    //alert(MUI[j]);
//}
