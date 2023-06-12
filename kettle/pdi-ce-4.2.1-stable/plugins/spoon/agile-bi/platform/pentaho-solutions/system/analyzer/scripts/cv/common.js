var cv={prefs:{suppressMsg:{},fadeTime:250,wipeTime:250,isDebug:0,skipDirtyAlert:false},defaultNS:"http://www.pentaho.com",contextPath:null,dojoWidgets:{},helpTopics:{},helpWin:null,securityToken:null,nsResolver:function(_1){
return "http://www.pentaho.com";
},onDefaultJSFAction:function(e){
if(e.key==13&&e.target){
var _2=e.target;
if(_2&&_2.tagName=="TEXTAREA"){
return;
}
while(_2&&_2.tagName!="FORM"){
_2=_2.parentNode;
}
if(!_2){
return;
}
_2=cv.util.getFirstChildByClass(_2,"_defaultJSFButton");
if(!_2){
return;
}
_2.click();
dojo.event.browser.stopEvent(e);
}
},getFieldHelp:null,getActiveReport:null,init:function(){
dojo.event.connect(document,"onkey",this,"onDefaultJSFAction");
var _3=dojo.byId("stok");
if(_3){
cv.securityToken=_3.value;
}
}};
dojo.addOnLoad(cv,"init");
djConfig["bindEncoding"]="utf8";
var cvConst={};
cv.util={initDojoWidget:null,alertErrorOnPageOpen:function(_4,_5){
alert(_4);
if(_5){
window.location=_5;
}
},checkNumber:function(_6,_7){
if(!_6){
return _7;
}
return !isNaN(Number(_6));
},connectPopupMenu:function(_8,_9){
for(var x=0;_9&&x<_9.length;++x){
var mi=this.getDojoWidget(_9[x].id);
if(mi){
dojo.event.connect(mi,"onClick",(_9[x].src?_9[x].src:_8),_9[x].handler);
if(_9[x].disabled){
mi.setDisabled(true);
}
}
}
},destroyDojoWidgets:function(){
for(var x in cv.dojoWidgets){
try{
if(cv.dojoWidgets[x]){
cv.dojoWidgets[x].destroy(true);
}
}
catch(e){
}
}
},disconnectPopupMenu:function(_a,_b){
for(var x=0;_b&&x<_b.length;++x){
var mi=this.getDojoWidget(_b[x].id);
if(mi){
dojo.event.disconnect(mi,"onClick",_a,_b[x].handler);
}
}
},displayWidget:function(id,_c){
if(this.getDojoWidget(id)){
var _d=this.getDojoWidget(id).domNode;
if(_d){
_c?dojo.html.show(_d):dojo.html.hide(_d);
}
}
},getAncestorByClass:function(_e,_f){
while(_e&&!dojo.html.hasClass(_e,_f)){
_e=_e.parentNode;
}
return _e;
},getFirstChildByClass:function(_10,_11){
var _12=dojo.html.getElementsByClass(_11,_10);
return (_12&&_12.length>0)?_12[0]:null;
},getDojoWidget:function(id){
if(cv.dojoWidgets[id]){
return cv.dojoWidgets[id];
}
var wi=dojo.widget.byId(id);
if(!wi){
wi=dojo.byId(id);
if(!wi){
return null;
}
if(!this.dojoParser){
this.dojoParser=new dojo.xml.Parse();
}
wi=this.dojoParser.parseElement(wi,null,true);
if(wi){
wi=dojo.widget.getParser().createComponents(wi);
if(wi&&wi.length>0){
wi=wi[0];
}else{
wi=null;
}
}
}
if(wi){
if(this.initDojoWidget){
this.initDojoWidget(wi);
}
cv.dojoWidgets[id]=wi;
}
with(wi.domNode.style){
zIndex=1002;
}
return wi;
},helpdialog:null,getHelp:function(_13){
if(dojo.lang.isObject(_13)&&_13.target){
_13=_13.target.id;
}
if(!_13||_13=="null"){
_13="";
}else{
if(_13.indexOf(".html")<0){
_13=cv.helpTopics&&cv.helpTopics[_13]?cv.helpTopics[_13]:"";
}
}
_13=cv.contextPath+"help/topic.html?"+_13;
if(window.location.search&&window.location.search.indexOf("embeddedHelp=true")>-1){
if(this.helpDialog==null){
this.helpDialog=new cv.HelpDialog();
this.helpDialog.init();
}
this.helpDialog.showDlg(_13);
return;
}
var _14=dojo.html.getViewport();
if(cv.helpWin&&!cv.helpWin.closed){
cv.helpWin.close();
}
var _15=window.open(_13,"helpWnd","height="+_14.height*0.8+",width="+_14.width*0.8+",menubar=0,status=0,toolbar=0,location=0,resizable=1");
if(_15){
cv.helpWin=_15;
}
_15.focus();
},getSelectionList:function(_16){
var _17=_16.getElementsByTagName("INPUT");
var _18=[],len=_17.length;
for(var x=0;x<len;++x){
if(_17[x].checked){
_18.push(_17[x].name);
}
}
if(_18.length==0){
_18=null;
}
return _18;
},hide:function(){
for(var i=0;i<arguments.length;++i){
dojo.html.addClass(dojo.byId(arguments[i]),"hidden");
}
},initDivButton:function(_19,_1a,_1b){
if(dojo.lang.isString(_19)){
_19=dojo.byId(_19);
}
if(!_19){
return;
}
dojo.event.connect(_19,"onmouseover",this,"_divButtonActive");
dojo.event.connect(_19,"onmousedown",this,"_divButtonPressed");
dojo.event.connect(_19,"onmouseout",this,"_divButtonInactive");
if(_1a){
dojo.event.connect(_19,"onclick",_1a,_1b);
}else{
dojo.event.connect(_19,"onclick",_1b);
}
dojo.html.disableSelection(_19);
},isHidden:function(_1c){
return dojo.html.hasClass(dojo.byId(_1c),"hidden");
},setButtonDisabled:function(btn,_1d){
if(!btn){
return;
}
if(_1d==btn.disabled){
return;
}
if(btn.tagName=="IMG"){
var _1e=(btn.src.indexOf(".png")>-1)?".png":".gif";
btn.src=_1d?btn.src.replace(_1e,"_disabled"+_1e):btn.src.replace("_disabled"+_1e,_1e);
}else{
_1d?dojo.html.addClass(btn,"disabled"):dojo.html.removeClass(btn,"disabled");
}
btn.disabled=_1d;
},_divButtonActive:function(e){
if(e.target.disabled){
return;
}
dojo.html.addClass(this.getAncestorByClass(e.target,"reportBtn"),"btnActive");
},_divButtonInactive:function(e){
var _1f=this.getAncestorByClass(e.target,"reportBtn");
dojo.html.removeClass(_1f,"btnActive");
},_divButtonPressed:function(e){
if(e.target.disabled){
return;
}
},onToggleSectionCheckbox:function(evt){
if(evt.target.checked){
dojo.lfx.html.wipeIn(evt.target.id+"DIV",cv.prefs.wipeTime).play();
}else{
dojo.lfx.html.wipeOut(evt.target.id+"DIV",cv.prefs.wipeTime).play();
}
},parseMDXExpression:function(_20,_21){
var _22=_20.lastIndexOf("].[");
if(_22==-1){
return "";
}
_20=_20.substring(_22);
var reg=/\]\.\[(.+)\]$/;
var _23=reg.exec(_20);
if(!_23){
return "";
}
var val=_23[1];
val=val.replace("]]","]");
if(val=="#null"){
return cvCatalog.attributeNullValue;
}
if(val.search(/\S/)<0){
return cvCatalog.attributeBlankValue;
}
return _21?dojo.string.escape("HTML",val):val;
},parseAjaxMsg:function(_24){
if(dojo.lang.isString(_24)){
if(_24.indexOf("<form name=\"login\"")>0){
var _25={loginCallback:function(){
if(cv.getActiveReport()){
cv.getActiveReport().refreshReport();
}
}};
if(window.parent&&window.parent.authenticate){
window.parent.authenticate(_25);
return "sessionExpired";
}else{
if(cv.getActiveReport()){
cv.getActiveReport().setReportPropsDirty(false);
cv.getActiveReport().history.setSaved();
}
window.location.reload();
}
}
var i=_24.indexOf("<message");
if(i<0){
return;
}
var j=_24.indexOf("</message>");
if(j<0){
j=_24.indexOf("/>",i);
if(j<0){
return;
}
j+=2;
}else{
j+=10;
}
_24=dojo.dom.createDocumentFromText(_24.substring(i,j));
}
if(dojo.lang.isObject(_24)&&_24.documentElement&&_24.documentElement.tagName=="message"){
var id=_24.documentElement.getAttribute("id");
var _26=_24.documentElement.attributes;
var msg={text:dojo.dom.textContent(_24.documentElement)};
for(var x=0;x<_26.length;++x){
var _27=_26.item(x);
if(_27.name){
msg[_27.name]=_27.value;
}
}
return msg;
}
return null;
},parseURLQuery:function(_28){
if(!_28){
_28=window.location.search;
}
if(_28.length==0){
return null;
}
var _29=_28.substring(1).split("&"),ret={};
for(var x=0;x<_29.length;++x){
var id=_29[x].indexOf("=");
if(id>0){
ret[_29[x].substring(0,id)]=decodeURIComponent(_29[x].substring(id+1));
}
}
return ret;
},getURLQueryValue:function(key,_2a){
var pm=this.parseURLQuery(_2a);
return pm?pm[key]:null;
},removeNode:function(_2b){
if(_2b){
_2b.parentNode.removeChild(_2b);
}
},setCommonMsgTooltip:function(msg){
if(!msg){
return;
}
var _2c=this.getDojoWidget("commonMsgTooltip");
if(_2c){
_2c.domNode.innerHTML=msg;
}
},setDivActive:function(div,_2d){
if(_2d){
dojo.html.addClass(div,"active");
}else{
dojo.html.removeClass(div,"active");
}
},setHelpTopics:function(_2e){
for(var x=0;x<_2e.length;++x){
var _2f=(typeof (_2e[x])=="string")?dojo.byId(_2e[x]):_2e[x];
dojo.event.connectOnce(_2f,"onclick",this,"getHelp");
cv.helpTopics[_2e[x]]=_2e[++x];
}
},setMenuItem:function(mi,_30,_31){
if(dojo.lang.isString(mi)){
mi=this.getDojoWidget(mi);
}
if(!mi){
return;
}
if(_30){
var _32=mi.domNode.firstChild.firstChild;
if(_30=="checked"){
_30="checkmark.png";
}
if(_30&&_30!="none"){
_30=cv.contextPath+"images/"+_30;
mi.iconSrc=_30;
if((_30.toLowerCase().substring(_30.length-4)==".png")&&(dojo.render.html.ie)){
_32.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+_30+"', sizingMethod='image')";
_32.style.backgroundImage="";
}else{
_32.style.backgroundImage="url("+_30+")";
}
}else{
if(_30=="none"){
if(dojo.render.html.ie){
_32.style.filter="";
}else{
_32.style.backgroundImage="";
}
}
}
}
if(_31){
mi.setDisabled(_31=="disabled"?true:false);
}
},setSectionCollapsed:function(id){
var _33=true;
var _34=dojo.byId(id);
if(_34){
if(_34.type=="checkbox"){
_34.checked=false;
}else{
if(_34.tagName=="IMG"){
this.hide(_34.id+"DIV");
_34.name="closed";
_34.src=_34.src.replace(/opened\./,"closed.");
_33=false;
}
}
}
if(_33){
dojo.lfx.html.wipeOut(dojo.byId(id+"DIV"),0).play();
}
},show:function(){
for(var i=0;i<arguments.length;++i){
dojo.html.removeClass(dojo.byId(arguments[i]),"hidden");
}
},updateMenuItemCaption:function(id,_35,_36){
var mi=this.getDojoWidget(id);
if(!mi){
return;
}
_35=cvCatalog[_35];
if(_36){
_35=dojo.string.substituteParams(_35,_36);
}
mi.domNode.childNodes[1].innerHTML=mi.caption=_35;
},TRACE:function(_37){
if(cv.prefs.isDebug<2){
return;
}
try{
if(_37=="_INIT"){
this.TRACEWIN=window.open("","cvtrace","resizable=1,scrollbars=1");
this.TRACEWIN.document.open();
this.TRACEWIN.document.writeln("<b>INITIALIZE ClearView JS Trace</b><p>");
}else{
if(_37=="_EXIT"){
this.TRACEWIN.document.writeln("<b>EXIT ClearView JS Trace</b>");
this.TRACEWIN.document.close();
this.TRACEWIN.close();
}else{
if(_37=="_START"){
this.TSBASE=this.TSSTART=new Date();
this.TRACEWIN.document.writeln("<b>Start Profiling at: "+this.TSSTART+"</b><br>");
}else{
if(_37=="_END"){
this.TRACEWIN.document.writeln("<b>Finish Profiling - Total: "+(new Date()-this.TSSTART)+" ms</b><p>");
}else{
if(_37=="_CLEAR"){
this.TRACEWIN.document.clear();
}else{
var ts=new Date();
this.TRACEWIN.document.writeln("&nbsp;&nbsp;&nbsp;&nbsp;"+_37+": "+(ts-this.TSBASE)+" ms<br>");
this.TSBASE=new Date();
}
}
}
}
}
}
catch(e){
}
},createEvent:function(_38){
var evt=new Object();
evt.target=_38;
evt.clientX=0;
evt.clientY=0;
evt.stopPropagation=function(){
};
evt.preventDefault=function(){
};
return evt;
},convertStringtoDate:function(_39){
var _3a=_39;
_3a=_3a.replace(/-/g,"/");
_3a=_3a.replace("T"," ");
_3a=_3a.replace("Z"," GMT-0000");
return new Date(Date.parse(_3a));
},formatDateString:function(_3b){
var _3c=this.convertStringtoDate(_3b);
var _3d=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var _3e=_3d[_3c.getMonth()];
var _3f=_3c.getDate();
var _40=_3c.getFullYear();
var _41=_3c.toLocaleTimeString();
if(_41.indexOf("0")==0){
_41=_41.substring(1);
}
return _3e+" "+_3f+", "+_40+" "+_41;
},goToURL:function(url){
try{
window.location=url;
}
catch(e){
if(dojo.render.html.ie&&e.message.indexOf("Unspecified error")>-1){
}else{
throw e;
}
}
},selectByValue:function(_42,_43){
for(var i=0;i<_42.length;i++){
if(_42.options[i].value==_43){
_42.options[i].selected=true;
}else{
_42.options[i].selected=false;
}
}
}};
dojo.declare("cv.Collapsible",null,function(_44,_45,_46,_47,_48){
this.header=_44;
this.body=_45;
this.cssOpen=_47?_47:"folderOpen";
this.cssClose=_48?_48:"folderClose";
this.isOpen=(_46==true);
this.setState(this.isOpen,true);
dojo.html.disableSelection(_44);
dojo.event.connect(_44,"onclick",this,"onClickHeader");
},{onClickHeader:function(e){
if(!this.animation||this.animation.status()!="playing"){
this.isOpen=!this.isOpen;
this.setState(this.isOpen,true);
}
e.stopPropagation();
},setState:function(_49,_4a){
if(_49){
dojo.html.replaceClass(this.header,this.cssOpen,this.cssClose);
if(_4a){
this.body.style.display="block";
this.animation=null;
}else{
this.animation=dojo.lfx.html.wipeIn(this.body,cv.prefs.wipeTime);
this.animation.play();
}
}else{
dojo.html.replaceClass(this.header,this.cssClose,this.cssOpen);
if(_4a){
this.body.style.display="none";
this.animation=null;
}else{
this.animation=dojo.lfx.html.wipeOut(this.body,cv.prefs.wipeTime);
this.animation.play();
}
}
}});
dojo.extend(dojo.dnd.HtmlDragObject,{opacity:0.8,onDragStart:function(e){
dojo.html.clearSelection();
this.scrollOffset=dojo.html.getScroll().offset;
this.dragStartPosition=dojo.html.getAbsolutePosition(this.domNode,true);
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.dragClone=this.createDragNode();
this.containingBlockPosition=this.domNode.offsetParent?dojo.html.getAbsolutePosition(this.domNode.offsetParent,true):{x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
if(cv.getActiveReport().isResizing){
return;
}
with(this.dragClone.style){
position="absolute";
top=this.dragOffset.y+e.pageY+"px";
left=this.dragOffset.x+e.pageX+"px";
if(this.domNode.firstChild.nodeType==1){
width=dojo.html.getElementBox(this.domNode.firstChild).width-10+"px";
height=dojo.html.getElementBox(this.domNode.firstChild).height+"px";
}
textAlign="left";
paddingLeft="5px";
}
dojo.body().appendChild(this.dragClone);
dojo.event.topic.publish("dragStart",{source:this});
},createDragNode:function(){
var _4b=this.domNode.getAttribute("formula"),_4c;
if(_4b){
_4c=document.createElement("DIV");
var _4d;
if(dojo.html.hasClass(this.domNode,"filterItem")||dojo.html.hasClass(this.domNode,"filterGroup")){
_4d="filterDragObject";
if(this.domNode.id.indexOf("filter_metric")==0){
_4c.innerHTML=cvCatalog.filterMetric;
}else{
var _4e=this.domNode.getElementsByTagName("span");
_4c.innerHTML=cv.textContent(_4e[0]);
}
_4c.setAttribute("formula",this.domNode.id);
}else{
var _4f=this.domNode.getAttribute("metrictype")?"V":cv.getFieldHelp().getDndType(_4b);
_4d=(_4f=="V")?"metricDragObject":"attributeDragObject";
_4c.innerHTML=dojo.string.escape("html",cv.textContent(this.domNode));
_4c.setAttribute("formula",_4b);
}
dojo.html.addClass(_4c,"commonDragObject");
if(_4d){
dojo.html.addClass(_4c,_4d);
}
if(this.opacity<1){
dojo.html.setOpacity(_4c,this.opacity);
}
}else{
if(this.type=="DB"){
_4c=document.createElement("DIV");
var box=dojo.html.getBorderBox(this.domNode);
with(_4c.style){
border="2px dashed black";
height=box.height+"px";
width=box.width+"px";
backgroundColor="silver";
}
if(this.opacity<1){
dojo.html.setOpacity(_4c,this.opacity);
}
}else{
_4c=this.domNode.cloneNode(true);
if(this.dragClass){
dojo.html.addClass(_4c,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(_4c,this.opacity);
}
var ltn=_4c.tagName.toLowerCase();
var _50=(ltn=="tr");
if((_50)||(ltn=="tbody")){
var doc=this.domNode.ownerDocument;
var _51=doc.createElement("table");
if(_50){
var _52=doc.createElement("tbody");
_51.appendChild(_52);
_52.appendChild(_4c);
}else{
_51.appendChild(_4c);
}
var _53=((_50)?this.domNode:this.domNode.firstChild);
var _54=((_50)?_4c:_4c.firstChild);
var _55=tdp.childNodes;
var _56=_54.childNodes;
for(var i=0;i<_55.length;i++){
if((_56[i])&&(_56[i].style)){
_56[i].style.width=dojo.html.getContentBox(_55[i]).width+"px";
}
}
_4c=_51;
}
}
}
if((dojo.render.html.ie55||dojo.render.html.ie60)&&this.createIframe){
with(_4c.style){
top="0px";
left="0px";
}
var _57=document.createElement("div");
_57.appendChild(_4c);
this.bgIframe=new dojo.html.BackgroundIframe(_57);
_57.appendChild(this.bgIframe.iframe);
_4c=_57;
}
_4c.style.zIndex=999;
return _4c;
}});
dojo.declare("cv.History",null,function(_58,_59,_5a){
this.owner=_58;
this.undoStack=new dojo.collections.Stack();
this.redoStack=new dojo.collections.Stack();
this.savedState=null;
this.originalState=null;
this.refreshedState=new Array();
if(_59&&_5a){
dojo.event.connect(this,"add",_59,_5a);
dojo.event.connect(this,"undo",_59,_5a);
dojo.event.connect(this,"redo",_59,_5a);
dojo.event.connect(this,"rewindTo",_59,_5a);
dojo.event.connect(this,"forwardTo",_59,_5a);
dojo.event.connect(this,"setTo",_59,_5a);
dojo.event.connect(this,"setSaved",_59,_5a);
dojo.event.connect("after",this,"setRefreshed",_59,_5a);
}
},{add:function(_5b){
_5b.init(this.owner);
if(!this.originalState&&this.undoStack.count==0){
this.originalState=_5b;
}
this.undoStack.push(_5b);
this.redoStack.clear();
},current:function(){
return this.undoStack.peek();
},next:function(){
return this.redoStack.peek();
},undo:function(){
if(!this.hasUndo()){
return;
}
var o=this.undoStack.pop();
if(o){
this.redoStack.push(o);
if(this.owner.manager.cmdUndo.title.indexOf("Column Resize")<0){
o=this.current();
}
o.back();
}
},redo:function(){
if(!this.hasRedo()){
return;
}
var o=this.redoStack.pop();
if(o){
this.undoStack.push(o);
o.forward();
}
},rewindTo:function(_5c,_5d){
while(this.hasUndo()&&(_5c!=this.current()||_5c==null)){
this.redoStack.push(this.undoStack.pop());
}
if(!this.hasUndo()){
return null;
}
if(_5d){
this.current().back();
}
return this.current();
},forwardTo:function(_5e,_5f){
while(this.hasRedo()&&_5e!=this.next()){
this.undoStack.push(this.redoStack.pop());
}
if(!this.hasRedo()){
return null;
}
this.undoStack.push(this.redoStack.pop());
if(_5f){
this.current().forward();
}
return this.current();
},setTo:function(_60){
if(!_60){
return false;
}
if(this.undoStack.contains(_60)){
while(_60!=this.current()){
this.redoStack.push(this.undoStack.pop());
}
}else{
if(this.redoStack.contains(_60)){
while(_60!=this.next()){
this.undoStack.push(this.redoStack.pop());
}
this.undoStack.push(this.redoStack.pop());
}else{
return false;
}
}
return true;
},hasUndo:function(){
return this.undoStack.count>1;
},hasRedo:function(){
return this.redoStack.count>0;
},setSaved:function(){
this.savedState=this.current();
},setRefreshed:function(add){
if(!add){
this.refreshedState=new Array();
}
this.refreshedState[this.refreshedState.length]=this.current();
},isStateDirty:function(){
return this.savedState!=this.current();
},isStateRefreshed:function(){
for(var i=0;i<this.refreshedState.length;i++){
if(this.refreshedState[i]==this.current()){
return true;
}
}
return false;
},isEmpty:function(){
return this.undoStack.count<=1&&this.redoStack.count<=0;
}});
dojo.lang.extend(dojo.dnd.HtmlDragManager,{onMouseUp:function(e,_61){
dojo.event.disconnect(document,"onmousemove",this,"onMouseMove");
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
dojo.lang.forEach(this.dragObjects,function(_62){
var ret=null;
if(!_62){
return;
}
if(this.currentDropTarget){
e.dragObject=_62;
var ce=this.currentDropTarget.domNode.childNodes;
if(ce.length>0){
e.dropTarget=ce[0];
while(e.dropTarget==_62.domNode){
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
_62.dragSource.onDragEnd(e);
}
catch(err){
var _63={};
for(var i in e){
if(i=="type"){
_63.type="mouseup";
continue;
}
_63[i]=e[i];
}
_62.dragSource.onDragEnd(_63);
}
},function(){
_62.onDragEnd(e);
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
this.currentDropTarget=null;
}});
(function(){
var d=document;
var dm=dojo.dnd.dragManager;
dojo.event.disconnect(d,"onkeydown",dm,"onKeyDown");
dojo.event.disconnect(d,"onmouseover",dm,"onMouseOver");
dojo.event.disconnect(d,"onmouseout",dm,"onMouseOut");
dojo.event.disconnect(d,"onmousedown",dm,"onMouseDown");
dojo.event.disconnect(d,"onmouseup",dm,"onMouseUp");
dojo.event.disconnect(window,"onscroll",dm,"onScroll");
})();
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
dojo.lang.extend(dojo.widget.PopupMenu2,{snarfChildDomOutput:false});
cv.setDomDefaultNamespace=function(_64){
if(typeof _64.setProperty!="undefined"){
_64.setProperty("SelectionNamespaces","xmlns:cv='"+cv.defaultNS+"'");
}
};
if(dojo.render.html.ie){
cv.textContent=function(_65,str){
if(dojo.lang.isUndefined(str)){
return dojo.dom.textContent(_65);
}
if(_65.nodeType==1){
_65.text=str;
}else{
return dojo.dom.textContent(_65,str);
}
};
cv.createNode=function(_66,_67,ns){
return _66.createNode(1,_67,ns?ns:cv.defaultNS);
};
cv.addOption=function(_68,_69){
_68.add(_69);
};
dojo.html.BackgroundIframe=function(_6a){
var _6b="<iframe src=\"javascript:'<html><head></head><body></body></html>'\""+" style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
this.iframe=dojo.doc().createElement(_6b);
this.iframe.tabIndex=-1;
if(_6a){
_6a.appendChild(this.iframe);
this.domNode=_6a;
}else{
dojo.body().appendChild(this.iframe);
this.iframe.style.display="none";
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentNode){
var _6c=dojo.html.getMarginBox(this.domNode);
if(_6c.width==0||_6c.height==0){
dojo.lang.setTimeout(this,this.onResized,100);
return;
}
this.iframe.style.width=_6c.width+"px";
this.iframe.style.height=_6c.height+"px";
}
},size:function(_6d){
if(!this.iframe){
return;
}
var _6e=dojo.html.toCoordinateObject(_6d,true,dojo.html.boxSizing.BORDER_BOX);
with(this.iframe.style){
width=_6e.width+"px";
height=_6e.height+"px";
left=_6e.left+"px";
top=_6e.top+"px";
}
},setZIndex:function(_6f){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(_6f)){
this.iframe.style.zIndex=dojo.html.getStyle(_6f,"z-index")-1;
}else{
if(!isNaN(_6f)){
this.iframe.style.zIndex=_6f;
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
cv.contentMinWidth=750;
cv.setMinWidth=function(){
var _70=dojo.html.getViewport().width;
if(_70<=cv.contentMinWidth){
document.body.style.width=cv.contentMinWidth+"px";
this.xScrolling=true;
}else{
document.body.style.width=_70+"px";
this.xScrolling=false;
}
};
dojo.html.disableSelection=function(_71){
_71.onselectstart=function(){
return false;
};
};
}else{
Element.prototype.selectNodes=function(_72){
var res=this.ownerDocument.evaluate(_72,this,cv.nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
var _73=[];
if(res){
var _74=res.iterateNext();
while(_74){
_73.push(_74);
_74=res.iterateNext();
}
}
return _73;
};
Element.prototype.selectSingleNode=function(_75){
var res=this.ownerDocument.evaluate(_75,this,cv.nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
return res?res.singleNodeValue:null;
};
cv.textContent=function(_76,str){
if(dojo.lang.isUndefined(str)){
return dojo.dom.textContent(_76);
}
return dojo.dom.textContent(_76,str);
};
cv.createNode=function(_77,_78,ns){
return _77.createElementNS(ns?ns:cv.defaultNS,_78);
};
cv.addOption=function(_79,_7a){
_79.appendChild(_7a);
};
}
dojo.html.placeOnScreen=function(_7b,_7c,_7d,_7e,_7f,_80,_81){
if(_7c instanceof Array||typeof _7c=="array"){
_81=_80;
_80=_7f;
_7f=_7e;
_7e=_7d;
_7d=_7c[1];
_7c=_7c[0];
}
if(_80 instanceof String||typeof _80=="string"){
_80=_80.split(",");
}
if(!isNaN(_7e)){
_7e=[Number(_7e),Number(_7e)];
}else{
if(!(_7e instanceof Array||typeof _7e=="array")){
_7e=[0,0];
}
}
var _82=dojo.html.getScroll().offset;
var _83=dojo.html.getViewport();
_7b=dojo.byId(_7b);
var _84=_7b.style.display;
_7b.style.display="";
_7b.style.opacity="0.05";
var bb=dojo.html.getBorderBox(_7b);
var w=bb.width;
var h=bb.height;
_7b.style.opacity="";
_7b.style.display=_84;
if(!(_80 instanceof Array||typeof _80=="array")){
_80=["TL"];
}
var _85,_86,_87=Infinity,_88;
for(var _89=0;_89<_80.length;++_89){
var _8a=_80[_89];
var _8b=true;
var _8c=_7c-(_8a.charAt(1)=="L"?0:w)+_7e[0]*(_8a.charAt(1)=="L"?1:-1);
var _8d=_7d-(_8a.charAt(0)=="T"?0:h)+_7e[1]*(_8a.charAt(0)=="T"?1:-1);
if(_7f){
_8c-=_82.x;
_8d-=_82.y;
}
if(_8c<0){
_8c=0;
_8b=false;
}
if(_8d<0){
_8d=0;
_8b=false;
}
var x=_8c+w;
if(x>_83.width){
x=_83.width-w;
_8b=false;
}else{
x=_8c;
}
x=Math.max(_7e[0],x)+_82.x;
var y=_8d+h;
if(y>_83.height){
y=_83.height-h;
_8b=false;
}else{
y=_8d;
}
y=Math.max(_7e[1],y)+_82.y;
if(_8b){
_85=x;
_86=y;
_87=0;
_88=_8a;
break;
}else{
var _8e=Math.pow(x-_8c-_82.x,2)+Math.pow(y-_8d-_82.y,2);
if(_87>_8e){
_87=_8e;
_85=x;
_86=y;
_88=_8a;
}
}
}
if(!_81){
_7b.style.left=_85+"px";
_7b.style.top=_86+"px";
}
return {left:_85,top:_86,x:_85,y:_86,dist:_87,corner:_88};
};
cv.isMobile=function(){
return (window.orientation!==undefined);
};
if(cv.isMobile()){
function logDebug(_8f,_90){
var _91=_8f.changedTouches[0].target;
window.console.log(_8f.type+" mouseEvent: "+_90+" target:"+_91+" html:"+_91.outerHTML);
};
function resolveTarget(_92,_93){
var _94="on"+_93;
if(!_92[_94]){
var _95=_92.parentNode;
if(_95[_94]!==undefined){
return _95;
}
_95=_92.firstChild;
if(_95[_94]!==undefined){
return _95;
}
var _95=_92.parentNode.parentNode;
if(_95[_94]!==undefined){
return _95;
}
}else{
return _92;
}
};
function fireMouseEvent(_96,_97){
var _98=_97.changedTouches;
var _99=_98[0].target;
var x=_98[0].screenX;
var y=_98[0].screenY;
var _9a=document.createEvent("MouseEvent");
_9a.initMouseEvent(_96,true,true,window,1,x,y,x,y,false,false,false,false,0,null);
_99=resolveTarget(_99,_96);
_99.dispatchEvent(_9a);
};
window.touchstartTime=0;
window.lastTouchstartTime=0;
window.hasMoved=false;
var touchHandler=function(_9b){
if(_9b.touches.length>1){
return;
}
var dm=dojo.dnd.dragManager;
var _9c=_9b.changedTouches[0].target;
switch(_9b.type){
case "touchstart":
if((new Date().getTime())-window.lastTouchstartTime<350){
fireMouseEvent("dblclick",_9b);
_9b.preventDefault();
}
window.touchstartTime=new Date().getTime();
window.lastTouchstartTime=window.touchstartTime;
if(dm.getDragSource(_9b)){
_9b.preventDefault();
}
fireMouseEvent("mouseover",_9b);
fireMouseEvent("mousedown",_9b);
if(_9c.parentNode.getAttribute("type")=="member"||_9c.parentNode.parentNode.getAttribute("type")=="member"||_9c.parentNode.getAttribute("type")=="attribute"||_9c.parentNode.parentNode.getAttribute("type")=="attribute"||_9c.parentNode.getAttribute("type")=="measure"||_9c.parentNode.parentNode.getAttribute("type")=="measure"){
_9b.preventDefault();
}
break;
case "touchmove":
if(new Date().getTime()-window.touchstartTime<200){
return;
}
window.hasMoved=true;
if(dm.getDragSource(_9b)){
_9b.preventDefault();
}
fireMouseEvent("mousemove",_9b);
break;
case "touchend":
if(!window.hasMoved&&new Date().getTime()-window.touchstartTime>200){
fireMouseEvent("contextmenu",_9b);
}else{
fireMouseEvent("mouseup",_9b);
}
window.hasMoved=false;
break;
default:
return;
}
};
document.addEventListener("touchstart",touchHandler,true);
document.addEventListener("touchmove",touchHandler,true);
document.addEventListener("touchmove",function(e){
if(e.touches.length==1){
e.preventDefault();
}
},true);
document.addEventListener("touchend",touchHandler,true);
}
cv.Dialog=function(){
this.theForm=null;
this.type=null;
this.dlgTemplate=null;
this.prefix=null;
this.cache={};
this.status=null;
this.helpTopic=null;
this.defaultMsg=null;
this.lastSaveTime=null;
this.isShowing=false;
this.defaultFocus=null;
this._parentReport=null;
};
cv.Dialog.prototype={show:null,save:null,prev:null,cancel:function(){
cv.dlgWidget.hide();
if(this._parentReport!=null){
this._parentReport.refreshReport();
}
},next:function(){
this.save();
},onSave:function(){
if(this.lastSaveTime&&new Date()-this.lastSaveTime<1000){
return;
}
this.save();
this.lastSaveTime=new Date();
},onHide:function(){
if(!this.isShowing){
return;
}
if(this.asyncRequest){
this.asyncRequest.abort();
this.asyncRequest=null;
}
if(this.asyncRequestId){
cv.io.cancelAsyncRequest(this.asyncRequestId);
this.asyncRequestId=null;
}
this.isShowing=false;
},showError:function(msg,_9d){
this.msgClass="error";
this._showAlert(msg,_9d);
},showWarning:function(msg,_9e,_9f,_a0,_a1,_a2,_a3){
this.msgClass="warn";
this._parentReport=_a2;
this._showAlert(msg,_9e,_9f,_a0,_a1,_a3);
},showConfirm:function(msg,_a4,_a5,_a6,_a7){
this.msgClass="info";
this._showAlert(msg,_a4,_a5,_a6,_a7);
},_showAlert:function(msg,_a8,_a9,_aa,_ab,_ac){
this.type="alertDlg";
this.dlgTemplate="alertDlg.html";
var _ad="<img class='alertMsgIcon' src='images/icons/"+this.msgClass+"_l.gif'><div class='alertMsgText'>";
if(dojo.lang.isString(msg)){
if(cvCatalog[msg]){
_ad+=cvCatalog[msg];
}else{
_ad+=msg;
}
}else{
if(dojo.lang.isArray(msg)){
msg[0]=cvCatalog[msg[0]];
_ad+=dojo.string.substituteParams.apply(this,msg);
}else{
return;
}
}
_ad+="</div>";
if(!this.load(_ad)){
return;
}
if(_a8){
var _ae=dojo.byId("dlgHelp");
if(_ae){
dojo.html.setClass(_ae,"titleBarButton");
cv.util.setHelpTopics(["dlgHelp",_a8]);
}
}
var _af=dojo.byId("alertDlgSuppressMsg");
if(_ab){
cv.util.show(_af.parentNode);
_af.onchange=function(){
cv.prefs.suppressMsg[_ab]=_af.checked;
};
}else{
cv.util.hide(_af.parentNode);
}
var _b0=dojo.byId("alertDlgOptionMsg");
if(_ac){
dojo.byId("alertDlgOptionText").innerHTML=cvCatalog[_ac];
cv.util.show(_b0.parentNode);
}else{
cv.util.hide(_b0.parentNode);
}
var _b1=dojo.byId("dlgBtnCancel");
if(_a9){
var btn=dojo.byId("dlgBtnSave");
dojo.event.connect(btn,"onclick",cv.dlgWidget,"hide");
if(_a9.srcObj){
dojo.event.connect(btn,"onclick",_a9.srcObj,_a9.srcFunc);
}else{
dojo.event.connect(btn,"onclick",_a9.srcFunc);
}
if(_a9.srcFunc=="onSaveReport"||_a9.srcFunc=="onSaveReportInTooltip"||_a9.srcFunc=="onSaveReportInRptInfoDialog"){
dojo.byId("dlgBtnSave").innerHTML=cvCatalog.btnLabelSave;
}
cv.util.show(btn);
dojo.byId("dlgBtnCancel").innerHTML=cvCatalog.btnLabelCancel;
}
if(_aa){
if(_aa.srcObj){
dojo.event.connect(_b1,"onclick",_aa.srcObj,_aa.srcFunc);
}else{
dojo.event.connect(_b1,"onclick",_aa.srcFunc);
}
}
this.showDialog();
},showDialog:function(){
if(cv.dlgWidget.animationInProgress&&cv.dlgWidget.isShowing()){
dojo.lang.setTimeout(this,"showDialog",250);
}else{
cv.dlgWidget.show();
this.isShowing=true;
}
},displayMsg:function(){
if(!this.msgBar){
return;
}
var msg=this.defaultMsg;
if(arguments.length==1){
msg=arguments[0];
}else{
if(arguments.length>1){
msg=dojo.string.substituteParams.apply(this,arguments);
}
}
this.msgBar.innerHTML=msg?msg:"";
if(msg){
cv.util.show(this.msgBar);
dojo.lfx.html.fadeShow(this.msgBar,cv.prefs.fadeTime).play();
}
},displayError:function(){
this.displayMsg.apply(this,arguments[0].indexOf("<span")==0?arguments:["<span class='dlgError'>"+arguments[0]+"</span>"].concat(Array.prototype.slice.call(arguments,1)));
},byId:function(id){
return dojo.lang.isString(id)?dojo.byId(this.prefix+id):dojo.byId(id);
},load:function(){
this.status=null;
if(!this.cache[this.type]){
var dlg=this;
dojo.io.bind({url:cv.contextPath+"templates/"+this.dlgTemplate,handle:function(_b2,_b3,evt){
if(_b2=="load"){
if(cv.util.parseAjaxMsg(_b3)){
this.status="errorDlgLoad";
return;
}
dlg.cache[dlg.type]=_b3;
}else{
dlg.status="errorDlgLoad";
}
},mimetype:"text/plain",method:"POST",sync:true});
}
if(this.status!=null){
return false;
}
var str=this.load.arguments.length>0?dojo.string.substituteParams(this.cache[this.type],this.load.arguments):this.cache[this.type];
if(dojo.lang.isUndefined(cv.dlgWidget)){
cv.dlgWidget=cv.util.getDojoWidget("theDialog");
}
cv.dlgWidget.setContent("<form id=\"theDialogForm\" action=\"\" onsubmit=\"return false\">"+str+"</form>");
this.defaultMsg=null;
this.theForm=dojo.byId("theDialogForm");
this.titleBar=dojo.byId("dialogTitleBar");
this.msgBar=dojo.byId("dialogMessageBar");
if(this.msgBar){
cv.util.hide(this.msgBar);
}
dojo.event.connect(this.titleBar,"onmousedown",this,"onDragStart");
dojo.event.connect(document,"onmouseup",this,"onDragEnd");
var btn=dojo.byId("dlgBtnSave");
if(btn){
if(this.type!="alertDlg"){
dojo.event.connect(btn,"onclick",this,"onSave");
}
}
var btn=dojo.byId("dlgBtnNext");
if(btn){
dojo.event.connect(btn,"onclick",this,"next");
}
btn=dojo.byId("dlgBtnPrev");
if(btn){
dojo.event.connect(btn,"onclick",this,"prev");
}
btn=dojo.byId("dlgHelp");
if(btn){
if(this.helpTopic){
dojo.event.connect(btn,"onclick",this,"showHelpWnd");
btn.title=cvCatalog.btnTitleHelp;
}else{
cv.util.hide(btn);
}
}
dojo.event.connect(dojo.byId("dlgBtnCancel"),"onclick",this,"cancel");
dojo.event.connectOnce(cv.dlgWidget,"hide",this,"onHide");
dojo.event.connectOnce(cv.dlgWidget,"onShow",this,"onShow");
return true;
},updateHtml:function(_b4,_b5){
var _b6=this.byId(_b4);
if(!_b6){
_b6=this.theForm[this.prefix+_b4];
if(_b6&&_b6.length>0&&_b6[0].type=="radio"){
for(var x=0;x<_b6.length;++x){
if(_b6[x].value==_b5){
_b6[x].checked=true;
}
}
return;
}
}
if(!_b6){
return;
}
if(_b6.tagName=="INPUT"||_b6.tagName=="SELECT"){
if(_b6.type=="checkbox"){
_b6.checked=(_b5=="true"?true:false);
}else{
_b6.value=_b5;
}
}else{
_b6.innerHTML=_b5;
}
},updateXml:function(_b7,src){
if(!_b7){
return;
}
var _b8=src.id.substr(src.id.indexOf(this.prefix)+this.prefix.length);
if(!_b8){
return;
}
switch(src.type){
case "checkbox":
_b7.setAttribute(_b8,src.checked?"true":"false");
break;
default:
_b7.setAttribute(_b8,src.value);
break;
}
},getRadioGroupValue:function(_b9){
var _ba=this.theForm[_b9];
for(var x=0;x<_ba.length;++x){
if(_ba[x].checked){
return _ba[x].value;
}
}
},showHelpWnd:function(e){
if(!e.target){
return;
}
cv.util.getHelp(e.target.id=="dlgHelp"?this.helpTopic:e);
},onDragStart:function(e){
var _bb=cv.dlgWidget.domNode;
this.currentPos=dojo.html.getAbsolutePosition(_bb);
this.cursorPos={x:e.pageX,y:e.pageY};
dojo.event.connect(document,"onmousemove",this,"onDragMove");
},onDragEnd:function(e){
dojo.event.disconnect(document,"onmousemove",this,"onDragMove");
},onDragMove:function(e){
dojo.html.clearSelection(this.titleBar);
var x=this.currentPos.x+e.pageX-this.cursorPos.x;
var y=this.currentPos.y+e.pageY-this.cursorPos.y;
var _bc=dojo.html.getViewport();
if(x<_bc.width-100&&x>20){
this.currentPos.x=x;
this.cursorPos.x=e.pageX;
}
if(y<_bc.height-100&&y>20){
this.currentPos.y=y;
this.cursorPos.y=e.pageY;
}
with(cv.dlgWidget.domNode.style){
left=this.currentPos.x+"px";
top=this.currentPos.y+"px";
}
},setInvalidInputField:function(id){
if(this.invalidInputField){
dojo.html.removeClass(this.invalidInputField,"invalid");
}
this.invalidInputField=id?dojo.byId(id):null;
if(this.invalidInputField){
dojo.html.addClass(this.invalidInputField,"invalid");
}
}};
dojo.provide("clearview.widget.CVTooltip");
dojo.widget.defineWidget("clearview.widget.CVTooltip",dojo.widget.Tooltip,{_connectNodes:[],addConnectNode:function(_bd,_be){
if(_be&&dojo.lang.inArray(this._connectNodes,_bd)){
return;
}
dojo.event.connect(_bd,"onmouseover",this,"_onMouseOver");
this._connectNodes.push(_bd);
},fillInTemplate:function(_bf,_c0){
dojo.widget.Tooltip.superclass.fillInTemplate.call(this,_bf,_c0);
this.addOnLoad(this,"_loadedContent");
dojo.html.addClass(this.domNode,"cvTooltip");
var _c1=this.getFragNodeRef(_c0);
dojo.html.copyStyle(this.domNode,_c1);
this.applyPopupBasicStyle();
},postCreate:function(_c2,_c3){
dojo.widget.Tooltip.superclass.postCreate.call(this,_c2,_c3);
},_onMouseOver:function(e){
this._mouse={x:e.pageX,y:e.pageY};
var _c4=e.target;
this._connectNode=_c4;
this._loadedContent();
if(cv.formatTooltip){
cv.formatTooltip(this.domNode,_c4);
this.cancelShowing=false;
}else{
this.domNode.innerHTML="Tooltip has not been initialized for this element";
}
if(!this._tracking){
dojo.event.connect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=true;
}
this._onHover(e);
},open:function(){
if(this.isShowingNow||this.cancelShowing){
return;
}
dojo.widget.PopupContainerBase.prototype.open.call(this,this._mouse.x,this._mouse.y,null,[this._mouse.x,this._mouse.y],"TL,TR,BL,BR",[10,5]);
},_position:function(){
this.move(this._mouse.x,this._mouse.y,[10,5],"TL,TR,BL,BR");
},uninitialize:function(){
this.close();
for(var x=0,len=this._connectNodes.length;x<len;++x){
dojo.event.disconnect(this._connectNodes[x],"onmouseover",this,"_onMouseOver");
}
}});
dojo.provide("clearview.widget.CVTooltipRefresh");
dojo.widget.defineWidget("clearview.widget.CVTooltipRefresh",dojo.widget.Tooltip,{position_x:null,position_y:null,node:null,_mouse:null,_this:null,constrainToContainer:true,addConnectNode:function(_c5,x,y){
this.position_x=x;
this.position_y=y;
this.node=_c5;
this._mouse={x:this.position_x,y:this.position_y};
dojo.event.connect(_c5,"onmouseover",this,"_onMouseOver");
},removeConnectNode:function(_c6){
this.node=_c6;
dojo.event.disconnect(_c6,"onmouseover",this,"_onMouseOver");
},fillInTemplate:function(_c7,_c8){
dojo.widget.Tooltip.superclass.fillInTemplate.call(this,_c7,_c8);
this.addOnLoad(this,"_loadedContent");
dojo.html.addClass(this.domNode,"progressPaneUp");
var _c9=this.getFragNodeRef(_c8);
dojo.html.copyStyle(this.domNode,_c9);
this.applyPopupBasicStyle();
},postCreate:function(_ca,_cb){
_this=this;
dojo.widget.Tooltip.superclass.postCreate.call(this,_ca,_cb);
},_onMouseOver:function(e){
this._mouse={x:this.position_x,y:this.position_y};
var _cc=this.node;
this._connectNode=_cc;
if(this.isShowingNow){
return;
}
this._thisShow();
if(!this._tracking){
dojo.event.connect(document.documentElement,"onmousemove",this,"_MouseMove");
this._tracking=true;
}
this._onHover(e);
},_MouseMove:function(e){
this._mouse={x:this.position_x,y:this.position_y};
if(dojo.html.overElement(this._connectNode,e)||dojo.html.overElement(this.domNode,e)){
this._onHover(e);
}else{
this._onUnHover(e);
}
},close:function(){
dojo.widget.PopupContainerBase.prototype.close.call(_this,true);
this._tracking=false;
dojo.event.disconnect(document.documentElement,"onmousemove",this,"_MouseMove");
this.isShowingNow=false;
},open:function(){
if(this.isShowingNow){
return;
}
dojo.widget.PopupContainerBase.prototype.open.call(this,this._mouse.x,this._mouse.y,null,[this._mouse.x,this._mouse.y],"TL,TR,BL,BR",[10,15]);
this.isShowingNow=true;
},_showInMS:function(_cd){
this._thisShow();
dojo.lang.setTimeout(this.close,_cd);
},_thisShow:function(){
if(this.isShowingNow){
return;
}
clearview.widget.CVTooltipRefresh.superclass.show.apply(this,arguments);
this.isShowingNow=true;
},_position:function(){
this.move(this._mouse.x,this._mouse.y,[10,5],"TL,TR,BL,BR");
},uninitialize:function(){
dojo.event.disconnect(document.documentElement,"onmousemove",this,"_MouseMove");
dojo.event.disconnect(this._connectNode,"onmouseover",this,"_onMouseOver");
}});

