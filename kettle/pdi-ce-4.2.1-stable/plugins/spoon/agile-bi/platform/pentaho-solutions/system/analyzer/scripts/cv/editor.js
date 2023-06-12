dojo.declare("cv.ReportEditor",null,function(){
this.report=null;
this.fieldHelp=null;
this.isShowingFieldList=false;
},{MIN_REPORT_HEIGHT:100,init:function(){
this.createPAA=(dojo.byId("createPAA").value=="true");
this.isReportWritable=(dojo.byId("reportWritable").value=="true");
this.applyReportContextInFilterDialog=(dojo.byId("applyReportContextInFilterDialog").value=="true");
var _1=(window.location.search.indexOf("area=")>=0||window.location.search.indexOf("command=new")>=0);
var _2=dojo.byId("reportXML").value;
if(!_2){
var _3=cv.util.getURLQueryValue("path");
if(_3){
return cv.util.alertErrorOnPageOpen(dojo.string.substituteParams(cvCatalog.errorBadReport,_3),"../");
}
}
var _4=cv.util.getURLQueryValue("fieldListView");
if(_4=="cmdViewCategory"||_4=="cmdViewName"||_4=="cmdViewType"||_4=="cmdViewSchema"){
cv.prefs.fieldListView=_4;
}
window.name="cvviewrpt";
cv.contentMinWidth=600;
this.report=new cv.Report({id:"RPT001",mode:"EDIT",catalog:dojo.byId("REPORT_catalog").value,cube:dojo.byId("REPORT_cube").value,reportXml:_2,containerNode:dojo.byId("reportContainer"),systemActionsNode:dojo.byId("reportActions"),manager:this,uiController:"updateEditCmds",progressPaneId:"progressPane",createPAA:this.createPAA});
this.fieldHelp=new cv.FieldHelp(dojo.byId("fieldHelpXML").value,this);
this.report.init();
this.report.dropTargets.fieldListTree=new cv.TrashAreaDropTarget("fieldListTree",cvConst.dndAcceptedTypes["trashcan"],this.report),cv.popupMenus={fieldViewMenu:[{id:"cmdViewCategory",src:this.fieldHelp,handler:"onViewCategory"},{id:"cmdViewSchema",src:this.fieldHelp,handler:"onViewSchema"},{id:"cmdViewType",src:this.fieldHelp,handler:"onViewType"},{id:"cmdViewName",src:this.fieldHelp,handler:"onViewName"}],fieldListMenu:[{id:"cmdFieldAdd",src:this.fieldHelp,handler:"onFieldAdd"},{id:"cmdFieldFilter",src:this.fieldHelp,handler:"onFieldFilter"},{id:"cmdFieldAbout",src:this.fieldHelp,handler:"onFieldHelp"}],exportMenu:[{id:"cmdPDF",handler:"getReportPDF"},{id:"cmdExcel",handler:"getReportExcel"},{id:"cmdCSV",src:this.report.rptDlg,handler:"showCSVDownload"}],moreActionsMenu:[{id:"cmdProps",src:this.report.rptDlg,handler:"showReportProps"},{id:"cmdOptions",src:this.report.rptDlg,handler:"showReportOptions"},{id:"cmdChartProps",src:this.report.chartOptionsDlg,handler:"show"},{id:"cmdResetColumnSize",handler:"onResetColumnSize"}],attributePopMenu:[{id:"PM:attrEdit",src:this.report.rptDlg,handler:"showEditColumn"},{id:"PM:hyperlink",src:this.report.linkDlg,handler:"show"},{id:"PM:attrSortAZ",handler:"onGemSortAsc"},{id:"PM:attrSortZA",handler:"onGemSortDesc"},{id:"PM:attrShowSub",handler:"onGemToggleSubtotal"},{id:"PM:attrFilter",src:this.report,handler:"showFilterDlg"},{id:"PM:attrFilterRank",src:this.report,handler:"showFilterDlgRank"},{id:"PM:helpAttr",src:this.report,handler:"showHelpDlg"},{id:"PM:removeAttr",src:this.report,handler:"removeCurrentGem"}],propPopMenu:[{id:"PM:helpProp",src:this.report,handler:"showPropHelpDlg"},{id:"PM:removeProp",src:this.report,handler:"removeCurrentProp"}],newNumberMenu:[{id:"PM:editMeasureSummary",src:this.report.rptDlg,handler:"showEditSummaryMeasure"},{id:"PM:editMeasureArith",src:this.report.rptDlg,handler:"showEditArithMeasure"},{id:"PM:editMeasureTrend",src:this.report.rptDlg,handler:"showEditTrendMeasure"},{id:"PM:summaryMetrics",src:this.report.rptDlg,handler:"showNewSummaryOptions"},{id:"PM:arithNumber",src:this.report.rptDlg,handler:"showNewArithBuilder"},{id:"PM:trendNumber",src:this.report.rptDlg,handler:"showNewTrendNumber"}],measurePopMenu:[{id:"PM:measEdit",src:this.report.rptDlg,handler:"showEditColumn"},{id:"PM:measSortHiLow",handler:"onGemSortDesc"},{id:"PM:measSortLowHi",handler:"onGemSortAsc"},{id:"PM:measFilterCond",src:this.report,handler:"showFilterDlgCondition"},{id:"PM:measFilterRank",src:this.report,handler:"showFilterDlgRank"},{id:"PM:measSubtotals",src:this.report.rptDlg,handler:"showSubtotals"},{id:"PM:helpMetric",src:this.report,handler:"showHelpDlg"},{id:"PM:inChartHideMetric",handler:"onGemToggleInChart"},{id:"PM:removeMetric",src:this.report,handler:"removeCurrentGem"}],measureDisabledPopMenu:[{id:"PM:inChartShowMetric",handler:"onGemToggleInChart"},{id:"PM:removeDisabledMetric",src:this.report,handler:"removeCurrentGem"}],filterPopMenu:[{id:"PM:editFilter",src:this.report,handler:"showFilterDlg"},{id:"PM:removeFilter",src:this.report,handler:"removeCurrentGem"},{id:"PM:addFilter",src:this.report,handler:"showNewFilterDlg"},{id:"PM:toggleFilterLock",src:this.report,handler:"toggleFilterLock"}],grandTotalPopMenu:[{id:"PM:totalNonVisual",handler:"onRptNonVisualTotal"},{id:"PM:totalHide",handler:"onRptHideGrandTotal"}]};
var _5=this;
var _6=this.report;
cv.util.initDojoWidget=function(wi){
var id=wi.widgetId;
switch(wi.widgetType){
case "PopupMenu2":
case "CVLeftSidePopupMenu":
if(id=="chartTypeMenu"){
var _7=wi.getChildrenOfType(dojo.widget.MenuItem2);
for(var x=0;_7&&x<_7.length;++x){
_7[x].onSelectChartType=function(){
if(!_6._initDisplay("CHART",this.widgetId)){
return;
}
_6.history.add(new cv.ReportState("actionChartType"));
_6.refreshReport();
};
dojo.event.connect(_7[x],"onClick",_7[x],"onSelectChartType");
}
}else{
cv.util.connectPopupMenu(_6,cv.popupMenus[id]);
}
break;
case "FloatingPane":
if(id=="progressPane"){
dojo.event.connect(dojo.byId("progressPaneCancel"),"onclick",_6,"cancelReport");
}
break;
default:
}
};
this.fieldHelp.init();
cv.getFieldHelp=function(_8){
return _5.fieldHelp;
};
cv.getActiveReport=function(){
return _6;
};
if(cv.isMobile()){
var _9=document.getElementById("main_toolbar");
_9.parentNode.removeChild(_9);
this.cmdNew=dojo.byId("cmdNew");
this.cmdOpen=dojo.byId("cmdOpen");
this.cmdSave=dojo.byId("cmdSave");
this.cmdSaveAs=dojo.byId("cmdSaveAs");
this.cmdBookmark=dojo.byId("cmdBookmark");
this.cmdFields=dojo.byId("cmdFields");
this.cmdFilters=dojo.byId("cmdFilters");
this.cmdLayout=dojo.byId("cmdLayout");
}else{
var _a=document.getElementById("mobile_toolbar");
_a.parentNode.removeChild(_a);
this.cmdFields=dojo.byId("cmdFields");
this.cmdFilters=dojo.byId("cmdFilters");
this.cmdLayout=dojo.byId("cmdLayout");
}
this.cmdUndo=dojo.byId("cmdUndo");
this.cmdRedo=dojo.byId("cmdRedo");
this.cmdResetBtn=dojo.byId("cmdResetBtn");
this.cmdClearCache=dojo.byId("cmdClearCache");
this.cmdReportXml=dojo.byId("cmdReportXml");
this.fieldList=dojo.byId("fieldList");
this.fieldListContent=dojo.byId("fieldListContent");
this.fieldListWrapper=dojo.byId("fieldListWrapper");
this.prevShowFieldList=null;
if(this.createPAA){
cv.util.initDivButton(this.cmdFields,this,"onToggleReportPane");
}
cv.util.initDivButton(this.cmdFilters,this,"onToggleReportPane");
cv.util.initDivButton(this.cmdLayout,this,"onToggleReportPane");
cv.util.initDivButton(this.cmdResetBtn,this.report,"onReset");
cv.util.initDivButton("cmdMoreActions",this,"_toggleMoreActionsMenu");
cv.util.initDivButton(this.cmdUndo,this.report.history,"undo");
cv.util.initDivButton(this.cmdRedo,this.report.history,"redo");
if(cv.isMobile()){
cv.util.initDivButton(this.cmdNew,this,"newReport");
cv.util.initDivButton(this.cmdOpen,this,"openReport");
cv.util.initDivButton(this.cmdSave,this,"gwtSaveReport");
cv.util.initDivButton(this.cmdSaveAs,this,"gwtSaveAsReport");
}
if(this.cmdClearCache){
dojo.event.connect(this.cmdClearCache,"onclick",this,"clearCache");
}
if(this.cmdReportXml){
dojo.event.connect(this.cmdReportXml,"onclick",this.report.rptDlg,"showReportDefinition");
}
dojo.event.connect(window,"onresize",this,"onResize");
dojo.event.connect(document,"onkey",this,"onKey");
this._updateCmdButtons();
window.onbeforeunload=function(){
if(_6.isDirty()&&window.top==window.self&&!cv.prefs.skipDirtyAlert){
return cvCatalog["promptDirtyReport"];
}
};
window.onunload=function(){
_6.destroyReport();
_6.destroy();
};
var _b=dojo.byId("pageLoading");
if(_b){
_b.parentNode.removeChild(_b);
}
cv.util.show("reportContent");
cv.util.show("fieldList");
this.reportHeight=-1;
this.reportWidth=-1;
if(_1){
this.onToggleReportPane("cmdFields");
this._updateCmdButtons();
}else{
this.resize();
}
this.initReportPane();
this.report.postCreate();
this.editorDashboardPath="new";
this.editorGadgetPath="new";
pentahoLoad();
},destroy:function(){
},saveReport:function(_c,_d,_e){
var _f={action:_c},bOk=true;
if(_d&&_e){
_f.name=dojo.string.trim(_d);
_f.path=_e;
}
var _10=this;
this.report.saveReportResizeParams();
var _11=this.report;
_f.reportXML=_11.getReportXml();
_f.stok=cv.securityToken;
dojo.io.bind({url:cv.contextPath+"ajax/saveReport",content:_f,handle:function(_12,_13,evt){
if(_12=="load"){
var msg=cv.util.parseAjaxMsg(_13);
if(msg){
if(msg.id.indexOf("Exception")>=0||msg.id.indexOf("err")==0){
bOk=false;
if(window.parent&&window.parent.mantle_showMessage){
window.parent.mantle_showMessage("Error",msg.details?msg.details:cvCatalog.errorSaveReport);
}else{
alert(msg.details?msg.details:cvCatalog.errorSaveReport);
}
}
_10.showStatus("errorSaveReport");
}else{
_11.reportDoc.replaceStorageNode(_13.documentElement);
dojo.byId("reportWritable").value="true";
var _14=_11.reportDoc.getReportProperty("name");
_11.byId("ReportName").innerHTML=dojo.string.escape("html",_14);
document.title=_14;
_10.showStatus("successSaveReport");
}
}else{
_10.showStatus("errorSaveReport");
}
},mimetype:"text/xml",method:"POST",sync:true,encoding:"utf8"});
if(this.report.reportStatus=="successSaveReport"||this.report.reportStatus=="successRenameReport"){
if(this.report.reportStatus=="successSaveReport"){
_11.setReportPropsDirty(false);
_11.history.setSaved();
}
}
return bOk;
},clearCache:function(){
var _15=this;
dojo.io.bind({url:cv.contextPath+"ajax/clearCache",content:{catalog:dojo.byId("REPORT_catalog").value},handle:function(_16,_17,evt){
if(_16=="load"&&_17=="true"){
_15.showStatus("infoCacheCleared");
}else{
_15.showStatus("errorClearCache");
}
},method:"POST",mimetype:"text/plain",sync:true});
},showStatus:function(_18,_19){
this.report.reportStatus=_18;
if(!_18){
return;
}
var msg=cvCatalog[_18];
if(!msg){
msg=_18;
}
if(cv.isMobile()){
this.report.rptDlg.showConfirm(msg);
}
},resize:function(){
var _1a,_1b;
var _1c=dojo.html.getViewport();
if(_1c.width<cv.contentMinWidth){
_1c.width=cv.contentMinWidth;
}
_1c.height-=30;
_1c.width-=8;
_1b=_1c.height-dojo.html.getBorderBox(dojo.byId("reportBtns")).height;
if(_1b<this.MIN_REPORT_HEIGHT){
_1c.height+=this.MIN_REPORT_HEIGHT-_1b;
_1b=this.MIN_REPORT_HEIGHT;
}
if(this.fieldHelp.fieldListTree){
if(this.isShowingFieldList){
this.fieldList.style.width="257px";
_1c.width-=dojo.html.getBorderBox(this.fieldList).width;
}else{
this.fieldList.style.width="33px";
_1c.width-=dojo.html.getBorderBox(this.fieldList).width;
}
this.fieldListWrapper.style.height=(_1c.height+3)+"px";
this.fieldHelp.fieldListTree.style.height=(dojo.html.getBorderBox(this.fieldListWrapper).height-32-dojo.html.getBorderBox(dojo.byId("fieldListTop")).height)+"px";
}
var _1d=dojo.byId("reportContent");
_1d.style.width=_1c.width+"px";
_1d.style.height=(_1c.height+28)+"px";
_1a=_1c.width-20;
_1b-=14;
return this.report.resize(_1a,_1b);
},updateEditCmds:function(){
var _1e=this.report.history;
if(_1e.hasUndo()){
cv.util.setButtonDisabled(this.cmdUndo,false);
this.cmdUndo.title=dojo.string.substituteParams(cvCatalog["actionUndo"],_1e.current().action);
}else{
cv.util.setButtonDisabled(this.cmdUndo,true);
this.cmdUndo.title=dojo.string.substituteParams(cvCatalog["actionUndo"]," ");
}
if(_1e.hasRedo()){
cv.util.setButtonDisabled(this.cmdRedo,false);
this.cmdRedo.title=dojo.string.substituteParams(cvCatalog["actionRedo"],_1e.next().action);
}else{
cv.util.setButtonDisabled(this.cmdRedo,true);
this.cmdRedo.title=dojo.string.substituteParams(cvCatalog["actionRedo"]," ");
}
cv.util.setButtonDisabled(this.cmdResetBtn,!_1e.isStateDirty()||_1e.current().action==cvCatalog.actionResetReport);
},_toggleButtonMenu:function(e,_1f){
var _20=cv.util.getDojoWidget(_1f);
if(!_20||!e.target){
return;
}
var _21=cv.util.getAncestorByClass(e.target,"btnContainer");
var pos=dojo.html.getAbsolutePosition(_21,true);
var box=dojo.html.getBorderBox(_21);
_20.open(e.pageX,pos.y+box.height,this);
},_toggleMoreActionsMenu:function(e){
if(!cv.util.getDojoWidget("exportMenu")){
return;
}
this._toggleButtonMenu(e,"moreActionsMenu");
if(this.report.getReportFormat()!="PIVOT"){
cv.util.setMenuItem("cmdResetColumnSize","none","disabled");
}else{
cv.util.setMenuItem("cmdResetColumnSize","none","enabled");
}
},_toggleReportPane:function(_22,_23,_24,_25){
if(_23){
cv.util.show(_22);
if(_24){
dojo.lfx.html.fadeShow(_22,cv.prefs.fadeTime).play();
}
if(_25){
this.onResize();
}
}else{
if(_24){
var _26=this;
dojo.lfx.html.fadeHide(_22,cv.prefs.fadeTime,function(_27){
cv.util.hide(_27);
if(_25){
_26.onResize();
}
}).play();
}else{
cv.util.hide(_22);
if(_25){
this.onResize();
}
}
}
},_updateCmdButtons:function(){
if(cv.isMobile()){
return;
}
var _28=this.report.topPaneId;
if(this.isShowingFieldList){
this.cmdFields.title=cvCatalog["btnTitleHideFields"];
dojo.html.addClass(this.cmdFields,"btnPressed");
}else{
this.cmdFields.title=cvCatalog["btnTitleShowFields"];
dojo.html.removeClass(this.cmdFields,"btnPressed");
}
if(_28=="filterPane"){
this.cmdFilters.title=cvCatalog["btnTitleHideFilters"];
dojo.html.addClass(this.cmdFilters,"btnPressed");
}else{
this.cmdFilters.title=cvCatalog["btnTitleShowFilters"];
dojo.html.removeClass(this.cmdFilters,"btnPressed");
}
if(_28=="layoutPane"){
this.cmdLayout.title=cvCatalog["btnTitleHideLayout"];
dojo.html.addClass(this.cmdLayout,"btnPressed");
}else{
this.cmdLayout.title=cvCatalog["btnTitleShowLayout"];
dojo.html.removeClass(this.cmdLayout,"btnPressed");
}
dojo.byId("hideFieldList").title=cvCatalog[this.isShowingFieldList?"btnTitleHideFields":"btnTitleShowFields"];
dojo.byId("hideFieldList").src="images/report/fieldList_"+((this.isShowingFieldList)?"collapse":"expand")+".png";
},onKey:function(e){
var _29=this.report;
if(cv.dlgWidget&&cv.dlgWidget.isShowing()){
switch(e.key){
case 13:
if(e.target&&e.target.tagName=="TEXTAREA"){
return;
}
if(_29.filterDlg.isShowing){
if(e.target.id=="FT_searchText"){
_29.filterDlg._searchValueList(e);
}else{
_29.filterDlg.save();
}
}else{
if(_29.rptDlg.isShowing){
var btn=dojo.byId("dlgBtnSave");
if(!btn||dojo.html.hasClass(btn,"hidden")){
btn=dojo.byId("dlgBtnNext");
if(!btn||dojo.html.hasClass(btn,"hidden")){
btn=dojo.byId("dlgBtnCancel");
}
}
if(btn&&!dojo.html.hasClass(btn,"hidden")){
btn.onclick();
}
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
if(!e.target||(e.target.tagName!="INPUT"&&e.target.tagName!="TEXTAREA")){
if(!e.ctrlKey&&!e.altKey){
switch(e.key){
case 33:
case 34:
case 38:
case 40:
case 37:
case 39:
if(_29.reportHeaders!=null){
_29.reportHeaders.keyPress(e.key);
break;
}
default:
return;
}
}else{
if(e.ctrlKey&&!e.altKey){
switch(e.key){
case "z":
_29.history.undo();
break;
case "y":
_29.history.redo();
break;
case "q":
_29.onReset();
break;
default:
return;
}
}else{
if(e.ctrlKey&&e.altKey){
switch(e.key){
case "c":
_29.toggleReportFormat();
break;
case "f":
this.onToggleReportPane("cmdFields");
break;
case "t":
_29.onToggleReportPane("cmdFilters");
break;
case "y":
_29.onToggleReportPane("cmdLayout");
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
}else{
if(e.key==13&&!rptTooltip.isRenamingHidden&&e.target.tagName=="INPUT"){
rptTooltip.renameReport();
dojo.event.browser.stopEvent(e);
}
}
}
},onResize:function(){
if(!this.resize()){
return;
}
if(this.report.getReportFormat()=="CHART"&&this.report.isInitialized){
if(this.report.history.isStateRefreshed()||cv.prefs.autoRefresh){
this.report.log(cvCatalog.actionChartResize);
this.report.refreshReport(true);
}
}
},onSaveReport:function(){
if(!this.report.isEmpty()&&!this.report.isDirty()){
return;
}
if(this.report.reportDoc.isNew()||dojo.byId("reportWritable").value=="false"){
this.report.rptDlg.showSaveReport();
}else{
this.saveReport("save");
}
},onSaveReportInTooltip:function(){
if(!this.report.isEmpty()&&!this.report.isDirty()){
return;
}
if(this.report.reportDoc.isNew()||dojo.byId("reportWritable").value=="false"){
this.report.rptDlg.showSaveReport();
}else{
var bOK=this.saveReport("save");
}
this.report.onShowRenameRpt();
},onSaveReportInRptInfoDialog:function(){
if(!this.report.isEmpty()&&!this.report.isDirty()){
return;
}
if(this.report.reportDoc.isNew()||dojo.byId("reportWritable").value=="false"){
this.report.rptDlg.showSaveReport();
}else{
var bOK=this.saveReport("save");
}
this.report.rptDlg.showReportProps();
this.report.rptDlg.showRenameRpt();
},initReportPane:function(){
if(!this.createPAA){
return false;
}
var _2a=cv.util.getURLQueryValue("showFieldList");
if(_2a=="true"){
this.onToggleReportPane("cmdFields");
}
var _2b=cv.util.getURLQueryValue("autoRefresh");
if(_2b=="false"){
this.onToggleReportPane("cmdLayout");
}
this._updateCmdButtons();
},onToggleReportPane:function(e){
var _2c;
if(dojo.lang.isObject(e)){
_2c=e.target;
while(!_2c.id){
_2c=_2c.parentNode;
}
_2c=_2c.id;
}else{
_2c=e;
}
var _2d=this.report.byId("FilterPaneToggle");
switch(_2c){
case "cmdFields":
case "hideFieldList":
this.isShowingFieldList=!this.isShowingFieldList;
this._toggleReportPane(this.fieldListContent,this.isShowingFieldList,false,true);
break;
case "cmdFilters":
case "FilterPaneToggle":
case "FilterPaneTitle":
case "FilterCountLabel":
case "HideFilterPane":
if(this.report.topPaneId=="filterPane"||_2c=="HideFilterPane"){
this.report.topPaneId="";
dojo.html.removeClass(_2d,"hide");
this._toggleReportPane(this.report.nodeFilter,false,true,true);
}else{
if(this.report.topPaneId=="layoutPane"){
this._toggleReportPane(this.report.nodeLayout,false,false,false);
}
this.report.topPaneId="filterPane";
dojo.html.addClass(_2d,"hide");
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
dojo.html.removeClass(_2d,"hide");
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
this._updateCmdButtons();
return false;
},newReport:function(){
window.location.href="selectSchema";
},openReport:function(){
openFileChooserDialog({fileSelected:function(_2e,_2f,_30,_31){
if(_30.indexOf("xanalyzer")<0){
alert("You can currently only open Analyzer files");
return;
}
window.location.href="editor?command=open&solution="+_2e+"&path="+_2f+"&action="+_30+"&showFieldList=true";
},dialogCanceled:function(){
}});
},gwtSaveAsReport:function(){
saveFileChooserDialog({fileSelected:function(_32,_33,_34,_35){
if(_34.indexOf(".xanalyzer")!=-1&&_34.indexOf(".xanalyzer")==(_34.length-10)){
_34=_34.substr(0,_34.length-10);
}
cv.getActiveReport().reportDoc.setReportProperty("name",unescape(_34.replace("+","%20")));
var _36=_32+_33+"/"+_34+".xanalyzer";
cv.getActiveReport().reportDoc.setReportProperty("folder",unescape(_36.replace("+","%20")));
var _37=cv.getActiveReport().manager.saveReport("saveAs",_34,_32+_33);
if(_37==true){
refreshBrowsePanel();
}
},dialogCanceled:function(){
}});
},gwtSaveReport:function(){
var _38=cv.getActiveReport().reportDoc.getReportProperty("folder");
var _39=cv.getActiveReport().reportDoc.getReportProperty("name");
var _3a=_38.substring(0,_38.lastIndexOf("/"));
if(!_39){
this.gwtSaveAsReport();
}else{
cv.getActiveReport().manager.saveReport("saveAs",_39,_3a);
}
}});
cv.rptEditor=new cv.ReportEditor();
dojo.addOnLoad(cv.rptEditor,"init");

