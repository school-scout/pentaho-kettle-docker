dojo.declare("cv.ReportViewer",null,function(_1,id){
this.report=null;
this.fieldHelp=null;
this.mode=_1;
this.domNode=dojo.byId(id);
this.reportContainer=dojo.html.hasClass(this.domNode,"reportContainer")?this.domNode:cv.util.getFirstChildByClass(this.domNode,"reportContainer");
},{MIN_REPORT_HEIGHT:100,init:function(){
cv.contentMinWidth=100;
var _2=cv.util.getURLQueryValue("path");
var _3,_4;
var _5=dojo.byId("reportXML").value;
if(_5){
try{
_4=new cv.ReportDocument();
_4.initialize(_5);
_3=_4.getReportOption("cube");
}
catch(e){
_5=null;
}
}
if(!_5){
return cv.util.alertErrorOnPageOpen(dojo.string.substituteParams(cvCatalog.errorBadReport,_2),"../");
}
this.fieldHelp=new cv.FieldHelp(dojo.byId("fieldHelpXML").value,this);
this.report=new cv.Report({id:"RPT"+new Date().getTime(),mode:this.mode,reportDoc:_4,containerNode:this.reportContainer,manager:this,uiController:null,progressPaneId:"progressPane",createPAA:false});
this.report.init();
if(this.mode=="MINI"){
var _6=document.getElementById(this.report.id+"ReportMain");
var _7=document.getElementById(this.report.id+"ReportTitle");
var _8=document.getElementById(this.report.id+"ReportFormatCmdDiv");
var _9=document.getElementById(this.report.id+"ReportSummary");
var _a=document.getElementById(this.report.id+"ReportMain");
_9.insertBefore(_8,_9.firstChild);
_7.style.display="none";
_a.style.border="none";
}
cv.popupMenus={actionsMenu:[{id:"cmdPDF",handler:"getReportPDF"},{id:"cmdCSV",handler:"getReportExcel"},{id:"cmdGrandTotalRow",handler:"toggleGrandTotalRow"},{id:"cmdGrandTotalCol",handler:"toggleGrandTotalCol"}],attributePopMenu:[{id:"PM:attrSortAZ",handler:"onGemSortAsc"},{id:"PM:attrSortZA",handler:"onGemSortDesc"},{id:"PM:attrShowSub",handler:"onGemToggleSubtotal"},{id:"PM:removeAttr",handler:"removeCurrentGem"}],propPopMenu:[{id:"PM:removeProp",src:this.report,handler:"removeCurrentProp"}],measurePopMenu:[{id:"PM:measSortHiLow",handler:"onGemSortDesc"},{id:"PM:measSortLowHi",handler:"onGemSortAsc"},{id:"PM:inChartHideMetric",handler:"onGemToggleInChart"},{id:"PM:removeMetric",handler:"removeCurrentGem"}],measureDisabledPopMenu:[{id:"PM:inChartShowMetric",handler:"onGemToggleInChart"},{id:"PM:removeDisabledMetric",handler:"removeCurrentGem"}],filterPopMenu:[{id:"PM:removeFilter",handler:"removeCurrentGem"},{id:"PM:toggleFilterLock",handler:"toggleFilterLock"}],grandTotalPopMenu:[{id:"PM:totalNonVisual",handler:"onRptNonVisualTotal"},{id:"PM:totalHide",handler:"onRptHideGrandTotal"}]};
var _b=this;
var _c=this.report;
cv.util.initDojoWidget=function(wi){
var id=wi.widgetId;
switch(wi.widgetType){
case "PopupMenu2":
if(id=="reportFormatMenu"){
var _d=wi.getChildrenOfType(dojo.widget.MenuItem2);
for(var x=0;_d&&x<_d.length;++x){
_d[x].onSelectReportFormat=function(){
var _e,_f=(_c.getReportFormat()=="PIVOT");
if(this.widgetId=="PIVOT"){
if(!_f){
_c.toggleReportFormat();
}
return;
}else{
if(!_c._initDisplay("CHART",this.widgetId)){
return;
}
_c.history.add(new cv.ReportState("actionChartType"));
_c.refreshReport();
}
};
dojo.event.connect(_d[x],"onClick",_d[x],"onSelectReportFormat");
}
}else{
cv.util.connectPopupMenu(_c,cv.popupMenus[id]);
}
break;
case "FloatingPane":
if(id=="progressPane"){
dojo.event.connect(dojo.byId("progressPaneCancel"),"onclick",_c,"cancelReport");
}
break;
default:
}
};
this.fieldHelp.init();
cv.getFieldHelp=function(_10){
return _b.fieldHelp;
};
cv.getActiveReport=function(){
return _c;
};
dojo.event.connect(window,"onresize",this,"onResize");
dojo.event.connect(document,"onkey",this,"onKey");
window.onunload=function(){
_c.destroyReport();
_c.destroy();
};
this.reportHeight=-1;
this.reportWidth=-1;
this.resize();
this.report.postCreate();
},destroy:function(){
},showStatus:function(_11,_12){
this.report.reportStatus=_11;
if(!_11){
return;
}
var msg=cvCatalog[_11];
if(!msg){
msg=_11;
}
},resize:function(){
var _13;
var _14=dojo.html.getViewport();
if(_14.width<cv.contentMinWidth){
_14.width=cv.contentMinWidth;
}
_14.height-=37;
_13=_14.height;
if(_13<this.MIN_REPORT_HEIGHT){
_14.height+=this.MIN_REPORT_HEIGHT-_13;
_13=this.MIN_REPORT_HEIGHT;
}
this.domNode.style.width=_14.width+"px";
this.domNode.style.height=_14.height+"px";
_13+=37;
return this.report.resize(_14.width,_13);
},_toggleReportPane:function(_15,_16,_17,_18){
if(_16){
cv.util.show(_15);
if(_17){
dojo.lfx.html.fadeShow(_15,cv.prefs.fadeTime).play();
}
if(_18){
this.onResize();
}
}else{
if(_17){
var _19=this;
dojo.lfx.html.fadeHide(_15,cv.prefs.fadeTime,function(_1a){
cv.util.hide(_1a);
if(_18){
_19.onResize();
}
}).play();
}else{
cv.util.hide(_15);
if(_18){
this.onResize();
}
}
}
},onKey:function(e){
var _1b=this.report;
if(cv.dlgWidget&&cv.dlgWidget.isShowing()){
switch(e.key){
case 13:
if(e.target&&e.target.tagName=="TEXTAREA"){
return;
}
if(_1b.filterDlg.isShowing){
_1b.filterDlg.save();
}else{
if(_1b.rptDlg.isShowing){
_1b.rptDlg.save();
}
}
break;
case 27:
cv.dlgWidget.hide();
break;
default:
return;
}
dojo.event.browser.stopEvent(e);
}else{
if(!e.target||e.target.tagName!="INPUT"){
if(!e.ctrlKey&&!e.altKey){
switch(e.key){
case 33:
case 34:
case 38:
case 40:
case 37:
case 39:
if(_1b.reportHeaders!=null){
_1b.reportHeaders.keyPress(e.key);
break;
}
default:
return;
}
}else{
if(e.ctrlKey&&!e.altKey){
switch(e.key){
case "z":
_1b.history.undo();
break;
case "y":
_1b.history.redo();
break;
case "q":
_1b.onReset();
break;
default:
return;
}
}else{
if(e.ctrlKey&&e.altKey){
switch(e.key){
case "c":
_1b.toggleReportFormat();
break;
case "t":
_1b.onToggleReportPane("cmdFilters");
break;
case "y":
_1b.onToggleReportPane("cmdLayout");
break;
default:
return;
}
}else{
if(!e.ctrlKey&&e.altKey){
return;
}
}
}
}
dojo.event.browser.stopEvent(e);
}
}
},onResize:function(){
if(!this.resize()){
return;
}
if(this.report.getReportFormat()=="CHART"&&this.report.isInitialized){
this.report.log(cvCatalog.actionChartResize);
this.report.refreshReport();
}
},onToggleReportPane:function(e){
var _1c;
if(dojo.lang.isObject(e)){
_1c=e.target;
while(!_1c.id){
_1c=_1c.parentNode;
}
_1c=_1c.id;
}else{
_1c=e;
}
var _1d=this.report.byId("FilterPaneToggle");
switch(_1c){
case "cmdFilters":
case "FilterPaneToggle":
case "FilterPaneTitle":
case "FilterCountLabel":
case "HideFilterPane":
if(this.report.topPaneId=="filterPane"||_1c=="HideFilterPane"){
this.report.topPaneId="";
dojo.html.removeClass(_1d,"hide");
this._toggleReportPane(this.report.nodeFilter,false,true,true);
}else{
if(this.report.topPaneId=="layoutPane"){
this._toggleReportPane(this.report.nodeLayout,false,false,false);
}
this.report.topPaneId="filterPane";
dojo.html.addClass(_1d,"hide");
this._toggleReportPane(this.report.nodeFilter,true,true,true);
}
break;
case "cmdLayout":
if(this.report.topPaneId=="layoutPane"){
this.report.topPaneId="";
this._toggleReportPane(this.report.nodeLayout,false,true,true);
}else{
if(this.report.topPaneId=="filterPane"){
this._toggleReportPane(this.report.nodeFilter,false,false,false);
dojo.html.removeClass(_1d,"hide");
}
this.report.topPaneId="layoutPane";
this._toggleReportPane(this.report.nodeLayout,true,true,true);
}
break;
case "HideLayoutPane":
this.report.topPaneId="";
this._toggleReportPane(this.report.nodeLayout,false,true,true);
break;
default:
return;
}
return false;
}});

