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
    copyright : "create by monica.",
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
    css : function(css){
        if( typeof css!== "undefined" && css !== null){
            if(css !== ""){

                css = css.join(";");
            }
            this.attr("style",css);
            return this;
        }
    },
    attr : function(name,value){
        if( typeof value!== "undefined"){
            this.selector.setAttribute(name,value);
            return this;
        }else{
            return this.selector.getAttribute(name);
        }
    },
    text : function(text){
        if( typeof text!== "undefined"){
            this.selector.innerText = text;
            return this;
        }else{
            return this.selector.innerText;
        }
    },
    html : function(html){
        if( typeof html!== "undefined"){
            this.selector.innerHTML = html;
            return this;
        }else{
            return this.selector.innerHTML;
        }
    },
    append : function(str){
        this.selector.innerHTML = this.selector.innerHTML + str;
    },
    appendBefor : function(str){
        this.selector.innerHTML = str + this.selector.innerHTML ;
    },
    sub : function(str,start,end){
        if( typeof html!== "undefined"){
            return str.substring(start, str.length);
        }else {
            return str.substring(start, end);
        }
    },
    hideUrl : function(){
        window.scrollTo(0, 1);
    },
    preventScrollPage : function(){
        var obj = document.getElementsByTagName("body")[0];
        obj.onclick = function(event) {
            event.preventDefault();
        }
    },
    parent : function(){
        return this.selector.parentNode;
    }

});

