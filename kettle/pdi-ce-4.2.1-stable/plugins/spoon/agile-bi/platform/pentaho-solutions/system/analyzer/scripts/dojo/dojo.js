if(typeof dojo=="undefined"){
var dj_global=this;
var dj_currentContext=this;
function dj_undef(_1,_2){
return (typeof (_2||dj_currentContext)[_1]=="undefined");
};
if(dj_undef("djConfig",this)){
var djConfig={};
}
if(dj_undef("dojo",this)){
var dojo={};
}
dojo.global=function(){
return dj_currentContext;
};
dojo.locale=djConfig.locale;
dojo.version={major:0,minor:0,patch:0,flag:"dev",revision:Number("$Rev: 6824 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalProp=function(_3,_4,_5){
if((!_4)||(!_3)){
return undefined;
}
if(!dj_undef(_3,_4)){
return _4[_3];
}
return (_5?(_4[_3]={}):undefined);
};
dojo.parseObjPath=function(_6,_7,_8){
var _9=(_7||dojo.global());
var _a=_6.split(".");
var _b=_a.pop();
for(var i=0,l=_a.length;i<l&&_9;i++){
_9=dojo.evalProp(_a[i],_9,_8);
}
return {obj:_9,prop:_b};
};
dojo.evalObjPath=function(_c,_d){
if(typeof _c!="string"){
return dojo.global();
}
if(_c.indexOf(".")==-1){
return dojo.evalProp(_c,dojo.global(),_d);
}
var _e=dojo.parseObjPath(_c,dojo.global(),_d);
if(_e){
return dojo.evalProp(_e.prop,_e.obj,_d);
}
return null;
};
dojo.errorToString=function(_f){
if(!dj_undef("message",_f)){
return _f.message;
}else{
if(!dj_undef("description",_f)){
return _f.description;
}else{
return _f;
}
}
};
dojo.raise=function(_10,_11){
if(_11){
_10=_10+": "+dojo.errorToString(_11);
}else{
_10=dojo.errorToString(_10);
}
try{
if(djConfig.isDebug){
dojo.hostenv.println("FATAL exception raised: "+_10);
}
}
catch(e){
}
throw _11||Error(_10);
};
dojo.debug=function(){
};
dojo.debugShallow=function(obj){
};
dojo.profile={start:function(){
},end:function(){
},stop:function(){
},dump:function(){
}};
function dj_eval(_12){
return dj_global.eval?dj_global.eval(_12):eval(_12);
};
dojo.unimplemented=function(_13,_14){
var _15="'"+_13+"' not implemented";
if(_14!=null){
_15+=" "+_14;
}
dojo.raise(_15);
};
dojo.deprecated=function(_16,_17,_18){
var _19="DEPRECATED: "+_16;
if(_17){
_19+=" "+_17;
}
if(_18){
_19+=" -- will be removed in version: "+_18;
}
dojo.debug(_19);
};
dojo.render=(function(){
function _1a(_1b,_1c){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_1b};
for(var i=0;i<_1c.length;i++){
tmp[_1c[i]]=false;
}
return tmp;
};
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:_1a(["html"],["ie","opera","khtml","safari","moz"]),svg:_1a(["svg"],["corel","adobe","batik"]),vml:_1a(["vml"],["ie"]),swf:_1a(["Swf","Flash","Mm"],["mm"]),swt:_1a(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _1d={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,delayMozLoadingFix:false,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_1d;
}else{
for(var _1e in _1d){
if(typeof djConfig[_1e]=="undefined"){
djConfig[_1e]=_1d[_1e];
}
}
}
return {name_:"(unset)",version_:"(unset)",getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _1f=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
(function(){
var _20={pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_21,_22){
this.modulePrefixes_[_21]={name:_21,value:_22};
},moduleHasPrefix:function(_23){
var mp=this.modulePrefixes_;
return Boolean(mp[_23]&&mp[_23].value);
},getModulePrefix:function(_24){
if(this.moduleHasPrefix(_24)){
return this.modulePrefixes_[_24].value;
}
return _24;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
for(var _25 in _20){
dojo.hostenv[_25]=_20[_25];
}
})();
dojo.hostenv.loadPath=function(_26,_27,cb){
var uri;
if(_26.charAt(0)=="/"||_26.match(/^\w+:/)){
uri=_26;
}else{
uri=this.getBaseScriptUri()+_26;
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return !_27?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_27,cb);
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(this.loadedUris[uri]){
return true;
}
var _28=this.getText(uri,null,true);
if(!_28){
return false;
}
this.loadedUris[uri]=true;
if(cb){
_28="("+_28+")";
}
var _29=dj_eval(_28);
if(cb){
cb(_29);
}
return true;
};
dojo.hostenv.loadUriAndCheck=function(uri,_2a,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return Boolean(ok&&this.findModule(_2a,false));
};
dojo.loaded=function(){
};
dojo.unloaded=function(){
};
dojo.hostenv.loaded=function(){
this.loadNotifying=true;
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
this.modulesLoadedListeners=[];
this.loadNotifying=false;
dojo.loaded();
};
dojo.hostenv.unloaded=function(){
var mll=this.unloadListeners;
while(mll.length){
(mll.pop())();
}
dojo.unloaded();
};
dojo.addOnLoad=function(obj,_2b){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dh.modulesLoadedListeners.push(function(){
obj[_2b]();
});
}
}
if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
dh.callLoaded();
}
};
dojo.addOnUnload=function(obj,_2c){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.unloadListeners.push(obj);
}else{
if(arguments.length>1){
dh.unloadListeners.push(function(){
obj[_2c]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if(this.loadUriStack.length==0&&this.getTextStack.length==0){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
dojo.hostenv.callLoaded();
}
};
dojo.hostenv.callLoaded=function(){
if(typeof setTimeout=="object"){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
};
dojo.hostenv.getModuleSymbols=function(_2d){
var _2e=_2d.split(".");
for(var i=_2e.length;i>0;i--){
var _2f=_2e.slice(0,i).join(".");
if((i==1)&&!this.moduleHasPrefix(_2f)){
_2e[0]="../"+_2e[0];
}else{
var _30=this.getModulePrefix(_2f);
if(_30!=_2f){
_2e.splice(0,i,_30);
break;
}
}
}
return _2e;
};
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_31,_32,_33){
if(!_31){
return;
}
_33=this._global_omit_module_check||_33;
var _34=this.findModule(_31,false);
if(_34){
return _34;
}
if(dj_undef(_31,this.loading_modules_)){
this.addedToLoadingCount.push(_31);
}
this.loading_modules_[_31]=1;
var _35=_31.replace(/\./g,"/")+".js";
var _36=_31.split(".");
var _37=this.getModuleSymbols(_31);
var _38=((_37[0].charAt(0)!="/")&&!_37[0].match(/^\w+:/));
var _39=_37[_37.length-1];
var ok;
if(_39=="*"){
_31=_36.slice(0,-1).join(".");
while(_37.length){
_37.pop();
_37.push(this.pkgFileName);
_35=_37.join("/")+".js";
if(_38&&_35.charAt(0)=="/"){
_35=_35.slice(1);
}
ok=this.loadPath(_35,!_33?_31:null);
if(ok){
break;
}
_37.pop();
}
}else{
_35=_37.join("/")+".js";
_31=_36.join(".");
var _3a=!_33?_31:null;
ok=this.loadPath(_35,_3a);
if(!ok&&!_32){
_37.pop();
while(_37.length){
_35=_37.join("/")+".js";
ok=this.loadPath(_35,_3a);
if(ok){
break;
}
_37.pop();
_35=_37.join("/")+"/"+this.pkgFileName+".js";
if(_38&&_35.charAt(0)=="/"){
_35=_35.slice(1);
}
ok=this.loadPath(_35,_3a);
if(ok){
break;
}
}
}
if(!ok&&!_33){
dojo.raise("Could not load '"+_31+"'; last tried '"+_35+"'");
}
}
if(!_33&&!this["isXDomain"]){
_34=this.findModule(_31,false);
if(!_34){
dojo.raise("symbol '"+_31+"' is not defined after loading '"+_35+"'");
}
}
return _34;
};
dojo.hostenv.startPackage=function(_3b){
var _3c=String(_3b);
var _3d=_3c;
var _3e=_3b.split(/\./);
if(_3e[_3e.length-1]=="*"){
_3e.pop();
_3d=_3e.join(".");
}
var _3f=dojo.evalObjPath(_3d,true);
this.loaded_modules_[_3c]=_3f;
this.loaded_modules_[_3d]=_3f;
return _3f;
};
dojo.hostenv.findModule=function(_40,_41){
var lmn=String(_40);
if(this.loaded_modules_[lmn]){
return this.loaded_modules_[lmn];
}
if(_41){
dojo.raise("no loaded module named '"+_40+"'");
}
return null;
};
dojo.kwCompoundRequire=function(_42){
var _43=_42["common"]||[];
var _44=_42[dojo.hostenv.name_]?_43.concat(_42[dojo.hostenv.name_]||[]):_43.concat(_42["default"]||[]);
for(var x=0;x<_44.length;x++){
var _45=_44[x];
if(_45.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_45);
}else{
dojo.hostenv.loadModule(_45);
}
}
};
dojo.require=function(_46){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireIf=function(_47,_48){
var _49=arguments[0];
if((_49===true)||(_49=="common")||(_49&&dojo.render[_49].capable)){
var _4a=[];
for(var i=1;i<arguments.length;i++){
_4a.push(arguments[i]);
}
dojo.require.apply(dojo,_4a);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.provide=function(_4b){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.registerModulePath=function(_4c,_4d){
return dojo.hostenv.setModulePrefix(_4c,_4d);
};
dojo.setModulePrefix=function(_4e,_4f){
dojo.deprecated("dojo.setModulePrefix(\""+_4e+"\", \""+_4f+"\")","replaced by dojo.registerModulePath","0.5");
return dojo.registerModulePath(_4e,_4f);
};
dojo.exists=function(obj,_50){
var p=_50.split(".");
for(var i=0;i<p.length;i++){
if(!obj[p[i]]){
return false;
}
obj=obj[p[i]];
}
return true;
};
dojo.hostenv.normalizeLocale=function(_51){
var _52=_51?_51.toLowerCase():dojo.locale;
if(_52=="root"){
_52="ROOT";
}
return _52;
};
dojo.hostenv.searchLocalePath=function(_53,_54,_55){
_53=dojo.hostenv.normalizeLocale(_53);
var _56=_53.split("-");
var _57=[];
for(var i=_56.length;i>0;i--){
_57.push(_56.slice(0,i).join("-"));
}
_57.push(false);
if(_54){
_57.reverse();
}
for(var j=_57.length-1;j>=0;j--){
var loc=_57[j]||"ROOT";
var _58=_55(loc);
if(_58){
break;
}
}
};
dojo.hostenv.localesGenerated;
dojo.hostenv.registerNlsPrefix=function(){
dojo.registerModulePath("nls","nls");
};
dojo.hostenv.preloadLocalizations=function(){
if(dojo.hostenv.localesGenerated){
dojo.hostenv.registerNlsPrefix();
function _59(_5a){
_5a=dojo.hostenv.normalizeLocale(_5a);
dojo.hostenv.searchLocalePath(_5a,true,function(loc){
for(var i=0;i<dojo.hostenv.localesGenerated.length;i++){
if(dojo.hostenv.localesGenerated[i]==loc){
dojo["require"]("nls.dojo_"+loc);
return true;
}
}
return false;
});
};
_59();
var _5b=djConfig.extraLocale||[];
for(var i=0;i<_5b.length;i++){
_59(_5b[i]);
}
}
dojo.hostenv.preloadLocalizations=function(){
};
};
dojo.requireLocalization=function(_5c,_5d,_5e,_5f){
dojo.hostenv.preloadLocalizations();
var _60=dojo.hostenv.normalizeLocale(_5e);
var _61=[_5c,"nls",_5d].join(".");
var _62="";
if(_5f){
var _63=_5f.split(",");
for(var i=0;i<_63.length;i++){
if(_60.indexOf(_63[i])==0){
if(_63[i].length>_62.length){
_62=_63[i];
}
}
}
if(!_62){
_62="ROOT";
}
}
var _64=_5f?_62:_60;
var _65=dojo.hostenv.findModule(_61);
var _66=null;
if(_65){
if(djConfig.localizationComplete&&_65._built){
return;
}
var _67=_64.replace("-","_");
var _68=_61+"."+_67;
_66=dojo.hostenv.findModule(_68);
}
if(!_66){
_65=dojo.hostenv.startPackage(_61);
var _69=dojo.hostenv.getModuleSymbols(_5c);
var _6a=_69.concat("nls").join("/");
var _6b;
dojo.hostenv.searchLocalePath(_64,_5f,function(loc){
var _6c=loc.replace("-","_");
var _6d=_61+"."+_6c;
var _6e=false;
if(!dojo.hostenv.findModule(_6d)){
dojo.hostenv.startPackage(_6d);
var _6f=[_6a];
if(loc!="ROOT"){
_6f.push(loc);
}
_6f.push(_5d);
var _70=_6f.join("/")+".js";
_6e=dojo.hostenv.loadPath(_70,null,function(_71){
var _72=function(){
};
_72.prototype=_6b;
_65[_6c]=new _72();
for(var j in _71){
_65[_6c][j]=_71[j];
}
});
}else{
_6e=true;
}
if(_6e&&_65[_6c]){
_6b=_65[_6c];
}else{
_65[_6c]=_6b;
}
if(_5f){
return true;
}
});
}
if(_5f&&_60!=_62){
_65[_60.replace("-","_")]=_65[_62.replace("-","_")];
}
};
(function(){
var _73=djConfig.extraLocale;
if(_73){
if(!_73 instanceof Array){
_73=[_73];
}
var req=dojo.requireLocalization;
dojo.requireLocalization=function(m,b,_74,_75){
req(m,b,_74,_75);
if(_74){
return;
}
for(var i=0;i<_73.length;i++){
req(m,b,_73[i],_75);
}
};
}
})();
}
if(typeof window!="undefined"){
(function(){
if(djConfig.allowQueryConfig){
var _76=document.location.toString();
var _77=_76.split("?",2);
if(_77.length>1){
var _78=_77[1];
var _79=_78.split("&");
for(var x in _79){
var sp=_79[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _7a=document.getElementsByTagName("script");
var _7b=/(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
for(var i=0;i<_7a.length;i++){
var src=_7a[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_7b);
if(m){
var _7c=src.substring(0,m.index);
if(src.indexOf("bootstrap1")>-1){
_7c+="../";
}
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=_7c;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=_7c;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var drs=dojo.render.svg;
var dua=(drh.UA=navigator.userAgent);
var dav=(drh.AV=navigator.appVersion);
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _7d=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_7d>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_7d+6,_7d+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
var cm=document["compatMode"];
drh.quirks=(cm=="BackCompat")||(cm=="QuirksMode")||drh.ie55||drh.ie50;
dojo.locale=dojo.locale||(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
dr.vml.capable=drh.ie;
drs.capable=f;
drs.support.plugin=f;
drs.support.builtin=f;
var _7e=window["document"];
var tdi=_7e["implementation"];
if((tdi)&&(tdi["hasFeature"])&&(tdi.hasFeature("org.w3c.dom.svg","1.0"))){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
if(drh.safari){
var tmp=dua.split("AppleWebKit/")[1];
var ver=parseFloat(tmp.split(" ")[0]);
if(ver>=420){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
}else{
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var _7f=null;
var _80=null;
try{
_7f=new XMLHttpRequest();
}
catch(e){
}
if(!_7f){
for(var i=0;i<3;++i){
var _81=dojo.hostenv._XMLHTTP_PROGIDS[i];
try{
_7f=new ActiveXObject(_81);
}
catch(e){
_80=e;
}
if(_7f){
dojo.hostenv._XMLHTTP_PROGIDS=[_81];
break;
}
}
}
if(!_7f){
return dojo.raise("XMLHTTP not available",_80);
}
return _7f;
};
dojo.hostenv._blockAsync=false;
dojo.hostenv.getText=function(uri,_82,_83){
if(!_82){
this._blockAsync=true;
}
var _84=this.getXmlhttpObject();
function _85(_86){
var _87=_86["status"];
return Boolean((!_87)||((200<=_87)&&(300>_87))||(_87==304));
};
if(_82){
var _88=this,_89=null,gbl=dojo.global();
var xhr=dojo.evalObjPath("dojo.io.XMLHTTPTransport");
_84.onreadystatechange=function(){
if(_89){
gbl.clearTimeout(_89);
_89=null;
}
if(_88._blockAsync||(xhr&&xhr._blockAsync)){
_89=gbl.setTimeout(function(){
_84.onreadystatechange.apply(this);
},10);
}else{
if(4==_84.readyState){
if(_85(_84)){
_82(_84.responseText);
}
}
}
};
}
_84.open("GET",uri,_82?true:false);
try{
_84.send(null);
if(_82){
return null;
}
if(!_85(_84)){
var err=Error("Unable to load "+uri+" status:"+_84.status);
err.status=_84.status;
err.responseText=_84.responseText;
throw err;
}
}
catch(e){
this._blockAsync=false;
if((_83)&&(!_82)){
return null;
}else{
throw e;
}
}
this._blockAsync=false;
return _84.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(_8a){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(_8a);
}else{
try{
var _8b=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_8b){
_8b=dojo.body();
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(_8a));
_8b.appendChild(div);
}
catch(e){
try{
document.write("<div>"+_8a+"</div>");
}
catch(e2){
window.status=_8a;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(_8c,_8d,fp){
var _8e=_8c["on"+_8d]||function(){
};
_8c["on"+_8d]=function(){
fp.apply(_8c,arguments);
_8e.apply(_8c,arguments);
};
return true;
};
function dj_load_init(e){
var _8f=(e&&e.type)?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(_8f!="domcontentloaded"&&_8f!="load")){
return;
}
arguments.callee.initialized=true;
if(typeof (_timer)!="undefined"){
clearInterval(_timer);
delete _timer;
}
var _90=function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
};
if(dojo.hostenv.inFlightCount==0){
_90();
dojo.hostenv.modulesLoaded();
}else{
dojo.hostenv.modulesLoadedListeners.unshift(_90);
}
};
if(document.addEventListener){
if(dojo.render.html.opera||(dojo.render.html.moz&&!djConfig.delayMozLoadingFix)){
document.addEventListener("DOMContentLoaded",dj_load_init,null);
}
window.addEventListener("load",dj_load_init,null);
}
if(dojo.render.html.ie&&dojo.render.os.win){
document.attachEvent("onreadystatechange",function(e){
if(document.readyState=="complete"){
dj_load_init();
}
});
}
if(/(WebKit|khtml)/i.test(navigator.userAgent)){
var _timer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
dj_load_init();
}
},10);
}
if(dojo.render.html.ie){
dj_addNodeEvtHdlr(window,"beforeunload",function(){
dojo.hostenv._unloading=true;
window.setTimeout(function(){
dojo.hostenv._unloading=false;
},0);
});
}
dj_addNodeEvtHdlr(window,"unload",function(){
dojo.hostenv.unloaded();
if((!dojo.render.html.ie)||(dojo.render.html.ie&&dojo.hostenv._unloading)){
dojo.hostenv.unloaded();
}
});
dojo.hostenv.makeWidgets=function(){
var _91=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
_91=_91.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
_91=_91.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(_91.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
var _92=new dojo.xml.Parse();
if(_91.length>0){
for(var x=0;x<_91.length;x++){
var _93=document.getElementById(_91[x]);
if(!_93){
continue;
}
var _94=_92.parseElement(_93,null,true);
dojo.widget.getParser().createComponents(_94);
}
}else{
if(djConfig.parseWidgets){
var _94=_92.parseElement(dojo.body(),null,true);
dojo.widget.getParser().createComponents(_94);
}
}
}
}
};
dojo.addOnLoad(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(dojo.render.html.ie){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
if(!dj_undef("document",this)){
dj_currentDocument=this.document;
}
dojo.doc=function(){
return dj_currentDocument;
};
dojo.body=function(){
return dojo.doc().body||dojo.doc().getElementsByTagName("body")[0];
};
dojo.byId=function(id,doc){
if((id)&&((typeof id=="string")||(id instanceof String))){
if(!doc){
doc=dj_currentDocument;
}
var ele=doc.getElementById(id);
if(ele&&(ele.id!=id)&&doc.all){
ele=null;
eles=doc.all[id];
if(eles){
if(eles.length){
for(var i=0;i<eles.length;i++){
if(eles[i].id==id){
ele=eles[i];
break;
}
}
}else{
ele=eles;
}
}
}
return ele;
}
return id;
};
dojo.setContext=function(_95,_96){
dj_currentContext=_95;
dj_currentDocument=_96;
};
dojo._fireCallback=function(_97,_98,_99){
if((_98)&&((typeof _97=="string")||(_97 instanceof String))){
_97=_98[_97];
}
return (_98?_97.apply(_98,_99||[]):_97());
};
dojo.withGlobal=function(_9a,_9b,_9c,_9d){
var _9e;
var _9f=dj_currentContext;
var _a0=dj_currentDocument;
try{
dojo.setContext(_9a,_9a.document);
_9e=dojo._fireCallback(_9b,_9c,_9d);
}
finally{
dojo.setContext(_9f,_a0);
}
return _9e;
};
dojo.withDoc=function(_a1,_a2,_a3,_a4){
var _a5;
var _a6=dj_currentDocument;
try{
dj_currentDocument=_a1;
_a5=dojo._fireCallback(_a2,_a3,_a4);
}
finally{
dj_currentDocument=_a6;
}
return _a5;
};
}
(function(){
if(typeof dj_usingBootstrap!="undefined"){
return;
}
var _a7=false;
var _a8=false;
var _a9=false;
if((typeof this["load"]=="function")&&((typeof this["Packages"]=="function")||(typeof this["Packages"]=="object"))){
_a7=true;
}else{
if(typeof this["load"]=="function"){
_a8=true;
}else{
if(window.widget){
_a9=true;
}
}
}
var _aa=[];
if((this["djConfig"])&&((djConfig["isDebug"])||(djConfig["debugAtAllCosts"]))){
_aa.push("debug.js");
}
if((this["djConfig"])&&(djConfig["debugAtAllCosts"])&&(!_a7)&&(!_a9)){
_aa.push("browser_debug.js");
}
var _ab=djConfig["baseScriptUri"];
if((this["djConfig"])&&(djConfig["baseLoaderUri"])){
_ab=djConfig["baseLoaderUri"];
}
for(var x=0;x<_aa.length;x++){
var _ac=_ab+"src/"+_aa[x];
if(_a7||_a8){
load(_ac);
}else{
try{
document.write("<scr"+"ipt type='text/javascript' src='"+_ac+"'></scr"+"ipt>");
}
catch(e){
var _ad=document.createElement("script");
_ad.src=_ac;
document.getElementsByTagName("head")[0].appendChild(_ad);
}
}
}
})();
dojo.provide("dojo.lang.common");
dojo.lang.inherits=function(_ae,_af){
if(!dojo.lang.isFunction(_af)){
dojo.raise("dojo.inherits: superclass argument ["+_af+"] must be a function (subclass: ["+_ae+"']");
}
_ae.prototype=new _af();
_ae.prototype.constructor=_ae;
_ae.superclass=_af.prototype;
_ae["super"]=_af.prototype;
};
dojo.lang._mixin=function(obj,_b0){
var _b1={};
for(var x in _b0){
if((typeof _b1[x]=="undefined")||(_b1[x]!=_b0[x])){
obj[x]=_b0[x];
}
}
if(dojo.render.html.ie&&(typeof (_b0["toString"])=="function")&&(_b0["toString"]!=obj["toString"])&&(_b0["toString"]!=_b1["toString"])){
obj.toString=_b0.toString;
}
return obj;
};
dojo.lang.mixin=function(obj,_b2){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(obj,arguments[i]);
}
return obj;
};
dojo.lang.extend=function(_b3,_b4){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(_b3.prototype,arguments[i]);
}
return _b3;
};
dojo.inherits=dojo.lang.inherits;
dojo.mixin=dojo.lang.mixin;
dojo.extend=dojo.lang.extend;
dojo.lang.find=function(_b5,_b6,_b7,_b8){
if(!dojo.lang.isArrayLike(_b5)&&dojo.lang.isArrayLike(_b6)){
dojo.deprecated("dojo.lang.find(value, array)","use dojo.lang.find(array, value) instead","0.5");
var _b9=_b5;
_b5=_b6;
_b6=_b9;
}
var _ba=dojo.lang.isString(_b5);
if(_ba){
_b5=_b5.split("");
}
if(_b8){
var _bb=-1;
var i=_b5.length-1;
var end=-1;
}else{
var _bb=1;
var i=0;
var end=_b5.length;
}
if(_b7){
while(i!=end){
if(_b5[i]===_b6){
return i;
}
i+=_bb;
}
}else{
while(i!=end){
if(_b5[i]==_b6){
return i;
}
i+=_bb;
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(_bc,_bd,_be){
return dojo.lang.find(_bc,_bd,_be,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(_bf,_c0){
return dojo.lang.find(_bf,_c0)>-1;
};
dojo.lang.isObject=function(it){
if(typeof it=="undefined"){
return false;
}
return (typeof it=="object"||it===null||dojo.lang.isArray(it)||dojo.lang.isFunction(it));
};
dojo.lang.isArray=function(it){
return (it&&it instanceof Array||typeof it=="array");
};
dojo.lang.isArrayLike=function(it){
if((!it)||(dojo.lang.isUndefined(it))){
return false;
}
if(dojo.lang.isString(it)){
return false;
}
if(dojo.lang.isFunction(it)){
return false;
}
if(dojo.lang.isArray(it)){
return true;
}
if((it.tagName)&&(it.tagName.toLowerCase()=="form")){
return false;
}
if(dojo.lang.isNumber(it.length)&&isFinite(it.length)){
return true;
}
return false;
};
dojo.lang.isFunction=function(it){
return (it instanceof Function||typeof it=="function");
};
(function(){
if((dojo.render.html.capable)&&(dojo.render.html["safari"])){
dojo.lang.isFunction=function(it){
if((typeof (it)=="function")&&(it=="[object NodeList]")){
return false;
}
return (it instanceof Function||typeof it=="function");
};
}
})();
dojo.lang.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.lang.isAlien=function(it){
if(!it){
return false;
}
return !dojo.lang.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.lang.isBoolean=function(it){
return (it instanceof Boolean||typeof it=="boolean");
};
dojo.lang.isNumber=function(it){
return (it instanceof Number||typeof it=="number");
};
dojo.lang.isUndefined=function(it){
return ((typeof (it)=="undefined")&&(it==undefined));
};
dojo.provide("dojo.lang.array");
dojo.lang.mixin(dojo.lang,{has:function(obj,_c1){
try{
return typeof obj[_c1]!="undefined";
}
catch(e){
return false;
}
},isEmpty:function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _c2=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_c2++;
break;
}
}
return _c2==0;
}else{
if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
},map:function(arr,obj,_c3){
var _c4=dojo.lang.isString(arr);
if(_c4){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_c3)){
_c3=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_c3){
var _c5=obj;
obj=_c3;
_c3=_c5;
}
}
if(Array.map){
var _c6=Array.map(arr,_c3,obj);
}else{
var _c6=[];
for(var i=0;i<arr.length;++i){
_c6.push(_c3.call(obj,arr[i]));
}
}
if(_c4){
return _c6.join("");
}else{
return _c6;
}
},reduce:function(arr,_c7,obj,_c8){
var _c9=_c7;
if(arguments.length==1){
dojo.debug("dojo.lang.reduce called with too few arguments!");
return false;
}else{
if(arguments.length==2){
_c8=_c7;
_c9=arr.shift();
}else{
if(arguments.lenght==3){
if(dojo.lang.isFunction(obj)){
_c8=obj;
obj=null;
}
}else{
if(dojo.lang.isFunction(obj)){
var tmp=_c8;
_c8=obj;
obj=tmp;
}
}
}
}
var ob=obj?obj:dj_global;
dojo.lang.map(arr,function(val){
_c9=_c8.call(ob,_c9,val);
});
return _c9;
},forEach:function(_ca,_cb,_cc){
if(dojo.lang.isString(_ca)){
_ca=_ca.split("");
}
if(Array.forEach){
Array.forEach(_ca,_cb,_cc);
}else{
if(!_cc){
_cc=dj_global;
}
for(var i=0,l=_ca.length;i<l;i++){
_cb.call(_cc,_ca[i],i,_ca);
}
}
},_everyOrSome:function(_cd,arr,_ce,_cf){
if(dojo.lang.isString(arr)){
arr=arr.split("");
}
if(Array.every){
return Array[_cd?"every":"some"](arr,_ce,_cf);
}else{
if(!_cf){
_cf=dj_global;
}
for(var i=0,l=arr.length;i<l;i++){
var _d0=_ce.call(_cf,arr[i],i,arr);
if(_cd&&!_d0){
return false;
}else{
if((!_cd)&&(_d0)){
return true;
}
}
}
return Boolean(_cd);
}
},every:function(arr,_d1,_d2){
return this._everyOrSome(true,arr,_d1,_d2);
},some:function(arr,_d3,_d4){
return this._everyOrSome(false,arr,_d3,_d4);
},filter:function(arr,_d5,_d6){
var _d7=dojo.lang.isString(arr);
if(_d7){
arr=arr.split("");
}
var _d8;
if(Array.filter){
_d8=Array.filter(arr,_d5,_d6);
}else{
if(!_d6){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_d6=dj_global;
}
_d8=[];
for(var i=0;i<arr.length;i++){
if(_d5.call(_d6,arr[i],i,arr)){
_d8.push(arr[i]);
}
}
}
if(_d7){
return _d8.join("");
}else{
return _d8;
}
},unnest:function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
},toArray:function(_d9,_da){
var _db=[];
for(var i=_da||0;i<_d9.length;i++){
_db.push(_d9[i]);
}
return _db;
}});
dojo.provide("dojo.lang.extras");
dojo.lang.setTimeout=function(_dc,_dd){
var _de=window,_df=2;
if(!dojo.lang.isFunction(_dc)){
_de=_dc;
_dc=_dd;
_dd=arguments[2];
_df++;
}
if(dojo.lang.isString(_dc)){
_dc=_de[_dc];
}
var _e0=[];
for(var i=_df;i<arguments.length;i++){
_e0.push(arguments[i]);
}
return dojo.global().setTimeout(function(){
_dc.apply(_de,_e0);
},_dd);
};
dojo.lang.clearTimeout=function(_e1){
dojo.global().clearTimeout(_e1);
};
dojo.lang.getNameInObj=function(ns,_e2){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===_e2){
return new String(x);
}
}
return null;
};
dojo.lang.shallowCopy=function(obj,_e3){
var i,ret;
if(obj===null){
return null;
}
if(dojo.lang.isObject(obj)){
ret=new obj.constructor();
for(i in obj){
if(dojo.lang.isUndefined(ret[i])){
ret[i]=_e3?dojo.lang.shallowCopy(obj[i],_e3):obj[i];
}
}
}else{
if(dojo.lang.isArray(obj)){
ret=[];
for(i=0;i<obj.length;i++){
ret[i]=_e3?dojo.lang.shallowCopy(obj[i],_e3):obj[i];
}
}else{
ret=obj;
}
}
return ret;
};
dojo.lang.firstValued=function(){
for(var i=0;i<arguments.length;i++){
if(typeof arguments[i]!="undefined"){
return arguments[i];
}
}
return undefined;
};
dojo.lang.getObjPathValue=function(_e4,_e5,_e6){
with(dojo.parseObjPath(_e4,_e5,_e6)){
return dojo.evalProp(prop,obj,_e6);
}
};
dojo.lang.setObjPathValue=function(_e7,_e8,_e9,_ea){
dojo.deprecated("dojo.lang.setObjPathValue","use dojo.parseObjPath and the '=' operator","0.6");
if(arguments.length<4){
_ea=true;
}
with(dojo.parseObjPath(_e7,_e9,_ea)){
if(obj&&(_ea||(prop in obj))){
obj[prop]=_e8;
}
}
};
dojo.provide("dojo.lang.declare");
dojo.lang.declare=function(_eb,_ec,_ed,_ee){
if((dojo.lang.isFunction(_ee))||((!_ee)&&(!dojo.lang.isFunction(_ed)))){
var _ef=_ee;
_ee=_ed;
_ed=_ef;
}
var _f0=[];
if(dojo.lang.isArray(_ec)){
_f0=_ec;
_ec=_f0.shift();
}
if(!_ed){
_ed=dojo.evalObjPath(_eb,false);
if((_ed)&&(!dojo.lang.isFunction(_ed))){
_ed=null;
}
}
var _f1=dojo.lang.declare._makeConstructor();
var scp=(_ec?_ec.prototype:null);
if(scp){
scp.prototyping=true;
_f1.prototype=new _ec();
scp.prototyping=false;
}
_f1.superclass=scp;
_f1.mixins=_f0;
for(var i=0,l=_f0.length;i<l;i++){
dojo.lang.extend(_f1,_f0[i].prototype);
}
_f1.prototype.initializer=null;
_f1.prototype.declaredClass=_eb;
if(dojo.lang.isArray(_ee)){
dojo.lang.extend.apply(dojo.lang,[_f1].concat(_ee));
}else{
dojo.lang.extend(_f1,(_ee)||{});
}
dojo.lang.extend(_f1,dojo.lang.declare._common);
_f1.prototype.constructor=_f1;
_f1.prototype.initializer=(_f1.prototype.initializer)||(_ed)||(function(){
});
var _f2=dojo.parseObjPath(_eb,null,true);
_f2.obj[_f2.prop]=_f1;
return _f1;
};
dojo.lang.declare._makeConstructor=function(){
return function(){
var _f3=this._getPropContext();
var s=_f3.constructor.superclass;
if((s)&&(s.constructor)){
if(s.constructor==arguments.callee){
this._inherited("constructor",arguments);
}else{
this._contextMethod(s,"constructor",arguments);
}
}
var ms=(_f3.constructor.mixins)||([]);
for(var i=0,m;(m=ms[i]);i++){
(((m.prototype)&&(m.prototype.initializer))||(m)).apply(this,arguments);
}
if((!this.prototyping)&&(_f3.initializer)){
_f3.initializer.apply(this,arguments);
}
};
};
dojo.lang.declare._common={_getPropContext:function(){
return (this.___proto||this);
},_contextMethod:function(_f4,_f5,_f6){
var _f7,_f8=this.___proto;
this.___proto=_f4;
try{
_f7=_f4[_f5].apply(this,(_f6||[]));
}
catch(e){
throw e;
}
finally{
this.___proto=_f8;
}
return _f7;
},_inherited:function(_f9,_fa){
var p=this._getPropContext();
do{
if((!p.constructor)||(!p.constructor.superclass)){
return;
}
p=p.constructor.superclass;
}while(!(_f9 in p));
return (dojo.lang.isFunction(p[_f9])?this._contextMethod(p,_f9,_fa):p[_f9]);
},inherited:function(_fb,_fc){
dojo.deprecated("'inherited' method is dangerous, do not up-call! 'inherited' is slated for removal in 0.5; name your super class (or use superclass property) instead.","0.5");
this._inherited(_fb,_fc);
}};
dojo.declare=dojo.lang.declare;
dojo.provide("dojo.lang.func");
dojo.lang.hitch=function(_fd,_fe){
var fcn=(dojo.lang.isString(_fe)?_fd[_fe]:_fe)||function(){
};
return function(){
return fcn.apply(_fd,arguments);
};
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_ff,_100,_101){
var nso=(_100||dojo.lang.anon);
if((_101)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
for(var x in nso){
try{
if(nso[x]===_ff){
return x;
}
}
catch(e){
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_ff;
return ret;
};
dojo.lang.forward=function(_102){
return function(){
return this[_102].apply(this,arguments);
};
};
dojo.lang.curry=function(_103,func){
var _104=[];
_103=_103||dj_global;
if(dojo.lang.isString(func)){
func=_103[func];
}
for(var x=2;x<arguments.length;x++){
_104.push(arguments[x]);
}
var _105=(func["__preJoinArity"]||func.length)-_104.length;
function _106(_107,_108,_109){
var _10a=_109;
var _10b=_108.slice(0);
for(var x=0;x<_107.length;x++){
_10b.push(_107[x]);
}
_109=_109-_107.length;
if(_109<=0){
var res=func.apply(_103,_10b);
_109=_10a;
return res;
}else{
return function(){
return _106(arguments,_10b,_109);
};
}
};
return _106([],_104,_105);
};
dojo.lang.curryArguments=function(_10c,func,args,_10d){
var _10e=[];
var x=_10d||0;
for(x=_10d;x<args.length;x++){
_10e.push(args[x]);
}
return dojo.lang.curry.apply(dojo.lang,[_10c,func].concat(_10e));
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(farr,cb,_10f,_110){
if(!farr.length){
if(typeof _110=="function"){
_110();
}
return;
}
if((typeof _10f=="undefined")&&(typeof cb=="number")){
_10f=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_10f){
_10f=0;
}
}
}
setTimeout(function(){
(farr.shift())();
cb();
dojo.lang.delayThese(farr,cb,_10f,_110);
},_10f);
};
dojo.provide("dojo.event.common");
dojo.event=new function(){
this._canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
function _111(args,_112){
var dl=dojo.lang;
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _113=dl.nameAnonFunc(args[2],ao.adviceObj,_112);
ao.adviceFunc=_113;
}else{
if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=dj_global;
var _113=dl.nameAnonFunc(args[0],ao.srcObj,_112);
ao.srcFunc=_113;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
var _113=dl.nameAnonFunc(args[1],dj_global,_112);
ao.srcFunc=_113;
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
ao.srcObj=args[1];
ao.srcFunc=args[2];
var _113=dl.nameAnonFunc(args[3],dj_global,_112);
ao.adviceObj=dj_global;
ao.adviceFunc=_113;
}else{
if(dl.isObject(args[1])){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if(dl.isObject(args[2])){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
break;
}
if(dl.isFunction(ao.aroundFunc)){
var _113=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_112);
ao.aroundFunc=_113;
}
if(dl.isFunction(ao.srcFunc)){
ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
}
if(dl.isFunction(ao.adviceFunc)){
ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
if(!ao.adviceFunc){
dojo.debug("bad adviceFunc for srcFunc: "+ao.srcFunc);
dojo.debugShallow(ao);
}
return ao;
};
this.connect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=_111(arguments,true);
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.connect(ao);
}
ao.srcFunc="onkeypress";
}
if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
var _114={};
for(var x in ao){
_114[x]=ao[x];
}
var mjps=[];
dojo.lang.forEach(ao.srcObj,function(src){
if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
src=dojo.byId(src);
}
_114.srcObj=src;
mjps.push(dojo.event.connect.call(dojo.event,_114));
});
return mjps;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.log=function(a1,a2){
var _115;
if((arguments.length==1)&&(typeof a1=="object")){
_115=a1;
}else{
_115={srcObj:a1,srcFunc:a2};
}
_115.adviceFunc=function(){
var _116=[];
for(var x=0;x<arguments.length;x++){
_116.push(arguments[x]);
}
dojo.debug("("+_115.srcObj+")."+_115.srcFunc,":",_116.join(", "));
};
this.kwConnect(_115);
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectOnce=function(){
var ao=_111(arguments,true);
ao.once=true;
return this.connect(ao);
};
this._kwConnectImpl=function(_117,_118){
var fn=(_118)?"disconnect":"connect";
if(typeof _117["srcFunc"]=="function"){
_117.srcObj=_117["srcObj"]||dj_global;
var _119=dojo.lang.nameAnonFunc(_117.srcFunc,_117.srcObj,true);
_117.srcFunc=_119;
}
if(typeof _117["adviceFunc"]=="function"){
_117.adviceObj=_117["adviceObj"]||dj_global;
var _119=dojo.lang.nameAnonFunc(_117.adviceFunc,_117.adviceObj,true);
_117.adviceFunc=_119;
}
_117.srcObj=_117["srcObj"]||dj_global;
_117.adviceObj=_117["adviceObj"]||_117["targetObj"]||dj_global;
_117.adviceFunc=_117["adviceFunc"]||_117["targetFunc"];
return dojo.event[fn](_117);
};
this.kwConnect=function(_11a){
return this._kwConnectImpl(_11a,false);
};
this.disconnect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=_111(arguments,true);
}
if(!ao.adviceFunc){
return;
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.disconnect(ao);
}
ao.srcFunc="onkeypress";
}
if(!ao.srcObj[ao.srcFunc]){
return null;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc,true);
mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
return mjp;
};
this.kwDisconnect=function(_11b){
return this._kwConnectImpl(_11b,true);
};
};
dojo.event.MethodInvocation=function(_11c,obj,args){
this.jp_=_11c;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_11d){
this.object=obj||dj_global;
this.methodname=_11d;
this.methodfunc=this.object[_11d];
this.squelch=false;
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_11e){
if(!obj){
obj=dj_global;
}
if(!obj[_11e]){
obj[_11e]=function(){
};
if(!obj[_11e]){
dojo.raise("Cannot set do-nothing method on that object "+_11e);
}
}else{
if((!dojo.lang.isFunction(obj[_11e]))&&(!dojo.lang.isAlien(obj[_11e]))){
return null;
}
}
var _11f=_11e+"$joinpoint";
var _120=_11e+"$joinpoint$method";
var _121=obj[_11f];
if(!_121){
var _122=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_122=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_11f,_120,_11e]);
}
}
var _123=obj[_11e].length;
obj[_120]=obj[_11e];
_121=obj[_11f]=new dojo.event.MethodJoinPoint(obj,_120);
obj[_11e]=function(){
var args=[];
if((_122)&&(!arguments.length)){
var evt=null;
try{
if(obj.ownerDocument){
evt=obj.ownerDocument.parentWindow.event;
}else{
if(obj.documentElement){
evt=obj.documentElement.ownerDocument.parentWindow.event;
}else{
if(obj.event){
evt=obj.event;
}else{
evt=window.event;
}
}
}
}
catch(e){
evt=window.event;
}
if(evt){
args.push(dojo.event.browser.fixEvent(evt,this));
}
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(_122)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x],this));
}else{
args.push(arguments[x]);
}
}
}
return _121.run.apply(_121,args);
};
obj[_11e].__preJoinArity=_123;
}
return _121;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{unintercept:function(){
this.object[this.methodname]=this.methodfunc;
this.before=[];
this.after=[];
this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _124=[];
for(var x=0;x<args.length;x++){
_124[x]=args[x];
}
var _125=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _126=marr[0]||dj_global;
var _127=marr[1];
if(!_126[_127]){
dojo.raise("function \""+_127+"\" does not exist on \""+_126+"\"");
}
var _128=marr[2]||dj_global;
var _129=marr[3];
var msg=marr[6];
var _12a;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _126[_127].apply(_126,to.args);
}};
to.args=_124;
var _12b=parseInt(marr[4]);
var _12c=((!isNaN(_12b))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _12d=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event._canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_125(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_129){
_128[_129].call(_128,to);
}else{
if((_12c)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_126[_127].call(_126,to);
}else{
_126[_127].apply(_126,args);
}
},_12b);
}else{
if(msg){
_126[_127].call(_126,to);
}else{
_126[_127].apply(_126,args);
}
}
}
};
var _12e=function(){
if(this.squelch){
try{
return _125.apply(this,arguments);
}
catch(e){
dojo.debug(e);
}
}else{
return _125.apply(this,arguments);
}
};
if((this["before"])&&(this.before.length>0)){
dojo.lang.forEach(this.before.concat(new Array()),_12e);
}
var _12f;
try{
if((this["around"])&&(this.around.length>0)){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_12f=mi.proceed();
}else{
if(this.methodfunc){
_12f=this.object[this.methodname].apply(this.object,args);
}
}
}
catch(e){
if(!this.squelch){
dojo.debug(e,"when calling",this.methodname,"on",this.object,"with arguments",args);
dojo.raise(e);
}
}
if((this["after"])&&(this.after.length>0)){
dojo.lang.forEach(this.after.concat(new Array()),_12e);
}
return (this.methodfunc)?_12f:null;
},getArr:function(kind){
var type="after";
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
type="before";
}else{
if(kind=="around"){
type="around";
}
}
if(!this[type]){
this[type]=[];
}
return this[type];
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"]);
},addAdvice:function(_130,_131,_132,_133,_134,_135,once,_136,rate,_137){
var arr=this.getArr(_134);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_130,_131,_132,_133,_136,rate,_137];
if(once){
if(this.hasAdvice(_130,_131,_134,arr)>=0){
return;
}
}
if(_135=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_138,_139,_13a,arr){
if(!arr){
arr=this.getArr(_13a);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
var aao=(typeof _139=="object")?(new String(_139)).toString():_139;
var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
if((arr[x][0]==_138)&&(a1o==aao)){
ind=x;
}
}
return ind;
},removeAdvice:function(_13b,_13c,_13d,once){
var arr=this.getArr(_13d);
var ind=this.hasAdvice(_13b,_13c,_13d,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_13b,_13c,_13d,arr);
}
return true;
}});
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_13e){
if(!this.topics[_13e]){
this.topics[_13e]=new this.TopicImpl(_13e);
}
return this.topics[_13e];
};
this.registerPublisher=function(_13f,obj,_140){
var _13f=this.getTopic(_13f);
_13f.registerPublisher(obj,_140);
};
this.subscribe=function(_141,obj,_142){
var _141=this.getTopic(_141);
_141.subscribe(obj,_142);
};
this.unsubscribe=function(_143,obj,_144){
var _143=this.getTopic(_143);
_143.unsubscribe(obj,_144);
};
this.destroy=function(_145){
this.getTopic(_145).destroy();
delete this.topics[_145];
};
this.publishApply=function(_146,args){
var _146=this.getTopic(_146);
_146.sendMessage.apply(_146,args);
};
this.publish=function(_147,_148){
var _147=this.getTopic(_147);
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
_147.sendMessage.apply(_147,args);
};
};
dojo.event.topic.TopicImpl=function(_149){
this.topicName=_149;
this.subscribe=function(_14a,_14b){
var tf=_14b||_14a;
var to=(!_14b)?dj_global:_14a;
return dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.unsubscribe=function(_14c,_14d){
var tf=(!_14d)?_14c:_14d;
var to=(!_14d)?null:_14c;
return dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this._getJoinPoint=function(){
return dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage");
};
this.setSquelch=function(_14e){
this._getJoinPoint().squelch=_14e;
};
this.destroy=function(){
this._getJoinPoint().disconnect();
};
this.registerPublisher=function(_14f,_150){
dojo.event.connect(_14f,_150,this,"sendMessage");
};
this.sendMessage=function(_151){
};
};
dojo.provide("dojo.event.browser");
dojo._ie_clobber=new function(){
this.clobberNodes=[];
function _152(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
};
this.clobber=function(_153){
var na;
var tna;
if(_153){
tna=_153.all||_153.getElementsByTagName("*");
na=[_153];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _154={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
try{
if(el&&el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
_152(el,el.__clobberAttrs__[j]);
}
_152(el,"__clobberAttrs__");
_152(el,"__doClobber__");
}
}
catch(e){
}
}
na=null;
};
};
if(dojo.render.html.ie){
dojo.addOnUnload(function(){
dojo._ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
if(dojo.widget){
for(var name in dojo.widget._templateCache){
if(dojo.widget._templateCache[name].node){
dojo.dom.destroyNode(dojo.widget._templateCache[name].node);
dojo.widget._templateCache[name].node=null;
delete dojo.widget._templateCache[name].node;
}
}
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo._ie_clobber.clobberNodes=[];
});
}
dojo.event.browser=new function(){
var _155=0;
this.normalizedEventName=function(_156){
switch(_156){
case "CheckboxStateChange":
case "DOMAttrModified":
case "DOMMenuItemActive":
case "DOMMenuItemInactive":
case "DOMMouseScroll":
case "DOMNodeInserted":
case "DOMNodeRemoved":
case "RadioStateChange":
return _156;
break;
default:
return _156.toLowerCase();
break;
}
};
this.clean=function(node){
if(dojo.render.html.ie){
dojo._ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!dojo.render.html.ie){
return;
}
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo._ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_157){
if(!dojo.render.html.ie){
return;
}
this.addClobberNode(node);
for(var x=0;x<_157.length;x++){
node.__clobberAttrs__.push(_157[x]);
}
};
this.removeListener=function(node,_158,fp,_159){
if(!_159){
var _159=false;
}
_158=dojo.event.browser.normalizedEventName(_158);
if((_158=="onkey")||(_158=="key")){
if(dojo.render.html.ie){
this.removeListener(node,"onkeydown",fp,_159);
}
_158="onkeypress";
}
if(_158.substr(0,2)=="on"){
_158=_158.substr(2);
}
if(node.removeEventListener){
node.removeEventListener(_158,fp,_159);
}
};
this.addListener=function(node,_15a,fp,_15b,_15c){
if(!node){
return;
}
if(!_15b){
var _15b=false;
}
_15a=dojo.event.browser.normalizedEventName(_15a);
if((_15a=="onkey")||(_15a=="key")){
if(dojo.render.html.ie){
this.addListener(node,"onkeydown",fp,_15b,_15c);
}
_15a="onkeypress";
}
if(_15a.substr(0,2)!="on"){
_15a="on"+_15a;
}
if(!_15c){
var _15d=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt,this));
if(_15b){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_15d=fp;
}
if(node.addEventListener){
node.addEventListener(_15a.substr(2),_15d,_15b);
return _15d;
}else{
if(typeof node[_15a]=="function"){
var _15e=node[_15a];
node[_15a]=function(e){
_15e(e);
return _15d(e);
};
}else{
node[_15a]=_15d;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_15a]);
}
return _15d;
}
};
this.isEvent=function(obj){
return (typeof obj!="undefined")&&(obj)&&(typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_15f,_160){
if(typeof _15f!="function"){
dojo.raise("listener not a function: "+_15f);
}
dojo.event.browser.currentEvent.currentTarget=_160;
return _15f.call(_160,dojo.event.browser.currentEvent);
};
this._stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this._preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_CLEAR:12,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_HELP:47,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_NUMPAD_0:96,KEY_NUMPAD_1:97,KEY_NUMPAD_2:98,KEY_NUMPAD_3:99,KEY_NUMPAD_4:100,KEY_NUMPAD_5:101,KEY_NUMPAD_6:102,KEY_NUMPAD_7:103,KEY_NUMPAD_8:104,KEY_NUMPAD_9:105,KEY_NUMPAD_MULTIPLY:106,KEY_NUMPAD_PLUS:107,KEY_NUMPAD_ENTER:108,KEY_NUMPAD_MINUS:109,KEY_NUMPAD_PERIOD:110,KEY_NUMPAD_DIVIDE:111,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_F13:124,KEY_F14:125,KEY_F15:126,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt,_161){
if(!evt){
if(window["event"]){
evt=window.event;
}
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if(evt["type"]=="keydown"&&dojo.render.html.ie){
switch(evt.keyCode){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_LEFT_WINDOW:
case evt.KEY_RIGHT_WINDOW:
case evt.KEY_SELECT:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
case evt.KEY_NUMPAD_0:
case evt.KEY_NUMPAD_1:
case evt.KEY_NUMPAD_2:
case evt.KEY_NUMPAD_3:
case evt.KEY_NUMPAD_4:
case evt.KEY_NUMPAD_5:
case evt.KEY_NUMPAD_6:
case evt.KEY_NUMPAD_7:
case evt.KEY_NUMPAD_8:
case evt.KEY_NUMPAD_9:
case evt.KEY_NUMPAD_PERIOD:
break;
case evt.KEY_NUMPAD_MULTIPLY:
case evt.KEY_NUMPAD_PLUS:
case evt.KEY_NUMPAD_ENTER:
case evt.KEY_NUMPAD_MINUS:
case evt.KEY_NUMPAD_DIVIDE:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
case evt.KEY_PAGE_UP:
case evt.KEY_PAGE_DOWN:
case evt.KEY_END:
case evt.KEY_HOME:
case evt.KEY_LEFT_ARROW:
case evt.KEY_UP_ARROW:
case evt.KEY_RIGHT_ARROW:
case evt.KEY_DOWN_ARROW:
case evt.KEY_INSERT:
case evt.KEY_DELETE:
case evt.KEY_F1:
case evt.KEY_F2:
case evt.KEY_F3:
case evt.KEY_F4:
case evt.KEY_F5:
case evt.KEY_F6:
case evt.KEY_F7:
case evt.KEY_F8:
case evt.KEY_F9:
case evt.KEY_F10:
case evt.KEY_F11:
case evt.KEY_F12:
case evt.KEY_F12:
case evt.KEY_F13:
case evt.KEY_F14:
case evt.KEY_F15:
case evt.KEY_CLEAR:
case evt.KEY_HELP:
evt.key=evt.keyCode;
break;
default:
if(evt.ctrlKey||evt.altKey){
var _162=evt.keyCode;
if(_162>=65&&_162<=90&&evt.shiftKey==false){
_162+=32;
}
if(_162>=1&&_162<=26&&evt.ctrlKey){
_162+=96;
}
evt.key=String.fromCharCode(_162);
}
}
}else{
if(evt["type"]=="keypress"){
if(dojo.render.html.opera){
if(evt.which==0){
evt.key=evt.keyCode;
}else{
if(evt.which>0){
switch(evt.which){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
evt.key=evt.which;
break;
default:
var _162=evt.which;
if((evt.ctrlKey||evt.altKey||evt.metaKey)&&(evt.which>=65&&evt.which<=90&&evt.shiftKey==false)){
_162+=32;
}
evt.key=String.fromCharCode(_162);
}
}
}
}else{
if(dojo.render.html.ie){
if(!evt.ctrlKey&&!evt.altKey&&evt.keyCode>=evt.KEY_SPACE){
evt.key=String.fromCharCode(evt.keyCode);
}
}else{
if(dojo.render.html.safari){
switch(evt.keyCode){
case 25:
evt.key=evt.KEY_TAB;
evt.shift=true;
break;
case 63232:
evt.key=evt.KEY_UP_ARROW;
break;
case 63233:
evt.key=evt.KEY_DOWN_ARROW;
break;
case 63234:
evt.key=evt.KEY_LEFT_ARROW;
break;
case 63235:
evt.key=evt.KEY_RIGHT_ARROW;
break;
case 63236:
evt.key=evt.KEY_F1;
break;
case 63237:
evt.key=evt.KEY_F2;
break;
case 63238:
evt.key=evt.KEY_F3;
break;
case 63239:
evt.key=evt.KEY_F4;
break;
case 63240:
evt.key=evt.KEY_F5;
break;
case 63241:
evt.key=evt.KEY_F6;
break;
case 63242:
evt.key=evt.KEY_F7;
break;
case 63243:
evt.key=evt.KEY_F8;
break;
case 63244:
evt.key=evt.KEY_F9;
break;
case 63245:
evt.key=evt.KEY_F10;
break;
case 63246:
evt.key=evt.KEY_F11;
break;
case 63247:
evt.key=evt.KEY_F12;
break;
case 63250:
evt.key=evt.KEY_PAUSE;
break;
case 63272:
evt.key=evt.KEY_DELETE;
break;
case 63273:
evt.key=evt.KEY_HOME;
break;
case 63275:
evt.key=evt.KEY_END;
break;
case 63276:
evt.key=evt.KEY_PAGE_UP;
break;
case 63277:
evt.key=evt.KEY_PAGE_DOWN;
break;
case 63302:
evt.key=evt.KEY_INSERT;
break;
case 63248:
case 63249:
case 63289:
break;
default:
evt.key=evt.charCode>=evt.KEY_SPACE?String.fromCharCode(evt.charCode):evt.keyCode;
}
}else{
evt.key=evt.charCode>0?String.fromCharCode(evt.charCode):evt.keyCode;
}
}
}
}
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=(_161?_161:evt.srcElement);
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
var doc=(evt.srcElement&&evt.srcElement.ownerDocument)?evt.srcElement.ownerDocument:document;
var _163=((dojo.render.html.ie55)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
if(!evt.pageX){
evt.pageX=evt.clientX+(_163.scrollLeft||0);
}
if(!evt.pageY){
evt.pageY=evt.clientY+(_163.scrollTop||0);
}
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this._stopPropagation;
evt.preventDefault=this._preventDefault;
}
return evt;
};
this.stopEvent=function(evt){
if(window.event){
evt.cancelBubble=true;
evt.returnValue=false;
}else{
evt.preventDefault();
evt.stopPropagation();
}
};
};
dojo.provide("dojo.event.*");
dojo.provide("dojo.event");
dojo.deprecated("dojo.event","replaced by dojo.event.*","0.5");
dojo.provide("dojo.string.common");
dojo.string.trim=function(str,wh){
if(!str.replace){
return str;
}
if(!str.length){
return str;
}
var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
return str.replace(re,"");
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_164,_165){
var out="";
for(var i=0;i<_164;i++){
out+=str;
if(_165&&i<_164-1){
out+=_165;
}
}
return out;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string.extras");
dojo.string.substituteParams=function(_166,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _166.replace(/\%\{(\w+)\}/g,function(_167,key){
if(typeof (map[key])!="undefined"&&map[key]!=null){
return map[key];
}
dojo.raise("Substitution not found: "+key);
});
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _168=str.split(" ");
for(var i=0;i<_168.length;i++){
_168[i]=_168[i].charAt(0).toUpperCase()+_168[i].substring(1);
}
return _168.join(" ");
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _169=escape(str);
var _16a,re=/%u([0-9A-F]{4})/i;
while((_16a=_169.match(re))){
var num=Number("0x"+_16a[1]);
var _16b=escape("&#"+num+";");
ret+=_169.substring(0,_16a.index)+_16b;
_169=_169.substring(_16a.index+_16a[0].length);
}
ret+=_169.replace(/\+/g,"%2B");
return ret;
};
dojo.string.escape=function(type,str){
var args=dojo.lang.toArray(arguments,1);
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml.apply(this,args);
case "sql":
return dojo.string.escapeSql.apply(this,args);
case "regexp":
case "regex":
return dojo.string.escapeRegExp.apply(this,args);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript.apply(this,args);
case "ascii":
return dojo.string.encodeAscii.apply(this,args);
default:
return str;
}
};
dojo.string.escapeXml=function(str,_16c){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_16c){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}
return str.substring(0,len).replace(/\.+$/,"")+"...";
};
dojo.string.endsWith=function(str,end,_16d){
if(_16d){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_16e,_16f){
if(_16f){
str=str.toLowerCase();
_16e=_16e.toLowerCase();
}
return str.indexOf(_16e)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>-1){
return true;
}
}
return false;
};
dojo.string.normalizeNewlines=function(text,_170){
if(_170=="\n"){
text=text.replace(/\r\n/g,"\n");
text=text.replace(/\r/g,"\n");
}else{
if(_170=="\r"){
text=text.replace(/\r\n/g,"\r");
text=text.replace(/\n/g,"\r");
}else{
text=text.replace(/([^\r])\n/g,"$1\r\n").replace(/\r([^\n])/g,"\r\n$1");
}
}
return text;
};
dojo.string.splitEscaped=function(str,_171){
var _172=[];
for(var i=0,_173=0;i<str.length;i++){
if(str.charAt(i)=="\\"){
i++;
continue;
}
if(str.charAt(i)==_171){
_172.push(str.substring(_173,i));
_173=i+1;
}
}
_172.push(str.substr(_173));
return _172;
};
dojo.provide("dojo.string");
dojo.provide("dojo.io.common");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_174,_175,_176){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_174){
this.mimetype=_174;
}
if(_175){
this.transport=_175;
}
if(arguments.length>=4){
this.changeUrl=_176;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,load:function(type,data,_177,_178){
},error:function(type,_179,_17a,_17b){
},timeout:function(type,_17c,_17d,_17e){
},handle:function(type,data,_17f,_180){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_181){
if(_181["url"]){
_181.url=_181.url.toString();
}
if(_181["formNode"]){
_181.formNode=dojo.byId(_181.formNode);
}
if(!_181["method"]&&_181["formNode"]&&_181["formNode"].method){
_181.method=_181["formNode"].method;
}
if(!_181["handle"]&&_181["handler"]){
_181.handle=_181.handler;
}
if(!_181["load"]&&_181["loaded"]){
_181.load=_181.loaded;
}
if(!_181["changeUrl"]&&_181["changeURL"]){
_181.changeUrl=_181.changeURL;
}
_181.encoding=dojo.lang.firstValued(_181["encoding"],djConfig["bindEncoding"],"");
_181.sendTransport=dojo.lang.firstValued(_181["sendTransport"],djConfig["ioSendTransport"],false);
var _182=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_181[fn]&&_182(_181[fn])){
continue;
}
if(_181["handle"]&&_182(_181["handle"])){
_181[fn]=_181.handle;
}
}
dojo.lang.mixin(this,_181);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_183){
if(!(_183 instanceof dojo.io.Request)){
try{
_183=new dojo.io.Request(_183);
}
catch(e){
dojo.debug(e);
}
}
var _184="";
if(_183["transport"]){
_184=_183["transport"];
if(!this[_184]){
dojo.io.sendBindError(_183,"No dojo.io.bind() transport with name '"+_183["transport"]+"'.");
return _183;
}
if(!this[_184].canHandle(_183)){
dojo.io.sendBindError(_183,"dojo.io.bind() transport with name '"+_183["transport"]+"' cannot handle this type of request.");
return _183;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_183))){
_184=tmp;
break;
}
}
if(_184==""){
dojo.io.sendBindError(_183,"None of the loaded transports for dojo.io.bind()"+" can handle the request.");
return _183;
}
}
this[_184].bind(_183);
_183.bindSuccess=true;
return _183;
};
dojo.io.sendBindError=function(_185,_186){
if((typeof _185.error=="function"||typeof _185.handle=="function")&&(typeof setTimeout=="function"||typeof setTimeout=="object")){
var _187=new dojo.io.Error(_186);
setTimeout(function(){
_185[(typeof _185.error=="function")?"error":"handle"]("error",_187,null,_185);
},50);
}else{
dojo.raise(_186);
}
};
dojo.io.queueBind=function(_188){
if(!(_188 instanceof dojo.io.Request)){
try{
_188=new dojo.io.Request(_188);
}
catch(e){
dojo.debug(e);
}
}
var _189=_188.load;
_188.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_189.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _18a=_188.error;
_188.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_18a.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_188);
dojo.io._dispatchNextQueueBind();
return _188;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
if(dojo.io._bindQueue.length>0){
dojo.io.bind(dojo.io._bindQueue.shift());
}else{
dojo.io._queueBindInFlight=false;
}
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_18b,last){
var enc=/utf/i.test(_18b||"")?encodeURIComponent:dojo.string.encodeAscii;
var _18c=[];
var _18d=new Object();
for(var name in map){
var _18e=function(elt){
var val=enc(name)+"="+enc(elt);
_18c[(last==name)?"push":"unshift"](val);
};
if(!_18d[name]){
var _18f=map[name];
if(dojo.lang.isArray(_18f)){
dojo.lang.forEach(_18f,_18e);
}else{
_18e(_18f);
}
}
}
return _18c.join("&");
};
dojo.io.setIFrameSrc=function(_190,src,_191){
try{
var r=dojo.render.html;
if(!_191){
if(r.safari){
_190.location=src;
}else{
frames[_190.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_190.contentWindow.document;
}else{
if(r.safari){
idoc=_190.document;
}else{
idoc=_190.contentWindow;
}
}
if(!idoc){
_190.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.provide("dojo.dom");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
if(typeof Element=="function"){
try{
return wh instanceof Element;
}
catch(e){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.dom.getUniqueId=function(){
var _192=dojo.doc();
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(_192.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_193,_194){
var node=_193.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_194&&node&&node.tagName&&node.tagName.toLowerCase()!=_194.toLowerCase()){
node=dojo.dom.nextElement(node,_194);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_195,_196){
var node=_195.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_196&&node&&node.tagName&&node.tagName.toLowerCase()!=_196.toLowerCase()){
node=dojo.dom.prevElement(node,_196);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_197){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_197&&_197.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_197);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_198){
if(!node){
return null;
}
if(_198){
_198=_198.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_198&&_198.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_198);
}
return node;
};
dojo.dom.moveChildren=function(_199,_19a,trim){
var _19b=0;
if(trim){
while(_199.hasChildNodes()&&_199.firstChild.nodeType==dojo.dom.TEXT_NODE){
_199.removeChild(_199.firstChild);
}
while(_199.hasChildNodes()&&_199.lastChild.nodeType==dojo.dom.TEXT_NODE){
_199.removeChild(_199.lastChild);
}
}
while(_199.hasChildNodes()){
_19a.appendChild(_199.firstChild);
_19b++;
}
return _19b;
};
dojo.dom.copyChildren=function(_19c,_19d,trim){
var _19e=_19c.cloneNode(true);
return this.moveChildren(_19e,_19d,trim);
};
dojo.dom.replaceChildren=function(node,_19f){
var _1a0=[];
if(dojo.render.html.ie){
for(var i=0;i<node.childNodes.length;i++){
_1a0.push(node.childNodes[i]);
}
}
dojo.dom.removeChildren(node);
node.appendChild(_19f);
for(var i=0;i<_1a0.length;i++){
dojo.dom.destroyNode(_1a0[i]);
}
};
dojo.dom.removeChildren=function(node){
var _1a1=node.childNodes.length;
while(node.hasChildNodes()){
dojo.dom.removeNode(node.firstChild);
}
return _1a1;
};
dojo.dom.replaceNode=function(node,_1a2){
return node.parentNode.replaceChild(_1a2,node);
};
dojo.dom.destroyNode=function(node){
if(node.parentNode){
node=dojo.dom.removeNode(node);
}
if(node.nodeType!=3){
if(dojo.evalObjPath("dojo.event.browser.clean",false)){
dojo.event.browser.clean(node);
}
if(dojo.render.html.ie){
node.outerHTML="";
}
}
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_1a3,_1a4){
var _1a5=[];
var _1a6=(_1a3&&(_1a3 instanceof Function||typeof _1a3=="function"));
while(node){
if(!_1a6||_1a3(node)){
_1a5.push(node);
}
if(_1a4&&_1a5.length>0){
return _1a5[0];
}
node=node.parentNode;
}
if(_1a4){
return null;
}
return _1a5;
};
dojo.dom.getAncestorsByTag=function(node,tag,_1a7){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_1a7);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_1a8,_1a9){
if(_1a9&&node){
node=node.parentNode;
}
while(node){
if(node==_1a8){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
};
dojo.dom.createDocument=function(){
var doc=null;
var _1aa=dojo.doc();
if(!dj_undef("ActiveXObject")){
var _1ab=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var i=0;i<_1ab.length;i++){
try{
doc=new ActiveXObject(_1ab[i]+".XMLDOM");
}
catch(e){
}
if(doc){
break;
}
}
}else{
if((_1aa.implementation)&&(_1aa.implementation.createDocument)){
doc=_1aa.implementation.createDocument("","",null);
}
}
return doc;
};
dojo.dom.createDocumentFromText=function(str,_1ac){
if(!_1ac){
_1ac="text/xml";
}
if(!dj_undef("DOMParser")){
var _1ad=new DOMParser();
return _1ad.parseFromString(str,_1ac);
}else{
if(!dj_undef("ActiveXObject")){
var _1ae=dojo.dom.createDocument();
if(_1ae){
_1ae.async=false;
_1ae.loadXML(str);
return _1ae;
}else{
dojo.debug("toXml didn't work?");
}
}else{
var _1af=dojo.doc();
if(_1af.createElement){
var tmp=_1af.createElement("xml");
tmp.innerHTML=str;
if(_1af.implementation&&_1af.implementation.createDocument){
var _1b0=_1af.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_1b0.importNode(tmp.childNodes.item(i),true);
}
return _1b0;
}
return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
}
}
}
return null;
};
dojo.dom.prependChild=function(node,_1b1){
if(_1b1.firstChild){
_1b1.insertBefore(node,_1b1.firstChild);
}else{
_1b1.appendChild(node);
}
return true;
};
dojo.dom.insertBefore=function(node,ref,_1b2){
if((_1b2!=true)&&(node===ref||node.nextSibling===ref)){
return false;
}
var _1b3=ref.parentNode;
_1b3.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_1b4){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_1b4!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_1b4);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_1b5){
if((!node)||(!ref)||(!_1b5)){
return false;
}
switch(_1b5.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_1b6,_1b7){
var _1b8=_1b6.childNodes;
if(!_1b8.length||_1b8.length==_1b7){
_1b6.appendChild(node);
return true;
}
if(_1b7==0){
return dojo.dom.prependChild(node,_1b6);
}
return dojo.dom.insertAfter(node,_1b8[_1b7-1]);
};
dojo.dom.textContent=function(node,text){
if(arguments.length>1){
var _1b9=dojo.doc();
dojo.dom.replaceChildren(node,_1b9.createTextNode(text));
return text;
}else{
if(node.textContent!=undefined){
return node.textContent;
}
var _1ba="";
if(node==null){
return _1ba;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_1ba+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_1ba+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _1ba;
}
};
dojo.dom.hasParent=function(node){
return Boolean(node&&node.parentNode&&dojo.dom.isNode(node.parentNode));
};
dojo.dom.isTag=function(node){
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName==String(arguments[i])){
return String(arguments[i]);
}
}
}
return "";
};
dojo.dom.setAttributeNS=function(elem,_1bb,_1bc,_1bd){
if(elem==null||((elem==undefined)&&(typeof elem=="undefined"))){
dojo.raise("No element given to dojo.dom.setAttributeNS");
}
if(!((elem.setAttributeNS==undefined)&&(typeof elem.setAttributeNS=="undefined"))){
elem.setAttributeNS(_1bb,_1bc,_1bd);
}else{
var _1be=elem.ownerDocument;
var _1bf=_1be.createNode(2,_1bc,_1bb);
_1bf.nodeValue=_1bd;
elem.setAttributeNode(_1bf);
}
};
dojo.provide("dojo.undo.browser");
try{
if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
if(dojo.render.html.opera){
dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:(!dj_undef("window"))?window.location.href:"",initialHash:(!dj_undef("window"))?window.location.hash:"",moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
this.initialState=this._createState(this.initialHref,args,this.initialHash);
},addToHistory:function(args){
this.forwardStack=[];
var hash=null;
var url=null;
if(!this.historyIframe){
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
dojo.body().appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if(args["changeUrl"]){
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
if(this.historyStack.length==0&&this.initialState.urlHash==hash){
this.initialState=this._createState(url,args,hash);
return;
}else{
if(this.historyStack.length>0&&this.historyStack[this.historyStack.length-1].urlHash==hash){
this.historyStack[this.historyStack.length-1]=this._createState(url,args,hash);
return;
}
}
this.changingUrl=true;
setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
url=this._loadIframeHistory();
var _1c0=args["back"]||args["backButton"]||args["handle"];
var tcb=function(_1c1){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+hash+"';",1);
}
_1c0.apply(this,[_1c1]);
};
if(args["back"]){
args.back=tcb;
}else{
if(args["backButton"]){
args.backButton=tcb;
}else{
if(args["handle"]){
args.handle=tcb;
}
}
}
var _1c2=args["forward"]||args["forwardButton"]||args["handle"];
var tfw=function(_1c3){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_1c2){
_1c2.apply(this,[_1c3]);
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}else{
if(args["handle"]){
args.handle=tfw;
}
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
}
}
}
}else{
url=this._loadIframeHistory();
}
this.historyStack.push(this._createState(url,args,hash));
},checkLocation:function(){
if(!this.changingUrl){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
}
},iframeLoaded:function(evt,_1c4){
if(!dojo.render.html.opera){
var _1c5=this._getUrlQuery(_1c4.href);
if(_1c5==null){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
if(this.moveForward){
this.moveForward=false;
return;
}
if(this.historyStack.length>=2&&_1c5==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
this.handleBackButton();
}else{
if(this.forwardStack.length>0&&_1c5==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
this.handleForwardButton();
}
}
}
},handleBackButton:function(){
var _1c6=this.historyStack.pop();
if(!_1c6){
return;
}
var last=this.historyStack[this.historyStack.length-1];
if(!last&&this.historyStack.length==0){
last=this.initialState;
}
if(last){
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(_1c6);
},handleForwardButton:function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
},_createState:function(url,args,hash){
return {"url":url,"kwArgs":args,"urlHash":hash};
},_getUrlQuery:function(url){
var _1c7=url.split("?");
if(_1c7.length<2){
return null;
}else{
return _1c7[1];
}
},_loadIframeHistory:function(){
var url=dojo.hostenv.getBaseScriptUri()+"iframe_history.html?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
return url;
}};
dojo.provide("dojo.io.BrowserIO");
if(!dj_undef("window")){
dojo.io.checkChildrenForFile=function(node){
var _1c8=false;
var _1c9=node.getElementsByTagName("input");
dojo.lang.forEach(_1c9,function(_1ca){
if(_1c8){
return;
}
if(_1ca.getAttribute("type")=="file"){
_1c8=true;
}
});
return _1c8;
};
dojo.io.formHasFile=function(_1cb){
return dojo.io.checkChildrenForFile(_1cb);
};
dojo.io.updateNode=function(node,_1cc){
node=dojo.byId(node);
var args=_1cc;
if(dojo.lang.isString(_1cc)){
args={url:_1cc};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
dojo.dom.destroyNode(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_1cd,_1ce,_1cf){
if((!_1cd)||(!_1cd.tagName)||(!_1cd.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_1cf){
_1cf=dojo.io.formFilter;
}
var enc=/utf/i.test(_1ce||"")?encodeURIComponent:dojo.string.encodeAscii;
var _1d0=[];
for(var i=0;i<_1cd.elements.length;i++){
var elm=_1cd.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_1cf(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_1d0.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_1d0.push(name+"="+enc(elm.value));
}
}else{
_1d0.push(name+"="+enc(elm.value));
}
}
}
var _1d1=_1cd.getElementsByTagName("input");
for(var i=0;i<_1d1.length;i++){
var _1d2=_1d1[i];
if(_1d2.type.toLowerCase()=="image"&&_1d2.form==_1cd&&_1cf(_1d2)){
var name=enc(_1d2.name);
_1d0.push(name+"="+enc(_1d2.value));
_1d0.push(name+".x=0");
_1d0.push(name+".y=0");
}
}
return _1d0.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _1d3=form.getElementsByTagName("input");
for(var i=0;i<_1d3.length;i++){
var _1d4=_1d3[i];
if(_1d4.type.toLowerCase()=="image"&&_1d4.form==form){
this.connect(_1d4,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _1d5=false;
if(node.disabled||!node.name){
_1d5=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_1d5=node==this.clickedButton;
}else{
_1d5=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _1d5;
},connect:function(_1d6,_1d7,_1d8){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_1d6,_1d7,this,_1d8);
}else{
var fcn=dojo.lang.hitch(this,_1d8);
_1d6[_1d7]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _1d9=this;
var _1da={};
this.useCache=false;
this.preventCache=false;
function _1db(url,_1dc,_1dd){
return url+"|"+_1dc+"|"+_1dd.toLowerCase();
};
function _1de(url,_1df,_1e0,http){
_1da[_1db(url,_1df,_1e0)]=http;
};
function _1e1(url,_1e2,_1e3){
return _1da[_1db(url,_1e2,_1e3)];
};
this.clearCache=function(){
_1da={};
};
function _1e4(_1e5,http,url,_1e6,_1e7){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_1e5.method.toLowerCase()=="head"){
var _1e8=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _1e8;
};
var _1e9=_1e8.split(/[\r\n]+/g);
for(var i=0;i<_1e9.length;i++){
var pair=_1e9[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_1e5.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_1e5.mimetype=="text/json"||_1e5.mimetype=="application/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_1e5.mimetype=="application/xml")||(_1e5.mimetype=="text/xml")){
if(http.responseText&&http.responseText.indexOf("<message id=\"sessionTimeout\" type=\"error\"></message>")<0){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}else{
ret=http.responseText;
}
}
}
}
if(_1e7){
_1de(url,_1e6,_1e5.method,http);
}
_1e5[(typeof _1e5.load=="function")?"load":"handle"]("load",ret,http,_1e5);
}else{
var _1ea=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_1e5[(typeof _1e5.error=="function")?"error":"handle"]("error",_1ea,http,_1e5);
}
};
function _1eb(http,_1ec){
if(_1ec["headers"]){
for(var _1ed in _1ec["headers"]){
if(_1ed.toLowerCase()=="content-type"&&!_1ec["contentType"]){
_1ec["contentType"]=_1ec["headers"][_1ed];
}else{
http.setRequestHeader(_1ed,_1ec["headers"][_1ed]);
}
}
}
};
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_1d9._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
try{
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
_1e4(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
catch(e){
try{
var _1ee=new dojo.io.Error("XMLHttpTransport.watchInFlight Error: "+e);
tif.req[(typeof tif.req.error=="function")?"error":"handle"]("error",_1ee,tif.http,tif.req);
}
catch(e2){
dojo.debug("XMLHttpTransport error callback failed: "+e2);
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _1ef=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_1f0){
return _1ef&&dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript","text/json","application/json"],(_1f0["mimetype"].toLowerCase()||""))&&!(_1f0["formNode"]&&dojo.io.formHasFile(_1f0["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_1f1){
if(!_1f1["url"]){
if(!_1f1["formNode"]&&(_1f1["backButton"]||_1f1["back"]||_1f1["changeUrl"]||_1f1["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_1f1);
return true;
}
}
var url=_1f1.url;
var _1f2="";
if(_1f1["formNode"]){
var ta=_1f1.formNode.getAttribute("action");
if((ta)&&(!_1f1["url"])){
url=ta;
}
var tp=_1f1.formNode.getAttribute("method");
if((tp)&&(!_1f1["method"])){
_1f1.method=tp;
}
_1f2+=dojo.io.encodeForm(_1f1.formNode,_1f1.encoding,_1f1["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_1f1["file"]){
_1f1.method="post";
}
if(!_1f1["method"]){
_1f1.method="get";
}
if(_1f1.method.toLowerCase()=="get"){
_1f1.multipart=false;
}else{
if(_1f1["file"]){
_1f1.multipart=true;
}else{
if(!_1f1["multipart"]){
_1f1.multipart=false;
}
}
}
if(_1f1["backButton"]||_1f1["back"]||_1f1["changeUrl"]){
dojo.undo.browser.addToHistory(_1f1);
}
var _1f3=_1f1["content"]||{};
if(_1f1.sendTransport){
_1f3["dojo.transport"]="xmlhttp";
}
do{
if(_1f1.postContent){
_1f2=_1f1.postContent;
break;
}
if(_1f3){
_1f2+=dojo.io.argsFromMap(_1f3,_1f1.encoding);
}
if(_1f1.method.toLowerCase()=="get"||!_1f1.multipart){
break;
}
var t=[];
if(_1f2.length){
var q=_1f2.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_1f1.file){
if(dojo.lang.isArray(_1f1.file)){
for(var i=0;i<_1f1.file.length;++i){
var o=_1f1.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_1f1.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_1f2=t.join("\r\n");
}
}while(false);
var _1f4=_1f1["sync"]?false:true;
var _1f5=_1f1["preventCache"]||(this.preventCache==true&&_1f1["preventCache"]!=false);
var _1f6=_1f1["useCache"]==true||(this.useCache==true&&_1f1["useCache"]!=false);
if(!_1f5&&_1f6){
var _1f7=_1e1(url,_1f2,_1f1.method);
if(_1f7){
_1e4(_1f1,_1f7,url,_1f2,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_1f1);
var _1f8=false;
if(_1f4){
var _1f9=this.inFlight.push({"req":_1f1,"http":http,"url":url,"query":_1f2,"useCache":_1f6,"startTime":_1f1.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_1d9._blockAsync=true;
}
if(_1f1.method.toLowerCase()=="post"){
if(!_1f1.user){
http.open("POST",url,_1f4);
}else{
http.open("POST",url,_1f4,_1f1.user,_1f1.password);
}
_1eb(http,_1f1);
http.setRequestHeader("Content-Type",_1f1.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_1f1.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_1f2);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
_1e4(_1f1,{status:404},url,_1f2,_1f6);
}
}else{
var _1fa=url;
if(_1f2!=""){
_1fa+=(_1fa.indexOf("?")>-1?"&":"?")+_1f2;
}
if(_1f5){
_1fa+=(dojo.string.endsWithAny(_1fa,"?","&")?"":(_1fa.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
if(!_1f1.user){
http.open(_1f1.method.toUpperCase(),_1fa,_1f4);
}else{
http.open(_1f1.method.toUpperCase(),_1fa,_1f4,_1f1.user,_1f1.password);
}
_1eb(http,_1f1);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
_1e4(_1f1,{status:404},url,_1f2,_1f6);
}
}
if(!_1f4){
_1e4(_1f1,http,url,_1f2,_1f6);
_1d9._blockAsync=false;
}
_1f1.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
}
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_1fb,days,path,_1fc,_1fd){
var _1fe=-1;
if((typeof days=="number")&&(days>=0)){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_1fe=d.toGMTString();
}
_1fb=escape(_1fb);
document.cookie=name+"="+_1fb+";"+(_1fe!=-1?" expires="+_1fe+";":"")+(path?"path="+path:"")+(_1fc?"; domain="+_1fc:"")+(_1fd?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.lastIndexOf(name+"=");
if(idx==-1){
return null;
}
var _1ff=document.cookie.substring(idx+name.length+1);
var end=_1ff.indexOf(";");
if(end==-1){
end=_1ff.length;
}
_1ff=_1ff.substring(0,end);
_1ff=unescape(_1ff);
return _1ff;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_200,_201,_202){
if(arguments.length==5){
_202=_200;
_200=null;
_201=null;
}
var _203=[],_204,_205="";
if(!_202){
_204=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!_204){
_204={};
}
for(var prop in obj){
if(obj[prop]==null){
delete _204[prop];
}else{
if((typeof obj[prop]=="string")||(typeof obj[prop]=="number")){
_204[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in _204){
_203.push(escape(prop)+"="+escape(_204[prop]));
}
_205=_203.join("&");
}
dojo.io.cookie.setCookie(name,_205,days,path,_200,_201);
};
dojo.io.cookie.getObjectCookie=function(name){
var _206=null,_207=dojo.io.cookie.getCookie(name);
if(_207){
_206={};
var _208=_207.split("&");
for(var i=0;i<_208.length;i++){
var pair=_208[i].split("=");
var _209=pair[1];
if(isNaN(_209)){
_209=unescape(pair[1]);
}
_206[unescape(pair[0])]=_209;
}
}
return _206;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _20a=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_20a=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.provide("dojo.io.*");
dojo.provide("dojo.io.BrowserIO");
if(!dj_undef("window")){
dojo.io.checkChildrenForFile=function(node){
var _20b=false;
var _20c=node.getElementsByTagName("input");
dojo.lang.forEach(_20c,function(_20d){
if(_20b){
return;
}
if(_20d.getAttribute("type")=="file"){
_20b=true;
}
});
return _20b;
};
dojo.io.formHasFile=function(_20e){
return dojo.io.checkChildrenForFile(_20e);
};
dojo.io.updateNode=function(node,_20f){
node=dojo.byId(node);
var args=_20f;
if(dojo.lang.isString(_20f)){
args={url:_20f};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
dojo.dom.destroyNode(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_210,_211,_212){
if((!_210)||(!_210.tagName)||(!_210.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_212){
_212=dojo.io.formFilter;
}
var enc=/utf/i.test(_211||"")?encodeURIComponent:dojo.string.encodeAscii;
var _213=[];
for(var i=0;i<_210.elements.length;i++){
var elm=_210.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_212(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_213.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_213.push(name+"="+enc(elm.value));
}
}else{
_213.push(name+"="+enc(elm.value));
}
}
}
var _214=_210.getElementsByTagName("input");
for(var i=0;i<_214.length;i++){
var _215=_214[i];
if(_215.type.toLowerCase()=="image"&&_215.form==_210&&_212(_215)){
var name=enc(_215.name);
_213.push(name+"="+enc(_215.value));
_213.push(name+".x=0");
_213.push(name+".y=0");
}
}
return _213.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _216=form.getElementsByTagName("input");
for(var i=0;i<_216.length;i++){
var _217=_216[i];
if(_217.type.toLowerCase()=="image"&&_217.form==form){
this.connect(_217,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _218=false;
if(node.disabled||!node.name){
_218=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_218=node==this.clickedButton;
}else{
_218=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _218;
},connect:function(_219,_21a,_21b){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_219,_21a,this,_21b);
}else{
var fcn=dojo.lang.hitch(this,_21b);
_219[_21a]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _21c=this;
var _21d={};
this.useCache=false;
this.preventCache=false;
function _21e(url,_21f,_220){
return url+"|"+_21f+"|"+_220.toLowerCase();
};
function _221(url,_222,_223,http){
_21d[_21e(url,_222,_223)]=http;
};
function _224(url,_225,_226){
return _21d[_21e(url,_225,_226)];
};
this.clearCache=function(){
_21d={};
};
function _227(_228,http,url,_229,_22a){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_228.method.toLowerCase()=="head"){
var _22b=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _22b;
};
var _22c=_22b.split(/[\r\n]+/g);
for(var i=0;i<_22c.length;i++){
var pair=_22c[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_228.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_228.mimetype=="text/json"||_228.mimetype=="application/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_228.mimetype=="application/xml")||(_228.mimetype=="text/xml")){
if(http.responseText&&http.responseText.indexOf("<message id=\"sessionTimeout\" type=\"error\"></message>")<0){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}else{
ret=http.responseText;
}
}
}
}
if(_22a){
_221(url,_229,_228.method,http);
}
_228[(typeof _228.load=="function")?"load":"handle"]("load",ret,http,_228);
}else{
var _22d=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_228[(typeof _228.error=="function")?"error":"handle"]("error",_22d,http,_228);
}
};
function _22e(http,_22f){
if(_22f["headers"]){
for(var _230 in _22f["headers"]){
if(_230.toLowerCase()=="content-type"&&!_22f["contentType"]){
_22f["contentType"]=_22f["headers"][_230];
}else{
http.setRequestHeader(_230,_22f["headers"][_230]);
}
}
}
};
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_21c._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
try{
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
_227(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
catch(e){
try{
var _231=new dojo.io.Error("XMLHttpTransport.watchInFlight Error: "+e);
tif.req[(typeof tif.req.error=="function")?"error":"handle"]("error",_231,tif.http,tif.req);
}
catch(e2){
dojo.debug("XMLHttpTransport error callback failed: "+e2);
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _232=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_233){
return _232&&dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript","text/json","application/json"],(_233["mimetype"].toLowerCase()||""))&&!(_233["formNode"]&&dojo.io.formHasFile(_233["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_234){
if(!_234["url"]){
if(!_234["formNode"]&&(_234["backButton"]||_234["back"]||_234["changeUrl"]||_234["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_234);
return true;
}
}
var url=_234.url;
var _235="";
if(_234["formNode"]){
var ta=_234.formNode.getAttribute("action");
if((ta)&&(!_234["url"])){
url=ta;
}
var tp=_234.formNode.getAttribute("method");
if((tp)&&(!_234["method"])){
_234.method=tp;
}
_235+=dojo.io.encodeForm(_234.formNode,_234.encoding,_234["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_234["file"]){
_234.method="post";
}
if(!_234["method"]){
_234.method="get";
}
if(_234.method.toLowerCase()=="get"){
_234.multipart=false;
}else{
if(_234["file"]){
_234.multipart=true;
}else{
if(!_234["multipart"]){
_234.multipart=false;
}
}
}
if(_234["backButton"]||_234["back"]||_234["changeUrl"]){
dojo.undo.browser.addToHistory(_234);
}
var _236=_234["content"]||{};
if(_234.sendTransport){
_236["dojo.transport"]="xmlhttp";
}
do{
if(_234.postContent){
_235=_234.postContent;
break;
}
if(_236){
_235+=dojo.io.argsFromMap(_236,_234.encoding);
}
if(_234.method.toLowerCase()=="get"||!_234.multipart){
break;
}
var t=[];
if(_235.length){
var q=_235.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_234.file){
if(dojo.lang.isArray(_234.file)){
for(var i=0;i<_234.file.length;++i){
var o=_234.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_234.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_235=t.join("\r\n");
}
}while(false);
var _237=_234["sync"]?false:true;
var _238=_234["preventCache"]||(this.preventCache==true&&_234["preventCache"]!=false);
var _239=_234["useCache"]==true||(this.useCache==true&&_234["useCache"]!=false);
if(!_238&&_239){
var _23a=_224(url,_235,_234.method);
if(_23a){
_227(_234,_23a,url,_235,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_234);
var _23b=false;
if(_237){
var _23c=this.inFlight.push({"req":_234,"http":http,"url":url,"query":_235,"useCache":_239,"startTime":_234.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_21c._blockAsync=true;
}
if(_234.method.toLowerCase()=="post"){
if(!_234.user){
http.open("POST",url,_237);
}else{
http.open("POST",url,_237,_234.user,_234.password);
}
_22e(http,_234);
http.setRequestHeader("Content-Type",_234.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_234.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_235);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
_227(_234,{status:404},url,_235,_239);
}
}else{
var _23d=url;
if(_235!=""){
_23d+=(_23d.indexOf("?")>-1?"&":"?")+_235;
}
if(_238){
_23d+=(dojo.string.endsWithAny(_23d,"?","&")?"":(_23d.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
if(!_234.user){
http.open(_234.method.toUpperCase(),_23d,_237);
}else{
http.open(_234.method.toUpperCase(),_23d,_237,_234.user,_234.password);
}
_22e(http,_234);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
_227(_234,{status:404},url,_235,_239);
}
}
if(!_237){
_227(_234,http,url,_235,_239);
_21c._blockAsync=false;
}
_234.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
}
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_23e){
this.pairs=[];
this.returnWrappers=_23e||false;
};
dojo.lang.extend(dojo.AdapterRegistry,{register:function(name,_23f,wrap,_240,_241){
var type=(_241)?"unshift":"push";
this.pairs[type]([name,_23f,wrap,_240]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
dojo.provide("dojo.json");
dojo.json={jsonRegistry:new dojo.AdapterRegistry(),register:function(name,_242,wrap,_243){
dojo.json.jsonRegistry.register(name,_242,wrap,_243);
},evalJson:function(json){
try{
return eval("("+json+")");
}
catch(e){
dojo.debug(e);
return json;
}
},serialize:function(o){
var _244=typeof (o);
if(_244=="undefined"){
return "undefined";
}else{
if((_244=="number")||(_244=="boolean")){
return o+"";
}else{
if(o===null){
return "null";
}
}
}
if(_244=="string"){
return dojo.string.escapeString(o);
}
var me=arguments.callee;
var _245;
if(typeof (o.__json__)=="function"){
_245=o.__json__();
if(o!==_245){
return me(_245);
}
}
if(typeof (o.json)=="function"){
_245=o.json();
if(o!==_245){
return me(_245);
}
}
if(_244!="function"&&typeof (o.length)=="number"){
var res=[];
for(var i=0;i<o.length;i++){
var val=me(o[i]);
if(typeof (val)!="string"){
val="undefined";
}
res.push(val);
}
return "["+res.join(",")+"]";
}
try{
window.o=o;
_245=dojo.json.jsonRegistry.match(o);
return me(_245);
}
catch(e){
}
if(_244=="function"){
return null;
}
res=[];
for(var k in o){
var _246;
if(typeof (k)=="number"){
_246="\""+k+"\"";
}else{
if(typeof (k)=="string"){
_246=dojo.string.escapeString(k);
}else{
continue;
}
}
val=me(o[k]);
if(typeof (val)!="string"){
continue;
}
res.push(_246+":"+val);
}
return "{"+res.join(",")+"}";
}};
dojo.provide("dojo.html.common");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.html.body=function(){
dojo.deprecated("dojo.html.body() moved to dojo.body()","0.5");
return dojo.body();
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=dojo.global().event||{};
}
var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
while((t)&&(t.nodeType!=1)){
t=t.parentNode;
}
return t;
};
dojo.html.getViewport=function(){
var _247=dojo.global();
var _248=dojo.doc();
var w=0;
var h=0;
if(dojo.render.html.mozilla){
w=_248.documentElement.clientWidth;
h=_247.innerHeight;
}else{
if(!dojo.render.html.opera&&_247.innerWidth){
w=_247.innerWidth;
h=_247.innerHeight;
}else{
if(!dojo.render.html.opera&&dojo.exists(_248,"documentElement.clientWidth")){
var w2=_248.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
h=_248.documentElement.clientHeight;
}else{
if(dojo.body().clientWidth){
w=dojo.body().clientWidth;
h=dojo.body().clientHeight;
}
}
}
}
return {width:w,height:h};
};
dojo.html.getScroll=function(){
var _249=dojo.global();
var _24a=dojo.doc();
var top=_249.pageYOffset||_24a.documentElement.scrollTop||dojo.body().scrollTop||0;
var left=_249.pageXOffset||_24a.documentElement.scrollLeft||dojo.body().scrollLeft||0;
return {top:top,left:left,offset:{x:left,y:top}};
};
dojo.html.getParentByType=function(node,type){
var _24b=dojo.doc();
var _24c=dojo.byId(node);
type=type.toLowerCase();
while((_24c)&&(_24c.nodeName.toLowerCase()!=type)){
if(_24c==(_24b["body"]||_24b["documentElement"])){
return null;
}
_24c=_24c.parentNode;
}
return _24c;
};
dojo.html.getAttribute=function(node,attr){
node=dojo.byId(node);
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
return dojo.html.getAttribute(dojo.byId(node),attr)?true:false;
};
dojo.html.getCursorPosition=function(e){
e=e||dojo.global().event;
var _24d={x:0,y:0};
if(e.pageX||e.pageY){
_24d.x=e.pageX;
_24d.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_24d.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_24d.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _24d;
};
dojo.html.isTag=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName.toLowerCase()==String(arguments[i]).toLowerCase()){
return String(arguments[i]).toLowerCase();
}
}
}
return "";
};
if(dojo.render.html.ie&&!dojo.render.html.ie70){
if(window.location.href.substr(0,6).toLowerCase()!="https:"){
(function(){
var _24e=dojo.doc().createElement("script");
_24e.src="javascript:'dojo.html.createExternalElement=function(doc, tag){ return doc.createElement(tag); }'";
dojo.doc().getElementsByTagName("head")[0].appendChild(_24e);
})();
}
}else{
dojo.html.createExternalElement=function(doc,tag){
return doc.createElement(tag);
};
}
dojo.html._callDeprecated=function(_24f,_250,args,_251,_252){
dojo.deprecated("dojo.html."+_24f,"replaced by dojo.html."+_250+"("+(_251?"node, {"+_251+": "+_251+"}":"")+")"+(_252?"."+_252:""),"0.5");
var _253=[];
if(_251){
var _254={};
_254[_251]=args[1];
_253.push(args[0]);
_253.push(_254);
}else{
_253=args;
}
var ret=dojo.html[_250].apply(dojo.html,args);
if(_252){
return ret[_252];
}else{
return ret;
}
};
dojo.html.getViewportWidth=function(){
return dojo.html._callDeprecated("getViewportWidth","getViewport",arguments,null,"width");
};
dojo.html.getViewportHeight=function(){
return dojo.html._callDeprecated("getViewportHeight","getViewport",arguments,null,"height");
};
dojo.html.getViewportSize=function(){
return dojo.html._callDeprecated("getViewportSize","getViewport",arguments);
};
dojo.html.getScrollTop=function(){
return dojo.html._callDeprecated("getScrollTop","getScroll",arguments,null,"top");
};
dojo.html.getScrollLeft=function(){
return dojo.html._callDeprecated("getScrollLeft","getScroll",arguments,null,"left");
};
dojo.html.getScrollOffset=function(){
return dojo.html._callDeprecated("getScrollOffset","getScroll",arguments,null,"offset");
};
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.moduleUri=function(_255,uri){
var loc=dojo.hostenv.getModuleSymbols(_255).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri()+loc,uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _256=new dojo.uri.Uri(arguments[i].toString());
var _257=new dojo.uri.Uri(uri.toString());
if((_256.path=="")&&(_256.scheme==null)&&(_256.authority==null)&&(_256.query==null)){
if(_256.fragment!=null){
_257.fragment=_256.fragment;
}
_256=_257;
}else{
if(_256.scheme==null){
_256.scheme=_257.scheme;
if(_256.authority==null){
_256.authority=_257.authority;
if(_256.path.charAt(0)!="/"){
var path=_257.path.substring(0,_257.path.lastIndexOf("/")+1)+_256.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_256.path=segs.join("/");
}
}
}
}
uri="";
if(_256.scheme!=null){
uri+=_256.scheme+":";
}
if(_256.authority!=null){
uri+="//"+_256.authority;
}
uri+=_256.path;
if(_256.query!=null){
uri+="?"+_256.query;
}
if(_256.fragment!=null){
uri+="#"+_256.fragment;
}
}
this.uri=uri.toString();
var _258="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_258));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_258="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_258));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.provide("dojo.html.style");
dojo.html.getClass=function(node){
node=dojo.byId(node);
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return cs.replace(/^\s+|\s+$/g,"");
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_259){
return (new RegExp("(^|\\s+)"+_259+"(\\s+|$)")).test(dojo.html.getClass(node));
};
dojo.html.prependClass=function(node,_25a){
_25a+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_25a);
};
dojo.html.addClass=function(node,_25b){
if(dojo.html.hasClass(node,_25b)){
return false;
}
_25b=(dojo.html.getClass(node)+" "+_25b).replace(/^\s+|\s+$/g,"");
return dojo.html.setClass(node,_25b);
};
dojo.html.setClass=function(node,_25c){
node=dojo.byId(node);
var cs=new String(_25c);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_25c);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_25d,_25e){
try{
if(!_25e){
var _25f=dojo.html.getClass(node).replace(new RegExp("(^|\\s+)"+_25d+"(\\s+|$)"),"$1$2");
}else{
var _25f=dojo.html.getClass(node).replace(_25d,"");
}
dojo.html.setClass(node,_25f);
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_260,_261){
dojo.html.removeClass(node,_261);
dojo.html.addClass(node,_260);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_262,_263,_264,_265,_266){
_266=false;
var _267=dojo.doc();
_263=dojo.byId(_263)||_267;
var _268=_262.split(/\s+/g);
var _269=[];
if(_265!=1&&_265!=2){
_265=0;
}
var _26a=new RegExp("(\\s|^)(("+_268.join(")|(")+"))(\\s|$)");
var _26b=_268.join(" ").length;
var _26c=[];
if(!_266&&_267.evaluate){
var _26d=".//"+(_264||"*")+"[contains(";
if(_265!=dojo.html.classMatchType.ContainsAny){
_26d+="concat(' ',@class,' '), ' "+_268.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')";
if(_265==2){
_26d+=" and string-length(@class)="+_26b+"]";
}else{
_26d+="]";
}
}else{
_26d+="concat(' ',@class,' '), ' "+_268.join(" ') or contains(concat(' ',@class,' '), ' ")+" ')]";
}
var _26e=_267.evaluate(_26d,_263,null,XPathResult.ANY_TYPE,null);
var _26f=_26e.iterateNext();
while(_26f){
try{
_26c.push(_26f);
_26f=_26e.iterateNext();
}
catch(e){
break;
}
}
return _26c;
}else{
if(!_264){
_264="*";
}
_26c=_263.getElementsByTagName(_264);
var node,i=0;
outer:
while(node=_26c[i++]){
var _270=dojo.html.getClasses(node);
if(_270.length==0){
continue outer;
}
var _271=0;
for(var j=0;j<_270.length;j++){
if(_26a.test(_270[j])){
if(_265==dojo.html.classMatchType.ContainsAny){
_269.push(node);
continue outer;
}else{
_271++;
}
}else{
if(_265==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_271==_268.length){
if((_265==dojo.html.classMatchType.IsOnly)&&(_271==_270.length)){
_269.push(node);
}else{
if(_265==dojo.html.classMatchType.ContainsAll){
_269.push(node);
}
}
}
}
return _269;
}
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.toCamelCase=function(_272){
var arr=_272.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
dojo.html.toSelectorCase=function(_273){
return _273.replace(/([A-Z])/g,"-$1").toLowerCase();
};
dojo.html.getComputedStyle=function(node,_274,_275){
node=dojo.byId(node);
var _274=dojo.html.toSelectorCase(_274);
var _276=dojo.html.toCamelCase(_274);
if(!node||!node.style){
return _275;
}else{
if(document.defaultView&&dojo.html.isDescendantOf(node,node.ownerDocument)){
try{
var cs=document.defaultView.getComputedStyle(node,"");
if(cs){
return cs.getPropertyValue(_274);
}
}
catch(e){
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_274);
}else{
return _275;
}
}
}else{
if(node.currentStyle){
return node.currentStyle[_276];
}
}
}
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_274);
}else{
return _275;
}
};
dojo.html.getStyleProperty=function(node,_277){
node=dojo.byId(node);
return (node&&node.style?node.style[dojo.html.toCamelCase(_277)]:undefined);
};
dojo.html.getStyle=function(node,_278){
var _279=dojo.html.getStyleProperty(node,_278);
return (_279?_279:dojo.html.getComputedStyle(node,_278));
};
dojo.html.setStyle=function(node,_27a,_27b){
node=dojo.byId(node);
if(node&&node.style){
var _27c=dojo.html.toCamelCase(_27a);
node.style[_27c]=_27b;
}
};
dojo.html.setStyleText=function(_27d,text){
try{
_27d.style.cssText=text;
}
catch(e){
_27d.setAttribute("style",text);
}
};
dojo.html.copyStyle=function(_27e,_27f){
if(!_27f.style.cssText){
_27e.setAttribute("style",_27f.getAttribute("style"));
}else{
_27e.style.cssText=_27f.style.cssText;
}
dojo.html.addClass(_27e,dojo.html.getClass(_27f));
};
dojo.html.getUnitValue=function(node,_280,_281){
var s=dojo.html.getComputedStyle(node,_280);
if((!s)||((s=="auto")&&(_281))){
return {value:0,units:"px"};
}
var _282=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_282){
return dojo.html.getUnitValue.bad;
}
return {value:Number(_282[1]),units:_282[2].toLowerCase()};
};
dojo.html.getUnitValue.bad={value:NaN,units:""};
dojo.html.getPixelValue=function(node,_283,_284){
var _285=dojo.html.getUnitValue(node,_283,_284);
if(isNaN(_285.value)){
return 0;
}
if((_285.value)&&(_285.units!="px")){
return NaN;
}
return _285.value;
};
dojo.html.setPositivePixelValue=function(node,_286,_287){
if(isNaN(_287)){
return false;
}
node.style[_286]=Math.max(0,_287)+"px";
return true;
};
dojo.html.styleSheet=null;
dojo.html.insertCssRule=function(_288,_289,_28a){
if(!dojo.html.styleSheet){
if(document.createStyleSheet){
dojo.html.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
dojo.html.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(dojo.html.styleSheet.cssRules){
_28a=dojo.html.styleSheet.cssRules.length;
}else{
if(dojo.html.styleSheet.rules){
_28a=dojo.html.styleSheet.rules.length;
}else{
return null;
}
}
}
if(dojo.html.styleSheet.insertRule){
var rule=_288+" { "+_289+" }";
return dojo.html.styleSheet.insertRule(rule,_28a);
}else{
if(dojo.html.styleSheet.addRule){
return dojo.html.styleSheet.addRule(_288,_289,_28a);
}else{
return null;
}
}
};
dojo.html.removeCssRule=function(_28b){
if(!dojo.html.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(dojo.render.html.ie){
if(!_28b){
_28b=dojo.html.styleSheet.rules.length;
dojo.html.styleSheet.removeRule(_28b);
}
}else{
if(document.styleSheets[0]){
if(!_28b){
_28b=dojo.html.styleSheet.cssRules.length;
}
dojo.html.styleSheet.deleteRule(_28b);
}
}
return true;
};
dojo.html._insertedCssFiles=[];
dojo.html.insertCssFile=function(URI,doc,_28c,_28d){
if(!URI){
return;
}
if(!doc){
doc=document;
}
var _28e=dojo.hostenv.getText(URI,false,_28d);
if(_28e===null){
return;
}
_28e=dojo.html.fixPathsInCssText(_28e,URI);
if(_28c){
var idx=-1,node,ent=dojo.html._insertedCssFiles;
for(var i=0;i<ent.length;i++){
if((ent[i].doc==doc)&&(ent[i].cssText==_28e)){
idx=i;
node=ent[i].nodeRef;
break;
}
}
if(node){
var _28f=doc.getElementsByTagName("style");
for(var i=0;i<_28f.length;i++){
if(_28f[i]==node){
return;
}
}
dojo.html._insertedCssFiles.shift(idx,1);
}
}
var _290=dojo.html.insertCssText(_28e,doc);
dojo.html._insertedCssFiles.push({"doc":doc,"cssText":_28e,"nodeRef":_290});
if(_290&&djConfig.isDebug){
_290.setAttribute("dbgHref",URI);
}
return _290;
};
dojo.html.insertCssText=function(_291,doc,URI){
if(!_291){
return;
}
if(!doc){
doc=document;
}
if(URI){
_291=dojo.html.fixPathsInCssText(_291,URI);
}
var _292=doc.createElement("style");
_292.setAttribute("type","text/css");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(_292);
}
if(_292.styleSheet){
var _293=function(){
try{
_292.styleSheet.cssText=_291;
}
catch(e){
dojo.debug(e);
}
};
if(_292.styleSheet.disabled){
setTimeout(_293,10);
}else{
_293();
}
}else{
var _294=doc.createTextNode(_291);
_292.appendChild(_294);
}
return _292;
};
dojo.html.fixPathsInCssText=function(_295,URI){
if(!_295||!URI){
return;
}
var _296,str="",url="",_297="[\\t\\s\\w\\(\\)\\/\\.\\\\'\"-:#=&?~]+";
var _298=new RegExp("url\\(\\s*("+_297+")\\s*\\)");
var _299=/(file|https?|ftps?):\/\//;
regexTrim=new RegExp("^[\\s]*(['\"]?)("+_297+")\\1[\\s]*?$");
if(dojo.render.html.ie55||dojo.render.html.ie60){
var _29a=new RegExp("AlphaImageLoader\\((.*)src=['\"]("+_297+")['\"]");
while(_296=_29a.exec(_295)){
url=_296[2].replace(regexTrim,"$2");
if(!_299.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_295.substring(0,_296.index)+"AlphaImageLoader("+_296[1]+"src='"+url+"'";
_295=_295.substr(_296.index+_296[0].length);
}
_295=str+_295;
str="";
}
while(_296=_298.exec(_295)){
url=_296[1].replace(regexTrim,"$2");
if(!_299.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_295.substring(0,_296.index)+"url("+url+")";
_295=_295.substr(_296.index+_296[0].length);
}
return str+_295;
};
dojo.html.setActiveStyleSheet=function(_29b){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_29b){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.applyBrowserClass=function(node){
var drh=dojo.render.html;
var _29c={dj_ie:drh.ie,dj_ie55:drh.ie55,dj_ie6:drh.ie60,dj_ie7:drh.ie70,dj_iequirks:drh.ie&&drh.quirks,dj_opera:drh.opera,dj_opera8:drh.opera&&(Math.floor(dojo.render.version)==8),dj_opera9:drh.opera&&(Math.floor(dojo.render.version)==9),dj_khtml:drh.khtml,dj_safari:drh.safari,dj_gecko:drh.mozilla};
for(var p in _29c){
if(_29c[p]){
dojo.html.addClass(node,p);
}
}
};
dojo.provide("dojo.html.*");
dojo.provide("dojo.html.display");
dojo.html._toggle=function(node,_29d,_29e){
node=dojo.byId(node);
_29e(node,!_29d(node));
return _29d(node);
};
dojo.html.show=function(node){
node=dojo.byId(node);
if(dojo.html.getStyleProperty(node,"display")=="none"){
dojo.html.setStyle(node,"display",(node.dojoDisplayCache||""));
node.dojoDisplayCache=undefined;
}
};
dojo.html.hide=function(node){
node=dojo.byId(node);
if(typeof node["dojoDisplayCache"]=="undefined"){
var d=dojo.html.getStyleProperty(node,"display");
if(d!="none"){
node.dojoDisplayCache=d;
}
}
dojo.html.setStyle(node,"display","none");
};
dojo.html.setShowing=function(node,_29f){
dojo.html[(_29f?"show":"hide")](node);
};
dojo.html.isShowing=function(node){
return (dojo.html.getStyleProperty(node,"display")!="none");
};
dojo.html.toggleShowing=function(node){
return dojo.html._toggle(node,dojo.html.isShowing,dojo.html.setShowing);
};
dojo.html.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
dojo.html.suggestDisplayByTagName=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var tag=node.tagName.toLowerCase();
return (tag in dojo.html.displayMap?dojo.html.displayMap[tag]:"block");
}
};
dojo.html.setDisplay=function(node,_2a0){
dojo.html.setStyle(node,"display",((_2a0 instanceof String||typeof _2a0=="string")?_2a0:(_2a0?dojo.html.suggestDisplayByTagName(node):"none")));
};
dojo.html.isDisplayed=function(node){
return (dojo.html.getComputedStyle(node,"display")!="none");
};
dojo.html.toggleDisplay=function(node){
return dojo.html._toggle(node,dojo.html.isDisplayed,dojo.html.setDisplay);
};
dojo.html.setVisibility=function(node,_2a1){
dojo.html.setStyle(node,"visibility",((_2a1 instanceof String||typeof _2a1=="string")?_2a1:(_2a1?"visible":"hidden")));
};
dojo.html.isVisible=function(node){
return (dojo.html.getComputedStyle(node,"visibility")!="hidden");
};
dojo.html.toggleVisibility=function(node){
return dojo.html._toggle(node,dojo.html.isVisible,dojo.html.setVisibility);
};
dojo.html.setOpacity=function(node,_2a2,_2a3){
node=dojo.byId(node);
var h=dojo.render.html;
if(!_2a3){
if(_2a2>=1){
if(h.ie){
dojo.html.clearOpacity(node);
return;
}else{
_2a2=0.999999;
}
}else{
if(_2a2<0){
_2a2=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_2a2*100+")";
}
}
node.style.filter="Alpha(Opacity="+_2a2*100+")";
}else{
if(h.moz){
node.style.opacity=_2a2;
node.style.MozOpacity=_2a2;
}else{
if(h.safari){
node.style.opacity=_2a2;
node.style.KhtmlOpacity=_2a2;
}else{
node.style.opacity=_2a2;
}
}
}
};
dojo.html.clearOpacity=function(node){
node=dojo.byId(node);
var ns=node.style;
var h=dojo.render.html;
if(h.ie){
try{
if(node.filters&&node.filters.alpha){
ns.filter="";
}
}
catch(e){
}
}else{
if(h.moz){
ns.opacity=1;
ns.MozOpacity=1;
}else{
if(h.safari){
ns.opacity=1;
ns.KhtmlOpacity=1;
}else{
ns.opacity=1;
}
}
}
};
dojo.html.getOpacity=function(node){
node=dojo.byId(node);
var h=dojo.render.html;
if(h.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
dojo.provide("dojo.html.layout");
dojo.html.sumAncestorProperties=function(node,prop){
node=dojo.byId(node);
if(!node){
return 0;
}
var _2a4=0;
while(node){
if(dojo.html.getComputedStyle(node,"position")=="fixed"){
return 0;
}
var val=node[prop];
if(val){
_2a4+=val-0;
if(node==dojo.body()){
break;
}
}
node=node.parentNode;
}
return _2a4;
};
dojo.html.setStyleAttributes=function(node,_2a5){
node=dojo.byId(node);
var _2a6=_2a5.replace(/(;)?\s*$/,"").split(";");
for(var i=0;i<_2a6.length;i++){
var _2a7=_2a6[i].split(":");
var name=_2a7[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
var _2a8=_2a7[1].replace(/\s*$/,"").replace(/^\s*/,"");
switch(name){
case "opacity":
dojo.html.setOpacity(node,_2a8);
break;
case "content-height":
dojo.html.setContentBox(node,{height:_2a8});
break;
case "content-width":
dojo.html.setContentBox(node,{width:_2a8});
break;
case "outer-height":
dojo.html.setMarginBox(node,{height:_2a8});
break;
case "outer-width":
dojo.html.setMarginBox(node,{width:_2a8});
break;
default:
node.style[dojo.html.toCamelCase(name)]=_2a8;
}
}
};
dojo.html.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
dojo.html.getAbsolutePosition=dojo.html.abs=function(node,_2a9,_2aa){
node=dojo.byId(node,node.ownerDocument);
var ret={x:0,y:0};
var bs=dojo.html.boxSizing;
if(!_2aa){
_2aa=bs.CONTENT_BOX;
}
var _2ab=2;
var _2ac;
switch(_2aa){
case bs.MARGIN_BOX:
_2ac=3;
break;
case bs.BORDER_BOX:
_2ac=2;
break;
case bs.PADDING_BOX:
default:
_2ac=1;
break;
case bs.CONTENT_BOX:
_2ac=0;
break;
}
var h=dojo.render.html;
var db=document["body"]||document["documentElement"];
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(document.getBoxObjectFor){
_2ab=1;
try{
var bo=document.getBoxObjectFor(node);
ret.x=bo.x-dojo.html.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-dojo.html.sumAncestorProperties(node,"scrollTop");
}
catch(e){
}
}else{
if(node["offsetParent"]){
var _2ad;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_2ad=db;
}else{
_2ad=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(dojo.render.html.opera){
nd=db;
}
ret.x-=dojo.html.sumAncestorProperties(nd,"scrollLeft");
ret.y-=dojo.html.sumAncestorProperties(nd,"scrollTop");
}
var _2ae=node;
do{
var n=_2ae["offsetLeft"];
if(!h.opera||n>0){
ret.x+=isNaN(n)?0:n;
}
var m=_2ae["offsetTop"];
ret.y+=isNaN(m)?0:m;
_2ae=_2ae.offsetParent;
}while((_2ae!=_2ad)&&(_2ae!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_2a9){
var _2af=dojo.html.getScroll();
ret.y+=_2af.top;
ret.x+=_2af.left;
}
var _2b0=[dojo.html.getPaddingExtent,dojo.html.getBorderExtent,dojo.html.getMarginExtent];
if(_2ab>_2ac){
for(var i=_2ac;i<_2ab;++i){
ret.y+=_2b0[i](node,"top");
ret.x+=_2b0[i](node,"left");
}
}else{
if(_2ab<_2ac){
for(var i=_2ac;i>_2ab;--i){
ret.y-=_2b0[i-1](node,"top");
ret.x-=_2b0[i-1](node,"left");
}
}
}
ret.top=ret.y;
ret.left=ret.x;
return ret;
};
dojo.html.isPositionAbsolute=function(node){
return (dojo.html.getComputedStyle(node,"position")=="absolute");
};
dojo.html._sumPixelValues=function(node,_2b1,_2b2){
var _2b3=0;
for(var x=0;x<_2b1.length;x++){
_2b3+=dojo.html.getPixelValue(node,_2b1[x],_2b2);
}
return _2b3;
};
dojo.html.getMargin=function(node){
return {width:dojo.html._sumPixelValues(node,["margin-left","margin-right"],(dojo.html.getComputedStyle(node,"position")=="absolute")),height:dojo.html._sumPixelValues(node,["margin-top","margin-bottom"],(dojo.html.getComputedStyle(node,"position")=="absolute"))};
};
dojo.html.getBorder=function(node){
return {width:dojo.html.getBorderExtent(node,"left")+dojo.html.getBorderExtent(node,"right"),height:dojo.html.getBorderExtent(node,"top")+dojo.html.getBorderExtent(node,"bottom")};
};
dojo.html.getBorderExtent=function(node,side){
return (dojo.html.getStyle(node,"border-"+side+"-style")=="none"?0:dojo.html.getPixelValue(node,"border-"+side+"-width"));
};
dojo.html.getMarginExtent=function(node,side){
return dojo.html._sumPixelValues(node,["margin-"+side],dojo.html.isPositionAbsolute(node));
};
dojo.html.getPaddingExtent=function(node,side){
return dojo.html._sumPixelValues(node,["padding-"+side],true);
};
dojo.html.getPadding=function(node){
return {width:dojo.html._sumPixelValues(node,["padding-left","padding-right"],true),height:dojo.html._sumPixelValues(node,["padding-top","padding-bottom"],true)};
};
dojo.html.getPadBorder=function(node){
var pad=dojo.html.getPadding(node);
var _2b4=dojo.html.getBorder(node);
return {width:pad.width+_2b4.width,height:pad.height+_2b4.height};
};
dojo.html.getBoxSizing=function(node){
var h=dojo.render.html;
var bs=dojo.html.boxSizing;
if(((h.ie)||(h.opera))&&node.nodeName!="IMG"){
var cm=document["compatMode"];
if((cm=="BackCompat")||(cm=="QuirksMode")){
return bs.BORDER_BOX;
}else{
return bs.CONTENT_BOX;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _2b5=dojo.html.getStyle(node,"-moz-box-sizing");
if(!_2b5){
_2b5=dojo.html.getStyle(node,"box-sizing");
}
return (_2b5?_2b5:bs.CONTENT_BOX);
}
};
dojo.html.isBorderBox=function(node){
return (dojo.html.getBoxSizing(node)==dojo.html.boxSizing.BORDER_BOX);
};
dojo.html.getBorderBox=function(node){
node=dojo.byId(node);
return {width:node.offsetWidth,height:node.offsetHeight};
};
dojo.html.getPaddingBox=function(node){
var box=dojo.html.getBorderBox(node);
var _2b6=dojo.html.getBorder(node);
return {width:box.width-_2b6.width,height:box.height-_2b6.height};
};
dojo.html.getContentBox=function(node){
node=dojo.byId(node);
var _2b7=dojo.html.getPadBorder(node);
return {width:node.offsetWidth-_2b7.width,height:node.offsetHeight-_2b7.height};
};
dojo.html.setContentBox=function(node,args){
node=dojo.byId(node);
var _2b8=0;
var _2b9=0;
var isbb=dojo.html.isBorderBox(node);
var _2ba=(isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var ret={};
if(typeof args.width!="undefined"){
_2b8=args.width+_2ba.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_2b8);
}
if(typeof args.height!="undefined"){
_2b9=args.height+_2ba.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_2b9);
}
return ret;
};
dojo.html.getMarginBox=function(node){
var _2bb=dojo.html.getBorderBox(node);
var _2bc=dojo.html.getMargin(node);
return {width:_2bb.width+_2bc.width,height:_2bb.height+_2bc.height};
};
dojo.html.setMarginBox=function(node,args){
node=dojo.byId(node);
var _2bd=0;
var _2be=0;
var isbb=dojo.html.isBorderBox(node);
var _2bf=(!isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var _2c0=dojo.html.getMargin(node);
var ret={};
if(typeof args.width!="undefined"){
_2bd=args.width-_2bf.width;
_2bd-=_2c0.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_2bd);
}
if(typeof args.height!="undefined"){
_2be=args.height-_2bf.height;
_2be-=_2c0.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_2be);
}
return ret;
};
dojo.html.getElementBox=function(node,type){
var bs=dojo.html.boxSizing;
switch(type){
case bs.MARGIN_BOX:
return dojo.html.getMarginBox(node);
case bs.BORDER_BOX:
return dojo.html.getBorderBox(node);
case bs.PADDING_BOX:
return dojo.html.getPaddingBox(node);
case bs.CONTENT_BOX:
default:
return dojo.html.getContentBox(node);
}
};
dojo.html.toCoordinateObject=dojo.html.toCoordinateArray=function(_2c1,_2c2,_2c3){
if(_2c1 instanceof Array||typeof _2c1=="array"){
dojo.deprecated("dojo.html.toCoordinateArray","use dojo.html.toCoordinateObject({left: , top: , width: , height: }) instead","0.5");
while(_2c1.length<4){
_2c1.push(0);
}
while(_2c1.length>4){
_2c1.pop();
}
var ret={left:_2c1[0],top:_2c1[1],width:_2c1[2],height:_2c1[3]};
}else{
if(!_2c1.nodeType&&!(_2c1 instanceof String||typeof _2c1=="string")&&("width" in _2c1||"height" in _2c1||"left" in _2c1||"x" in _2c1||"top" in _2c1||"y" in _2c1)){
var ret={left:_2c1.left||_2c1.x||0,top:_2c1.top||_2c1.y||0,width:_2c1.width||0,height:_2c1.height||0};
}else{
var node=dojo.byId(_2c1);
var pos=dojo.html.abs(node,_2c2,_2c3);
var _2c4=dojo.html.getMarginBox(node);
var ret={left:pos.left,top:pos.top,width:_2c4.width,height:_2c4.height};
}
}
ret.x=ret.left;
ret.y=ret.top;
return ret;
};
dojo.html.setMarginBoxWidth=dojo.html.setOuterWidth=function(node,_2c5){
return dojo.html._callDeprecated("setMarginBoxWidth","setMarginBox",arguments,"width");
};
dojo.html.setMarginBoxHeight=dojo.html.setOuterHeight=function(){
return dojo.html._callDeprecated("setMarginBoxHeight","setMarginBox",arguments,"height");
};
dojo.html.getMarginBoxWidth=dojo.html.getOuterWidth=function(){
return dojo.html._callDeprecated("getMarginBoxWidth","getMarginBox",arguments,null,"width");
};
dojo.html.getMarginBoxHeight=dojo.html.getOuterHeight=function(){
return dojo.html._callDeprecated("getMarginBoxHeight","getMarginBox",arguments,null,"height");
};
dojo.html.getTotalOffset=function(node,type,_2c6){
return dojo.html._callDeprecated("getTotalOffset","getAbsolutePosition",arguments,null,type);
};
dojo.html.getAbsoluteX=function(node,_2c7){
return dojo.html._callDeprecated("getAbsoluteX","getAbsolutePosition",arguments,null,"x");
};
dojo.html.getAbsoluteY=function(node,_2c8){
return dojo.html._callDeprecated("getAbsoluteY","getAbsolutePosition",arguments,null,"y");
};
dojo.html.totalOffsetLeft=function(node,_2c9){
return dojo.html._callDeprecated("totalOffsetLeft","getAbsolutePosition",arguments,null,"left");
};
dojo.html.totalOffsetTop=function(node,_2ca){
return dojo.html._callDeprecated("totalOffsetTop","getAbsolutePosition",arguments,null,"top");
};
dojo.html.getMarginWidth=function(node){
return dojo.html._callDeprecated("getMarginWidth","getMargin",arguments,null,"width");
};
dojo.html.getMarginHeight=function(node){
return dojo.html._callDeprecated("getMarginHeight","getMargin",arguments,null,"height");
};
dojo.html.getBorderWidth=function(node){
return dojo.html._callDeprecated("getBorderWidth","getBorder",arguments,null,"width");
};
dojo.html.getBorderHeight=function(node){
return dojo.html._callDeprecated("getBorderHeight","getBorder",arguments,null,"height");
};
dojo.html.getPaddingWidth=function(node){
return dojo.html._callDeprecated("getPaddingWidth","getPadding",arguments,null,"width");
};
dojo.html.getPaddingHeight=function(node){
return dojo.html._callDeprecated("getPaddingHeight","getPadding",arguments,null,"height");
};
dojo.html.getPadBorderWidth=function(node){
return dojo.html._callDeprecated("getPadBorderWidth","getPadBorder",arguments,null,"width");
};
dojo.html.getPadBorderHeight=function(node){
return dojo.html._callDeprecated("getPadBorderHeight","getPadBorder",arguments,null,"height");
};
dojo.html.getBorderBoxWidth=dojo.html.getInnerWidth=function(){
return dojo.html._callDeprecated("getBorderBoxWidth","getBorderBox",arguments,null,"width");
};
dojo.html.getBorderBoxHeight=dojo.html.getInnerHeight=function(){
return dojo.html._callDeprecated("getBorderBoxHeight","getBorderBox",arguments,null,"height");
};
dojo.html.getContentBoxWidth=dojo.html.getContentWidth=function(){
return dojo.html._callDeprecated("getContentBoxWidth","getContentBox",arguments,null,"width");
};
dojo.html.getContentBoxHeight=dojo.html.getContentHeight=function(){
return dojo.html._callDeprecated("getContentBoxHeight","getContentBox",arguments,null,"height");
};
dojo.html.setContentBoxWidth=dojo.html.setContentWidth=function(node,_2cb){
return dojo.html._callDeprecated("setContentBoxWidth","setContentBox",arguments,"width");
};
dojo.html.setContentBoxHeight=dojo.html.setContentHeight=function(node,_2cc){
return dojo.html._callDeprecated("setContentBoxHeight","setContentBox",arguments,"height");
};
dojo.provide("dojo.html.util");
dojo.html.getElementWindow=function(_2cd){
return dojo.html.getDocumentWindow(_2cd.ownerDocument);
};
dojo.html.getDocumentWindow=function(doc){
if(dojo.render.html.safari&&!doc._parentWindow){
var fix=function(win){
win.document._parentWindow=win;
for(var i=0;i<win.frames.length;i++){
fix(win.frames[i]);
}
};
fix(window.top);
}
if(dojo.render.html.ie&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
dojo.html.gravity=function(node,e){
node=dojo.byId(node);
var _2ce=dojo.html.getCursorPosition(e);
with(dojo.html){
var _2cf=getAbsolutePosition(node,true);
var bb=getBorderBox(node);
var _2d0=_2cf.x+(bb.width/2);
var _2d1=_2cf.y+(bb.height/2);
}
with(dojo.html.gravity){
return ((_2ce.x<_2d0?WEST:EAST)|(_2ce.y<_2d1?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.overElement=function(_2d2,e){
_2d2=dojo.byId(_2d2);
var _2d3=dojo.html.getCursorPosition(e);
var bb=dojo.html.getBorderBox(_2d2);
var _2d4=dojo.html.getAbsolutePosition(_2d2,true,dojo.html.boxSizing.BORDER_BOX);
var top=_2d4.y;
var _2d5=top+bb.height;
var left=_2d4.x;
var _2d6=left+bb.width;
return (_2d3.x>=left&&_2d3.x<=_2d6&&_2d3.y>=top&&_2d3.y<=_2d5);
};
dojo.html.renderedTextContent=function(node){
node=dojo.byId(node);
var _2d7="";
if(node==null){
return _2d7;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _2d8="unknown";
try{
_2d8=dojo.html.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_2d8){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_2d7+="\n";
_2d7+=dojo.html.renderedTextContent(node.childNodes[i]);
_2d7+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_2d7+="\n";
}else{
_2d7+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _2d9="unknown";
try{
_2d9=dojo.html.getStyle(node,"text-transform");
}
catch(E){
}
switch(_2d9){
case "capitalize":
var _2da=text.split(" ");
for(var i=0;i<_2da.length;i++){
_2da[i]=_2da[i].charAt(0).toUpperCase()+_2da[i].substring(1);
}
text=_2da.join(" ");
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_2d9){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_2d7)){
text.replace(/^\s/,"");
}
break;
}
_2d7+=text;
break;
default:
break;
}
}
return _2d7;
};
dojo.html.createNodesFromText=function(txt,trim){
if(trim){
txt=txt.replace(/^\s+|\s+$/g,"");
}
var tn=dojo.doc().createElement("div");
tn.style.visibility="hidden";
dojo.body().appendChild(tn);
var _2db="none";
if((/^<t[dh][\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
_2db="cell";
}else{
if((/^<tr[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody>"+txt+"</tbody></table>";
_2db="row";
}else{
if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table>"+txt+"</table>";
_2db="section";
}
}
}
tn.innerHTML=txt;
if(tn["normalize"]){
tn.normalize();
}
var _2dc=null;
switch(_2db){
case "cell":
_2dc=tn.getElementsByTagName("tr")[0];
break;
case "row":
_2dc=tn.getElementsByTagName("tbody")[0];
break;
case "section":
_2dc=tn.getElementsByTagName("table")[0];
break;
default:
_2dc=tn;
break;
}
var _2dd=[];
for(var x=0;x<_2dc.childNodes.length;x++){
_2dd.push(_2dc.childNodes[x].cloneNode(true));
}
tn.style.display="none";
dojo.html.destroyNode(tn);
return _2dd;
};
dojo.html.placeOnScreen=function(node,_2de,_2df,_2e0,_2e1,_2e2,_2e3){
if(_2de instanceof Array||typeof _2de=="array"){
_2e3=_2e2;
_2e2=_2e1;
_2e1=_2e0;
_2e0=_2df;
_2df=_2de[1];
_2de=_2de[0];
}
if(_2e2 instanceof String||typeof _2e2=="string"){
_2e2=_2e2.split(",");
}
if(!isNaN(_2e0)){
_2e0=[Number(_2e0),Number(_2e0)];
}else{
if(!(_2e0 instanceof Array||typeof _2e0=="array")){
_2e0=[0,0];
}
}
var _2e4=dojo.html.getScroll().offset;
var view=dojo.html.getViewport();
node=dojo.byId(node);
var _2e5=node.style.display;
node.style.display="";
var bb=dojo.html.getBorderBox(node);
var w=bb.width;
var h=bb.height;
node.style.display=_2e5;
if(!(_2e2 instanceof Array||typeof _2e2=="array")){
_2e2=["TL"];
}
var _2e6,_2e7,_2e8=Infinity,_2e9;
for(var _2ea=0;_2ea<_2e2.length;++_2ea){
var _2eb=_2e2[_2ea];
var _2ec=true;
var tryX=_2de-(_2eb.charAt(1)=="L"?0:w)+_2e0[0]*(_2eb.charAt(1)=="L"?1:-1);
var tryY=_2df-(_2eb.charAt(0)=="T"?0:h)+_2e0[1]*(_2eb.charAt(0)=="T"?1:-1);
if(_2e1){
tryX-=_2e4.x;
tryY-=_2e4.y;
}
if(tryX<0){
tryX=0;
_2ec=false;
}
if(tryY<0){
tryY=0;
_2ec=false;
}
var x=tryX+w;
if(x>view.width){
x=view.width-w;
_2ec=false;
}else{
x=tryX;
}
x=Math.max(_2e0[0],x)+_2e4.x;
var y=tryY+h;
if(y>view.height){
y=view.height-h;
_2ec=false;
}else{
y=tryY;
}
y=Math.max(_2e0[1],y)+_2e4.y;
if(_2ec){
_2e6=x;
_2e7=y;
_2e8=0;
_2e9=_2eb;
break;
}else{
var dist=Math.pow(x-tryX-_2e4.x,2)+Math.pow(y-tryY-_2e4.y,2);
if(_2e8>dist){
_2e8=dist;
_2e6=x;
_2e7=y;
_2e9=_2eb;
}
}
}
if(!_2e3){
node.style.left=_2e6+"px";
node.style.top=_2e7+"px";
}
return {left:_2e6,top:_2e7,x:_2e6,y:_2e7,dist:_2e8,corner:_2e9};
};
dojo.html.placeOnScreenPoint=function(node,_2ed,_2ee,_2ef,_2f0){
dojo.deprecated("dojo.html.placeOnScreenPoint","use dojo.html.placeOnScreen() instead","0.5");
return dojo.html.placeOnScreen(node,_2ed,_2ee,_2ef,_2f0,["TL","TR","BL","BR"]);
};
dojo.html.placeOnScreenAroundElement=function(node,_2f1,_2f2,_2f3,_2f4,_2f5){
var best,_2f6=Infinity;
_2f1=dojo.byId(_2f1);
var _2f7=_2f1.style.display;
_2f1.style.display="";
var mb=dojo.html.getElementBox(_2f1,_2f3);
var _2f8=mb.width;
var _2f9=mb.height;
var _2fa=dojo.html.getAbsolutePosition(_2f1,true,_2f3);
_2f1.style.display=_2f7;
for(var _2fb in _2f4){
var pos,_2fc,_2fd;
var _2fe=_2f4[_2fb];
_2fc=_2fa.x+(_2fb.charAt(1)=="L"?0:_2f8);
_2fd=_2fa.y+(_2fb.charAt(0)=="T"?0:_2f9);
pos=dojo.html.placeOnScreen(node,_2fc,_2fd,_2f2,true,_2fe,true);
if(pos.dist==0){
best=pos;
break;
}else{
if(_2f6>pos.dist){
_2f6=pos.dist;
best=pos;
}
}
}
if(!_2f5){
node.style.left=best.left+"px";
node.style.top=best.top+"px";
}
return best;
};
dojo.html.scrollIntoView=function(node){
if(!node){
return;
}
if(dojo.render.html.ie){
if(dojo.html.getBorderBox(node.parentNode).height<=node.parentNode.scrollHeight){
node.scrollIntoView(false);
}
}else{
if(dojo.render.html.mozilla){
node.scrollIntoView(false);
}else{
var _2ff=node.parentNode;
var _300=_2ff.scrollTop+dojo.html.getBorderBox(_2ff).height;
var _301=node.offsetTop+dojo.html.getMarginBox(node).height;
if(_300<_301){
_2ff.scrollTop+=(_301-_300);
}else{
if(_2ff.scrollTop>node.offsetTop){
_2ff.scrollTop-=(_2ff.scrollTop-node.offsetTop);
}
}
}
}
};
dojo.provide("dojo.xml.Parse");
dojo.xml.Parse=function(){
var isIE=((dojo.render.html.capable)&&(dojo.render.html.ie));
function _302(node){
try{
return node.tagName.toLowerCase();
}
catch(e){
return "";
}
};
function _303(node){
var _304=_302(node);
if(!_304){
return "";
}
if((dojo.widget)&&(dojo.widget.tags[_304])){
return _304;
}
var p=_304.indexOf(":");
if(p>=0){
return _304;
}
if(_304.substr(0,5)=="dojo:"){
return _304;
}
if(dojo.render.html.capable&&dojo.render.html.ie&&node.scopeName!="HTML"){
return node.scopeName.toLowerCase()+":"+_304;
}
if(_304.substr(0,4)=="dojo"){
return "dojo:"+_304.substring(4);
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
if(djt.indexOf(":")<0){
djt="dojo:"+djt;
}
return djt.toLowerCase();
}
djt=node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type");
if(djt){
return "dojo:"+djt.toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((dj_global["djConfig"])&&(!djConfig["ignoreClassNames"])){
var _305=node.className||node.getAttribute("class");
if((_305)&&(_305.indexOf)&&(_305.indexOf("dojo-")!=-1)){
var _306=_305.split(" ");
for(var x=0,c=_306.length;x<c;x++){
if(_306[x].slice(0,5)=="dojo-"){
return "dojo:"+_306[x].substr(5).toLowerCase();
}
}
}
}
return "";
};
this.parseElement=function(node,_307,_308,_309){
var _30a=_302(node);
if(isIE&&_30a.indexOf("/")==0){
return null;
}
try{
var attr=node.getAttribute("parseWidgets");
if(attr&&attr.toLowerCase()=="false"){
return {};
}
}
catch(e){
}
var _30b=true;
if(_308){
var _30c=_303(node);
_30a=_30c||_30a;
_30b=Boolean(_30c);
}
var _30d={};
_30d[_30a]=[];
var pos=_30a.indexOf(":");
if(pos>0){
var ns=_30a.substring(0,pos);
_30d["ns"]=ns;
if((dojo.ns)&&(!dojo.ns.allow(ns))){
_30b=false;
}
}
if(_30b){
var _30e=this.parseAttributes(node);
for(var attr in _30e){
if((!_30d[_30a][attr])||(typeof _30d[_30a][attr]!="array")){
_30d[_30a][attr]=[];
}
_30d[_30a][attr].push(_30e[attr]);
}
_30d[_30a].nodeRef=node;
_30d.tagName=_30a;
_30d.index=_309||0;
}
var _30f=0;
for(var i=0;i<node.childNodes.length;i++){
var tcn=node.childNodes.item(i);
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
var ctn=_303(tcn)||_302(tcn);
if(!_30d[ctn]){
_30d[ctn]=[];
}
_30d[ctn].push(this.parseElement(tcn,true,_308,_30f));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_30d[ctn][_30d[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
_30f++;
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_30d[_30a].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _30d;
};
this.parseAttributes=function(node){
var _310={};
var atts=node.attributes;
var _311,i=0;
while((_311=atts[i++])){
if(isIE){
if(!_311){
continue;
}
if((typeof _311=="object")&&(typeof _311.nodeValue=="undefined")||(_311.nodeValue==null)||(_311.nodeValue=="")){
continue;
}
}
var nn=_311.nodeName.split(":");
nn=(nn.length==2)?nn[1]:_311.nodeName;
_310[nn]={value:_311.nodeValue};
}
return _310;
};
};
dojo.provide("dojo.ns");
dojo.ns={namespaces:{},failed:{},loading:{},loaded:{},register:function(name,_312,_313,_314){
if(!_314||!this.namespaces[name]){
this.namespaces[name]=new dojo.ns.Ns(name,_312,_313);
}
},allow:function(name){
if(this.failed[name]){
return false;
}
if((djConfig.excludeNamespace)&&(dojo.lang.inArray(djConfig.excludeNamespace,name))){
return false;
}
return ((name==this.dojo)||(!djConfig.includeNamespace)||(dojo.lang.inArray(djConfig.includeNamespace,name)));
},get:function(name){
return this.namespaces[name];
},require:function(name){
var ns=this.namespaces[name];
if((ns)&&(this.loaded[name])){
return ns;
}
if(!this.allow(name)){
return false;
}
if(this.loading[name]){
dojo.debug("dojo.namespace.require: re-entrant request to load namespace \""+name+"\" must fail.");
return false;
}
var req=dojo.require;
this.loading[name]=true;
try{
if(name=="dojo"){
req("dojo.namespaces.dojo");
}else{
if(!dojo.hostenv.moduleHasPrefix(name)){
dojo.registerModulePath(name,"../"+name);
}
req([name,"manifest"].join("."),false,true);
}
if(!this.namespaces[name]){
this.failed[name]=true;
}
}
finally{
this.loading[name]=false;
}
return this.namespaces[name];
}};
dojo.ns.Ns=function(name,_315,_316){
this.name=name;
this.module=_315;
this.resolver=_316;
this._loaded=[];
this._failed=[];
};
dojo.ns.Ns.prototype.resolve=function(name,_317,_318){
if(!this.resolver||djConfig["skipAutoRequire"]){
return false;
}
var _319=this.resolver(name,_317);
if((_319)&&(!this._loaded[_319])&&(!this._failed[_319])){
var req=dojo.require;
req(_319,false,true);
if(dojo.hostenv.findModule(_319,false)){
this._loaded[_319]=true;
}else{
if(!_318){
dojo.raise("dojo.ns.Ns.resolve: module '"+_319+"' not found after loading via namespace '"+this.name+"'");
}
this._failed[_319]=true;
}
}
return Boolean(this._loaded[_319]);
};
dojo.registerNamespace=function(name,_31a,_31b){
dojo.ns.register.apply(dojo.ns,arguments);
};
dojo.registerNamespaceResolver=function(name,_31c){
var n=dojo.ns.namespaces[name];
if(n){
n.resolver=_31c;
}
};
dojo.registerNamespaceManifest=function(_31d,path,name,_31e,_31f){
dojo.registerModulePath(name,path);
dojo.registerNamespace(name,_31e,_31f);
};
dojo.registerNamespace("dojo","dojo.widget");
dojo.provide("dojo.widget.Manager");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _320={};
var _321=[];
this.getUniqueId=function(_322){
var _323;
do{
_323=_322+"_"+(_320[_322]!=undefined?++_320[_322]:_320[_322]=0);
}while(this.getWidgetById(_323));
return _323;
};
this.add=function(_324){
this.widgets.push(_324);
if(!_324.extraArgs["id"]){
_324.extraArgs["id"]=_324.extraArgs["ID"];
}
if(_324.widgetId==""){
if(_324["id"]){
_324.widgetId=_324["id"];
}else{
if(_324.extraArgs["id"]){
_324.widgetId=_324.extraArgs["id"];
}else{
_324.widgetId=this.getUniqueId(_324.ns+"_"+_324.widgetType);
}
}
}
if(this.widgetIds[_324.widgetId]){
dojo.debug("widget ID collision on ID: "+_324.widgetId);
}
this.widgetIds[_324.widgetId]=_324;
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_325){
if(dojo.lang.isNumber(_325)){
var tw=this.widgets[_325].widgetId;
delete this.widgetIds[tw];
this.widgets.splice(_325,1);
}else{
this.removeById(_325);
}
};
this.removeById=function(id){
if(!dojo.lang.isString(id)){
id=id["widgetId"];
if(!id){
dojo.debug("invalid widget or id passed to removeById");
return;
}
}
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
if(dojo.lang.isString(id)){
return this.widgetIds[id];
}
return id;
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var _326=(type.indexOf(":")<0?function(x){
return x.widgetType.toLowerCase();
}:function(x){
return x.getNamespacedType();
});
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(_326(x)==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsByFilter=function(_327,_328){
var ret=[];
dojo.lang.every(this.widgets,function(x){
if(_327(x)){
ret.push(x);
if(_328){
return false;
}
}
return true;
});
return (_328?ret[0]:ret);
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.getWidgetByNode=function(node){
var w=this.getAllWidgets();
node=dojo.byId(node);
for(var i=0;i<w.length;i++){
if(w[i].domNode==node){
return w[i];
}
}
return null;
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
this.byNode=this.getWidgetByNode;
var _329={};
var _32a=["dojo.widget"];
for(var i=0;i<_32a.length;i++){
_32a[_32a[i]]=true;
}
this.registerWidgetPackage=function(_32b){
if(!_32a[_32b]){
_32a[_32b]=true;
_32a.push(_32b);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_32a,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_32c,_32d,_32e,ns){
var impl=this.getImplementationName(_32c,ns);
if(impl){
var ret=_32d?new impl(_32d):new impl();
return ret;
}
};
function _32f(){
for(var _330 in dojo.render){
if(dojo.render[_330]["capable"]===true){
var _331=dojo.render[_330].prefixes;
for(var i=0;i<_331.length;i++){
_321.push(_331[i].toLowerCase());
}
}
}
};
var _332=function(_333,_334){
if(!_334){
return null;
}
for(var i=0,l=_321.length,_335;i<=l;i++){
_335=(i<l?_334[_321[i]]:_334);
if(!_335){
continue;
}
for(var name in _335){
if(name.toLowerCase()==_333){
return _335[name];
}
}
}
return null;
};
var _336=function(_337,_338){
var _339=dojo.evalObjPath(_338,false);
return (_339?_332(_337,_339):null);
};
this.getImplementationName=function(_33a,ns){
var _33b=_33a.toLowerCase();
ns=ns||"dojo";
var imps=_329[ns]||(_329[ns]={});
var impl=imps[_33b];
if(impl){
return impl;
}
if(!_321.length){
_32f();
}
var _33c=dojo.ns.get(ns);
if(!_33c){
dojo.ns.register(ns,ns+".widget");
_33c=dojo.ns.get(ns);
}
if(_33c){
_33c.resolve(_33a);
}
impl=_336(_33b,_33c.module);
if(impl){
return (imps[_33b]=impl);
}
_33c=dojo.ns.require(ns);
if((_33c)&&(_33c.resolver)){
_33c.resolve(_33a);
impl=_336(_33b,_33c.module);
if(impl){
return (imps[_33b]=impl);
}
}
dojo.deprecated("dojo.widget.Manager.getImplementationName","Could not locate widget implementation for \""+_33a+"\" in \""+_33c.module+"\" registered to namespace \""+_33c.name+"\". "+"Developers must specify correct namespaces for all non-Dojo widgets","0.5");
for(var i=0;i<_32a.length;i++){
impl=_336(_33b,_32a[i]);
if(impl){
return (imps[_33b]=impl);
}
}
throw new Error("Could not locate widget implementation for \""+_33a+"\" in \""+_33c.module+"\" registered to namespace \""+_33c.name+"\"");
};
this.resizing=false;
this.onWindowResized=function(){
if(this.resizing){
return;
}
try{
this.resizing=true;
for(var id in this.topWidgets){
var _33d=this.topWidgets[id];
if(_33d.checkSize){
_33d.checkSize();
}
}
}
catch(e){
}
finally{
this.resizing=false;
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
};
(function(){
var dw=dojo.widget;
var dwm=dw.manager;
var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
var g=function(_33e,_33f){
dw[(_33f||_33e)]=h(_33e);
};
g("add","addWidget");
g("destroyAll","destroyAllWidgets");
g("remove","removeWidget");
g("removeById","removeWidgetById");
g("getWidgetById");
g("getWidgetById","byId");
g("getWidgetsByType");
g("getWidgetsByFilter");
g("getWidgetsByType","byType");
g("getWidgetsByFilter","byFilter");
g("getWidgetByNode","byNode");
dw.all=function(n){
var _340=dwm.getAllWidgets.apply(dwm,arguments);
if(arguments.length>0){
return _340[n];
}
return _340;
};
g("registerWidgetPackage");
g("getImplementation","getWidgetImplementation");
g("getImplementationName","getWidgetImplementationName");
dw.widgets=dwm.widgets;
dw.widgetIds=dwm.widgetIds;
dw.root=dwm.root;
})();
dojo.provide("dojo.uri.*");
dojo.provide("dojo.a11y");
dojo.a11y={imgPath:dojo.uri.dojoUri("src/widget/templates/images"),doAccessibleCheck:true,accessible:null,checkAccessible:function(){
if(this.accessible===null){
this.accessible=false;
if(this.doAccessibleCheck==true){
this.accessible=this.testAccessible();
}
}
return this.accessible;
},testAccessible:function(){
this.accessible=false;
if(dojo.render.html.ie||dojo.render.html.mozilla){
var div=document.createElement("div");
div.style.backgroundImage="url(\""+this.imgPath+"/tab_close.gif\")";
dojo.body().appendChild(div);
var _341=null;
if(window.getComputedStyle){
var _342=getComputedStyle(div,"");
_341=_342.getPropertyValue("background-image");
}else{
_341=div.currentStyle.backgroundImage;
}
var _343=false;
if(_341!=null&&(_341=="none"||_341=="url(invalid-url:)")){
this.accessible=true;
}
dojo.body().removeChild(div);
}
return this.accessible;
},setCheckAccessible:function(_344){
this.doAccessibleCheck=_344;
},setAccessibleMode:function(){
if(this.accessible===null){
if(this.checkAccessible()){
dojo.render.html.prefixes.unshift("a11y");
}
}
return this.accessible;
}};
dojo.provide("dojo.widget.Widget");
dojo.declare("dojo.widget.Widget",null,function(){
this.children=[];
this.extraArgs={};
},{parent:null,isTopLevel:false,disabled:false,isContainer:false,widgetId:"",widgetType:"Widget",ns:"dojo",getNamespacedType:function(){
return (this.ns?this.ns+":"+this.widgetType:this.widgetType).toLowerCase();
},toString:function(){
return "[Widget "+this.getNamespacedType()+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.disabled=false;
},disable:function(){
this.disabled=true;
},onResized:function(){
this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
for(var i=0;i<this.children.length;i++){
var _345=this.children[i];
if(_345.onResized){
_345.onResized();
}
}
},create:function(args,_346,_347,ns){
if(ns){
this.ns=ns;
}
this.satisfyPropertySets(args,_346,_347);
this.mixInProperties(args,_346,_347);
this.postMixInProperties(args,_346,_347);
dojo.widget.manager.add(this);
this.buildRendering(args,_346,_347);
this.initialize(args,_346,_347);
this.postInitialize(args,_346,_347);
this.postCreate(args,_346,_347);
return this;
},destroy:function(_348){
if(this.parent){
this.parent.removeChild(this);
}
this.destroyChildren();
this.uninitialize();
this.destroyRendering(_348);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
var _349;
var i=0;
while(this.children.length>i){
_349=this.children[i];
if(_349 instanceof dojo.widget.Widget){
this.removeChild(_349);
_349.destroy();
continue;
}
i++;
}
},getChildrenOfType:function(type,_34a){
var ret=[];
var _34b=dojo.lang.isFunction(type);
if(!_34b){
type=type.toLowerCase();
}
for(var x=0;x<this.children.length;x++){
if(_34b){
if(this.children[x] instanceof type){
ret.push(this.children[x]);
}
}else{
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
}
if(_34a){
ret=ret.concat(this.children[x].getChildrenOfType(type,_34a));
}
}
return ret;
},getDescendants:function(){
var _34c=[];
var _34d=[this];
var elem;
while((elem=_34d.pop())){
_34c.push(elem);
if(elem.children){
dojo.lang.forEach(elem.children,function(elem){
_34d.push(elem);
});
}
}
return _34c;
},isFirstChild:function(){
return this===this.parent.children[0];
},isLastChild:function(){
return this===this.parent.children[this.parent.children.length-1];
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _34e;
var _34f=dojo.widget.lcArgsCache[this.widgetType];
if(_34f==null){
_34f={};
for(var y in this){
_34f[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_34f;
}
var _350={};
for(var x in args){
if(!this[x]){
var y=_34f[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_350[x]){
continue;
}
_350[x]=true;
if((typeof this[x])!=(typeof _34e)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
if(args[x].search(/[^\w\.]+/i)==-1){
this[x]=dojo.evalObjPath(args[x],false);
}else{
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.kwConnect({srcObj:this,srcFunc:x,adviceObj:this,adviceFunc:tn});
}
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
if(this[x] instanceof dojo.uri.Uri){
this[x]=dojo.uri.dojoUri(args[x]);
}else{
var _351=args[x].split(";");
for(var y=0;y<_351.length;y++){
var si=_351[y].indexOf(":");
if((si!=-1)&&(_351[y].length>si)){
this[x][_351[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_351[y].substr(si+1);
}
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x.toLowerCase()]=args[x];
}
}
},postMixInProperties:function(args,frag,_352){
},initialize:function(args,frag,_353){
return false;
},postInitialize:function(args,frag,_354){
return false;
},postCreate:function(args,frag,_355){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(args,frag,_356){
dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dojo.unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},addedTo:function(_357){
},addChild:function(_358){
dojo.unimplemented("dojo.widget.Widget.addChild");
return false;
},removeChild:function(_359){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_359){
this.children.splice(x,1);
_359.parent=null;
break;
}
}
return _359;
},getPreviousSibling:function(){
var idx=this.getParentIndex();
if(idx<=0){
return null;
}
return this.parent.children[idx-1];
},getSiblings:function(){
return this.parent.children;
},getParentIndex:function(){
return dojo.lang.indexOf(this.parent.children,this,true);
},getNextSibling:function(){
var idx=this.getParentIndex();
if(idx==this.parent.children.length-1){
return null;
}
if(idx<0){
return null;
}
return this.parent.children[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
dojo.deprecated("addParseTreeHandler",". ParseTreeHandlers are now reserved for components. Any unfiltered DojoML tag without a ParseTreeHandler is assumed to be a widget","0.5");
};
dojo.widget.tags["dojo:propertyset"]=function(_35a,_35b,_35c){
var _35d=_35b.parseProperties(_35a["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_35e,_35f,_360){
var _361=_35f.parseProperties(_35e["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_362,_363,_364,_365){
dojo.a11y.setAccessibleMode();
var _366=type.split(":");
_366=(_366.length==2)?_366[1]:type;
var _367=_365||_362.parseProperties(frag[frag["ns"]+":"+_366]);
var _368=dojo.widget.manager.getImplementation(_366,null,null,frag["ns"]);
if(!_368){
throw new Error("cannot find \""+type+"\" widget");
}else{
if(!_368.create){
throw new Error("\""+type+"\" widget object has no \"create\" method and does not appear to implement *Widget");
}
}
_367["dojoinsertionindex"]=_364;
var ret=_368.create(_367,frag,_363,frag["ns"]);
return ret;
};
dojo.widget.defineWidget=function(_369,_36a,_36b,init,_36c){
if(dojo.lang.isString(arguments[3])){
dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
}else{
var args=[arguments[0]],p=3;
if(dojo.lang.isString(arguments[1])){
args.push(arguments[1],arguments[2]);
}else{
args.push("",arguments[1]);
p=2;
}
if(dojo.lang.isFunction(arguments[p])){
args.push(arguments[p],arguments[p+1]);
}else{
args.push(null,arguments[p]);
}
dojo.widget._defineWidget.apply(this,args);
}
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_36d,_36e,_36f,init,_370){
var _371=_36d.split(".");
var type=_371.pop();
var regx="\\.("+(_36e?_36e+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
var r=_36d.search(new RegExp(regx));
_371=(r<0?_371.join("."):_36d.substr(0,r));
dojo.widget.manager.registerWidgetPackage(_371);
var pos=_371.indexOf(".");
var _372=(pos>-1)?_371.substring(0,pos):_371;
_370=(_370)||{};
_370.widgetType=type;
if((!init)&&(_370["classConstructor"])){
init=_370.classConstructor;
delete _370.classConstructor;
}
dojo.declare(_36d,_36f,init,_370);
};
dojo.provide("dojo.widget.Parse");
dojo.widget.Parse=function(_373){
this.propertySetsList=[];
this.fragment=_373;
this.createComponents=function(frag,_374){
var _375=[];
var _376=false;
try{
if(frag&&frag.tagName&&(frag!=frag.nodeRef)){
var _377=dojo.widget.tags;
var tna=String(frag.tagName).split(";");
for(var x=0;x<tna.length;x++){
var ltn=tna[x].replace(/^\s+|\s+$/g,"").toLowerCase();
frag.tagName=ltn;
var ret;
if(_377[ltn]){
_376=true;
ret=_377[ltn](frag,this,_374,frag.index);
_375.push(ret);
}else{
if(ltn.indexOf(":")==-1){
ltn="dojo:"+ltn;
}
ret=dojo.widget.buildWidgetFromParseTree(ltn,frag,this,_374,frag.index);
if(ret){
_376=true;
_375.push(ret);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!_376){
_375=_375.concat(this.createSubComponents(frag,_374));
}
return _375;
};
this.createSubComponents=function(_378,_379){
var frag,_37a=[];
for(var item in _378){
frag=_378[item];
if(frag&&typeof frag=="object"&&(frag!=_378.nodeRef)&&(frag!=_378.tagName)&&(!dojo.dom.isNode(frag))){
_37a=_37a.concat(this.createComponents(frag,_379));
}
}
return _37a;
};
this.parsePropertySets=function(_37b){
return [];
};
this.parseProperties=function(_37c){
var _37d={};
for(var item in _37c){
if((_37c[item]==_37c.tagName)||(_37c[item]==_37c.nodeRef)){
}else{
var frag=_37c[item];
if(frag.tagName&&dojo.widget.tags[frag.tagName.toLowerCase()]){
}else{
if(frag[0]&&frag[0].value!=""&&frag[0].value!=null){
try{
if(item.toLowerCase()=="dataprovider"){
var _37e=this;
this.getDataProvider(_37e,frag[0].value);
_37d.dataProvider=this.dataProvider;
}
_37d[item]=frag[0].value;
var _37f=this.parseProperties(frag);
for(var _380 in _37f){
_37d[_380]=_37f[_380];
}
}
catch(e){
dojo.debug(e);
}
}
}
switch(item.toLowerCase()){
case "checked":
case "disabled":
if(typeof _37d[item]!="boolean"){
_37d[item]=true;
}
break;
}
}
}
return _37d;
};
this.getDataProvider=function(_381,_382){
dojo.io.bind({url:_382,load:function(type,_383){
if(type=="load"){
_381.dataProvider=_383;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_384){
for(var x=0;x<this.propertySetsList.length;x++){
if(_384==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_385){
var _386=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl.componentClass||cpl.componentType||null;
var _387=this.propertySetsList[x]["id"][0].value;
if(cpcc&&(_387==cpcc[0].value)){
_386.push(cpl);
}
}
return _386;
};
this.getPropertySets=function(_388){
var ppl="dojo:propertyproviderlist";
var _389=[];
var _38a=_388.tagName;
if(_388[ppl]){
var _38b=_388[ppl].value.split(" ");
for(var _38c in _38b){
if((_38c.indexOf("..")==-1)&&(_38c.indexOf("://")==-1)){
var _38d=this.getPropertySetById(_38c);
if(_38d!=""){
_389.push(_38d);
}
}else{
}
}
}
return this.getPropertySetsByType(_38a).concat(_389);
};
this.createComponentFromScript=function(_38e,_38f,_390,ns){
_390.fastMixIn=true;
var ltn=(ns||"dojo")+":"+_38f.toLowerCase();
if(dojo.widget.tags[ltn]){
return [dojo.widget.tags[ltn](_390,this,null,null,_390)];
}
return [dojo.widget.buildWidgetFromParseTree(ltn,_390,this,null,null,_390)];
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_391,_392,_393){
var _394=false;
var _395=(typeof name=="string");
if(_395){
var pos=name.indexOf(":");
var ns=(pos>-1)?name.substring(0,pos):"dojo";
if(pos>-1){
name=name.substring(pos+1);
}
var _396=name.toLowerCase();
var _397=ns+":"+_396;
_394=(dojo.byId(name)&&!dojo.widget.tags[_397]);
}
if((arguments.length==1)&&(_394||!_395)){
var xp=new dojo.xml.Parse();
var tn=_394?dojo.byId(name):name;
return dojo.widget.getParser().createComponents(xp.parseElement(tn,null,true))[0];
}
function _398(_399,name,_39a,ns){
_39a[_397]={dojotype:[{value:_396}],nodeRef:_399,fastMixIn:true};
_39a.ns=ns;
return dojo.widget.getParser().createComponentFromScript(_399,name,_39a,ns);
};
_391=_391||{};
var _39b=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_392){
_39b=true;
_392=tn;
if(h){
dojo.body().appendChild(_392);
}
}else{
if(_393){
dojo.dom.insertAtPosition(tn,_392,_393);
}else{
tn=_392;
}
}
var _39c=_398(tn,name.toLowerCase(),_391,ns);
if((!_39c)||(!_39c[0])||(typeof _39c[0].widgetType=="undefined")){
throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
}
try{
if(_39b&&_39c[0].domNode.parentNode){
_39c[0].domNode.parentNode.removeChild(_39c[0].domNode);
}
}
catch(e){
dojo.debug(e);
}
return _39c[0];
};
dojo.provide("dojo.widget.DomWidget");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.fillFromTemplateCache=function(obj,_39d,_39e,_39f){
var _3a0=_39d||obj.templatePath;
var _3a1=dojo.widget._templateCache;
if(!_3a0&&!obj["widgetType"]){
do{
var _3a2="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
}while(_3a1[_3a2]);
obj.widgetType=_3a2;
}
var wt=_3a0?_3a0.toString():obj.widgetType;
var ts=_3a1[wt];
if(!ts){
_3a1[wt]={"string":null,"node":null};
if(_39f){
ts={};
}else{
ts=_3a1[wt];
}
}
if((!obj.templateString)&&(!_39f)){
obj.templateString=_39e||ts["string"];
}
if((!obj.templateNode)&&(!_39f)){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_3a0)){
var _3a3=dojo.hostenv.getText(_3a0);
if(_3a3){
_3a3=_3a3.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _3a4=_3a3.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_3a4){
_3a3=_3a4[1];
}
}else{
_3a3="";
}
obj.templateString=_3a3;
if(!_39f){
_3a1[wt]["string"]=_3a3;
}
}
if((!ts["string"])&&(!_39f)){
ts.string=obj.templateString;
}
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole","namespace":"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:"},waiState:{name:"waiState","namespace":"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:""},setAttr:function(node,ns,attr,_3a5){
if(dojo.render.html.ie){
node.setAttribute(this[ns].alias+":"+attr,this[ns].prefix+_3a5);
}else{
node.setAttributeNS(this[ns]["namespace"],attr,this[ns].prefix+_3a5);
}
},getAttr:function(node,ns,attr){
if(dojo.render.html.ie){
return node.getAttribute(this[ns].alias+":"+attr);
}else{
return node.getAttributeNS(this[ns]["namespace"],attr);
}
},removeAttr:function(node,ns,attr){
var _3a6=true;
if(dojo.render.html.ie){
_3a6=node.removeAttribute(this[ns].alias+":"+attr);
}else{
node.removeAttributeNS(this[ns]["namespace"],attr);
}
return _3a6;
}};
dojo.widget.attachTemplateNodes=function(_3a7,_3a8,_3a9){
var _3aa=dojo.dom.ELEMENT_NODE;
function trim(str){
return str.replace(/^\s+|\s+$/g,"");
};
if(!_3a7){
_3a7=_3a8.domNode;
}
if(_3a7.nodeType!=_3aa){
return;
}
var _3ab=_3a7.all||_3a7.getElementsByTagName("*");
var _3ac=_3a8;
for(var x=-1;x<_3ab.length;x++){
var _3ad=(x==-1)?_3a7:_3ab[x];
var _3ae=[];
if(!_3a8.widgetsInTemplate||!_3ad.getAttribute("dojoType")){
for(var y=0;y<this.attachProperties.length;y++){
var _3af=_3ad.getAttribute(this.attachProperties[y]);
if(_3af){
_3ae=_3af.split(";");
for(var z=0;z<_3ae.length;z++){
if(dojo.lang.isArray(_3a8[_3ae[z]])){
_3a8[_3ae[z]].push(_3ad);
}else{
_3a8[_3ae[z]]=_3ad;
}
}
break;
}
}
var _3b0=_3ad.getAttribute(this.eventAttachProperty);
if(_3b0){
var evts=_3b0.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _3b1=null;
var tevt=trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _3b2=tevt.split(":");
tevt=trim(_3b2[0]);
_3b1=trim(_3b2[1]);
}
if(!_3b1){
_3b1=tevt;
}
var tf=function(){
var ntf=new String(_3b1);
return function(evt){
if(_3ac[ntf]){
_3ac[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_3ad,tevt,tf,false,true);
}
}
for(var y=0;y<_3a9.length;y++){
var _3b3=_3ad.getAttribute(_3a9[y]);
if((_3b3)&&(_3b3.length)){
var _3b1=null;
var _3b4=_3a9[y].substr(4);
_3b1=trim(_3b3);
var _3b5=[_3b1];
if(_3b1.indexOf(";")>=0){
_3b5=dojo.lang.map(_3b1.split(";"),trim);
}
for(var z=0;z<_3b5.length;z++){
if(!_3b5[z].length){
continue;
}
var tf=function(){
var ntf=new String(_3b5[z]);
return function(evt){
if(_3ac[ntf]){
_3ac[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_3ad,_3b4,tf,false,true);
}
}
}
}
var _3b6=_3ad.getAttribute(this.templateProperty);
if(_3b6){
_3a8[_3b6]=_3ad;
}
dojo.lang.forEach(dojo.widget.waiNames,function(name){
var wai=dojo.widget.wai[name];
var val=_3ad.getAttribute(wai.name);
if(val){
if(val.indexOf("-")==-1){
dojo.widget.wai.setAttr(_3ad,wai.name,"role",val);
}else{
var _3b7=val.split("-");
dojo.widget.wai.setAttr(_3ad,wai.name,_3b7[0],_3b7[1]);
}
}
},this);
var _3b8=_3ad.getAttribute(this.onBuildProperty);
if(_3b8){
eval("var node = baseNode; var widget = targetObj; "+_3b8);
}
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].length<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,function(){
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
},{templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,widgetsInTemplate:false,addChild:function(_3b9,_3ba,pos,ref,_3bb){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
if(_3bb==undefined){
_3bb=this.children.length;
}
this.addWidgetAsDirectChild(_3b9,_3ba,pos,ref,_3bb);
this.registerChild(_3b9,_3bb);
}
return _3b9;
},addWidgetAsDirectChild:function(_3bc,_3bd,pos,ref,_3be){
if((!this.containerNode)&&(!_3bd)){
this.containerNode=this.domNode;
}
var cn=(_3bd)?_3bd:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
if(!cn){
cn=dojo.body();
}
ref=cn.lastChild;
}
if(!_3be){
_3be=0;
}
_3bc.domNode.setAttribute("dojoinsertionindex",_3be);
if(!ref){
cn.appendChild(_3bc.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_3bc.domNode,ref.parentNode,_3be);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_3bc.domNode);
}else{
dojo.dom.insertAtPosition(_3bc.domNode,cn,pos);
}
}
}
},registerChild:function(_3bf,_3c0){
_3bf.dojoInsertionIndex=_3c0;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<=_3c0){
idx=i;
}
}
this.children.splice(idx+1,0,_3bf);
_3bf.parent=this;
_3bf.addedTo(this,idx+1);
delete dojo.widget.manager.topWidgets[_3bf.widgetId];
},removeChild:function(_3c1){
dojo.dom.removeNode(_3c1.domNode);
return dojo.widget.DomWidget.superclass.removeChild.call(this,_3c1);
},getFragNodeRef:function(frag){
if(!frag){
return null;
}
if(!frag[this.getNamespacedType()]){
dojo.raise("Error: no frag for widget type "+this.getNamespacedType()+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return frag[this.getNamespacedType()]["nodeRef"];
},postInitialize:function(args,frag,_3c2){
var _3c3=this.getFragNodeRef(frag);
if(_3c2&&(_3c2.snarfChildDomOutput||!_3c3)){
_3c2.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_3c3);
}else{
if(_3c3){
if(this.domNode&&(this.domNode!==_3c3)){
this._sourceNodeRef=dojo.dom.replaceNode(_3c3,this.domNode);
}
}
}
if(_3c2){
_3c2.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.widgetsInTemplate){
var _3c4=new dojo.xml.Parse();
var _3c5;
var _3c6=this.domNode.getElementsByTagName("*");
for(var i=0;i<_3c6.length;i++){
if(_3c6[i].getAttribute("dojoAttachPoint")=="subContainerWidget"){
_3c5=_3c6[i];
}
if(_3c6[i].getAttribute("dojoType")){
_3c6[i].setAttribute("isSubWidget",true);
}
}
if(this.isContainer&&!this.containerNode){
if(_3c5){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,_3c5);
frag["dojoDontFollow"]=true;
}
}else{
dojo.debug("No subContainerWidget node can be found in template file for widget "+this);
}
}
var _3c7=_3c4.parseElement(this.domNode,null,true);
dojo.widget.getParser().createSubComponents(_3c7,this);
var _3c8=[];
var _3c9=[this];
var w;
while((w=_3c9.pop())){
for(var i=0;i<w.children.length;i++){
var _3ca=w.children[i];
if(_3ca._processedSubWidgets||!_3ca.extraArgs["issubwidget"]){
continue;
}
_3c8.push(_3ca);
if(_3ca.isContainer){
_3c9.push(_3ca);
}
}
}
for(var i=0;i<_3c8.length;i++){
var _3cb=_3c8[i];
if(_3cb._processedSubWidgets){
dojo.debug("This should not happen: widget._processedSubWidgets is already true!");
return;
}
_3cb._processedSubWidgets=true;
if(_3cb.extraArgs["dojoattachevent"]){
var evts=_3cb.extraArgs["dojoattachevent"].split(";");
for(var j=0;j<evts.length;j++){
var _3cc=null;
var tevt=dojo.string.trim(evts[j]);
if(tevt.indexOf(":")>=0){
var _3cd=tevt.split(":");
tevt=dojo.string.trim(_3cd[0]);
_3cc=dojo.string.trim(_3cd[1]);
}
if(!_3cc){
_3cc=tevt;
}
if(dojo.lang.isFunction(_3cb[tevt])){
dojo.event.kwConnect({srcObj:_3cb,srcFunc:tevt,targetObj:this,targetFunc:_3cc});
}else{
alert(tevt+" is not a function in widget "+_3cb);
}
}
}
if(_3cb.extraArgs["dojoattachpoint"]){
this[_3cb.extraArgs["dojoattachpoint"]]=_3cb;
}
}
}
if(this.isContainer&&!frag["dojoDontFollow"]){
dojo.widget.getParser().createSubComponents(frag,this);
}
},buildRendering:function(args,frag){
var ts=dojo.widget._templateCache[this.widgetType];
if(args["templatecsspath"]){
args["templateCssPath"]=args["templatecsspath"];
}
var _3ce=args["templateCssPath"]||this.templateCssPath;
if(_3ce&&!dojo.widget._cssFiles[_3ce.toString()]){
if((!this.templateCssString)&&(_3ce)){
this.templateCssString=dojo.hostenv.getText(_3ce);
this.templateCssPath=null;
}
dojo.widget._cssFiles[_3ce.toString()]=true;
}
if((this["templateCssString"])&&(!dojo.widget._cssStrings[this.templateCssString])){
dojo.html.insertCssText(this.templateCssString,null,_3ce);
dojo.widget._cssStrings[this.templateCssString]=true;
}
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var _3cf=false;
if(args["templatepath"]){
args["templatePath"]=args["templatepath"];
}
dojo.widget.fillFromTemplateCache(this,args["templatePath"],null,_3cf);
var ts=dojo.widget._templateCache[this.templatePath?this.templatePath.toString():this.widgetType];
if((ts)&&(!_3cf)){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _3d0=false;
var node=null;
var tstr=this.templateString;
if((!this.templateNode)&&(this.templateString)){
_3d0=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_3d0){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_3d0.length;i++){
var key=_3d0[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
var _3d1;
if((kval)||(dojo.lang.isString(kval))){
_3d1=new String((dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval);
while(_3d1.indexOf("\"")>-1){
_3d1=_3d1.replace("\"","&quot;");
}
tstr=tstr.replace(_3d0[i],_3d1);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
if(!_3cf){
ts.node=this.templateNode;
}
}
}
if((!this.templateNode)&&(!_3d0)){
dojo.debug("DomWidget.buildFromTemplate: could not create template");
return false;
}else{
if(!_3d0){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes();
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_3d2,_3d3){
if(!_3d2){
_3d2=this.domNode;
}
if(!_3d3){
_3d3=this;
}
return dojo.widget.attachTemplateNodes(_3d2,_3d3,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
dojo.dom.destroyNode(this.domNode);
delete this.domNode;
}
catch(e){
}
if(this._sourceNodeRef){
try{
dojo.dom.destroyNode(this._sourceNodeRef);
}
catch(e){
}
}
},createNodesFromText:function(){
dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.gfx.color");
dojo.gfx.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.gfx.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.gfx.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.gfx.color.Color.fromArray=function(arr){
return new dojo.gfx.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.extend(dojo.gfx.color.Color,{toRgb:function(_3d4){
if(_3d4){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.gfx.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},blend:function(_3d5,_3d6){
var rgb=null;
if(dojo.lang.isArray(_3d5)){
rgb=_3d5;
}else{
if(_3d5 instanceof dojo.gfx.color.Color){
rgb=_3d5.toRgb();
}else{
rgb=new dojo.gfx.color.Color(_3d5).toRgb();
}
}
return dojo.gfx.color.blend(this.toRgb(),rgb,_3d6);
}});
dojo.gfx.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],lime:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.gfx.color.blend=function(a,b,_3d7){
if(typeof a=="string"){
return dojo.gfx.color.blendHex(a,b,_3d7);
}
if(!_3d7){
_3d7=0;
}
_3d7=Math.min(Math.max(-1,_3d7),1);
_3d7=((_3d7+1)/2);
var c=[];
for(var x=0;x<3;x++){
c[x]=parseInt(b[x]+((a[x]-b[x])*_3d7));
}
return c;
};
dojo.gfx.color.blendHex=function(a,b,_3d8){
return dojo.gfx.color.rgb2hex(dojo.gfx.color.blend(dojo.gfx.color.hex2rgb(a),dojo.gfx.color.hex2rgb(b),_3d8));
};
dojo.gfx.color.extractRGB=function(_3d9){
var hex="0123456789abcdef";
_3d9=_3d9.toLowerCase();
if(_3d9.indexOf("rgb")==0){
var _3da=_3d9.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_3da.splice(1,3);
return ret;
}else{
var _3db=dojo.gfx.color.hex2rgb(_3d9);
if(_3db){
return _3db;
}else{
return dojo.gfx.color.named[_3d9]||[255,255,255];
}
}
};
dojo.gfx.color.hex2rgb=function(hex){
var _3dc="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_3dc+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_3dc.indexOf(rgb[i].charAt(0))*16+_3dc.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.gfx.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
var ret=dojo.lang.map([r,g,b],function(x){
x=new Number(x);
var s=x.toString(16);
while(s.length<2){
s="0"+s;
}
return s;
});
ret.unshift("#");
return ret.join("");
};
dojo.provide("dojo.lfx.Animation");
dojo.lfx.Line=function(_3dd,end){
this.start=_3dd;
this.end=end;
if(dojo.lang.isArray(_3dd)){
var diff=[];
dojo.lang.forEach(this.start,function(s,i){
diff[i]=this.end[i]-s;
},this);
this.getValue=function(n){
var res=[];
dojo.lang.forEach(this.start,function(s,i){
res[i]=(diff[i]*n)+s;
},this);
return res;
};
}else{
var diff=end-_3dd;
this.getValue=function(n){
return (diff*n)+this.start;
};
}
};
dojo.lfx.easeDefault=function(n){
if(dojo.render.html.khtml){
return (parseFloat("0.5")+((Math.sin((n+parseFloat("1.5"))*Math.PI))/2));
}else{
return (0.5+((Math.sin((n+1.5)*Math.PI))/2));
}
};
dojo.lfx.easeIn=function(n){
return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:25,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,connect:function(evt,_3de,_3df){
if(!_3df){
_3df=_3de;
_3de=this;
}
_3df=dojo.lang.hitch(_3de,_3df);
var _3e0=this[evt]||function(){
};
this[evt]=function(){
var ret=_3e0.apply(this,arguments);
_3df.apply(this,arguments);
return ret;
};
return this;
},fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,(args||[]));
}
return this;
},repeat:function(_3e1){
this.repeatCount=_3e1;
return this;
},_active:false,_paused:false});
dojo.lfx.Animation=function(_3e2,_3e3,_3e4,_3e5,_3e6,rate){
dojo.lfx.IAnimation.call(this);
if(dojo.lang.isNumber(_3e2)||(!_3e2&&_3e3.getValue)){
rate=_3e6;
_3e6=_3e5;
_3e5=_3e4;
_3e4=_3e3;
_3e3=_3e2;
_3e2=null;
}else{
if(_3e2.getValue||dojo.lang.isArray(_3e2)){
rate=_3e5;
_3e6=_3e4;
_3e5=_3e3;
_3e4=_3e2;
_3e3=null;
_3e2=null;
}
}
if(dojo.lang.isArray(_3e4)){
this.curve=new dojo.lfx.Line(_3e4[0],_3e4[1]);
}else{
this.curve=_3e4;
}
if(_3e3!=null&&_3e3>0){
this.duration=_3e3;
}
if(_3e6){
this.repeatCount=_3e6;
}
if(rate){
this.rate=rate;
}
if(_3e2){
dojo.lang.forEach(["handler","beforeBegin","onBegin","onEnd","onPlay","onStop","onAnimate"],function(item){
if(_3e2[item]){
this.connect(item,_3e2[item]);
}
},this);
}
if(_3e5&&dojo.lang.isFunction(_3e5)){
this.easing=_3e5;
}
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_3e7,_3e8){
if(_3e8){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return this;
}
}
this.fire("handler",["beforeBegin"]);
this.fire("beforeBegin");
if(_3e7>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_3e8);
}),_3e7);
return this;
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._active=true;
this._paused=false;
var step=this._percent/100;
var _3e9=this.curve.getValue(step);
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
this.fire("handler",["begin",_3e9]);
this.fire("onBegin",[_3e9]);
}
this.fire("handler",["play",_3e9]);
this.fire("onPlay",[_3e9]);
this._cycle();
return this;
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return this;
}
this._paused=true;
var _3ea=this.curve.getValue(this._percent/100);
this.fire("handler",["pause",_3ea]);
this.fire("onPause",[_3ea]);
return this;
},gotoPercent:function(pct,_3eb){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_3eb){
this.play();
}
return this;
},stop:function(_3ec){
clearTimeout(this._timer);
var step=this._percent/100;
if(_3ec){
step=1;
}
var _3ed=this.curve.getValue(step);
this.fire("handler",["stop",_3ed]);
this.fire("onStop",[_3ed]);
this._active=false;
this._paused=false;
return this;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
return this;
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if((this.easing)&&(dojo.lang.isFunction(this.easing))){
step=this.easing(step);
}
var _3ee=this.curve.getValue(step);
this.fire("handler",["animate",_3ee]);
this.fire("onAnimate",[_3ee]);
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
this._active=false;
this.fire("handler",["end"]);
this.fire("onEnd");
if(this.repeatCount>0){
this.repeatCount--;
this.play(null,true);
}else{
if(this.repeatCount==-1){
this.play(null,true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
}
}
}
}
return this;
}});
dojo.lfx.Combine=function(_3ef){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._animsEnded=0;
var _3f0=arguments;
if(_3f0.length==1&&(dojo.lang.isArray(_3f0[0])||dojo.lang.isArrayLike(_3f0[0]))){
_3f0=_3f0[0];
}
dojo.lang.forEach(_3f0,function(anim){
this._anims.push(anim);
anim.connect("onEnd",dojo.lang.hitch(this,"_onAnimsEnded"));
},this);
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_3f1,_3f2){
if(!this._anims.length){
return this;
}
this.fire("beforeBegin");
if(_3f1>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_3f2);
}),_3f1);
return this;
}
if(_3f2||this._anims[0].percent==0){
this.fire("onBegin");
}
this.fire("onPlay");
this._animsCall("play",null,_3f2);
return this;
},pause:function(){
this.fire("onPause");
this._animsCall("pause");
return this;
},stop:function(_3f3){
this.fire("onStop");
this._animsCall("stop",_3f3);
return this;
},_onAnimsEnded:function(){
this._animsEnded++;
if(this._animsEnded>=this._anims.length){
this.fire("onEnd");
}
return this;
},_animsCall:function(_3f4){
var args=[];
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
var _3f5=this;
dojo.lang.forEach(this._anims,function(anim){
anim[_3f4](args);
},_3f5);
return this;
}});
dojo.lfx.Chain=function(_3f6){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._currAnim=-1;
var _3f7=arguments;
if(_3f7.length==1&&(dojo.lang.isArray(_3f7[0])||dojo.lang.isArrayLike(_3f7[0]))){
_3f7=_3f7[0];
}
var _3f8=this;
dojo.lang.forEach(_3f7,function(anim,i,_3f9){
this._anims.push(anim);
if(i<_3f9.length-1){
anim.connect("onEnd",dojo.lang.hitch(this,"_playNext"));
}else{
anim.connect("onEnd",dojo.lang.hitch(this,function(){
this.fire("onEnd");
}));
}
},this);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_3fa,_3fb){
if(!this._anims.length){
return this;
}
if(_3fb||!this._anims[this._currAnim]){
this._currAnim=0;
}
var _3fc=this._anims[this._currAnim];
this.fire("beforeBegin");
if(_3fa>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_3fb);
}),_3fa);
return this;
}
if(_3fc){
if(this._currAnim==0){
this.fire("handler",["begin",this._currAnim]);
this.fire("onBegin",[this._currAnim]);
}
this.fire("onPlay",[this._currAnim]);
_3fc.play(null,_3fb);
}
return this;
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
this.fire("onPause",[this._currAnim]);
}
return this;
},playPause:function(){
if(this._anims.length==0){
return this;
}
if(this._currAnim==-1){
this._currAnim=0;
}
var _3fd=this._anims[this._currAnim];
if(_3fd){
if(!_3fd._active||_3fd._paused){
this.play();
}else{
this.pause();
}
}
return this;
},stop:function(){
var _3fe=this._anims[this._currAnim];
if(_3fe){
_3fe.stop();
this.fire("onStop",[this._currAnim]);
}
return _3fe;
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return this;
}
this._currAnim++;
if(this._anims[this._currAnim]){
this._anims[this._currAnim].play(null,true);
}
return this;
}});
dojo.lfx.combine=function(_3ff){
var _400=arguments;
if(dojo.lang.isArray(arguments[0])){
_400=arguments[0];
}
if(_400.length==1){
return _400[0];
}
return new dojo.lfx.Combine(_400);
};
dojo.lfx.chain=function(_401){
var _402=arguments;
if(dojo.lang.isArray(arguments[0])){
_402=arguments[0];
}
if(_402.length==1){
return _402[0];
}
return new dojo.lfx.Chain(_402);
};
dojo.provide("dojo.html.color");
dojo.html.getBackgroundColor=function(node){
node=dojo.byId(node);
var _403;
do{
_403=dojo.html.getStyle(node,"background-color");
if(_403.toLowerCase()=="rgba(0, 0, 0, 0)"){
_403="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(["transparent",""],_403));
if(_403=="transparent"){
_403=[255,255,255,0];
}else{
_403=dojo.gfx.color.extractRGB(_403);
}
return _403;
};
dojo.provide("dojo.lfx.html");
dojo.lfx.html._byId=function(_404){
if(!_404){
return [];
}
if(dojo.lang.isArrayLike(_404)){
if(!_404.alreadyChecked){
var n=[];
dojo.lang.forEach(_404,function(node){
n.push(dojo.byId(node));
});
n.alreadyChecked=true;
return n;
}else{
return _404;
}
}else{
var n=[];
n.push(dojo.byId(_404));
n.alreadyChecked=true;
return n;
}
};
dojo.lfx.html.propertyAnimation=function(_405,_406,_407,_408,_409){
_405=dojo.lfx.html._byId(_405);
var _40a={"propertyMap":_406,"nodes":_405,"duration":_407,"easing":_408||dojo.lfx.easeDefault};
var _40b=function(args){
if(args.nodes.length==1){
var pm=args.propertyMap;
if(!dojo.lang.isArray(args.propertyMap)){
var parr=[];
for(var _40c in pm){
pm[_40c].property=_40c;
parr.push(pm[_40c]);
}
pm=args.propertyMap=parr;
}
dojo.lang.forEach(pm,function(prop){
if(dj_undef("start",prop)){
if(prop.property!="opacity"){
prop.start=parseInt(dojo.html.getComputedStyle(args.nodes[0],prop.property));
}else{
prop.start=dojo.html.getOpacity(args.nodes[0]);
}
}
});
}
};
var _40d=function(_40e){
var _40f=[];
dojo.lang.forEach(_40e,function(c){
_40f.push(Math.round(c));
});
return _40f;
};
var _410=function(n,_411){
n=dojo.byId(n);
if(!n||!n.style){
return;
}
for(var s in _411){
try{
if(s=="opacity"){
dojo.html.setOpacity(n,_411[s]);
}else{
n.style[s]=_411[s];
}
}
catch(e){
dojo.debug(e);
}
}
};
var _412=function(_413){
this._properties=_413;
this.diffs=new Array(_413.length);
dojo.lang.forEach(_413,function(prop,i){
if(dojo.lang.isFunction(prop.start)){
prop.start=prop.start(prop,i);
}
if(dojo.lang.isFunction(prop.end)){
prop.end=prop.end(prop,i);
}
if(dojo.lang.isArray(prop.start)){
this.diffs[i]=null;
}else{
if(prop.start instanceof dojo.gfx.color.Color){
prop.startRgb=prop.start.toRgb();
prop.endRgb=prop.end.toRgb();
}else{
this.diffs[i]=prop.end-prop.start;
}
}
},this);
this.getValue=function(n){
var ret={};
dojo.lang.forEach(this._properties,function(prop,i){
var _414=null;
if(dojo.lang.isArray(prop.start)){
}else{
if(prop.start instanceof dojo.gfx.color.Color){
_414=(prop.units||"rgb")+"(";
for(var j=0;j<prop.startRgb.length;j++){
_414+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
}
_414+=")";
}else{
_414=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
}
}
ret[dojo.html.toCamelCase(prop.property)]=_414;
},this);
return ret;
};
};
var anim=new dojo.lfx.Animation({beforeBegin:function(){
_40b(_40a);
anim.curve=new _412(_40a.propertyMap);
},onAnimate:function(_415){
dojo.lang.forEach(_40a.nodes,function(node){
_410(node,_415);
});
}},_40a.duration,null,_40a.easing);
if(_409){
for(var x in _409){
if(dojo.lang.isFunction(_409[x])){
anim.connect(x,anim,_409[x]);
}
}
}
return anim;
};
dojo.lfx.html._makeFadeable=function(_416){
var _417=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.html.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.html.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
if(dojo.lang.isArrayLike(_416)){
dojo.lang.forEach(_416,_417);
}else{
_417(_416);
}
};
dojo.lfx.html.fade=function(_418,_419,_41a,_41b,_41c){
_418=dojo.lfx.html._byId(_418);
var _41d={property:"opacity"};
if(!dj_undef("start",_419)){
_41d.start=_419.start;
}else{
_41d.start=function(){
return dojo.html.getOpacity(_418[0]);
};
}
if(!dj_undef("end",_419)){
_41d.end=_419.end;
}else{
dojo.raise("dojo.lfx.html.fade needs an end value");
}
var anim=dojo.lfx.propertyAnimation(_418,[_41d],_41a,_41b);
anim.connect("beforeBegin",function(){
dojo.lfx.html._makeFadeable(_418);
});
if(_41c){
anim.connect("onEnd",function(){
_41c(_418,anim);
});
}
return anim;
};
dojo.lfx.html.fadeIn=function(_41e,_41f,_420,_421){
return dojo.lfx.html.fade(_41e,{end:1},_41f,_420,_421);
};
dojo.lfx.html.fadeOut=function(_422,_423,_424,_425){
return dojo.lfx.html.fade(_422,{end:0},_423,_424,_425);
};
dojo.lfx.html.fadeShow=function(_426,_427,_428,_429){
_426=dojo.lfx.html._byId(_426);
dojo.lang.forEach(_426,function(node){
dojo.html.setOpacity(node,0);
});
var anim=dojo.lfx.html.fadeIn(_426,_427,_428,_429);
anim.connect("beforeBegin",function(){
if(dojo.lang.isArrayLike(_426)){
dojo.lang.forEach(_426,dojo.html.show);
}else{
dojo.html.show(_426);
}
});
return anim;
};
dojo.lfx.html.fadeHide=function(_42a,_42b,_42c,_42d){
var anim=dojo.lfx.html.fadeOut(_42a,_42b,_42c,function(){
if(dojo.lang.isArrayLike(_42a)){
dojo.lang.forEach(_42a,dojo.html.hide);
}else{
dojo.html.hide(_42a);
}
if(_42d){
_42d(_42a,anim);
}
});
return anim;
};
dojo.lfx.html.wipeIn=function(_42e,_42f,_430,_431){
_42e=dojo.lfx.html._byId(_42e);
var _432=[];
dojo.lang.forEach(_42e,function(node){
var _433={};
var _434,_435,_436;
with(node.style){
_434=top;
_435=left;
_436=position;
top="-9999px";
left="-9999px";
position="absolute";
display="";
}
var _437=dojo.html.getBorderBox(node).height;
with(node.style){
top=_434;
left=_435;
position=_436;
display="none";
}
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:1,end:function(){
return _437;
}}},_42f,_430);
anim.connect("beforeBegin",function(){
_433.overflow=node.style.overflow;
_433.height=node.style.height;
with(node.style){
overflow="hidden";
_437="1px";
}
dojo.html.show(node);
});
anim.connect("onEnd",function(){
with(node.style){
overflow=_433.overflow;
_437=_433.height;
}
if(_431){
_431(node,anim);
}
});
_432.push(anim);
});
return dojo.lfx.combine(_432);
};
dojo.lfx.html.wipeOut=function(_438,_439,_43a,_43b){
_438=dojo.lfx.html._byId(_438);
var _43c=[];
dojo.lang.forEach(_438,function(node){
var _43d={};
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:function(){
return dojo.html.getContentBox(node).height;
},end:1}},_439,_43a,{"beforeBegin":function(){
_43d.overflow=node.style.overflow;
_43d.height=node.style.height;
with(node.style){
overflow="hidden";
}
dojo.html.show(node);
},"onEnd":function(){
dojo.html.hide(node);
with(node.style){
overflow=_43d.overflow;
height=_43d.height;
}
if(_43b){
_43b(node,anim);
}
}});
_43c.push(anim);
});
return dojo.lfx.combine(_43c);
};
dojo.lfx.html.slideTo=function(_43e,_43f,_440,_441,_442){
_43e=dojo.lfx.html._byId(_43e);
var _443=[];
var _444=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_43f)){
dojo.deprecated("dojo.lfx.html.slideTo(node, array)","use dojo.lfx.html.slideTo(node, {top: value, left: value});","0.5");
_43f={top:_43f[0],left:_43f[1]};
}
dojo.lang.forEach(_43e,function(node){
var top=null;
var left=null;
var init=(function(){
var _445=node;
return function(){
var pos=_444(_445,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_444(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_444(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_445,true);
dojo.html.setStyleAttributes(_445,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:(_43f.top||0)},"left":{start:left,end:(_43f.left||0)}},_440,_441,{"beforeBegin":init});
if(_442){
anim.connect("onEnd",function(){
_442(_43e,anim);
});
}
_443.push(anim);
});
return dojo.lfx.combine(_443);
};
dojo.lfx.html.slideBy=function(_446,_447,_448,_449,_44a){
_446=dojo.lfx.html._byId(_446);
var _44b=[];
var _44c=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_447)){
dojo.deprecated("dojo.lfx.html.slideBy(node, array)","use dojo.lfx.html.slideBy(node, {top: value, left: value});","0.5");
_447={top:_447[0],left:_447[1]};
}
dojo.lang.forEach(_446,function(node){
var top=null;
var left=null;
var init=(function(){
var _44d=node;
return function(){
var pos=_44c(_44d,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_44c(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_44c(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_44d,true);
dojo.html.setStyleAttributes(_44d,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:top+(_447.top||0)},"left":{start:left,end:left+(_447.left||0)}},_448,_449).connect("beforeBegin",init);
if(_44a){
anim.connect("onEnd",function(){
_44a(_446,anim);
});
}
_44b.push(anim);
});
return dojo.lfx.combine(_44b);
};
dojo.lfx.html.explode=function(_44e,_44f,_450,_451,_452){
var h=dojo.html;
_44e=dojo.byId(_44e);
_44f=dojo.byId(_44f);
var _453=h.toCoordinateObject(_44e,true);
var _454=document.createElement("div");
h.copyStyle(_454,_44f);
if(_44f.explodeClassName){
_454.className=_44f.explodeClassName;
}
with(_454.style){
position="absolute";
display="none";
var _455=h.getStyle(_44e,"background-color");
backgroundColor=_455?_455.toLowerCase():"transparent";
backgroundColor=(backgroundColor=="transparent")?"rgb(221, 221, 221)":backgroundColor;
}
dojo.body().appendChild(_454);
with(_44f.style){
visibility="hidden";
display="block";
}
var _456=h.toCoordinateObject(_44f,true);
with(_44f.style){
display="none";
visibility="visible";
}
var _457={opacity:{start:0.5,end:1}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_457[type]={start:_453[type],end:_456[type]};
});
var anim=new dojo.lfx.propertyAnimation(_454,_457,_450,_451,{"beforeBegin":function(){
h.setDisplay(_454,"block");
},"onEnd":function(){
h.setDisplay(_44f,"block");
_454.parentNode.removeChild(_454);
}});
if(_452){
anim.connect("onEnd",function(){
_452(_44f,anim);
});
}
return anim;
};
dojo.lfx.html.implode=function(_458,end,_459,_45a,_45b){
var h=dojo.html;
_458=dojo.byId(_458);
end=dojo.byId(end);
var _45c=dojo.html.toCoordinateObject(_458,true);
var _45d=dojo.html.toCoordinateObject(end,true);
var _45e=document.createElement("div");
dojo.html.copyStyle(_45e,_458);
if(_458.explodeClassName){
_45e.className=_458.explodeClassName;
}
dojo.html.setOpacity(_45e,0.3);
with(_45e.style){
position="absolute";
display="none";
backgroundColor=h.getStyle(_458,"background-color").toLowerCase();
}
dojo.body().appendChild(_45e);
var _45f={opacity:{start:1,end:0.5}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_45f[type]={start:_45c[type],end:_45d[type]};
});
var anim=new dojo.lfx.propertyAnimation(_45e,_45f,_459,_45a,{"beforeBegin":function(){
dojo.html.hide(_458);
dojo.html.show(_45e);
},"onEnd":function(){
_45e.parentNode.removeChild(_45e);
}});
if(_45b){
anim.connect("onEnd",function(){
_45b(_458,anim);
});
}
return anim;
};
dojo.lfx.html.highlight=function(_460,_461,_462,_463,_464){
_460=dojo.lfx.html._byId(_460);
var _465=[];
dojo.lang.forEach(_460,function(node){
var _466=dojo.html.getBackgroundColor(node);
var bg=dojo.html.getStyle(node,"background-color").toLowerCase();
var _467=dojo.html.getStyle(node,"background-image");
var _468=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
while(_466.length>3){
_466.pop();
}
var rgb=new dojo.gfx.color.Color(_461);
var _469=new dojo.gfx.color.Color(_466);
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:rgb,end:_469}},_462,_463,{"beforeBegin":function(){
if(_467){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
},"onEnd":function(){
if(_467){
node.style.backgroundImage=_467;
}
if(_468){
node.style.backgroundColor="transparent";
}
if(_464){
_464(node,anim);
}
}});
_465.push(anim);
});
return dojo.lfx.combine(_465);
};
dojo.lfx.html.unhighlight=function(_46a,_46b,_46c,_46d,_46e){
_46a=dojo.lfx.html._byId(_46a);
var _46f=[];
dojo.lang.forEach(_46a,function(node){
var _470=new dojo.gfx.color.Color(dojo.html.getBackgroundColor(node));
var rgb=new dojo.gfx.color.Color(_46b);
var _471=dojo.html.getStyle(node,"background-image");
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:_470,end:rgb}},_46c,_46d,{"beforeBegin":function(){
if(_471){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+_470.toRgb().join(",")+")";
},"onEnd":function(){
if(_46e){
_46e(node,anim);
}
}});
_46f.push(anim);
});
return dojo.lfx.combine(_46f);
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.lfx.toggle");
dojo.lfx.toggle.plain={show:function(node,_472,_473,_474){
dojo.html.show(node);
if(dojo.lang.isFunction(_474)){
_474();
}
},hide:function(node,_475,_476,_477){
dojo.html.hide(node);
if(dojo.lang.isFunction(_477)){
_477();
}
}};
dojo.lfx.toggle.fade={show:function(node,_478,_479,_47a){
dojo.lfx.fadeShow(node,_478,_479,_47a).play();
},hide:function(node,_47b,_47c,_47d){
dojo.lfx.fadeHide(node,_47b,_47c,_47d).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_47e,_47f,_480){
dojo.lfx.wipeIn(node,_47e,_47f,_480).play();
},hide:function(node,_481,_482,_483){
dojo.lfx.wipeOut(node,_481,_482,_483).play();
}};
dojo.lfx.toggle.explode={show:function(node,_484,_485,_486,_487){
dojo.lfx.explode(_487||{x:0,y:0,width:0,height:0},node,_484,_485,_486).play();
},hide:function(node,_488,_489,_48a,_48b){
dojo.lfx.implode(node,_48b||{x:0,y:0,width:0,height:0},_488,_489,_48a).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{templateCssPath:null,templatePath:null,lang:"",toggle:"plain",toggleDuration:150,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
if(this.lang===""){
this.lang=null;
}
this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_48c){
try{
if(this.bgIframe){
this.bgIframe.remove();
delete this.bgIframe;
}
if(!_48c&&this.domNode){
dojo.event.browser.clean(this.domNode);
}
dojo.widget.HtmlWidget.superclass.destroyRendering.call(this);
}
catch(e){
}
},isShowing:function(){
return dojo.html.isShowing(this.domNode);
},toggleShowing:function(){
if(this.isShowing()){
this.hide();
}else{
this.show();
}
},show:function(){
if(this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
this.animationInProgress=false;
this.checkSize();
},hide:function(){
if(!this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
this.animationInProgress=false;
},_isResized:function(w,h){
if(!this.isShowing()){
return false;
}
var wh=dojo.html.getMarginBox(this.domNode);
var _48d=w||wh.width;
var _48e=h||wh.height;
if(this.width==_48d&&this.height==_48e){
return false;
}
this.width=_48d;
this.height=_48e;
return true;
},checkSize:function(){
if(!this._isResized()){
return;
}
this.onResized();
},resizeTo:function(w,h){
dojo.html.setMarginBox(this.domNode,{width:w,height:h});
if(this.isShowing()){
this.onResized();
}
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
dojo.lang.forEach(this.children,function(_48f){
if(_48f.checkSize){
_48f.checkSize();
}
});
}});
dojo.provide("dojo.widget.*");
dojo.provide("dojo.widget.ContentPane");
dojo.widget.defineWidget("dojo.widget.ContentPane",dojo.widget.HtmlWidget,function(){
this._styleNodes=[];
this._onLoadStack=[];
this._onUnloadStack=[];
this._callOnUnload=false;
this._ioBindObj;
this.scriptScope;
this.bindArgs={};
},{isContainer:true,adjustPaths:true,href:"",extractContent:true,parseContent:true,cacheContent:true,preload:false,refreshOnShow:false,handler:"",executeScripts:false,scriptSeparation:true,loadingMessage:"Loading...",isLoaded:false,postCreate:function(args,frag,_490){
if(this.handler!==""){
this.setHandler(this.handler);
}
if(this.isShowing()||this.preload){
this.loadContents();
}
},show:function(){
if(this.refreshOnShow){
this.refresh();
}else{
this.loadContents();
}
dojo.widget.ContentPane.superclass.show.call(this);
},refresh:function(){
this.isLoaded=false;
this.loadContents();
},loadContents:function(){
if(this.isLoaded){
return;
}
if(dojo.lang.isFunction(this.handler)){
this._runHandler();
}else{
if(this.href!=""){
this._downloadExternalContent(this.href,this.cacheContent&&!this.refreshOnShow);
}
}
},setUrl:function(url){
this.href=url;
this.isLoaded=false;
if(this.preload||this.isShowing()){
this.loadContents();
}
},abort:function(){
var bind=this._ioBindObj;
if(!bind||!bind.abort){
return;
}
bind.abort();
delete this._ioBindObj;
},_downloadExternalContent:function(url,_491){
this.abort();
this._handleDefaults(this.loadingMessage,"onDownloadStart");
var self=this;
this._ioBindObj=dojo.io.bind(this._cacheSetting({url:url,mimetype:"text/html",handler:function(type,data,xhr){
delete self._ioBindObj;
if(type=="load"){
self.onDownloadEnd.call(self,url,data);
}else{
var e={responseText:xhr.responseText,status:xhr.status,statusText:xhr.statusText,responseHeaders:xhr.getAllResponseHeaders(),text:"Error loading '"+url+"' ("+xhr.status+" "+xhr.statusText+")"};
self._handleDefaults.call(self,e,"onDownloadError");
self.onLoad();
}
}},_491));
},_cacheSetting:function(_492,_493){
for(var x in this.bindArgs){
if(dojo.lang.isUndefined(_492[x])){
_492[x]=this.bindArgs[x];
}
}
if(dojo.lang.isUndefined(_492.useCache)){
_492.useCache=_493;
}
if(dojo.lang.isUndefined(_492.preventCache)){
_492.preventCache=!_493;
}
if(dojo.lang.isUndefined(_492.mimetype)){
_492.mimetype="text/html";
}
return _492;
},onLoad:function(e){
this._runStack("_onLoadStack");
this.isLoaded=true;
},onUnLoad:function(e){
dojo.deprecated(this.widgetType+".onUnLoad, use .onUnload (lowercased load)",0.5);
},onUnload:function(e){
this._runStack("_onUnloadStack");
delete this.scriptScope;
if(this.onUnLoad!==dojo.widget.ContentPane.prototype.onUnLoad){
this.onUnLoad.apply(this,arguments);
}
},_runStack:function(_494){
var st=this[_494];
var err="";
var _495=this.scriptScope||window;
for(var i=0;i<st.length;i++){
try{
st[i].call(_495);
}
catch(e){
err+="\n"+st[i]+" failed: "+e.description;
}
}
this[_494]=[];
if(err.length){
var name=(_494=="_onLoadStack")?"addOnLoad":"addOnUnLoad";
this._handleDefaults(name+" failure\n "+err,"onExecError","debug");
}
},addOnLoad:function(obj,func){
this._pushOnStack(this._onLoadStack,obj,func);
},addOnUnload:function(obj,func){
this._pushOnStack(this._onUnloadStack,obj,func);
},addOnUnLoad:function(){
dojo.deprecated(this.widgetType+".addOnUnLoad, use addOnUnload instead. (lowercased Load)",0.5);
this.addOnUnload.apply(this,arguments);
},_pushOnStack:function(_496,obj,func){
if(typeof func=="undefined"){
_496.push(obj);
}else{
_496.push(function(){
obj[func]();
});
}
},destroy:function(){
this.onUnload();
dojo.widget.ContentPane.superclass.destroy.call(this);
},onExecError:function(e){
},onContentError:function(e){
},onDownloadError:function(e){
},onDownloadStart:function(e){
},onDownloadEnd:function(url,data){
data=this.splitAndFixPaths(data,url);
this.setContent(data);
},_handleDefaults:function(e,_497,_498){
if(!_497){
_497="onContentError";
}
if(dojo.lang.isString(e)){
e={text:e};
}
if(!e.text){
e.text=e.toString();
}
e.toString=function(){
return this.text;
};
if(typeof e.returnValue!="boolean"){
e.returnValue=true;
}
if(typeof e.preventDefault!="function"){
e.preventDefault=function(){
this.returnValue=false;
};
}
this[_497](e);
if(e.returnValue){
switch(_498){
case true:
case "alert":
alert(e.toString());
break;
case "debug":
dojo.debug(e.toString());
break;
default:
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=false;
if(arguments.callee._loopStop){
dojo.debug(e.toString());
}else{
arguments.callee._loopStop=true;
this._setContent(e.toString());
}
}
}
arguments.callee._loopStop=false;
},splitAndFixPaths:function(s,url){
var _499=[],_49a=[],tmp=[];
var _49b=[],_49c=[],attr=[],_49d=[];
var str="",path="",fix="",_49e="",tag="",_49f="";
if(!url){
url="./";
}
if(s){
var _4a0=/<title[^>]*>([\s\S]*?)<\/title>/i;
while(_49b=_4a0.exec(s)){
_499.push(_49b[1]);
s=s.substring(0,_49b.index)+s.substr(_49b.index+_49b[0].length);
}
if(this.adjustPaths){
var _4a1=/<[a-z][a-z0-9]*[^>]*\s(?:(?:src|href|style)=[^>])+[^>]*>/i;
var _4a2=/\s(src|href|style)=(['"]?)([\w()\[\]\/.,\\'"-:;#=&?\s@]+?)\2/i;
var _4a3=/^(?:[#]|(?:(?:https?|ftps?|file|javascript|mailto|news):))/;
while(tag=_4a1.exec(s)){
str+=s.substring(0,tag.index);
s=s.substring((tag.index+tag[0].length),s.length);
tag=tag[0];
_49e="";
while(attr=_4a2.exec(tag)){
path="";
_49f=attr[3];
switch(attr[1].toLowerCase()){
case "src":
case "href":
if(_4a3.exec(_49f)){
path=_49f;
}else{
path=(new dojo.uri.Uri(url,_49f).toString());
}
break;
case "style":
path=dojo.html.fixPathsInCssText(_49f,url);
break;
default:
path=_49f;
}
fix=" "+attr[1]+"="+attr[2]+path+attr[2];
_49e+=tag.substring(0,attr.index)+fix;
tag=tag.substring((attr.index+attr[0].length),tag.length);
}
str+=_49e+tag;
}
s=str+s;
}
_4a0=/(?:<(style)[^>]*>([\s\S]*?)<\/style>|<link ([^>]*rel=['"]?stylesheet['"]?[^>]*)>)/i;
while(_49b=_4a0.exec(s)){
if(_49b[1]&&_49b[1].toLowerCase()=="style"){
_49d.push(dojo.html.fixPathsInCssText(_49b[2],url));
}else{
if(attr=_49b[3].match(/href=(['"]?)([^'">]*)\1/i)){
_49d.push({path:attr[2]});
}
}
s=s.substring(0,_49b.index)+s.substr(_49b.index+_49b[0].length);
}
var _4a0=/<script([^>]*)>([\s\S]*?)<\/script>/i;
var _4a4=/src=(['"]?)([^"']*)\1/i;
var _4a5=/.*(\bdojo\b\.js(?:\.uncompressed\.js)?)$/;
var _4a6=/(?:var )?\bdjConfig\b(?:[\s]*=[\s]*\{[^}]+\}|\.[\w]*[\s]*=[\s]*[^;\n]*)?;?|dojo\.hostenv\.writeIncludes\(\s*\);?/g;
var _4a7=/dojo\.(?:(?:require(?:After)?(?:If)?)|(?:widget\.(?:manager\.)?registerWidgetPackage)|(?:(?:hostenv\.)?setModulePrefix|registerModulePath)|defineNamespace)\((['"]).*?\1\)\s*;?/;
while(_49b=_4a0.exec(s)){
if(this.executeScripts&&_49b[1]){
if(attr=_4a4.exec(_49b[1])){
if(_4a5.exec(attr[2])){
dojo.debug("Security note! inhibit:"+attr[2]+" from  being loaded again.");
}else{
_49a.push({path:attr[2]});
}
}
}
if(_49b[2]){
var sc=_49b[2].replace(_4a6,"");
if(!sc){
continue;
}
while(tmp=_4a7.exec(sc)){
_49c.push(tmp[0]);
sc=sc.substring(0,tmp.index)+sc.substr(tmp.index+tmp[0].length);
}
if(this.executeScripts){
_49a.push(sc);
}
}
s=s.substr(0,_49b.index)+s.substr(_49b.index+_49b[0].length);
}
if(this.extractContent){
_49b=s.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_49b){
s=_49b[1];
}
}
if(this.executeScripts&&this.scriptSeparation){
var _4a0=/(<[a-zA-Z][a-zA-Z0-9]*\s[^>]*?\S=)((['"])[^>]*scriptScope[^>]*>)/;
var _4a8=/([\s'";:\(])scriptScope(.*)/;
str="";
while(tag=_4a0.exec(s)){
tmp=((tag[3]=="'")?"\"":"'");
fix="";
str+=s.substring(0,tag.index)+tag[1];
while(attr=_4a8.exec(tag[2])){
tag[2]=tag[2].substring(0,attr.index)+attr[1]+"dojo.widget.byId("+tmp+this.widgetId+tmp+").scriptScope"+attr[2];
}
str+=tag[2];
s=s.substr(tag.index+tag[0].length);
}
s=str+s;
}
}
return {"xml":s,"styles":_49d,"titles":_499,"requires":_49c,"scripts":_49a,"url":url};
},_setContent:function(cont){
this.destroyChildren();
for(var i=0;i<this._styleNodes.length;i++){
if(this._styleNodes[i]&&this._styleNodes[i].parentNode){
this._styleNodes[i].parentNode.removeChild(this._styleNodes[i]);
}
}
this._styleNodes=[];
try{
var node=this.containerNode||this.domNode;
while(node.firstChild){
dojo.html.destroyNode(node.firstChild);
}
if(typeof cont!="string"){
node.appendChild(cont);
}else{
node.innerHTML=cont;
}
}
catch(e){
e.text="Couldn't load content:"+e.description;
this._handleDefaults(e,"onContentError");
}
},setContent:function(data){
this.abort();
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=true;
if(!data||dojo.html.isNode(data)){
this._setContent(data);
this.onResized();
this.onLoad();
}else{
if(typeof data.xml!="string"){
this.href="";
data=this.splitAndFixPaths(data);
}
this._setContent(data.xml);
for(var i=0;i<data.styles.length;i++){
if(data.styles[i].path){
this._styleNodes.push(dojo.html.insertCssFile(data.styles[i].path,dojo.doc(),false,true));
}else{
this._styleNodes.push(dojo.html.insertCssText(data.styles[i]));
}
}
if(this.parseContent){
for(var i=0;i<data.requires.length;i++){
try{
eval(data.requires[i]);
}
catch(e){
e.text="ContentPane: error in package loading calls, "+(e.description||e);
this._handleDefaults(e,"onContentError","debug");
}
}
}
var _4a9=this;
function _4aa(){
if(_4a9.executeScripts){
_4a9._executeScripts(data.scripts);
}
if(_4a9.parseContent){
var node=_4a9.containerNode||_4a9.domNode;
var _4ab=new dojo.xml.Parse();
var frag=_4ab.parseElement(node,null,true);
dojo.widget.getParser().createSubComponents(frag,_4a9);
}
_4a9.onResized();
_4a9.onLoad();
};
if(dojo.hostenv.isXDomain&&data.requires.length){
dojo.addOnLoad(_4aa);
}else{
_4aa();
}
}
},setHandler:function(_4ac){
var fcn=dojo.lang.isFunction(_4ac)?_4ac:window[_4ac];
if(!dojo.lang.isFunction(fcn)){
this._handleDefaults("Unable to set handler, '"+_4ac+"' not a function.","onExecError",true);
return;
}
this.handler=function(){
return fcn.apply(this,arguments);
};
},_runHandler:function(){
var ret=true;
if(dojo.lang.isFunction(this.handler)){
this.handler(this,this.domNode);
ret=false;
}
this.onLoad();
return ret;
},_executeScripts:function(_4ad){
var self=this;
var tmp="",code="";
for(var i=0;i<_4ad.length;i++){
if(_4ad[i].path){
dojo.io.bind(this._cacheSetting({"url":_4ad[i].path,"load":function(type,_4ae){
dojo.lang.hitch(self,tmp=";"+_4ae);
},"error":function(type,_4af){
_4af.text=type+" downloading remote script";
self._handleDefaults.call(self,_4af,"onExecError","debug");
},"mimetype":"text/plain","sync":true},this.cacheContent));
code+=tmp;
}else{
code+=_4ad[i];
}
}
try{
if(this.scriptSeparation){
delete this.scriptScope;
this.scriptScope=new (new Function("_container_",code+"; return this;"))(self);
}else{
var djg=dojo.global();
if(djg.execScript){
djg.execScript(code);
}else{
var djd=dojo.doc();
var sc=djd.createElement("script");
sc.appendChild(djd.createTextNode(code));
(this.containerNode||this.domNode).appendChild(sc);
}
}
}
catch(e){
e.text="Error running scripts from content:\n"+e.description;
this._handleDefaults(e,"onExecError","debug");
}
}});
dojo.provide("dojo.html.iframe");
dojo.html.iframeContentWindow=function(_4b0){
var win=dojo.html.getDocumentWindow(dojo.html.iframeContentDocument(_4b0))||dojo.html.iframeContentDocument(_4b0).__parent__||(_4b0.name&&document.frames[_4b0.name])||null;
return win;
};
dojo.html.iframeContentDocument=function(_4b1){
var doc=_4b1.contentDocument||((_4b1.contentWindow)&&(_4b1.contentWindow.document))||((_4b1.name)&&(document.frames[_4b1.name])&&(document.frames[_4b1.name].document))||null;
return doc;
};
dojo.html.BackgroundIframe=function(node){
if(dojo.render.html.ie55||dojo.render.html.ie60){
var html="<iframe src='javascript:false'"+" style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");' "+">";
this.iframe=dojo.doc().createElement(html);
this.iframe.tabIndex=-1;
if(node){
node.appendChild(this.iframe);
this.domNode=node;
}else{
dojo.body().appendChild(this.iframe);
this.iframe.style.display="none";
}
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentNode){
var _4b2=dojo.html.getMarginBox(this.domNode);
if(_4b2.width==0||_4b2.height==0){
dojo.lang.setTimeout(this,this.onResized,100);
return;
}
this.iframe.style.width=_4b2.width+"px";
this.iframe.style.height=_4b2.height+"px";
}
},size:function(node){
if(!this.iframe){
return;
}
var _4b3=dojo.html.toCoordinateObject(node,true,dojo.html.boxSizing.BORDER_BOX);
with(this.iframe.style){
width=_4b3.width+"px";
height=_4b3.height+"px";
left=_4b3.left+"px";
top=_4b3.top+"px";
}
},setZIndex:function(node){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(node)){
this.iframe.style.zIndex=dojo.html.getStyle(node,"z-index")-1;
}else{
if(!isNaN(node)){
this.iframe.style.zIndex=node;
}
}
},show:function(){
if(this.iframe){
this.iframe.style.display="block";
}
},hide:function(){
if(this.iframe){
this.iframe.style.display="none";
}
},remove:function(){
if(this.iframe){
dojo.html.removeNode(this.iframe,true);
delete this.iframe;
this.iframe=null;
}
}});
dojo.provide("dojo.html.selection");
dojo.html.selectionType={NONE:0,TEXT:1,CONTROL:2};
dojo.html.clearSelection=function(){
var _4b4=dojo.global();
var _4b5=dojo.doc();
try{
if(_4b4["getSelection"]){
if(dojo.render.html.safari){
_4b4.getSelection().collapse();
}else{
_4b4.getSelection().removeAllRanges();
}
}else{
if(_4b5.selection){
if(_4b5.selection.empty){
_4b5.selection.empty();
}else{
if(_4b5.selection.clear){
_4b5.selection.clear();
}
}
}
}
return true;
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.html.disableSelection=function(_4b6){
_4b6=dojo.byId(_4b6)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_4b6.style.MozUserSelect="none";
}else{
if(h.safari){
_4b6.style.KhtmlUserSelect="none";
}else{
if(h.ie){
_4b6.unselectable="on";
}else{
return false;
}
}
}
return true;
};
dojo.html.enableSelection=function(_4b7){
_4b7=dojo.byId(_4b7)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_4b7.style.MozUserSelect="";
}else{
if(h.safari){
_4b7.style.KhtmlUserSelect="";
}else{
if(h.ie){
_4b7.unselectable="off";
}else{
return false;
}
}
}
return true;
};
dojo.html.selectElement=function(_4b8){
dojo.deprecated("dojo.html.selectElement","replaced by dojo.html.selection.selectElementChildren",0.5);
};
dojo.html.selectInputText=function(_4b9){
var _4ba=dojo.global();
var _4bb=dojo.doc();
_4b9=dojo.byId(_4b9);
if(_4bb["selection"]&&dojo.body()["createTextRange"]){
var _4bc=_4b9.createTextRange();
_4bc.moveStart("character",0);
_4bc.moveEnd("character",_4b9.value.length);
_4bc.select();
}else{
if(_4ba["getSelection"]){
var _4bd=_4ba.getSelection();
_4b9.setSelectionRange(0,_4b9.value.length);
}
}
_4b9.focus();
};
dojo.html.isSelectionCollapsed=function(){
dojo.deprecated("dojo.html.isSelectionCollapsed","replaced by dojo.html.selection.isCollapsed",0.5);
return dojo.html.selection.isCollapsed();
};
dojo.lang.mixin(dojo.html.selection,{getType:function(){
if(dojo.doc()["selection"]){
return dojo.html.selectionType[dojo.doc().selection.type.toUpperCase()];
}else{
var _4be=dojo.html.selectionType.TEXT;
var oSel;
try{
oSel=dojo.global().getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _4bf=oSel.getRangeAt(0);
if(_4bf.startContainer==_4bf.endContainer&&(_4bf.endOffset-_4bf.startOffset)==1&&_4bf.startContainer.nodeType!=dojo.dom.TEXT_NODE){
_4be=dojo.html.selectionType.CONTROL;
}
}
return _4be;
}
},isCollapsed:function(){
var _4c0=dojo.global();
var _4c1=dojo.doc();
if(_4c1["selection"]){
return _4c1.selection.createRange().text=="";
}else{
if(_4c0["getSelection"]){
var _4c2=_4c0.getSelection();
if(dojo.lang.isString(_4c2)){
return _4c2=="";
}else{
return _4c2.isCollapsed||_4c2.toString()=="";
}
}
}
},getSelectedElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
if(dojo.doc()["selection"]){
var _4c3=dojo.doc().selection.createRange();
if(_4c3&&_4c3.item){
return dojo.doc().selection.createRange().item(0);
}
}else{
var _4c4=dojo.global().getSelection();
return _4c4.anchorNode.childNodes[_4c4.anchorOffset];
}
}
},getParentElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
var p=dojo.html.selection.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(dojo.doc()["selection"]){
return dojo.doc().selection.createRange().parentElement();
}else{
var _4c5=dojo.global().getSelection();
if(_4c5){
var node=_4c5.anchorNode;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.parentNode;
}
return node;
}
}
}
},getSelectedText:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().text;
}else{
var _4c6=dojo.global().getSelection();
if(_4c6){
return _4c6.toString();
}
}
},getSelectedHtml:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().htmlText;
}else{
var _4c7=dojo.global().getSelection();
if(_4c7&&_4c7.rangeCount){
var frag=_4c7.getRangeAt(0).cloneContents();
var div=document.createElement("div");
div.appendChild(frag);
return div.innerHTML;
}
return null;
}
},hasAncestorElement:function(_4c8){
return (dojo.html.selection.getAncestorElement.apply(this,arguments)!=null);
},getAncestorElement:function(_4c9){
var node=dojo.html.selection.getSelectedElement()||dojo.html.selection.getParentElement();
while(node){
if(dojo.html.selection.isTag(node,arguments).length>0){
return node;
}
node=node.parentNode;
}
return null;
},isTag:function(node,tags){
if(node&&node.tagName){
for(var i=0;i<tags.length;i++){
if(node.tagName.toLowerCase()==String(tags[i]).toLowerCase()){
return String(tags[i]).toLowerCase();
}
}
}
return "";
},selectElement:function(_4ca){
var _4cb=dojo.global();
var _4cc=dojo.doc();
_4ca=dojo.byId(_4ca);
if(_4cc.selection&&dojo.body().createTextRange){
try{
var _4cd=dojo.body().createControlRange();
_4cd.addElement(_4ca);
_4cd.select();
}
catch(e){
dojo.html.selection.selectElementChildren(_4ca);
}
}else{
if(_4cb["getSelection"]){
var _4ce=_4cb.getSelection();
if(_4ce["removeAllRanges"]){
var _4cd=_4cc.createRange();
_4cd.selectNode(_4ca);
_4ce.removeAllRanges();
_4ce.addRange(_4cd);
}
}
}
},selectElementChildren:function(_4cf){
var _4d0=dojo.global();
var _4d1=dojo.doc();
_4cf=dojo.byId(_4cf);
if(_4d1.selection&&dojo.body().createTextRange){
var _4d2=dojo.body().createTextRange();
_4d2.moveToElementText(_4cf);
_4d2.select();
}else{
if(_4d0["getSelection"]){
var _4d3=_4d0.getSelection();
if(_4d3["setBaseAndExtent"]){
_4d3.setBaseAndExtent(_4cf,0,_4cf,_4cf.innerText.length-1);
}else{
if(_4d3["selectAllChildren"]){
_4d3.selectAllChildren(_4cf);
}
}
}
}
},getBookmark:function(){
var _4d4;
var _4d5=dojo.doc();
if(_4d5["selection"]){
var _4d6=_4d5.selection.createRange();
_4d4=_4d6.getBookmark();
}else{
var _4d7;
try{
_4d7=dojo.global().getSelection();
}
catch(e){
}
if(_4d7){
var _4d6=_4d7.getRangeAt(0);
_4d4=_4d6.cloneRange();
}else{
dojo.debug("No idea how to store the current selection for this browser!");
}
}
return _4d4;
},moveToBookmark:function(_4d8){
var _4d9=dojo.doc();
if(_4d9["selection"]){
var _4da=_4d9.selection.createRange();
_4da.moveToBookmark(_4d8);
_4da.select();
}else{
var _4db;
try{
_4db=dojo.global().getSelection();
}
catch(e){
}
if(_4db&&_4db["removeAllRanges"]){
_4db.removeAllRanges();
_4db.addRange(_4d8);
}else{
dojo.debug("No idea how to restore selection for this browser!");
}
}
},collapse:function(_4dc){
if(dojo.global()["getSelection"]){
var _4dd=dojo.global().getSelection();
if(_4dd.removeAllRanges){
if(_4dc){
_4dd.collapseToStart();
}else{
_4dd.collapseToEnd();
}
}else{
dojo.global().getSelection().collapse(_4dc);
}
}else{
if(dojo.doc().selection){
var _4de=dojo.doc().selection.createRange();
_4de.collapse(_4dc);
_4de.select();
}
}
},remove:function(){
if(dojo.doc().selection){
var _4df=dojo.doc().selection;
if(_4df.type.toUpperCase()!="NONE"){
_4df.clear();
}
return _4df;
}else{
var _4df=dojo.global().getSelection();
for(var i=0;i<_4df.rangeCount;i++){
_4df.getRangeAt(i).deleteContents();
}
return _4df;
}
}});
dojo.provide("dojo.lfx.shadow");
dojo.lfx.shadow=function(node){
this.shadowPng=dojo.uri.dojoUri("src/html/images/shadow");
this.shadowThickness=8;
this.shadowOffset=15;
this.init(node);
};
dojo.extend(dojo.lfx.shadow,{init:function(node){
this.node=node;
this.pieces={};
var x1=-1*this.shadowThickness;
var y0=this.shadowOffset;
var y1=this.shadowOffset+this.shadowThickness;
this._makePiece("tl","top",y0,"left",x1);
this._makePiece("l","top",y1,"left",x1,"scale");
this._makePiece("tr","top",y0,"left",0);
this._makePiece("r","top",y1,"left",0,"scale");
this._makePiece("bl","top",0,"left",x1);
this._makePiece("b","top",0,"left",0,"crop");
this._makePiece("br","top",0,"left",0);
},_makePiece:function(name,_4e0,_4e1,_4e2,_4e3,_4e4){
var img;
var url=this.shadowPng+name.toUpperCase()+".png";
if(dojo.render.html.ie55||dojo.render.html.ie60){
img=dojo.doc().createElement("div");
img.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+url+"'"+(_4e4?", sizingMethod='"+_4e4+"'":"")+")";
}else{
img=dojo.doc().createElement("img");
img.src=url;
}
img.style.position="absolute";
img.style[_4e0]=_4e1+"px";
img.style[_4e2]=_4e3+"px";
img.style.width=this.shadowThickness+"px";
img.style.height=this.shadowThickness+"px";
this.pieces[name]=img;
this.node.appendChild(img);
},size:function(_4e5,_4e6){
var _4e7=_4e6-(this.shadowOffset+this.shadowThickness+1);
if(_4e7<0){
_4e7=0;
}
if(_4e6<1){
_4e6=1;
}
if(_4e5<1){
_4e5=1;
}
with(this.pieces){
l.style.height=_4e7+"px";
r.style.height=_4e7+"px";
b.style.width=(_4e5-1)+"px";
bl.style.top=(_4e6-1)+"px";
b.style.top=(_4e6-1)+"px";
br.style.top=(_4e6-1)+"px";
tr.style.left=(_4e5-1)+"px";
r.style.left=(_4e5-1)+"px";
br.style.left=(_4e5-1)+"px";
}
}});
dojo.provide("dojo.widget.html.layout");
dojo.widget.html.layout=function(_4e8,_4e9,_4ea){
dojo.html.addClass(_4e8,"dojoLayoutContainer");
_4e9=dojo.lang.filter(_4e9,function(_4eb,idx){
_4eb.idx=idx;
return dojo.lang.inArray(["top","bottom","left","right","client","flood"],_4eb.layoutAlign);
});
if(_4ea&&_4ea!="none"){
var rank=function(_4ec){
switch(_4ec.layoutAlign){
case "flood":
return 1;
case "left":
case "right":
return (_4ea=="left-right")?2:3;
case "top":
case "bottom":
return (_4ea=="left-right")?3:2;
default:
return 4;
}
};
_4e9.sort(function(a,b){
return (rank(a)-rank(b))||(a.idx-b.idx);
});
}
var f={top:dojo.html.getPixelValue(_4e8,"padding-top",true),left:dojo.html.getPixelValue(_4e8,"padding-left",true)};
dojo.lang.mixin(f,dojo.html.getContentBox(_4e8));
dojo.lang.forEach(_4e9,function(_4ed){
var elm=_4ed.domNode;
var pos=_4ed.layoutAlign;
with(elm.style){
left=f.left+"px";
top=f.top+"px";
bottom="auto";
right="auto";
}
dojo.html.addClass(elm,"dojoAlign"+dojo.string.capitalize(pos));
if((pos=="top")||(pos=="bottom")){
dojo.html.setMarginBox(elm,{width:f.width});
var h=dojo.html.getMarginBox(elm).height;
f.height-=h;
if(pos=="top"){
f.top+=h;
}else{
elm.style.top=f.top+f.height+"px";
}
if(_4ed.onResized){
_4ed.onResized();
}
}else{
if(pos=="left"||pos=="right"){
var w=dojo.html.getMarginBox(elm).width;
if(_4ed.resizeTo){
_4ed.resizeTo(w,f.height);
}else{
dojo.html.setMarginBox(elm,{width:w,height:f.height});
}
f.width-=w;
if(pos=="left"){
f.left+=w;
}else{
elm.style.left=f.left+f.width+"px";
}
}else{
if(pos=="flood"||pos=="client"){
if(_4ed.resizeTo){
_4ed.resizeTo(f.width,f.height);
}else{
dojo.html.setMarginBox(elm,{width:f.width,height:f.height});
}
}
}
}
});
};
dojo.html.insertCssText(".dojoLayoutContainer{ position: relative; display: block; overflow: hidden; }\n"+"body .dojoAlignTop, body .dojoAlignBottom, body .dojoAlignLeft, body .dojoAlignRight { position: absolute; overflow: hidden; }\n"+"body .dojoAlignClient { position: absolute }\n"+".dojoAlignClient { overflow: auto; }\n");
dojo.provide("dojo.dnd.DragAndDrop");
dojo.declare("dojo.dnd.DragSource",null,{type:"",onDragEnd:function(evt){
},onDragStart:function(evt){
},onSelected:function(evt){
},unregister:function(){
dojo.dnd.dragManager.unregisterDragSource(this);
},reregister:function(){
dojo.dnd.dragManager.registerDragSource(this);
}});
dojo.declare("dojo.dnd.DragObject",null,{type:"",register:function(){
var dm=dojo.dnd.dragManager;
if(dm["registerDragObject"]){
dm.registerDragObject(this);
}
},onDragStart:function(evt){
},onDragMove:function(evt){
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragEnd:function(evt){
},onDragLeave:dojo.lang.forward("onDragOut"),onDragEnter:dojo.lang.forward("onDragOver"),ondragout:dojo.lang.forward("onDragOut"),ondragover:dojo.lang.forward("onDragOver")});
dojo.declare("dojo.dnd.DropTarget",null,{acceptsType:function(type){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
if(!dojo.lang.inArray(this.acceptedTypes,type)){
return false;
}
}
return true;
},accepts:function(_4ee){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
for(var i=0;i<_4ee.length;i++){
if(!dojo.lang.inArray(this.acceptedTypes,_4ee[i].type)){
return false;
}
}
}
return true;
},unregister:function(){
dojo.dnd.dragManager.unregisterDropTarget(this);
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragMove:function(evt){
},onDropStart:function(evt){
},onDrop:function(evt){
},onDropEnd:function(){
}},function(){
this.acceptedTypes=[];
});
dojo.dnd.DragEvent=function(){
this.dragSource=null;
this.dragObject=null;
this.target=null;
this.eventStatus="success";
};
dojo.declare("dojo.dnd.DragManager",null,{selectedSources:[],dragObjects:[],dragSources:[],registerDragSource:function(_4ef){
},dropTargets:[],registerDropTarget:function(_4f0){
},lastDragTarget:null,currentDragTarget:null,onKeyDown:function(){
},onMouseOut:function(){
},onMouseMove:function(){
},onMouseUp:function(){
}});
dojo.provide("dojo.dnd.HtmlDragManager");
dojo.declare("dojo.dnd.HtmlDragManager",dojo.dnd.DragManager,{disabled:false,nestedTargets:false,mouseDownTimer:null,dsCounter:0,dsPrefix:"dojoDragSource",dropTargetDimensions:[],currentDropTarget:null,previousDropTarget:null,_dragTriggered:false,selectedSources:[],dragObjects:[],dragSources:[],currentX:null,currentY:null,lastX:null,lastY:null,mouseDownX:null,mouseDownY:null,threshold:7,dropAcceptable:false,cancelEvent:function(e){
e.stopPropagation();
e.preventDefault();
},registerDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _4f1=dp+"Idx_"+(this.dsCounter++);
ds.dragSourceId=_4f1;
this.dragSources[_4f1]=ds;
ds.domNode.setAttribute(dp,_4f1);
if(dojo.render.html.ie){
dojo.event.browser.addListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},unregisterDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _4f2=ds.dragSourceId;
delete ds.dragSourceId;
delete this.dragSources[_4f2];
ds.domNode.setAttribute(dp,null);
if(dojo.render.html.ie){
dojo.event.browser.removeListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},registerDropTarget:function(dt){
this.dropTargets.push(dt);
},unregisterDropTarget:function(dt){
var _4f3=dojo.lang.find(this.dropTargets,dt,true);
if(_4f3>=0){
this.dropTargets.splice(_4f3,1);
}
},getDragSource:function(e){
var tn=e.target;
if(tn===dojo.body()){
return;
}
var ta=dojo.html.getAttribute(tn,this.dsPrefix);
while((!ta)&&(tn)){
tn=tn.parentNode;
if((!tn)||(tn===dojo.body())){
return;
}
ta=dojo.html.getAttribute(tn,this.dsPrefix);
}
return this.dragSources[ta];
},onKeyDown:function(e){
},onMouseDown:function(e){
if(this.disabled){
return;
}
if(dojo.render.html.ie){
if(e.button!=1){
return;
}
}else{
if(e.which!=1){
return;
}
}
var _4f4=e.target.nodeType==dojo.html.TEXT_NODE?e.target.parentNode:e.target;
if(dojo.html.isTag(_4f4,"button","textarea","input","select","option")){
return;
}
var ds=this.getDragSource(e);
if(!ds){
return;
}
if(!dojo.lang.inArray(this.selectedSources,ds)){
this.selectedSources.push(ds);
ds.onSelected();
}
this.mouseDownX=e.pageX;
this.mouseDownY=e.pageY;
e.preventDefault();
dojo.event.connect(document,"onmousemove",this,"onMouseMove");
},onMouseUp:function(e,_4f5){
if(this.selectedSources.length==0){
return;
}
this.mouseDownX=null;
this.mouseDownY=null;
this._dragTriggered=false;
e.dragSource=this.dragSource;
if((!e.shiftKey)&&(!e.ctrlKey)){
if(this.currentDropTarget){
this.currentDropTarget.onDropStart();
}
dojo.lang.forEach(this.dragObjects,function(_4f6){
var ret=null;
if(!_4f6){
return;
}
if(this.currentDropTarget){
e.dragObject=_4f6;
var ce=this.currentDropTarget.domNode.childNodes;
if(ce.length>0){
e.dropTarget=ce[0];
while(e.dropTarget==_4f6.domNode){
e.dropTarget=e.dropTarget.nextSibling;
}
}else{
e.dropTarget=this.currentDropTarget.domNode;
}
if(this.dropAcceptable){
ret=this.currentDropTarget.onDrop(e);
}else{
this.currentDropTarget.onDragOut(e);
}
}
e.dragStatus=this.dropAcceptable&&ret?"dropSuccess":"dropFailure";
dojo.lang.delayThese([function(){
try{
_4f6.dragSource.onDragEnd(e);
}
catch(err){
var _4f7={};
for(var i in e){
if(i=="type"){
_4f7.type="mouseup";
continue;
}
_4f7[i]=e[i];
}
_4f6.dragSource.onDragEnd(_4f7);
}
},function(){
_4f6.onDragEnd(e);
}]);
},this);
this.selectedSources=[];
this.dragObjects=[];
this.dragSource=null;
if(this.currentDropTarget){
this.currentDropTarget.onDropEnd();
}
}else{
}
dojo.event.disconnect(document,"onmousemove",this,"onMouseMove");
this.currentDropTarget=null;
},onScroll:function(){
for(var i=0;i<this.dragObjects.length;i++){
if(this.dragObjects[i].updateDragOffset){
this.dragObjects[i].updateDragOffset();
}
}
if(this.dragObjects.length){
this.cacheTargetLocations();
}
},_dragStartDistance:function(x,y){
if((!this.mouseDownX)||(!this.mouseDownX)){
return;
}
var dx=Math.abs(x-this.mouseDownX);
var dx2=dx*dx;
var dy=Math.abs(y-this.mouseDownY);
var dy2=dy*dy;
return parseInt(Math.sqrt(dx2+dy2),10);
},cacheTargetLocations:function(){
dojo.profile.start("cacheTargetLocations");
this.dropTargetDimensions=[];
dojo.lang.forEach(this.dropTargets,function(_4f8){
var tn=_4f8.domNode;
if(!tn||!_4f8.accepts([this.dragSource])){
return;
}
var abs=dojo.html.getAbsolutePosition(tn,true);
var bb=dojo.html.getBorderBox(tn);
this.dropTargetDimensions.push([[abs.x,abs.y],[abs.x+bb.width,abs.y+bb.height],_4f8]);
},this);
dojo.profile.end("cacheTargetLocations");
},onMouseMove:function(e){
if((dojo.render.html.ie)&&(e.button!=1)){
this.currentDropTarget=null;
this.onMouseUp(e,true);
return;
}
if((this.selectedSources.length)&&(!this.dragObjects.length)){
var dx;
var dy;
if(!this._dragTriggered){
this._dragTriggered=(this._dragStartDistance(e.pageX,e.pageY)>this.threshold);
if(!this._dragTriggered){
return;
}
dx=e.pageX-this.mouseDownX;
dy=e.pageY-this.mouseDownY;
}
this.dragSource=this.selectedSources[0];
dojo.lang.forEach(this.selectedSources,function(_4f9){
if(!_4f9){
return;
}
var tdo=_4f9.onDragStart(e);
if(tdo){
tdo.onDragStart(e);
tdo.dragOffset.y+=dy;
tdo.dragOffset.x+=dx;
tdo.dragSource=_4f9;
this.dragObjects.push(tdo);
}
},this);
this.previousDropTarget=null;
this.cacheTargetLocations();
}
dojo.lang.forEach(this.dragObjects,function(_4fa){
if(_4fa){
_4fa.onDragMove(e);
}
});
if(this.currentDropTarget){
var c=dojo.html.toCoordinateObject(this.currentDropTarget.domNode,true);
var dtp=[[c.x,c.y],[c.x+c.width,c.y+c.height]];
}
if((!this.nestedTargets)&&(dtp)&&(this.isInsideBox(e,dtp))){
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}else{
var _4fb=this.findBestTarget(e);
if(_4fb.target===null){
if(this.currentDropTarget){
this.currentDropTarget.onDragOut(e);
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget=null;
}
this.dropAcceptable=false;
return;
}
if(this.currentDropTarget!==_4fb.target){
if(this.currentDropTarget){
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget.onDragOut(e);
}
this.currentDropTarget=_4fb.target;
e.dragObjects=this.dragObjects;
this.dropAcceptable=this.currentDropTarget.onDragOver(e);
}else{
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}
}
},findBestTarget:function(e){
var _4fc=this;
var _4fd=new Object();
_4fd.target=null;
_4fd.points=null;
dojo.lang.every(this.dropTargetDimensions,function(_4fe){
if(!_4fc.isInsideBox(e,_4fe)){
return true;
}
_4fd.target=_4fe[2];
_4fd.points=_4fe;
return Boolean(_4fc.nestedTargets);
});
return _4fd;
},isInsideBox:function(e,_4ff){
if((e.pageX>_4ff[0][0])&&(e.pageX<_4ff[1][0])&&(e.pageY>_4ff[0][1])&&(e.pageY<_4ff[1][1])){
return true;
}
return false;
},onMouseOver:function(e){
},onMouseOut:function(e){
}});
dojo.dnd.dragManager=new dojo.dnd.HtmlDragManager();
(function(){
var d=document;
var dm=dojo.dnd.dragManager;
dojo.event.connect(d,"onkeydown",dm,"onKeyDown");
dojo.event.connect(d,"onmouseover",dm,"onMouseOver");
dojo.event.connect(d,"onmouseout",dm,"onMouseOut");
dojo.event.connect(d,"onmousedown",dm,"onMouseDown");
dojo.event.connect(d,"onmouseup",dm,"onMouseUp");
dojo.event.connect(window,"onscroll",dm,"onScroll");
})();
dojo.provide("dojo.dnd.HtmlDragAndDrop");
dojo.declare("dojo.dnd.HtmlDragSource",dojo.dnd.DragSource,{dragClass:"",onDragStart:function(){
var _500=new dojo.dnd.HtmlDragObject(this.dragObject,this.type);
if(this.dragClass){
_500.dragClass=this.dragClass;
}
if(this.constrainToContainer){
_500.constrainTo(this.constrainingContainer||this.domNode.parentNode);
}
return _500;
},setDragHandle:function(node){
node=dojo.byId(node);
dojo.dnd.dragManager.unregisterDragSource(this);
this.domNode=node;
dojo.dnd.dragManager.registerDragSource(this);
},setDragTarget:function(node){
this.dragObject=node;
},constrainTo:function(_501){
this.constrainToContainer=true;
if(_501){
this.constrainingContainer=_501;
}
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new dojo.dnd.HtmlDragSource(this.dragObjects[i]));
}
},addDragObjects:function(el){
for(var i=0;i<arguments.length;i++){
this.dragObjects.push(dojo.byId(arguments[i]));
}
}},function(node,type){
node=dojo.byId(node);
this.dragObjects=[];
this.constrainToContainer=false;
if(node){
this.domNode=node;
this.dragObject=node;
this.type=(type)||(this.domNode.nodeName.toLowerCase());
dojo.dnd.DragSource.prototype.reregister.call(this);
}
});
dojo.declare("dojo.dnd.HtmlDragObject",dojo.dnd.DragObject,{dragClass:"",opacity:0.5,createIframe:true,disableX:false,disableY:false,createDragNode:function(){
var node=this.domNode.cloneNode(true);
if(this.dragClass){
dojo.html.addClass(node,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(node,this.opacity);
}
var ltn=node.tagName.toLowerCase();
var isTr=(ltn=="tr");
if((isTr)||(ltn=="tbody")){
var doc=this.domNode.ownerDocument;
var _502=doc.createElement("table");
if(isTr){
var _503=doc.createElement("tbody");
_502.appendChild(_503);
_503.appendChild(node);
}else{
_502.appendChild(node);
}
var _504=((isTr)?this.domNode:this.domNode.firstChild);
var _505=((isTr)?node:node.firstChild);
var _506=tdp.childNodes;
var _507=_505.childNodes;
for(var i=0;i<_506.length;i++){
if((_507[i])&&(_507[i].style)){
_507[i].style.width=dojo.html.getContentBox(_506[i]).width+"px";
}
}
node=_502;
}
if((dojo.render.html.ie55||dojo.render.html.ie60)&&this.createIframe){
with(node.style){
top="0px";
left="0px";
}
var _508=document.createElement("div");
_508.appendChild(node);
this.bgIframe=new dojo.html.BackgroundIframe(_508);
_508.appendChild(this.bgIframe.iframe);
node=_508;
}
node.style.zIndex=999;
return node;
},onDragStart:function(e){
dojo.html.clearSelection();
this.scrollOffset=dojo.html.getScroll().offset;
this.dragStartPosition=dojo.html.getAbsolutePosition(this.domNode,true);
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.dragClone=this.createDragNode();
this.containingBlockPosition=this.domNode.offsetParent?dojo.html.getAbsolutePosition(this.domNode.offsetParent,true):{x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
with(this.dragClone.style){
position="absolute";
top=this.dragOffset.y+e.pageY+"px";
left=this.dragOffset.x+e.pageX+"px";
}
dojo.body().appendChild(this.dragClone);
dojo.event.topic.publish("dragStart",{source:this});
},getConstraints:function(){
if(this.constrainingContainer.nodeName.toLowerCase()=="body"){
var _509=dojo.html.getViewport();
var _50a=_509.width;
var _50b=_509.height;
var _50c=dojo.html.getScroll().offset;
var x=_50c.x;
var y=_50c.y;
}else{
var _50d=dojo.html.getContentBox(this.constrainingContainer);
_50a=_50d.width;
_50b=_50d.height;
x=this.containingBlockPosition.x+dojo.html.getPixelValue(this.constrainingContainer,"padding-left",true)+dojo.html.getBorderExtent(this.constrainingContainer,"left");
y=this.containingBlockPosition.y+dojo.html.getPixelValue(this.constrainingContainer,"padding-top",true)+dojo.html.getBorderExtent(this.constrainingContainer,"top");
}
var mb=dojo.html.getMarginBox(this.domNode);
return {minX:x,minY:y,maxX:x+_50a-mb.width,maxY:y+_50b-mb.height};
},updateDragOffset:function(){
var _50e=dojo.html.getScroll().offset;
if(_50e.y!=this.scrollOffset.y){
var diff=_50e.y-this.scrollOffset.y;
this.dragOffset.y+=diff;
this.scrollOffset.y=_50e.y;
}
if(_50e.x!=this.scrollOffset.x){
var diff=_50e.x-this.scrollOffset.x;
this.dragOffset.x+=diff;
this.scrollOffset.x=_50e.x;
}
},onDragMove:function(e){
this.updateDragOffset();
var x=this.dragOffset.x+e.pageX;
var y=this.dragOffset.y+e.pageY;
if(this.constrainToContainer){
if(x<this.constraints.minX){
x=this.constraints.minX;
}
if(y<this.constraints.minY){
y=this.constraints.minY;
}
if(x>this.constraints.maxX){
x=this.constraints.maxX;
}
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
}
this.setAbsolutePosition(x,y);
dojo.event.topic.publish("dragMove",{source:this});
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.dragClone.style.top=y+"px";
}
if(!this.disableX){
this.dragClone.style.left=x+"px";
}
},onDragEnd:function(e){
switch(e.dragStatus){
case "dropSuccess":
dojo.html.removeNode(this.dragClone);
this.dragClone=null;
break;
case "dropFailure":
var _50f=dojo.html.getAbsolutePosition(this.dragClone,true);
var _510={left:this.dragStartPosition.x+1,top:this.dragStartPosition.y+1};
var anim=dojo.lfx.slideTo(this.dragClone,_510,300);
var _511=this;
dojo.event.connect(anim,"onEnd",function(e){
dojo.html.removeNode(_511.dragClone);
_511.dragClone=null;
});
anim.play();
break;
}
dojo.event.topic.publish("dragEnd",{source:this});
},constrainTo:function(_512){
this.constrainToContainer=true;
if(_512){
this.constrainingContainer=_512;
}else{
this.constrainingContainer=this.domNode.parentNode;
}
}},function(node,type){
this.domNode=dojo.byId(node);
this.type=type;
this.constrainToContainer=false;
this.dragSource=null;
dojo.dnd.DragObject.prototype.register.call(this);
});
dojo.declare("dojo.dnd.HtmlDropTarget",dojo.dnd.DropTarget,{vertical:false,onDragOver:function(e){
if(!this.accepts(e.dragObjects)){
return false;
}
this.childBoxes=[];
for(var i=0,_513;i<this.domNode.childNodes.length;i++){
_513=this.domNode.childNodes[i];
if(_513.nodeType!=dojo.html.ELEMENT_NODE){
continue;
}
var pos=dojo.html.getAbsolutePosition(_513,true);
var _514=dojo.html.getBorderBox(_513);
this.childBoxes.push({top:pos.y,bottom:pos.y+_514.height,left:pos.x,right:pos.x+_514.width,height:_514.height,width:_514.width,node:_513});
}
return true;
},_getNodeUnderMouse:function(e){
for(var i=0,_515;i<this.childBoxes.length;i++){
with(this.childBoxes[i]){
if(e.pageX>=left&&e.pageX<=right&&e.pageY>=top&&e.pageY<=bottom){
return i;
}
}
}
return -1;
},createDropIndicator:function(){
this.dropIndicator=document.createElement("div");
with(this.dropIndicator.style){
position="absolute";
zIndex=999;
if(this.vertical){
borderLeftWidth="1px";
borderLeftColor="black";
borderLeftStyle="solid";
height=dojo.html.getBorderBox(this.domNode).height+"px";
top=dojo.html.getAbsolutePosition(this.domNode,true).y+"px";
}else{
borderTopWidth="1px";
borderTopColor="black";
borderTopStyle="solid";
width=dojo.html.getBorderBox(this.domNode).width+"px";
left=dojo.html.getAbsolutePosition(this.domNode,true).x+"px";
}
}
},onDragMove:function(e,_516){
var i=this._getNodeUnderMouse(e);
if(!this.dropIndicator){
this.createDropIndicator();
}
var _517=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
var hide=false;
if(i<0){
if(this.childBoxes.length){
var _518=(dojo.html.gravity(this.childBoxes[0].node,e)&_517);
if(_518){
hide=true;
}
}else{
var _518=true;
}
}else{
var _519=this.childBoxes[i];
var _518=(dojo.html.gravity(_519.node,e)&_517);
if(_519.node===_516[0].dragSource.domNode){
hide=true;
}else{
var _51a=_518?(i>0?this.childBoxes[i-1]:_519):(i<this.childBoxes.length-1?this.childBoxes[i+1]:_519);
if(_51a.node===_516[0].dragSource.domNode){
hide=true;
}
}
}
if(hide){
this.dropIndicator.style.display="none";
return;
}else{
this.dropIndicator.style.display="";
}
this.placeIndicator(e,_516,i,_518);
if(!dojo.html.hasParent(this.dropIndicator)){
dojo.body().appendChild(this.dropIndicator);
}
},placeIndicator:function(e,_51b,_51c,_51d){
var _51e=this.vertical?"left":"top";
var _51f;
if(_51c<0){
if(this.childBoxes.length){
_51f=_51d?this.childBoxes[0]:this.childBoxes[this.childBoxes.length-1];
}else{
this.dropIndicator.style[_51e]=dojo.html.getAbsolutePosition(this.domNode,true)[this.vertical?"x":"y"]+"px";
}
}else{
_51f=this.childBoxes[_51c];
}
if(_51f){
this.dropIndicator.style[_51e]=(_51d?_51f[_51e]:_51f[this.vertical?"right":"bottom"])+"px";
if(this.vertical){
this.dropIndicator.style.height=_51f.height+"px";
this.dropIndicator.style.top=_51f.top+"px";
}else{
this.dropIndicator.style.width=_51f.width+"px";
this.dropIndicator.style.left=_51f.left+"px";
}
}
},onDragOut:function(e){
if(this.dropIndicator){
dojo.html.removeNode(this.dropIndicator);
delete this.dropIndicator;
}
},onDrop:function(e){
this.onDragOut(e);
var i=this._getNodeUnderMouse(e);
var _520=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
if(i<0){
if(this.childBoxes.length){
if(dojo.html.gravity(this.childBoxes[0].node,e)&_520){
return this.insert(e,this.childBoxes[0].node,"before");
}else{
return this.insert(e,this.childBoxes[this.childBoxes.length-1].node,"after");
}
}
return this.insert(e,this.domNode,"append");
}
var _521=this.childBoxes[i];
if(dojo.html.gravity(_521.node,e)&_520){
return this.insert(e,_521.node,"before");
}else{
return this.insert(e,_521.node,"after");
}
},insert:function(e,_522,_523){
var node=e.dragObject.domNode;
if(_523=="before"){
return dojo.html.insertBefore(node,_522);
}else{
if(_523=="after"){
return dojo.html.insertAfter(node,_522);
}else{
if(_523=="append"){
_522.appendChild(node);
return true;
}
}
}
return false;
}},function(node,_524){
if(arguments.length==0){
return;
}
this.domNode=dojo.byId(node);
dojo.dnd.DropTarget.call(this);
if(_524&&dojo.lang.isString(_524)){
_524=[_524];
}
this.acceptedTypes=_524||[];
dojo.dnd.dragManager.registerDropTarget(this);
});
dojo.provide("dojo.dnd.*");
dojo.provide("dojo.dnd.HtmlDragMove");
dojo.declare("dojo.dnd.HtmlDragMoveSource",dojo.dnd.HtmlDragSource,{onDragStart:function(){
var _525=new dojo.dnd.HtmlDragMoveObject(this.dragObject,this.type);
if(this.constrainToContainer){
_525.constrainTo(this.constrainingContainer);
}
return _525;
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new dojo.dnd.HtmlDragMoveSource(this.dragObjects[i]));
}
}});
dojo.declare("dojo.dnd.HtmlDragMoveObject",dojo.dnd.HtmlDragObject,{onDragStart:function(e){
dojo.html.clearSelection();
this.dragClone=this.domNode;
if(dojo.html.getComputedStyle(this.domNode,"position")!="absolute"){
this.domNode.style.position="relative";
}
var left=parseInt(dojo.html.getComputedStyle(this.domNode,"left"));
var top=parseInt(dojo.html.getComputedStyle(this.domNode,"top"));
this.dragStartPosition={x:isNaN(left)?0:left,y:isNaN(top)?0:top};
this.scrollOffset=dojo.html.getScroll().offset;
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.containingBlockPosition={x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
dojo.event.connect(this.domNode,"onclick",this,"_squelchOnClick");
},onDragEnd:function(e){
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.domNode.style.top=y+"px";
}
if(!this.disableX){
this.domNode.style.left=x+"px";
}
},_squelchOnClick:function(e){
dojo.event.browser.stopEvent(e);
dojo.event.disconnect(this.domNode,"onclick",this,"_squelchOnClick");
}});
dojo.provide("dojo.widget.Dialog");
dojo.declare("dojo.widget.ModalDialogBase",null,{isContainer:true,focusElement:"",bgColor:"black",bgOpacity:0.4,followScroll:true,closeOnBackgroundClick:false,trapTabs:function(e){
if(e.target==this.tabStartOuter){
if(this._fromTrap){
this.tabStart.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabStart){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabEndOuter){
if(this._fromTrap){
this.tabEnd.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}else{
if(e.target==this.tabEnd){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}
}
}
}
},clearTrap:function(e){
var _526=this;
setTimeout(function(){
_526._fromTrap=false;
},100);
},postCreate:function(){
with(this.domNode.style){
position="absolute";
zIndex=999;
display="none";
overflow="visible";
}
var b=dojo.body();
b.appendChild(this.domNode);
this.bg=document.createElement("div");
this.bg.className="dialogUnderlay";
with(this.bg.style){
position="absolute";
left=top="0px";
zIndex=998;
display="none";
}
b.appendChild(this.bg);
this.setBackgroundColor(this.bgColor);
this.bgIframe=new dojo.html.BackgroundIframe();
if(this.bgIframe.iframe){
with(this.bgIframe.iframe.style){
position="absolute";
left=top="0px";
zIndex=90;
display="none";
}
}
if(this.closeOnBackgroundClick){
dojo.event.kwConnect({srcObj:this.bg,srcFunc:"onclick",adviceObj:this,adviceFunc:"onBackgroundClick",once:true});
}
},uninitialize:function(){
this.bgIframe.remove();
dojo.html.removeNode(this.bg,true);
},setBackgroundColor:function(_527){
if(arguments.length>=3){
_527=new dojo.gfx.color.Color(arguments[0],arguments[1],arguments[2]);
}else{
_527=new dojo.gfx.color.Color(_527);
}
this.bg.style.backgroundColor=_527.toString();
return this.bgColor=_527;
},setBackgroundOpacity:function(op){
if(arguments.length==0){
op=this.bgOpacity;
}
dojo.html.setOpacity(this.bg,op);
try{
this.bgOpacity=dojo.html.getOpacity(this.bg);
}
catch(e){
this.bgOpacity=op;
}
return this.bgOpacity;
},_sizeBackground:function(){
if(this.bgOpacity>0){
var _528=dojo.html.getViewport();
var h=_528.height;
var w=_528.width;
with(this.bg.style){
width=w+"px";
height=h+"px";
}
var _529=dojo.html.getScroll().offset;
this.bg.style.top=_529.y+"px";
this.bg.style.left=_529.x+"px";
var _528=dojo.html.getViewport();
if(_528.width!=w){
this.bg.style.width=_528.width+"px";
}
if(_528.height!=h){
this.bg.style.height=_528.height+"px";
}
}
this.bgIframe.size(this.bg);
},_showBackground:function(){
if(this.bgOpacity>0){
this.bg.style.display="block";
}
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="block";
}
},placeModalDialog:function(){
var _52a=dojo.html.getScroll().offset;
var _52b=dojo.html.getViewport();
var mb;
if(this.isShowing()){
mb=dojo.html.getMarginBox(this.domNode);
}else{
dojo.html.setVisibility(this.domNode,false);
dojo.html.show(this.domNode);
mb=dojo.html.getMarginBox(this.domNode);
dojo.html.hide(this.domNode);
dojo.html.setVisibility(this.domNode,true);
}
var x=_52a.x+(_52b.width-mb.width)/2;
var y=_52a.y+(_52b.height-mb.height)/2;
with(this.domNode.style){
left=x+"px";
top=y+"px";
}
},_onKey:function(evt){
if(evt.key){
var node=evt.target;
while(node!=null){
if(node==this.domNode){
return;
}
node=node.parentNode;
}
if(evt.key!=evt.KEY_TAB){
dojo.event.browser.stopEvent(evt);
}else{
if(!dojo.render.html.opera){
try{
this.tabStart.focus();
}
catch(e){
}
}
}
}
},showModalDialog:function(){
if(this.followScroll&&!this._scrollConnected){
this._scrollConnected=true;
dojo.event.connect(window,"onscroll",this,"_onScroll");
}
dojo.event.connect(document.documentElement,"onkey",this,"_onKey");
this.placeModalDialog();
this.setBackgroundOpacity();
this._sizeBackground();
this._showBackground();
this._fromTrap=true;
setTimeout(dojo.lang.hitch(this,function(){
try{
this.tabStart.focus();
}
catch(e){
}
}),50);
},hideModalDialog:function(){
if(this.focusElement){
dojo.byId(this.focusElement).focus();
dojo.byId(this.focusElement).blur();
}
this.bg.style.display="none";
this.bg.style.width=this.bg.style.height="1px";
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="none";
}
dojo.event.disconnect(document.documentElement,"onkey",this,"_onKey");
if(this._scrollConnected){
this._scrollConnected=false;
dojo.event.disconnect(window,"onscroll",this,"_onScroll");
}
},_onScroll:function(){
var _52c=dojo.html.getScroll().offset;
this.bg.style.top=_52c.y+"px";
this.bg.style.left=_52c.x+"px";
this.placeModalDialog();
},checkSize:function(){
if(this.isShowing()){
this._sizeBackground();
this.placeModalDialog();
this.onResized();
}
},onBackgroundClick:function(){
if(this.lifetime-this.timeRemaining>=this.blockDuration){
return;
}
this.hide();
}});
dojo.widget.defineWidget("dojo.widget.Dialog",[dojo.widget.ContentPane,dojo.widget.ModalDialogBase],{templatePath:dojo.uri.dojoUri("src/widget/templates/Dialog.html"),blockDuration:0,lifetime:0,closeNode:"",postMixInProperties:function(){
dojo.widget.Dialog.superclass.postMixInProperties.apply(this,arguments);
if(this.closeNode){
this.setCloseControl(this.closeNode);
}
},postCreate:function(){
dojo.widget.Dialog.superclass.postCreate.apply(this,arguments);
dojo.widget.ModalDialogBase.prototype.postCreate.apply(this,arguments);
},show:function(){
if(this.lifetime){
this.timeRemaining=this.lifetime;
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
if(this.blockDuration&&this.closeNode){
if(this.lifetime>this.blockDuration){
this.closeNode.style.visibility="hidden";
}else{
this.closeNode.style.display="none";
}
}
if(this.timer){
clearInterval(this.timer);
}
this.timer=setInterval(dojo.lang.hitch(this,"_onTick"),100);
}
this.showModalDialog();
dojo.widget.Dialog.superclass.show.call(this);
},onLoad:function(){
this.placeModalDialog();
dojo.widget.Dialog.superclass.onLoad.call(this);
},fillInTemplate:function(){
},hide:function(){
this.hideModalDialog();
dojo.widget.Dialog.superclass.hide.call(this);
if(this.timer){
clearInterval(this.timer);
}
},setTimerNode:function(node){
this.timerNode=node;
},setCloseControl:function(node){
this.closeNode=dojo.byId(node);
dojo.event.connect(this.closeNode,"onclick",this,"hide");
},setShowControl:function(node){
node=dojo.byId(node);
dojo.event.connect(node,"onclick",this,"show");
},_onTick:function(){
if(this.timer){
this.timeRemaining-=100;
if(this.lifetime-this.timeRemaining>=this.blockDuration){
if(this.closeNode){
this.closeNode.style.visibility="visible";
}
}
if(!this.timeRemaining){
clearInterval(this.timer);
this.hide();
}else{
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
}
}
}});
dojo.provide("dojo.widget.ResizeHandle");
dojo.widget.defineWidget("dojo.widget.ResizeHandle",dojo.widget.HtmlWidget,{targetElmId:"",templateCssPath:dojo.uri.dojoUri("src/widget/templates/ResizeHandle.css"),templateString:"<div class=\"dojoHtmlResizeHandle\"><div></div></div>",postCreate:function(){
dojo.event.connect(this.domNode,"onmousedown",this,"_beginSizing");
},_beginSizing:function(e){
if(this._isSizing){
return false;
}
this.targetWidget=dojo.widget.byId(this.targetElmId);
this.targetDomNode=this.targetWidget?this.targetWidget.domNode:dojo.byId(this.targetElmId);
if(!this.targetDomNode){
return;
}
this._isSizing=true;
this.startPoint={"x":e.clientX,"y":e.clientY};
var mb=dojo.html.getMarginBox(this.targetDomNode);
this.startSize={"w":mb.width,"h":mb.height};
dojo.event.kwConnect({srcObj:dojo.body(),srcFunc:"onmousemove",targetObj:this,targetFunc:"_changeSizing",rate:25});
dojo.event.connect(dojo.body(),"onmouseup",this,"_endSizing");
e.preventDefault();
},_changeSizing:function(e){
try{
if(!e.clientX||!e.clientY){
return;
}
}
catch(e){
return;
}
var dx=this.startPoint.x-e.clientX;
var dy=this.startPoint.y-e.clientY;
var newW=this.startSize.w-dx;
var newH=this.startSize.h-dy;
if(this.minSize){
var mb=dojo.html.getMarginBox(this.targetDomNode);
if(newW<this.minSize.w){
newW=mb.width;
}
if(newH<this.minSize.h){
newH=mb.height;
}
}
if(this.targetWidget){
this.targetWidget.resizeTo(newW,newH);
}else{
dojo.html.setMarginBox(this.targetDomNode,{width:newW,height:newH});
}
e.preventDefault();
},_endSizing:function(e){
dojo.event.disconnect(dojo.body(),"onmousemove",this,"_changeSizing");
dojo.event.disconnect(dojo.body(),"onmouseup",this,"_endSizing");
this._isSizing=false;
}});
dojo.provide("dojo.widget.FloatingPane");
dojo.declare("dojo.widget.FloatingPaneBase",null,{title:"",iconSrc:"",hasShadow:false,constrainToContainer:false,taskBarId:"",resizable:true,titleBarDisplay:true,windowState:"normal",displayCloseAction:false,displayMinimizeAction:false,displayMaximizeAction:false,_max_taskBarConnectAttempts:5,_taskBarConnectAttempts:0,templatePath:dojo.uri.dojoUri("src/widget/templates/FloatingPane.html"),templateCssPath:dojo.uri.dojoUri("src/widget/templates/FloatingPane.css"),fillInFloatingPaneTemplate:function(args,frag){
var _52d=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_52d);
dojo.body().appendChild(this.domNode);
if(!this.isShowing()){
this.windowState="minimized";
}
if(this.iconSrc==""){
dojo.html.removeNode(this.titleBarIcon);
}else{
this.titleBarIcon.src=this.iconSrc.toString();
}
if(this.titleBarDisplay){
this.titleBar.style.display="";
dojo.html.disableSelection(this.titleBar);
this.titleBarIcon.style.display=(this.iconSrc==""?"none":"");
this.minimizeAction.style.display=(this.displayMinimizeAction?"":"none");
this.maximizeAction.style.display=(this.displayMaximizeAction&&this.windowState!="maximized"?"":"none");
this.restoreAction.style.display=(this.displayMaximizeAction&&this.windowState=="maximized"?"":"none");
this.closeAction.style.display=(this.displayCloseAction?"":"none");
this.drag=new dojo.dnd.HtmlDragMoveSource(this.domNode);
if(this.constrainToContainer){
this.drag.constrainTo();
}
this.drag.setDragHandle(this.titleBar);
var self=this;
dojo.event.topic.subscribe("dragMove",function(info){
if(info.source.domNode==self.domNode){
dojo.event.topic.publish("floatingPaneMove",{source:self});
}
});
}
if(this.resizable){
this.resizeBar.style.display="";
this.resizeHandle=dojo.widget.createWidget("ResizeHandle",{targetElmId:this.widgetId,id:this.widgetId+"_resize"});
this.resizeBar.appendChild(this.resizeHandle.domNode);
}
if(this.hasShadow){
this.shadow=new dojo.lfx.shadow(this.domNode);
}
this.bgIframe=new dojo.html.BackgroundIframe(this.domNode);
if(this.taskBarId){
this._taskBarSetup();
}
dojo.body().removeChild(this.domNode);
},postCreate:function(){
if(dojo.hostenv.post_load_){
this._setInitialWindowState();
}else{
dojo.addOnLoad(this,"_setInitialWindowState");
}
},maximizeWindow:function(evt){
var mb=dojo.html.getMarginBox(this.domNode);
this.previous={width:mb.width||this.width,height:mb.height||this.height,left:this.domNode.style.left,top:this.domNode.style.top,bottom:this.domNode.style.bottom,right:this.domNode.style.right};
if(this.domNode.parentNode.style.overflow.toLowerCase()!="hidden"){
this.parentPrevious={overflow:this.domNode.parentNode.style.overflow};
dojo.debug(this.domNode.parentNode.style.overflow);
this.domNode.parentNode.style.overflow="hidden";
}
this.domNode.style.left=dojo.html.getPixelValue(this.domNode.parentNode,"padding-left",true)+"px";
this.domNode.style.top=dojo.html.getPixelValue(this.domNode.parentNode,"padding-top",true)+"px";
if((this.domNode.parentNode.nodeName.toLowerCase()=="body")){
var _52e=dojo.html.getViewport();
var _52f=dojo.html.getPadding(dojo.body());
this.resizeTo(_52e.width-_52f.width,_52e.height-_52f.height);
}else{
var _530=dojo.html.getContentBox(this.domNode.parentNode);
this.resizeTo(_530.width,_530.height);
}
this.maximizeAction.style.display="none";
this.restoreAction.style.display="";
if(this.resizeHandle){
this.resizeHandle.domNode.style.display="none";
}
this.drag.setDragHandle(null);
this.windowState="maximized";
},minimizeWindow:function(evt){
this.hide();
for(var attr in this.parentPrevious){
this.domNode.parentNode.style[attr]=this.parentPrevious[attr];
}
this.lastWindowState=this.windowState;
this.windowState="minimized";
},restoreWindow:function(evt){
if(this.windowState=="minimized"){
this.show();
if(this.lastWindowState=="maximized"){
this.domNode.parentNode.style.overflow="hidden";
this.windowState="maximized";
}else{
this.windowState="normal";
}
}else{
if(this.windowState=="maximized"){
for(var attr in this.previous){
this.domNode.style[attr]=this.previous[attr];
}
for(var attr in this.parentPrevious){
this.domNode.parentNode.style[attr]=this.parentPrevious[attr];
}
this.resizeTo(this.previous.width,this.previous.height);
this.previous=null;
this.parentPrevious=null;
this.restoreAction.style.display="none";
this.maximizeAction.style.display=this.displayMaximizeAction?"":"none";
if(this.resizeHandle){
this.resizeHandle.domNode.style.display="";
}
this.drag.setDragHandle(this.titleBar);
this.windowState="normal";
}else{
}
}
},toggleDisplay:function(){
if(this.windowState=="minimized"){
this.restoreWindow();
}else{
this.minimizeWindow();
}
},closeWindow:function(evt){
dojo.html.removeNode(this.domNode);
this.destroy();
},onMouseDown:function(evt){
this.bringToTop();
},bringToTop:function(){
var _531=dojo.widget.manager.getWidgetsByType(this.widgetType);
var _532=[];
for(var x=0;x<_531.length;x++){
if(this.widgetId!=_531[x].widgetId){
_532.push(_531[x]);
}
}
_532.sort(function(a,b){
return a.domNode.style.zIndex-b.domNode.style.zIndex;
});
_532.push(this);
var _533=100;
for(x=0;x<_532.length;x++){
_532[x].domNode.style.zIndex=_533+x*2;
}
},_setInitialWindowState:function(){
if(this.isShowing()){
this.width=-1;
var mb=dojo.html.getMarginBox(this.domNode);
this.resizeTo(mb.width,mb.height);
}
if(this.windowState=="maximized"){
this.maximizeWindow();
this.show();
return;
}
if(this.windowState=="normal"){
this.show();
return;
}
if(this.windowState=="minimized"){
this.hide();
return;
}
this.windowState="minimized";
},_taskBarSetup:function(){
var _534=dojo.widget.getWidgetById(this.taskBarId);
if(!_534){
if(this._taskBarConnectAttempts<this._max_taskBarConnectAttempts){
dojo.lang.setTimeout(this,this._taskBarSetup,50);
this._taskBarConnectAttempts++;
}else{
dojo.debug("Unable to connect to the taskBar");
}
return;
}
_534.addChild(this);
},showFloatingPane:function(){
this.bringToTop();
},onFloatingPaneShow:function(){
var mb=dojo.html.getMarginBox(this.domNode);
this.resizeTo(mb.width,mb.height);
},resizeTo:function(_535,_536){
dojo.html.setMarginBox(this.domNode,{width:_535,height:_536});
dojo.widget.html.layout(this.domNode,[{domNode:this.titleBar,layoutAlign:"top"},{domNode:this.resizeBar,layoutAlign:"bottom"},{domNode:this.containerNode,layoutAlign:"client"}]);
dojo.widget.html.layout(this.containerNode,this.children,"top-bottom");
this.bgIframe.onResized();
if(this.shadow){
this.shadow.size(_535,_536);
}
this.onResized();
},checkSize:function(){
},destroyFloatingPane:function(){
if(this.resizeHandle){
this.resizeHandle.destroy();
this.resizeHandle=null;
}
}});
dojo.widget.defineWidget("dojo.widget.FloatingPane",[dojo.widget.ContentPane,dojo.widget.FloatingPaneBase],{fillInTemplate:function(args,frag){
this.fillInFloatingPaneTemplate(args,frag);
dojo.widget.FloatingPane.superclass.fillInTemplate.call(this,args,frag);
},postCreate:function(){
dojo.widget.FloatingPaneBase.prototype.postCreate.apply(this,arguments);
dojo.widget.FloatingPane.superclass.postCreate.apply(this,arguments);
},show:function(){
dojo.widget.FloatingPane.superclass.show.apply(this,arguments);
this.showFloatingPane();
},onShow:function(){
dojo.widget.FloatingPane.superclass.onShow.call(this);
this.onFloatingPaneShow();
},destroy:function(){
this.destroyFloatingPane();
dojo.widget.FloatingPane.superclass.destroy.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.ModalFloatingPane",[dojo.widget.FloatingPane,dojo.widget.ModalDialogBase],{windowState:"minimized",displayCloseAction:true,postCreate:function(){
dojo.widget.ModalDialogBase.prototype.postCreate.call(this);
dojo.widget.ModalFloatingPane.superclass.postCreate.call(this);
},show:function(){
this.showModalDialog();
dojo.widget.ModalFloatingPane.superclass.show.apply(this,arguments);
this.bg.style.zIndex=this.domNode.style.zIndex-1;
},hide:function(){
this.hideModalDialog();
dojo.widget.ModalFloatingPane.superclass.hide.apply(this,arguments);
},closeWindow:function(){
this.hide();
dojo.widget.ModalFloatingPane.superclass.closeWindow.apply(this,arguments);
}});
dojo.provide("dojo.widget.PopupContainer");
dojo.declare("dojo.widget.PopupContainerBase",null,function(){
this.queueOnAnimationFinish=[];
},{isContainer:true,templateString:"<div dojoAttachPoint=\"containerNode\" style=\"display:none;position:absolute;\" class=\"dojoPopupContainer\" ></div>",isShowingNow:false,currentSubpopup:null,beginZIndex:1000,parentPopup:null,parent:null,popupIndex:0,aroundBox:dojo.html.boxSizing.BORDER_BOX,openedForWindow:null,processKey:function(evt){
return false;
},applyPopupBasicStyle:function(){
with(this.domNode.style){
display="none";
position="absolute";
}
},aboutToShow:function(){
},open:function(x,y,_537,_538,_539,_53a){
if(this.isShowingNow){
return;
}
if(this.animationInProgress){
this.queueOnAnimationFinish.push(this.open,arguments);
return;
}
this.aboutToShow();
var _53b=false,node,_53c;
if(typeof x=="object"){
node=x;
_53c=_538;
_538=_537;
_537=y;
_53b=true;
}
this.parent=_537;
dojo.body().appendChild(this.domNode);
_538=_538||_537["domNode"]||[];
var _53d=null;
this.isTopLevel=true;
while(_537){
if(_537!==this&&(_537.setOpenedSubpopup!=undefined&&_537.applyPopupBasicStyle!=undefined)){
_53d=_537;
this.isTopLevel=false;
_53d.setOpenedSubpopup(this);
break;
}
_537=_537.parent;
}
this.parentPopup=_53d;
this.popupIndex=_53d?_53d.popupIndex+1:1;
if(this.isTopLevel){
var _53e=dojo.html.isNode(_538)?_538:null;
dojo.widget.PopupManager.opened(this,_53e);
}
if(this.isTopLevel&&!dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.isCollapsed)){
this._bookmark=dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.getBookmark);
}else{
this._bookmark=null;
}
if(_538 instanceof Array){
_538={left:_538[0],top:_538[1],width:0,height:0};
}
with(this.domNode.style){
display="";
zIndex=this.beginZIndex+this.popupIndex;
}
if(_53b){
this.move(node,_53a,_53c);
}else{
this.move(x,y,_53a,_539);
}
this.domNode.style.display="none";
this.explodeSrc=_538;
this.show();
this.isShowingNow=true;
},move:function(x,y,_53f,_540){
var _541=(typeof x=="object");
if(_541){
var _542=_53f;
var node=x;
_53f=y;
if(!_542){
_542={"BL":"TL","TL":"BL"};
}
dojo.html.placeOnScreenAroundElement(this.domNode,node,_53f,this.aroundBox,_542);
}else{
if(!_540){
_540="TL,TR,BL,BR";
}
dojo.html.placeOnScreen(this.domNode,x,y,_53f,true,_540);
}
},close:function(_543){
if(_543){
this.domNode.style.display="none";
}
if(this.animationInProgress){
this.queueOnAnimationFinish.push(this.close,[]);
return;
}
this.closeSubpopup(_543);
this.hide();
if(this.bgIframe){
this.bgIframe.hide();
this.bgIframe.size({left:0,top:0,width:0,height:0});
}
if(this.isTopLevel){
dojo.widget.PopupManager.closed(this);
}
this.isShowingNow=false;
if(this.parent){
setTimeout(dojo.lang.hitch(this,function(){
try{
if(this.parent["focus"]){
this.parent.focus();
}else{
this.parent.domNode.focus();
}
}
catch(e){
dojo.debug("No idea how to focus to parent",e);
}
}),10);
}
if(this._bookmark&&dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.isCollapsed)){
if(this.openedForWindow){
this.openedForWindow.focus();
}
try{
dojo.withGlobal(this.openedForWindow||dojo.global(),"moveToBookmark",dojo.html.selection,[this._bookmark]);
}
catch(e){
}
}
this._bookmark=null;
},closeAll:function(_544){
if(this.parentPopup){
this.parentPopup.closeAll(_544);
}else{
this.close(_544);
}
},setOpenedSubpopup:function(_545){
this.currentSubpopup=_545;
},closeSubpopup:function(_546){
if(this.currentSubpopup==null){
return;
}
this.currentSubpopup.close(_546);
this.currentSubpopup=null;
},onShow:function(){
dojo.widget.PopupContainer.superclass.onShow.apply(this,arguments);
this.openedSize={w:this.domNode.style.width,h:this.domNode.style.height};
if(dojo.render.html.ie){
if(!this.bgIframe){
this.bgIframe=new dojo.html.BackgroundIframe();
this.bgIframe.setZIndex(this.domNode);
}
this.bgIframe.size(this.domNode);
this.bgIframe.show();
}
this.processQueue();
},processQueue:function(){
if(!this.queueOnAnimationFinish.length){
return;
}
var func=this.queueOnAnimationFinish.shift();
var args=this.queueOnAnimationFinish.shift();
func.apply(this,args);
},onHide:function(){
dojo.widget.HtmlWidget.prototype.onHide.call(this);
if(this.openedSize){
with(this.domNode.style){
width=this.openedSize.w;
height=this.openedSize.h;
}
}
this.processQueue();
}});
dojo.widget.defineWidget("dojo.widget.PopupContainer",[dojo.widget.HtmlWidget,dojo.widget.PopupContainerBase],{});
dojo.widget.PopupManager=new function(){
this.currentMenu=null;
this.currentButton=null;
this.currentFocusMenu=null;
this.focusNode=null;
this.registeredWindows=[];
this.registerWin=function(win){
if(!win.__PopupManagerRegistered){
dojo.event.connect(win.document,"onmousedown",this,"onClick");
dojo.event.connect(win,"onscroll",this,"onClick");
dojo.event.connect(win.document,"onkey",this,"onKey");
win.__PopupManagerRegistered=true;
this.registeredWindows.push(win);
}
};
this.registerAllWindows=function(_547){
if(!_547){
try{
_547=dojo.html.getDocumentWindow(window.top&&window.top.document||window.document);
}
catch(e){
_547=dojo.html.getDocumentWindow(window.document);
}
}
this.registerWin(_547);
for(var i=0;i<_547.frames.length;i++){
try{
var win=dojo.html.getDocumentWindow(_547.frames[i].document);
if(win){
this.registerAllWindows(win);
}
}
catch(e){
}
}
};
this.unRegisterWin=function(win){
if(win.__PopupManagerRegistered){
dojo.event.disconnect(win.document,"onmousedown",this,"onClick");
dojo.event.disconnect(win,"onscroll",this,"onClick");
dojo.event.disconnect(win.document,"onkey",this,"onKey");
win.__PopupManagerRegistered=false;
}
};
this.unRegisterAllWindows=function(){
for(var i=0;i<this.registeredWindows.length;++i){
this.unRegisterWin(this.registeredWindows[i]);
}
this.registeredWindows=[];
};
dojo.addOnLoad(this,"registerAllWindows");
dojo.addOnUnload(this,"unRegisterAllWindows");
this.closed=function(menu){
if(this.currentMenu==menu){
this.currentMenu=null;
this.currentButton=null;
this.currentFocusMenu=null;
}
};
this.opened=function(menu,_548){
if(menu==this.currentMenu){
return;
}
if(this.currentMenu){
this.currentMenu.close();
}
this.currentMenu=menu;
this.currentFocusMenu=menu;
this.currentButton=_548;
};
this.setFocusedMenu=function(menu){
this.currentFocusMenu=menu;
};
this.onKey=function(e){
if(!e.key){
return;
}
if(!this.currentMenu||!this.currentMenu.isShowingNow){
return;
}
var m=this.currentFocusMenu;
while(m){
if(m.processKey(e)){
e.preventDefault();
e.stopPropagation();
break;
}
m=m.parentPopup;
}
},this.onClick=function(e){
if(!this.currentMenu){
return;
}
var _549=dojo.html.getScroll().offset;
var m=this.currentMenu;
while(m){
if(dojo.html.overElement(m.domNode,e)||dojo.html.isDescendantOf(e.target,m.domNode)){
return;
}
m=m.currentSubpopup;
}
if(this.currentButton&&dojo.html.overElement(this.currentButton,e)){
return;
}
this.currentMenu.close();
};
};
dojo.provide("dojo.widget.Menu2");
dojo.widget.defineWidget("dojo.widget.PopupMenu2",dojo.widget.PopupContainer,function(){
this.targetNodeIds=[];
this.eventNames={open:""};
},{snarfChildDomOutput:true,eventNaming:"default",templateString:"<table class=\"dojoPopupMenu2\" border=0 cellspacing=0 cellpadding=0 style=\"display: none;\"><tbody dojoAttachPoint=\"containerNode\"></tbody></table>",templateCssPath:dojo.uri.dojoUri("src/widget/templates/Menu2.css"),templateCssString:"",submenuDelay:500,submenuOverlap:5,contextMenuForWindow:false,initialize:function(args,frag){
if(this.eventNaming=="default"){
for(var _54a in this.eventNames){
this.eventNames[_54a]=this.widgetId+"/"+_54a;
}
}
},postCreate:function(){
if(this.contextMenuForWindow){
var doc=dojo.body();
this.bindDomNode(doc);
}else{
if(this.targetNodeIds.length>0){
dojo.lang.forEach(this.targetNodeIds,this.bindDomNode,this);
}
}
this._subscribeSubitemsOnOpen();
},_subscribeSubitemsOnOpen:function(){
var _54b=this.getChildrenOfType(dojo.widget.MenuItem2);
for(var i=0;i<_54b.length;i++){
dojo.event.topic.subscribe(this.eventNames.open,_54b[i],"menuOpen");
}
},getTopOpenEvent:function(){
var menu=this;
while(menu.parentPopup){
menu=menu.parentPopup;
}
return menu.openEvent;
},bindDomNode:function(node){
node=dojo.byId(node);
var win=dojo.html.getElementWindow(node);
if(dojo.html.isTag(node,"iframe")=="iframe"){
win=dojo.html.iframeContentWindow(node);
node=dojo.withGlobal(win,dojo.body);
}
dojo.widget.Menu2.OperaAndKonqFixer.fixNode(node);
dojo.event.kwConnect({srcObj:node,srcFunc:"oncontextmenu",targetObj:this,targetFunc:"onOpen",once:true});
if(dojo.render.html.moz&&win.document.designMode.toLowerCase()=="on"){
dojo.event.browser.addListener(node,"contextmenu",dojo.lang.hitch(this,"onOpen"));
}
dojo.widget.PopupManager.registerWin(win);
},unBindDomNode:function(_54c){
var node=dojo.byId(_54c);
dojo.event.kwDisconnect({srcObj:node,srcFunc:"oncontextmenu",targetObj:this,targetFunc:"onOpen",once:true});
dojo.widget.Menu2.OperaAndKonqFixer.cleanNode(node);
},_moveToNext:function(evt){
this._highlightOption(1);
return true;
},_moveToPrevious:function(evt){
this._highlightOption(-1);
return true;
},_moveToParentMenu:function(evt){
if(this._highlighted_option&&this.parentPopup){
if(evt._menu2UpKeyProcessed){
return true;
}else{
this._highlighted_option.onUnhover();
this.closeSubpopup();
evt._menu2UpKeyProcessed=true;
}
}
return false;
},_moveToChildMenu:function(evt){
if(this._highlighted_option&&this._highlighted_option.submenuId){
this._highlighted_option._onClick(true);
return true;
}
return false;
},_selectCurrentItem:function(evt){
if(this._highlighted_option){
this._highlighted_option._onClick();
return true;
}
return false;
},processKey:function(evt){
if(evt.ctrlKey||evt.altKey||!evt.key){
return false;
}
var rval=false;
switch(evt.key){
case evt.KEY_DOWN_ARROW:
rval=this._moveToNext(evt);
break;
case evt.KEY_UP_ARROW:
rval=this._moveToPrevious(evt);
break;
case evt.KEY_RIGHT_ARROW:
rval=this._moveToChildMenu(evt);
break;
case evt.KEY_LEFT_ARROW:
rval=this._moveToParentMenu(evt);
break;
case " ":
case evt.KEY_ENTER:
if(rval=this._selectCurrentItem(evt)){
break;
}
case evt.KEY_ESCAPE:
dojo.widget.PopupManager.currentMenu.close();
rval=true;
break;
}
return rval;
},_findValidItem:function(dir,_54d){
if(_54d){
_54d=dir>0?_54d.getNextSibling():_54d.getPreviousSibling();
}
for(var i=0;i<this.children.length;++i){
if(!_54d){
_54d=dir>0?this.children[0]:this.children[this.children.length-1];
}
if(_54d.onHover&&_54d.isShowing()){
return _54d;
}
_54d=dir>0?_54d.getNextSibling():_54d.getPreviousSibling();
}
},_highlightOption:function(dir){
var item;
if((!this._highlighted_option)){
item=this._findValidItem(dir);
}else{
item=this._findValidItem(dir,this._highlighted_option);
}
if(item){
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
item.onHover();
try{
var node=dojo.html.getElementsByClass("dojoMenuItem2Label",item.domNode)[0];
node.focus();
}
catch(e){
}
}
},onItemClick:function(item){
},close:function(_54e){
if(this.animationInProgress){
dojo.widget.PopupMenu2.superclass.close.apply(this,arguments);
return;
}
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
dojo.widget.PopupMenu2.superclass.close.apply(this,arguments);
},closeSubpopup:function(_54f){
if(this.currentSubpopup==null){
return;
}
this.currentSubpopup.close(_54f);
this.currentSubpopup=null;
this.currentSubmenuTrigger.is_open=false;
this.currentSubmenuTrigger._closedSubmenu(_54f);
this.currentSubmenuTrigger=null;
},_openSubmenu:function(_550,_551){
var _552=dojo.html.getAbsolutePosition(_551.domNode,true);
var _553=dojo.html.getMarginBox(this.domNode).width;
var x=_552.x+_553-this.submenuOverlap;
var y=_552.y;
_550.open(x,y,this,_551.domNode);
this.currentSubmenuTrigger=_551;
this.currentSubmenuTrigger.is_open=true;
},onOpen:function(e){
this.openEvent=e;
if(e["target"]){
this.openedForWindow=dojo.html.getElementWindow(e.target);
}else{
this.openedForWindow=null;
}
var x=e.pageX,y=e.pageY;
var win=dojo.html.getElementWindow(e.target);
var _554=win._frameElement||win.frameElement;
if(_554){
var cood=dojo.html.abs(_554,true);
x+=cood.x-dojo.withGlobal(win,dojo.html.getScroll).left;
y+=cood.y-dojo.withGlobal(win,dojo.html.getScroll).top;
}
this.open(x,y,null,[x,y]);
e.preventDefault();
e.stopPropagation();
}});
dojo.widget.defineWidget("dojo.widget.MenuItem2",dojo.widget.HtmlWidget,function(){
this.eventNames={engage:""};
},{templateString:"<tr class=\"dojoMenuItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick; onKey:onKey;\">"+"<td><div class=\"${this.iconClass}\" style=\"${this.iconStyle}\"></div></td>"+"<td tabIndex=\"-1\" class=\"dojoMenuItem2Label\">${this.caption}</td>"+"<td class=\"dojoMenuItem2Accel\">${this.accelKey}</td>"+"<td><div class=\"dojoMenuItem2Submenu\" style=\"display:${this.arrowDisplay};\"></div></td>"+"</tr>",is_hovering:false,hover_timer:null,is_open:false,topPosition:0,caption:"Untitled",accelKey:"",iconSrc:"",disabledClass:"dojoMenuItem2Disabled",iconClass:"dojoMenuItem2Icon",submenuId:"",eventNaming:"default",highlightClass:"dojoMenuItem2Hover",postMixInProperties:function(){
this.iconStyle="";
if(this.iconSrc){
if((this.iconSrc.toLowerCase().substring(this.iconSrc.length-4)==".png")&&(dojo.render.html.ie55||dojo.render.html.ie60)){
this.iconStyle="filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.iconSrc+"', sizingMethod='image')";
}else{
this.iconStyle="background-image: url("+this.iconSrc+")";
}
}
this.arrowDisplay=this.submenuId?"block":"none";
dojo.widget.MenuItem2.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
dojo.html.disableSelection(this.domNode);
if(this.disabled){
this.setDisabled(true);
}
if(this.eventNaming=="default"){
for(var _555 in this.eventNames){
this.eventNames[_555]=this.widgetId+"/"+_555;
}
}
},onHover:function(){
this.onUnhover();
if(this.is_hovering){
return;
}
if(this.is_open){
return;
}
if(this.parent._highlighted_option){
this.parent._highlighted_option.onUnhover();
}
this.parent.closeSubpopup();
this.parent._highlighted_option=this;
dojo.widget.PopupManager.setFocusedMenu(this.parent);
this._highlightItem();
if(this.is_hovering){
this._stopSubmenuTimer();
}
this.is_hovering=true;
this._startSubmenuTimer();
},onUnhover:function(){
if(!this.is_open){
this._unhighlightItem();
}
this.is_hovering=false;
this.parent._highlighted_option=null;
if(this.parent.parentPopup){
dojo.widget.PopupManager.setFocusedMenu(this.parent.parentPopup);
}
this._stopSubmenuTimer();
},_onClick:function(_556){
var _557=false;
if(this.disabled){
return false;
}
if(this.submenuId){
if(!this.is_open){
this._stopSubmenuTimer();
this._openSubmenu();
}
_557=true;
}else{
this.onUnhover();
this.parent.closeAll(true);
}
this.onClick();
dojo.event.topic.publish(this.eventNames.engage,this);
if(_557&&_556){
dojo.widget.getWidgetById(this.submenuId)._highlightOption(1);
}
return;
},onClick:function(){
this.parent.onItemClick(this);
},_highlightItem:function(){
dojo.html.addClass(this.domNode,this.highlightClass);
},_unhighlightItem:function(){
dojo.html.removeClass(this.domNode,this.highlightClass);
},_startSubmenuTimer:function(){
this._stopSubmenuTimer();
if(this.disabled){
return;
}
var self=this;
var _558=function(){
return function(){
self._openSubmenu();
};
}();
this.hover_timer=dojo.lang.setTimeout(_558,this.parent.submenuDelay);
},_stopSubmenuTimer:function(){
if(this.hover_timer){
dojo.lang.clearTimeout(this.hover_timer);
this.hover_timer=null;
}
},_openSubmenu:function(){
if(this.disabled){
return;
}
this.parent.closeSubpopup();
var _559=dojo.widget.getWidgetById(this.submenuId);
if(_559){
this.parent._openSubmenu(_559,this);
}
},_closedSubmenu:function(){
this.onUnhover();
},setDisabled:function(_55a){
this.disabled=_55a;
if(this.disabled){
dojo.html.addClass(this.domNode,this.disabledClass);
}else{
dojo.html.removeClass(this.domNode,this.disabledClass);
}
},enable:function(){
this.setDisabled(false);
},disable:function(){
this.setDisabled(true);
},menuOpen:function(_55b){
}});
dojo.widget.defineWidget("dojo.widget.MenuSeparator2",dojo.widget.HtmlWidget,{templateString:"<tr class=\"dojoMenuSeparator2\"><td colspan=4>"+"<div class=\"dojoMenuSeparator2Top\"></div>"+"<div class=\"dojoMenuSeparator2Bottom\"></div>"+"</td></tr>",postCreate:function(){
dojo.html.disableSelection(this.domNode);
}});
dojo.widget.defineWidget("dojo.widget.MenuBar2",dojo.widget.PopupMenu2,{menuOverlap:2,templateString:"<div class=\"dojoMenuBar2\" tabIndex=\"0\"><table class=\"dojoMenuBar2Client\"><tr dojoAttachPoint=\"containerNode\"></tr></table></div>",close:function(_55c){
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
this.closeSubpopup(_55c);
},processKey:function(evt){
if(evt.ctrlKey||evt.altKey){
return false;
}
if(!dojo.html.hasClass(evt.target,"dojoMenuBar2")){
return false;
}
var rval=false;
switch(evt.key){
case evt.KEY_DOWN_ARROW:
rval=this._moveToChildMenu(evt);
break;
case evt.KEY_UP_ARROW:
rval=this._moveToParentMenu(evt);
break;
case evt.KEY_RIGHT_ARROW:
rval=this._moveToNext(evt);
break;
case evt.KEY_LEFT_ARROW:
rval=this._moveToPrevious(evt);
break;
default:
rval=dojo.widget.MenuBar2.superclass.processKey.apply(this,arguments);
break;
}
return rval;
},postCreate:function(){
dojo.widget.MenuBar2.superclass.postCreate.apply(this,arguments);
dojo.widget.PopupManager.opened(this);
this.isShowingNow=true;
},_openSubmenu:function(_55d,_55e){
var _55f=dojo.html.getAbsolutePosition(_55e.domNode,true);
var _560=dojo.html.getAbsolutePosition(this.domNode,true);
var _561=dojo.html.getBorderBox(this.domNode).height;
var x=_55f.x;
var y=_560.y+_561-this.menuOverlap;
_55d.open(x,y,this,_55e.domNode);
this.currentSubmenuTrigger=_55e;
this.currentSubmenuTrigger.is_open=true;
}});
dojo.widget.defineWidget("dojo.widget.MenuBarItem2",dojo.widget.MenuItem2,{templateString:"<td class=\"dojoMenuBarItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick;\">"+"<span>${this.caption}</span>"+"</td>",highlightClass:"dojoMenuBarItem2Hover",setDisabled:function(_562){
this.disabled=_562;
if(this.disabled){
dojo.html.addClass(this.domNode,"dojoMenuBarItem2Disabled");
}else{
dojo.html.removeClass(this.domNode,"dojoMenuBarItem2Disabled");
}
}});
dojo.widget.Menu2.OperaAndKonqFixer=new function(){
var _563=true;
var _564=false;
if(!dojo.lang.isFunction(dojo.doc().oncontextmenu)){
dojo.doc().oncontextmenu=function(){
_563=false;
_564=true;
};
}
if(dojo.doc().createEvent){
try{
var e=dojo.doc().createEvent("MouseEvents");
e.initMouseEvent("contextmenu",1,1,dojo.global(),1,0,0,0,0,0,0,0,0,0,null);
dojo.doc().dispatchEvent(e);
}
catch(e){
}
}else{
_563=false;
}
if(_564){
delete dojo.doc().oncontextmenu;
}
this.fixNode=function(node){
if(_563){
if(!dojo.lang.isFunction(node.oncontextmenu)){
node.oncontextmenu=function(e){
};
}
if(dojo.render.html.opera){
node._menufixer_opera=function(e){
if(e.ctrlKey){
this.oncontextmenu(e);
}
};
dojo.event.connect(node,"onclick",node,"_menufixer_opera");
}else{
node._menufixer_konq=function(e){
if(e.button==2){
e.preventDefault();
this.oncontextmenu(e);
}
};
dojo.event.connect(node,"onmousedown",node,"_menufixer_konq");
}
}
};
this.cleanNode=function(node){
if(_563){
if(node._menufixer_opera){
dojo.event.disconnect(node,"onclick",node,"_menufixer_opera");
delete node._menufixer_opera;
}else{
if(node._menufixer_konq){
dojo.event.disconnect(node,"onmousedown",node,"_menufixer_konq");
delete node._menufixer_konq;
}
}
if(node.oncontextmenu){
delete node.oncontextmenu;
}
}
};
};
dojo.provide("dojo.widget.Button");
dojo.widget.defineWidget("dojo.widget.Button",dojo.widget.HtmlWidget,{isContainer:true,caption:"",templatePath:dojo.uri.dojoUri("src/widget/templates/ButtonTemplate.html"),templateCssPath:dojo.uri.dojoUri("src/widget/templates/ButtonTemplate.css"),inactiveImg:"src/widget/templates/images/soriaButton-",activeImg:"src/widget/templates/images/soriaActive-",pressedImg:"src/widget/templates/images/soriaPressed-",disabledImg:"src/widget/templates/images/soriaDisabled-",width2height:1/3,fillInTemplate:function(){
if(this.caption){
this.containerNode.appendChild(document.createTextNode(this.caption));
}
dojo.html.disableSelection(this.containerNode);
},postCreate:function(){
this._sizeMyself();
},_sizeMyself:function(){
if(this.domNode.parentNode){
var _565=document.createElement("span");
dojo.html.insertBefore(_565,this.domNode);
}
dojo.body().appendChild(this.domNode);
this._sizeMyselfHelper();
if(_565){
dojo.html.insertBefore(this.domNode,_565);
dojo.html.removeNode(_565);
}
},_sizeMyselfHelper:function(){
var mb=dojo.html.getMarginBox(this.containerNode);
this.height=mb.height;
this.containerWidth=mb.width;
var _566=this.height*this.width2height;
this.containerNode.style.left=_566+"px";
this.leftImage.height=this.rightImage.height=this.centerImage.height=this.height;
this.leftImage.width=this.rightImage.width=_566+1;
this.centerImage.width=this.containerWidth;
this.centerImage.style.left=_566+"px";
this._setImage(this.disabled?this.disabledImg:this.inactiveImg);
if(this.disabled){
dojo.html.prependClass(this.domNode,"dojoButtonDisabled");
this.domNode.removeAttribute("tabIndex");
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",true);
}else{
dojo.html.removeClass(this.domNode,"dojoButtonDisabled");
this.domNode.setAttribute("tabIndex","0");
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",false);
}
this.domNode.style.height=this.height+"px";
this.domNode.style.width=(this.containerWidth+2*_566)+"px";
},onMouseOver:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.buttonNode,"dojoButtonHover");
this._setImage(this.activeImg);
},onMouseDown:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.buttonNode,"dojoButtonDepressed");
dojo.html.removeClass(this.buttonNode,"dojoButtonHover");
this._setImage(this.pressedImg);
},onMouseUp:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.buttonNode,"dojoButtonHover");
dojo.html.removeClass(this.buttonNode,"dojoButtonDepressed");
this._setImage(this.activeImg);
},onMouseOut:function(e){
if(this.disabled){
return;
}
if(e.toElement&&dojo.html.isDescendantOf(e.toElement,this.buttonNode)){
return;
}
dojo.html.removeClass(this.buttonNode,"dojoButtonHover");
dojo.html.removeClass(this.buttonNode,"dojoButtonDepressed");
this._setImage(this.inactiveImg);
},onKey:function(e){
if(!e.key){
return;
}
var menu=dojo.widget.getWidgetById(this.menuId);
if(e.key==e.KEY_ENTER||e.key==" "){
this.onMouseDown(e);
this.buttonClick(e);
dojo.lang.setTimeout(this,"onMouseUp",75,e);
dojo.event.browser.stopEvent(e);
}
if(menu&&menu.isShowingNow&&e.key==e.KEY_DOWN_ARROW){
dojo.event.disconnect(this.domNode,"onblur",this,"onBlur");
}
},onFocus:function(e){
var menu=dojo.widget.getWidgetById(this.menuId);
if(menu){
dojo.event.connectOnce(this.domNode,"onblur",this,"onBlur");
}
},onBlur:function(e){
var menu=dojo.widget.getWidgetById(this.menuId);
if(!menu){
return;
}
if(menu.close&&menu.isShowingNow){
menu.close();
}
},buttonClick:function(e){
if(!this.disabled){
try{
this.domNode.focus();
}
catch(e2){
}
this.onClick(e);
}
},onClick:function(e){
},_setImage:function(_567){
this.leftImage.src=dojo.uri.dojoUri(_567+"l.gif");
this.centerImage.src=dojo.uri.dojoUri(_567+"c.gif");
this.rightImage.src=dojo.uri.dojoUri(_567+"r.gif");
},_toggleMenu:function(_568){
var menu=dojo.widget.getWidgetById(_568);
if(!menu){
return;
}
if(menu.open&&!menu.isShowingNow){
var pos=dojo.html.getAbsolutePosition(this.domNode,false);
menu.open(pos.x,pos.y+this.height,this);
}else{
if(menu.close&&menu.isShowingNow){
menu.close();
}else{
menu.toggle();
}
}
},setCaption:function(_569){
this.caption=_569;
this.containerNode.innerHTML=_569;
this._sizeMyself();
},setDisabled:function(_56a){
this.disabled=_56a;
this._sizeMyself();
}});
dojo.widget.defineWidget("dojo.widget.DropDownButton",dojo.widget.Button,{menuId:"",downArrow:"src/widget/templates/images/whiteDownArrow.gif",disabledDownArrow:"src/widget/templates/images/whiteDownArrow.gif",fillInTemplate:function(){
dojo.widget.DropDownButton.superclass.fillInTemplate.apply(this,arguments);
this.arrow=document.createElement("img");
dojo.html.setClass(this.arrow,"downArrow");
dojo.widget.wai.setAttr(this.domNode,"waiState","haspopup",this.menuId);
},_sizeMyselfHelper:function(){
this.arrow.src=dojo.uri.dojoUri(this.disabled?this.disabledDownArrow:this.downArrow);
this.containerNode.appendChild(this.arrow);
dojo.widget.DropDownButton.superclass._sizeMyselfHelper.call(this);
},onClick:function(e){
this._toggleMenu(this.menuId);
}});
dojo.widget.defineWidget("dojo.widget.ComboButton",dojo.widget.Button,{menuId:"",templatePath:dojo.uri.dojoUri("src/widget/templates/ComboButtonTemplate.html"),splitWidth:2,arrowWidth:5,_sizeMyselfHelper:function(e){
var mb=dojo.html.getMarginBox(this.containerNode);
this.height=mb.height;
this.containerWidth=mb.width;
var _56b=this.height/3;
if(this.disabled){
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",true);
this.domNode.removeAttribute("tabIndex");
}else{
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",false);
this.domNode.setAttribute("tabIndex","0");
}
this.leftImage.height=this.rightImage.height=this.centerImage.height=this.arrowBackgroundImage.height=this.height;
this.leftImage.width=_56b+1;
this.centerImage.width=this.containerWidth;
this.buttonNode.style.height=this.height+"px";
this.buttonNode.style.width=_56b+this.containerWidth+"px";
this._setImage(this.disabled?this.disabledImg:this.inactiveImg);
this.arrowBackgroundImage.width=this.arrowWidth;
this.rightImage.width=_56b+1;
this.rightPart.style.height=this.height+"px";
this.rightPart.style.width=this.arrowWidth+_56b+"px";
this._setImageR(this.disabled?this.disabledImg:this.inactiveImg);
this.domNode.style.height=this.height+"px";
var _56c=this.containerWidth+this.splitWidth+this.arrowWidth+2*_56b;
this.domNode.style.width=_56c+"px";
},_setImage:function(_56d){
this.leftImage.src=dojo.uri.dojoUri(_56d+"l.gif");
this.centerImage.src=dojo.uri.dojoUri(_56d+"c.gif");
},rightOver:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonHover");
this._setImageR(this.activeImg);
},rightDown:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonDepressed");
dojo.html.removeClass(this.rightPart,"dojoButtonHover");
this._setImageR(this.pressedImg);
},rightUp:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonHover");
dojo.html.removeClass(this.rightPart,"dojoButtonDepressed");
this._setImageR(this.activeImg);
},rightOut:function(e){
if(this.disabled){
return;
}
dojo.html.removeClass(this.rightPart,"dojoButtonHover");
dojo.html.removeClass(this.rightPart,"dojoButtonDepressed");
this._setImageR(this.inactiveImg);
},rightClick:function(e){
if(this.disabled){
return;
}
try{
this.domNode.focus();
}
catch(e2){
}
this._toggleMenu(this.menuId);
},_setImageR:function(_56e){
this.arrowBackgroundImage.src=dojo.uri.dojoUri(_56e+"c.gif");
this.rightImage.src=dojo.uri.dojoUri(_56e+"r.gif");
},onKey:function(e){
if(!e.key){
return;
}
var menu=dojo.widget.getWidgetById(this.menuId);
if(e.key==e.KEY_ENTER||e.key==" "){
this.onMouseDown(e);
this.buttonClick(e);
dojo.lang.setTimeout(this,"onMouseUp",75,e);
dojo.event.browser.stopEvent(e);
}else{
if(e.key==e.KEY_DOWN_ARROW&&e.altKey){
this.rightDown(e);
this.rightClick(e);
dojo.lang.setTimeout(this,"rightUp",75,e);
dojo.event.browser.stopEvent(e);
}else{
if(menu&&menu.isShowingNow&&e.key==e.KEY_DOWN_ARROW){
dojo.event.disconnect(this.domNode,"onblur",this,"onBlur");
}
}
}
}});
dojo.provide("dojo.widget.Tooltip");
dojo.widget.defineWidget("dojo.widget.Tooltip",[dojo.widget.ContentPane,dojo.widget.PopupContainerBase],{caption:"",showDelay:500,hideDelay:100,connectId:"",templateCssPath:dojo.uri.dojoUri("src/widget/templates/TooltipTemplate.css"),fillInTemplate:function(args,frag){
if(this.caption!=""){
this.domNode.appendChild(document.createTextNode(this.caption));
}
this._connectNode=dojo.byId(this.connectId);
dojo.widget.Tooltip.superclass.fillInTemplate.call(this,args,frag);
this.addOnLoad(this,"_loadedContent");
dojo.html.addClass(this.domNode,"dojoTooltip");
var _56f=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_56f);
this.applyPopupBasicStyle();
},postCreate:function(args,frag){
dojo.event.connect(this._connectNode,"onmouseover",this,"_onMouseOver");
dojo.widget.Tooltip.superclass.postCreate.call(this,args,frag);
},_onMouseOver:function(e){
this._mouse={x:e.pageX,y:e.pageY};
if(!this._tracking){
dojo.event.connect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=true;
}
this._onHover(e);
},_onMouseMove:function(e){
this._mouse={x:e.pageX,y:e.pageY};
if(dojo.html.overElement(this._connectNode,e)||dojo.html.overElement(this.domNode,e)){
this._onHover(e);
}else{
this._onUnHover(e);
}
},_onHover:function(e){
if(this._hover){
return;
}
this._hover=true;
if(this._hideTimer){
clearTimeout(this._hideTimer);
delete this._hideTimer;
}
if(!this.isShowingNow&&!this._showTimer){
this._showTimer=setTimeout(dojo.lang.hitch(this,"open"),this.showDelay);
}
},_onUnHover:function(e){
if(!this._hover){
return;
}
this._hover=false;
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
if(this.isShowingNow&&!this._hideTimer){
this._hideTimer=setTimeout(dojo.lang.hitch(this,"close"),this.hideDelay);
}
if(!this.isShowingNow){
dojo.event.disconnect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=false;
}
},open:function(){
if(this.isShowingNow){
return;
}
dojo.widget.PopupContainerBase.prototype.open.call(this,this._mouse.x,this._mouse.y,null,[this._mouse.x,this._mouse.y],"TL,TR,BL,BR",[10,15]);
},close:function(){
if(this.isShowingNow){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
if(this._hideTimer){
clearTimeout(this._hideTimer);
delete this._hideTimer;
}
dojo.event.disconnect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=false;
dojo.widget.PopupContainerBase.prototype.close.call(this);
}
},_position:function(){
this.move(this._mouse.x,this._mouse.y,[10,15],"TL,TR,BL,BR");
},_loadedContent:function(){
if(this.isShowingNow){
this._position();
}
},checkSize:function(){
},uninitialize:function(){
this.close();
dojo.event.disconnect(this._connectNode,"onmouseover",this,"_onMouseOver");
}});
if(!this["dojo"]){
alert("\"dojo/__package__.js\" is now located at \"dojo/dojo.js\". Please update your includes accordingly");
}
dojo.provide("dojo.collections.Collections");
dojo.collections.DictionaryEntry=function(k,v){
this.key=k;
this.value=v;
this.valueOf=function(){
return this.value;
};
this.toString=function(){
return String(this.value);
};
};
dojo.collections.Iterator=function(arr){
var a=arr;
var _570=0;
this.element=a[_570]||null;
this.atEnd=function(){
return (_570>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_570++];
return this.element;
};
this.map=function(fn,_571){
var s=_571||dj_global;
if(Array.map){
return Array.map(a,fn,s);
}else{
var arr=[];
for(var i=0;i<a.length;i++){
arr.push(fn.call(s,a[i]));
}
return arr;
}
};
this.reset=function(){
_570=0;
this.element=a[_570];
};
};
dojo.collections.DictionaryIterator=function(obj){
var a=[];
var _572={};
for(var p in obj){
if(!_572[p]){
a.push(obj[p]);
}
}
var _573=0;
this.element=a[_573]||null;
this.atEnd=function(){
return (_573>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_573++];
return this.element;
};
this.map=function(fn,_574){
var s=_574||dj_global;
if(Array.map){
return Array.map(a,fn,s);
}else{
var arr=[];
for(var i=0;i<a.length;i++){
arr.push(fn.call(s,a[i]));
}
return arr;
}
};
this.reset=function(){
_573=0;
this.element=a[_573];
};
};
dojo.provide("dojo.collections.ArrayList");
dojo.collections.ArrayList=function(arr){
var _575=[];
if(arr){
_575=_575.concat(arr);
}
this.count=_575.length;
this.add=function(obj){
_575.push(obj);
this.count=_575.length;
};
this.addRange=function(a){
if(a.getIterator){
var e=a.getIterator();
while(!e.atEnd()){
this.add(e.get());
}
this.count=_575.length;
}else{
for(var i=0;i<a.length;i++){
_575.push(a[i]);
}
this.count=_575.length;
}
};
this.clear=function(){
_575.splice(0,_575.length);
this.count=0;
};
this.clone=function(){
return new dojo.collections.ArrayList(_575);
};
this.contains=function(obj){
for(var i=0;i<_575.length;i++){
if(_575[i]==obj){
return true;
}
}
return false;
};
this.forEach=function(fn,_576){
var s=_576||dj_global;
if(Array.forEach){
Array.forEach(_575,fn,s);
}else{
for(var i=0;i<_575.length;i++){
fn.call(s,_575[i],i,_575);
}
}
};
this.getIterator=function(){
return new dojo.collections.Iterator(_575);
};
this.indexOf=function(obj){
for(var i=0;i<_575.length;i++){
if(_575[i]==obj){
return i;
}
}
return -1;
};
this.insert=function(i,obj){
_575.splice(i,0,obj);
this.count=_575.length;
};
this.item=function(i){
return _575[i];
};
this.remove=function(obj){
var i=this.indexOf(obj);
if(i>=0){
_575.splice(i,1);
}
this.count=_575.length;
};
this.removeAt=function(i){
_575.splice(i,1);
this.count=_575.length;
};
this.reverse=function(){
_575.reverse();
};
this.sort=function(fn){
if(fn){
_575.sort(fn);
}else{
_575.sort();
}
};
this.setByIndex=function(i,obj){
_575[i]=obj;
this.count=_575.length;
};
this.toArray=function(){
return [].concat(_575);
};
this.toString=function(_577){
return _575.join((_577||","));
};
};
dojo.provide("dojo.collections.Dictionary");
dojo.collections.Dictionary=function(_578){
var _579={};
this.count=0;
var _57a={};
this.add=function(k,v){
var b=(k in _579);
_579[k]=new dojo.collections.DictionaryEntry(k,v);
if(!b){
this.count++;
}
};
this.clear=function(){
_579={};
this.count=0;
};
this.clone=function(){
return new dojo.collections.Dictionary(this);
};
this.contains=this.containsKey=function(k){
if(_57a[k]){
return false;
}
return (_579[k]!=null);
};
this.containsValue=function(v){
var e=this.getIterator();
while(e.get()){
if(e.element.value==v){
return true;
}
}
return false;
};
this.entry=function(k){
return _579[k];
};
this.forEach=function(fn,_57b){
var a=[];
for(var p in _579){
if(!_57a[p]){
a.push(_579[p]);
}
}
var s=_57b||dj_global;
if(Array.forEach){
Array.forEach(a,fn,s);
}else{
for(var i=0;i<a.length;i++){
fn.call(s,a[i],i,a);
}
}
};
this.getKeyList=function(){
return (this.getIterator()).map(function(_57c){
return _57c.key;
});
};
this.getValueList=function(){
return (this.getIterator()).map(function(_57d){
return _57d.value;
});
};
this.item=function(k){
if(k in _579){
return _579[k].valueOf();
}
return undefined;
};
this.getIterator=function(){
return new dojo.collections.DictionaryIterator(_579);
};
this.remove=function(k){
if(k in _579&&!_57a[k]){
delete _579[k];
this.count--;
return true;
}
return false;
};
if(_578){
var e=_578.getIterator();
while(e.get()){
this.add(e.element.key,e.element.value);
}
}
};
dojo.provide("dojo.collections.Stack");
dojo.collections.Stack=function(arr){
var q=[];
if(arr){
q=q.concat(arr);
}
this.count=q.length;
this.clear=function(){
q=[];
this.count=q.length;
};
this.clone=function(){
return new dojo.collections.Stack(q);
};
this.contains=function(o){
for(var i=0;i<q.length;i++){
if(q[i]==o){
return true;
}
}
return false;
};
this.copyTo=function(arr,i){
arr.splice(i,0,q);
};
this.forEach=function(fn,_57e){
var s=_57e||dj_global;
if(Array.forEach){
Array.forEach(q,fn,s);
}else{
for(var i=0;i<q.length;i++){
fn.call(s,q[i],i,q);
}
}
};
this.getIterator=function(){
return new dojo.collections.Iterator(q);
};
this.peek=function(){
return q[(q.length-1)];
};
this.pop=function(){
var r=q.pop();
this.count=q.length;
return r;
};
this.push=function(o){
this.count=q.push(o);
};
this.toArray=function(){
return [].concat(q);
};
};
dojo.provide("dojo.widget.ColorPalette");
dojo.widget.defineWidget("dojo.widget.ColorPalette",dojo.widget.HtmlWidget,{palette:"7x10",_palettes:{"7x10":[["fff","fcc","fc9","ff9","ffc","9f9","9ff","cff","ccf","fcf"],["ccc","f66","f96","ff6","ff3","6f9","3ff","6ff","99f","f9f"],["c0c0c0","f00","f90","fc6","ff0","3f3","6cc","3cf","66c","c6c"],["999","c00","f60","fc3","fc0","3c0","0cc","36f","63f","c3c"],["666","900","c60","c93","990","090","399","33f","60c","939"],["333","600","930","963","660","060","366","009","339","636"],["000","300","630","633","330","030","033","006","309","303"]],"3x4":[["ffffff","00ff00","008000","0000ff"],["c0c0c0","ffff00","ff00ff","000080"],["808080","ff0000","800080","000000"]]},buildRendering:function(){
this.domNode=document.createElement("table");
dojo.html.disableSelection(this.domNode);
dojo.event.connect(this.domNode,"onmousedown",function(e){
e.preventDefault();
});
with(this.domNode){
cellPadding="0";
cellSpacing="1";
border="1";
style.backgroundColor="white";
}
var _57f=this._palettes[this.palette];
for(var i=0;i<_57f.length;i++){
var tr=this.domNode.insertRow(-1);
for(var j=0;j<_57f[i].length;j++){
if(_57f[i][j].length==3){
_57f[i][j]=_57f[i][j].replace(/(.)(.)(.)/,"$1$1$2$2$3$3");
}
var td=tr.insertCell(-1);
with(td.style){
backgroundColor="#"+_57f[i][j];
border="1px solid gray";
width=height="15px";
fontSize="1px";
}
td.color="#"+_57f[i][j];
td.onmouseover=function(e){
this.style.borderColor="white";
};
td.onmouseout=function(e){
this.style.borderColor="gray";
};
dojo.event.connect(td,"onmousedown",this,"onClick");
td.innerHTML="&nbsp;";
}
}
},onClick:function(e){
this.onColorSelect(e.currentTarget.color);
e.currentTarget.style.borderColor="gray";
},onColorSelect:function(_580){
}});
dojo.provide("dojo.widget.TabContainer");
dojo.require("dojo.lang.func");
dojo.require("dojo.widget.*");
dojo.require("dojo.widget.PageContainer");
dojo.require("dojo.event.*");
dojo.require("dojo.html.selection");
dojo.require("dojo.widget.html.layout");
dojo.widget.defineWidget("dojo.widget.TabContainer",dojo.widget.PageContainer,{labelPosition:"top",closeButton:"none",templateString:null,templatePath:dojo.uri.dojoUri("src/widget/templates/TabContainer.html"),templateCssPath:dojo.uri.dojoUri("src/widget/templates/TabContainer.css"),selectedTab:"",postMixInProperties:function(){
if(this.selectedTab){
dojo.deprecated("selectedTab deprecated, use selectedChild instead, will be removed in","0.5");
this.selectedChild=this.selectedTab;
}
if(this.closeButton!="none"){
dojo.deprecated("closeButton deprecated, use closable='true' on each child instead, will be removed in","0.5");
}
dojo.widget.TabContainer.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
this.tablist=dojo.widget.createWidget("TabController",{id:this.widgetId+"_tablist",labelPosition:this.labelPosition,doLayout:this.doLayout,containerId:this.widgetId},this.tablistNode);
dojo.widget.TabContainer.superclass.fillInTemplate.apply(this,arguments);
},postCreate:function(args,frag){
dojo.widget.TabContainer.superclass.postCreate.apply(this,arguments);
this.onResized();
},_setupChild:function(tab){
if(this.closeButton=="tab"||this.closeButton=="pane"){
tab.closable=true;
}
dojo.html.addClass(tab.domNode,"dojoTabPane");
dojo.widget.TabContainer.superclass._setupChild.apply(this,arguments);
},onResized:function(){
if(!this.doLayout){
return;
}
var _581=this.labelPosition.replace(/-h/,"");
var _582=[{domNode:this.tablist.domNode,layoutAlign:_581},{domNode:this.containerNode,layoutAlign:"client"}];
dojo.widget.html.layout(this.domNode,_582);
if(this.selectedChildWidget){
var _583=dojo.html.getContentBox(this.containerNode);
this.selectedChildWidget.resizeTo(_583.width,_583.height);
}
},selectTab:function(tab,_584){
dojo.deprecated("use selectChild() rather than selectTab(), selectTab() will be removed in","0.5");
this.selectChild(tab,_584);
},onKey:function(e){
if(e.keyCode==e.KEY_UP_ARROW&&e.ctrlKey){
var _585=this.correspondingTabButton||this.selectedTabWidget.tabButton;
_585.focus();
dojo.event.browser.stopEvent(e);
}else{
if(e.keyCode==e.KEY_DELETE&&e.altKey){
if(this.selectedChildWidget.closable){
this.closeChild(this.selectedChildWidget);
dojo.event.browser.stopEvent(e);
}
}
}
},destroy:function(){
this.tablist.destroy();
dojo.widget.TabContainer.superclass.destroy.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.TabController",dojo.widget.PageController,{templateString:"<div wairole='tablist' dojoAttachEvent='onKey'></div>",labelPosition:"top",doLayout:true,"class":"",buttonWidget:"TabButton",postMixInProperties:function(){
if(!this["class"]){
this["class"]="dojoTabLabels-"+this.labelPosition+(this.doLayout?"":" dojoTabNoLayout");
}
dojo.widget.TabController.superclass.postMixInProperties.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.TabButton",dojo.widget.PageButton,{templateString:"<div class='dojoTab' dojoAttachEvent='onClick'>"+"<div dojoAttachPoint='innerDiv'>"+"<span dojoAttachPoint='titleNode' tabIndex='-1' waiRole='tab'>${this.label}</span>"+"<span dojoAttachPoint='closeButtonNode' class='close closeImage' style='${this.closeButtonStyle}'"+"    dojoAttachEvent='onMouseOver:onCloseButtonMouseOver; onMouseOut:onCloseButtonMouseOut; onClick:onCloseButtonClick'></span>"+"</div>"+"</div>",postMixInProperties:function(){
this.closeButtonStyle=this.closeButton?"":"display: none";
dojo.widget.TabButton.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
dojo.html.disableSelection(this.titleNode);
dojo.widget.TabButton.superclass.fillInTemplate.apply(this,arguments);
},onCloseButtonClick:function(evt){
evt.stopPropagation();
dojo.widget.TabButton.superclass.onCloseButtonClick.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.a11y.TabButton",dojo.widget.TabButton,{imgPath:dojo.uri.dojoUri("src/widget/templates/images/tab_close.gif"),templateString:"<div class='dojoTab' dojoAttachEvent='onClick;onKey'>"+"<div dojoAttachPoint='innerDiv'>"+"<span dojoAttachPoint='titleNode' tabIndex='-1' waiRole='tab'>${this.label}</span>"+"<img class='close' src='${this.imgPath}' alt='[x]' style='${this.closeButtonStyle}'"+"    dojoAttachEvent='onClick:onCloseButtonClick'>"+"</div>"+"</div>"});

