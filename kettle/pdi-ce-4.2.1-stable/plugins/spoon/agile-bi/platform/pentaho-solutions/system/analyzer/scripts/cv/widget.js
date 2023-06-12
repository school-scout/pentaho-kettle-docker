dojo.provide("clearview.widget.CVLeftSidePopupMenu");
dojo.require("dojo.widget.PopupContainer");
dojo.widget.defineWidget("clearview.widget.CVLeftSidePopupMenu",dojo.widget.PopupMenu2,{submenuDelay:750,open:function(x,y,_1,_2,_3,_4){
this.inherited("open",[x,y,_1,_2,_3,_4]);
if(x==0){
this.domNode.style.display="none";
this.isShowingNow=false;
return;
}else{
this.isShowingNow=true;
}
},_openSubmenu:function(_5,_6){
var _7=dojo.html.getAbsolutePosition(_6.domNode,true);
var _8=dojo.html.getMarginBox(this.domNode).width;
var x=_7.x-_5.width;
var y=_7.y;
if(x+""=="NaN"){
_5.open(0,y,this,_6.domNode);
}else{
_5.open(x,y,this,_6.domNode);
}
if(x+""=="NaN"){
x=_7.x-_5.width;
_5.open(x,y,this,_6.domNode);
}
this.currentSubmenuTrigger=_6;
this.currentSubmenuTrigger.is_open=true;
},onOpen:function(e){
this.inherited("onOpen",[e]);
}});
dojo.provide("dojo.widget.ResizeHandle2");
dojo.require("dojo.widget.*");
dojo.require("dojo.html.layout");
dojo.require("dojo.event.*");
dojo.widget.defineWidget("dojo.widget.CVResizeHandle",dojo.widget.ResizeHandle,{templateString:"<div class=\"resizeHandle\" style=\"right: 0\"><div></div></div>",INITIAL_WIDTH:0,MINIMAL_WIDTH:10,postCreate:function(){
this.domNode.id="CVResizeHandle_"+this.widgetId;
dojo.event.connect(this.domNode,"onmousedown",this,"_beginSizing");
dojo.event.connect(this.domNode,"ondblclick",this,"_revert");
},_revert:function(e){
if(this.targetType=="Label"){
this.reportHeader.report.rowFieldWidths[this.resizeIndex]=0;
}else{
if(this.targetType=="Column"){
var _9=this.targetDomNode.parentNode.getAttribute("colspan")-0;
for(var i=0;i<this.reportHeader.report.columnDataFieldWidths.length;i++){
if(i>=this.resizeIndex&&i<this.resizeIndex+_9){
this.reportHeader.report.columnDataFieldWidths[i]=0;
}
}
}
}
this.reportHeader.updateLayout();
this.reportHeader.report.history.add(new cv.ReportState("Reset Column"));
this.reportHeader.report.history.setRefreshed(true);
},_drawLine:function(_a){
with(this.line.style){
left=_a+"px";
if(dojo.render.html.ie){
top="2px";
}
}
this.reportHeader.rowLabelSection.appendChild(this.line);
},_showLine:function(){
if(this.line==null){
return;
}
with(this.line.style){
visibility="";
}
},_hideLine:function(){
if(this.line==null){
return;
}
with(this.line.style){
visibility="hidden";
}
},_createLineOnCursorPosition:function(e){
var _b=dojo.html.getAbsolutePosition(this.reportHeader.rowLabelSection,true);
var _c=e.clientX-_b.x+this.INITIAL_WIDTH;
if(this.line==null){
this.line=document.createElement("div");
dojo.html.addClass(this.line,"resizeIndicator");
this._drawLine(_c);
return;
}
},_moveLineToCursorPosition:function(e){
var _d=dojo.html.getAbsolutePosition(this.reportHeader.rowLabelSection,true);
var _e=e.clientX-_d.x+this.INITIAL_WIDTH;
if(typeof this.currentWidth!="undefined"){
var _f=1;
if(this.targetType=="Column"){
_f=this.targetDomNode.parentNode.getAttribute("colspan")-0;
}
if(this.currentWidth-this.dx<this.MINIMAL_WIDTH*_f){
_e=(this.startPoint.x-(this.currentWidth-this.MINIMAL_WIDTH*_f))-_d.x+this.INITIAL_WIDTH;
if(dojo.render.html.ie){
dojo.event.disconnect(dojo.body(),"onmousemove",this,"_changeSizing");
}else{
e.offsetX=_e;
}
this.dx=this.currentWidth-this.MINIMAL_WIDTH*_f;
}
}
this._showLine();
this._drawLine(_e);
},_getCurrentColumnWidth:function(){
this.currentWidth=0;
var _10=[];
if(this.targetType=="Label"){
_10=this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL");
this.currentWidth=_10[this.resizeIndex].width;
}else{
if(this.targetType=="Column"){
_10=this.reportHeader.columnHeaderContainer.getElementsByTagName("COL");
var _11=this.targetDomNode.parentNode.getAttribute("colspan")-0;
for(var i=0;i<_10.length;i++){
if(i>=this.resizeIndex&&i<this.resizeIndex+_11){
this.currentWidth+=_10[i].width-0;
}
}
}else{
return;
}
}
},_beginSizing:function(e){
this.resizeIndex=this.targetDomNode.attributes["resizeIndex"].value-0;
this._getCurrentColumnWidth();
this.dx=0;
this.startPoint={"x":e.clientX,"y":e.clientY};
this._createLineOnCursorPosition(e);
dojo.event.connect(this.line,"ondblclick",this,"_revert");
dojo.event.connect(dojo.body(),"onmousemove",this,"_changeSizing");
dojo.event.connect(dojo.body(),"onmouseup",this,"_endSizing");
e.preventDefault();
},_changeSizing:function(e){
this.reportHeader.report.isResizing=true;
try{
if(!e.clientX||!e.clientY){
return;
}
}
catch(e){
return;
}
e.preventDefault();
this.dx=this.startPoint.x-e.clientX;
this._moveLineToCursorPosition(e);
},_endSizing:function(e){
this.inherited("_endSizing",[e]);
this._hideLine();
this.dx=this.dx||0;
var _12=new cv.ReportState("Column Resize");
if(this.targetType=="Label"){
this.reportHeader.updateLayout(this.resizeIndex,this.dx);
_12.resizeData={index:this.resizeIndex,dx:this.dx};
}else{
if(this.targetType=="Column"){
var _13=this.targetDomNode.parentNode.getAttribute("colspan")-0;
this.reportHeader.updateLayout(this.resizeIndex,this.dx,_13);
_12.resizeData={index:this.resizeIndex,dx:this.dx,colspan:_13};
}
}
this.reportHeader.report.history.add(_12);
this.reportHeader.report.history.setRefreshed(true);
this.reportHeader.report.isResizing=false;
}});
dojo.widget.defineWidget("dojo.widget.CVBeforeResizeHandle",dojo.widget.CVResizeHandle,{templateString:"<div class=\"resizeHandle\" style=\"left: 0\"><div></div></div>",postCreate:function(){
this.domNode.id="CVResizeHandle_"+this.widgetId;
dojo.event.connect(this.domNode,"onmousedown",this,"_beginSizing");
dojo.event.connect(this.domNode,"ondblclick",this,"_revert");
},_getCurrentColumnWidth:function(){
this.currentWidth=0;
var _14=[];
if(this.targetType=="Label"){
_14=this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL");
this.currentWidth=_14[this.resizeIndex-1].width;
}else{
if(this.targetType=="Column"){
if(this.resizeIndex==0){
var _15=this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL").length-1;
this.currentWidth=this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL")[_15].width;
}else{
_14=this.reportHeader.columnHeaderContainer.getElementsByTagName("COL");
var _16=this.targetDomNode.parentNode.getAttribute("colspan")-0;
var _17=this.resizeIndex-_16;
for(var i=0;i<_14.length;i++){
if(i>=_17&&i<_17+_16){
this.currentWidth+=_14[i].width-0;
}
}
}
}else{
return;
}
}
},_revert:function(e){
if(this.targetType=="Label"){
this.reportHeader.report.rowFieldWidths[this.resizeIndex-1]=0;
}else{
if(this.targetType=="Column"){
if(this.resizeIndex==0){
var _18=this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL").length-1;
this.reportHeader.report.rowFieldWidths[_18]=0;
}else{
var _19=this.targetDomNode.parentNode.getAttribute("colspan")-0;
var _1a=this.resizeIndex-_19;
for(var i=0;i<this.reportHeader.report.columnDataFieldWidths.length;i++){
if(i>=_1a&&i<_1a+_19){
this.reportHeader.report.columnDataFieldWidths[i]=0;
}
}
}
}
}
this.reportHeader.updateLayout();
this.reportHeader.report.history.add(new cv.ReportState("Reset Column"));
this.reportHeader.report.history.setRefreshed(true);
},_endSizing:function(e){
dojo.event.disconnect(dojo.body(),"onmousemove",this,"_changeSizing");
dojo.event.disconnect(dojo.body(),"onmouseup",this,"_endSizing");
this._hideLine();
this.dx=this.dx||0;
var _1b=new cv.ReportState("Column Resize","");
if(this.targetType=="Label"){
this.reportHeader.updateLayout(this.resizeIndex-1,this.dx);
_1b.resizeData={index:this.resizeIndex-1,dx:this.dx};
}else{
if(this.targetType=="Column"){
if(this.resizeIndex==0){
var _1c=this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL").length-1;
this.reportHeader.updateLayout(_1c,this.dx);
_1b.resizeData={index:_1c,dx:this.dx};
}else{
var _1d=this.targetDomNode.parentNode.getAttribute("colspan")-0;
this.reportHeader.updateLayout(this.resizeIndex-_1d,this.dx,_1d);
_1b.resizeData={index:this.resizeIndex-_1d,dx:this.dx,colspan:_1d};
}
}
}
this.reportHeader.report.history.add(_1b);
this.reportHeader.report.history.setRefreshed(true);
this.reportHeader.report.isResizing=false;
}});