//扩展功能[]
MUI.extend({
    isArray : function(obj){
        if(obj!= null){
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
    isStartWith : function(str,suffix){
        var index = str.indexOf(suffix);
        if(index === 0){
            return true;
        }else{
            return false;
        }
    },
    isEndWith : function(str,suffix){
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    },
    isIP : function(strIp){
        var ipDomainPat=/^((2[0-4]d|25[0-5]|[01]?dd?).){3}(2[0-4]d|25[0-5]|[01]?dd?)$/;
        var matchArray=strIp.match(ipDomainPat);
        if (matchArray != null){
            return true;
        }
        return false;
    },
    isMobilephoneNum : function(mobileNum){
        var mobilephoneNumPat=/^1d{10}|01d{10}$/;
        var matchArray=mobileNum.match(mobilephoneNumPat);
        if(matchArray!=null){
            return true;
        }
        return false;
    },
    isDigital : function(str){
        var digitalPot=/^d*$/;
        var matchArray=str.match(digitalPot);
        if(matchArray!=null){
            return true;
        }
    },
    isIdentifyCard : function(id){
        var Wi = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1];
        var ai = "10X98765432";
        var sum = 0;
        var ssum = 0;
        for(var i=0;i<17;i++){
            ssum=eval(Wi[i]*id.charAt(i));
            sum=ssum+sum;
        }
        var modNum=sum%11;
        if(ai.charAt(modNum)==id.charAt(17)){
            return true;
        }
        return false;
    },
    isEnglish : function(name){
        if(name.length == 0)
        return false;
        for(i = 0; i < name.length; i++) {
            if(name.charCodeAt(i) > 128)
                return false;
        }
        return true;
    },
    isChinese : function(name){
        if(name.length == 0)
            return false;
        for(i = 0; i < name.length; i++) {
            if(name.charCodeAt(i) > 128)
            return true;
        }
        return false;
    },
    isRightAccount : function(){
        if(/^[a-z]w{3,}$/i.test(str)){
            return true;
        } else {
            return false;
        }
    },
    isUrl : function(){
        var urlPat=/^http:\/\/[A-Za-z0-9]+.[A-Za-z0-9]+[/=?%-&_~`@[]':+!]*([^<>""])*$/;
        var matchArray=URL.match(urlPat);
        if(matchArray!=null){
            return true;
        } else {
            return false;
        }
    },
    isEmail : function(emailStr){
        if (emailStr.length == 0) {
            return fasle;
        } else {
            /*var emailPat=/^(.+)@(.+)$/;
            var specialChars="/(/)<>@,;:///"/./[/]";
            var validChars="[^/s" + specialChars + "]";
            var quotedUser="("[^"]*")";
            var ipDomainPat=/^(d{1,3})[.](d{1,3})[.](d{1,3})[.](d{1,3})$/;
            var atom=validChars + '+';
            var word="(" + atom + "|" + quotedUser + ")";
            var userPat=new RegExp("^" + word + "(/." + word + ")*$");
            var domainPat=new RegExp("^" + atom + "(/." + atom + ")*$");
            var matchArray=emailStr.match(emailPat);
            if (matchArray == null) {
                return false;
            }
            var user=matchArray[1];
            var domain=matchArray[2];
            if (user.match(userPat) == null) {
                return false;
            }
            var IPArray = domain.match(ipDomainPat);
            if (IPArray != null) {
                for (var i = 1; i <= 4; i++) {
                   if (IPArray[i] > 255) {
                      return false;
                   }
                }
                return true;
            }
            var domainArray=domain.match(domainPat);
            if (domainArray == null) {
                return false;
            }
            var atomPat=new RegExp(atom,"g");
            var domArr=domain.match(atomPat);
            var len=domArr.length;
            if ((domArr[domArr.length-1].length < 2) ||
                (domArr[domArr.length-1].length > 3)) {
                return false;
            }
            if (len < 2) {
                return false;
            }
            return true;*/
        }
    }
});

//扩展功能[]
MUI.extend({
    formatString : function(str){
        var i = 1, args = arguments;
        return str.replace(/%s/g,function(){
            return (i<args.length)?args[i++]:"";
        });
    },
    replaceAll : function(str,find,chat){
        return str.replace(/find/g,chat);
    },
    reverseString : function(str){
        var strArr = str.split('');
        strArr.reverse();
        return strArr.join('');
    },
    insertArray : function(array,item,index){
        if(typeof index != "undefined"){
            array.splice(index, 0, item);
        }else{
            array.push(item);
        }
        return array;
    },
    removeArray : function(array,index){
        if(isNaN(index)||index>array.length){return array;}
        for(var i=0,n=0;i<array.length;i++){
            if(array[i]!=array[index]){
                array[n++]=array[i];
            }
        }
        array.length-=1;
        return true;
    },
    getUrlParam : function(name){
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },
    getChineseCounts : function(){
        var pattern = /^[一-龥]+$/i;
        var maxL,minL;
        maxL = obstring.length;
        obstring = obstring.replace(pattern,"");
        minL = obstring.length;
        return (maxL - minL);
    }
});

//扩展功能[时间]
MUI.extend({
    datetime : function(format){
        var myDate = new Date();
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var hour = myDate.getHours();
        var minutes = myDate.getMinutes();
        var second = myDate.getSeconds();
        var timeOnly = false;
        if(typeof format != "undefined" && format != null && format != ""){
            format = format.toLowerCase();
            format = format.replace(/yyyy/g,"y").replace(/mm/g,"m").replace(/dd/g,"d").replace(/hh/g,"h").replace(/ss/g,"s");
            if(format.indexOf("y")<0||format.indexOf("d")<0||format.indexOf("-")<0||format.indexOf("/")<0){
                timeOnly = true;
            }
            format = format.replace(/s/g,"%s").replace(/y/g,"%s").replace(/m/g,"%s").replace(/d/g,"%s").replace(/h/g,"%s");

        }else{
            format = "%s-%s-%s %s:%s:%s";
        }
        if(timeOnly){
            return this.formatString(format,hour,minutes,second);
        }
        return this.formatString(format,year,month,day,hour,minutes,second);

    },
    time : function(){
        var myDate = new Date();
        return myDate.getTime()/1000;
    }
});

//扩展功能[文件]
MUI.extend({
    fileExt : function(filename){
        return d=/\.[^\.]+$/.exec(filename);
    }
});

//扩展功能[文件]
MUI.extend({
    cookie : function(name,value,expireTime){
        //写入
        if(typeof value !== "undefined"){
            //过期时间
            if(typeof value !== "undefined" && expireTime !== null && expireTime != "" && !isNaN(expireTime)){
                expireTime = expireTime*60*60*1000;
            }else{
                var Days = 7;
                expireTime = Days*24*60*60*1000;
            }
            var exp = new Date();
            exp.setTime(exp.getTime() + expireTime);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();

        }else{
            //读取
            var arrCookie,reg=new RegExp("(^| )"+ name +"=([^;]*)(;|$)");
            if(arrCookie=document.cookie.match(reg)) {
                return unescape(arrCookie[2]);
            }else {
                return null;
            }
        }
    }
});

//事件
MUI.extend({
    on : function(action,callback){
        if(this.selector !== null && this.selector !== ""){
            if(this.isStartWith(action,"on")){
                action = action.substring(2,action.length);
            }
            this.selector.addEventListener(action,function(e){
                e = e || window.event;//返回事件原
                return callback(e);
            },false);
        }

    },
    click : function(callback){
        return this.on("click",callback);
    },
    hover : function(callback){
        return this.on("mousemove",callback);
    },
    change : function(callback){
        return this.on("change",callback);
    },
    blur : function(callback){
        return this.on("blur",callback);
    },
    focus : function(callback){
        return this.on("focus",callback);
    },
    keydown : function(callback){
        return this.on("keydown",callback);
    },
    keypress : function(callback){
        return this.on("keypress",callback);
    },
    keyup : function(callback){
        return this.on("keyup",callback);
    },
    load : function(callback){
        return this.on("load",callback);
    },
    submit : function(callback){
        return this.on("submit",callback);
    },
    mouseout : function(callback){
        return this.on("mouseout",callback);
    },
    select : function(callback){
        return this.on("select",callback);
    },
    toggle : function(callback,callback2){

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
        var context = null;//上下文
        //html
        if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {

        }else{
            //
            var arraySelector = [];
            if(selector.indexOf(" ") > -1){
                arraySelector = selector.split(" ");
                var arrLength = arraySelector.length,
                    i = 0;

                for(i; i < arrLength;i++){

                }
                if(arraySelector[arrLength-1][0] === "#"){
                    element = document.getElementById(this.sub(arraySelector[arrLength-1],1));
                }else if(arraySelector[arrLength-1][0] === "."){
                    element = document.getElementsByClassName(this.sub(arraySelector[arrLength-1][0],1));
                }
            }else{
                if(selector[0] === "#"){
                    element = document.getElementById(this.sub(selector,1));
                }else if(selector[0] === "."){
                    element = document.getElementsByClassName(this.sub(selector,1));
                }

            }

        }


        //element = document.getElementById(arraySelector[0]);
        this.selector = element;

        return this;

    }else{
        return this;
    }
};

//原型指向
MUI.init.prototype = MUI;
