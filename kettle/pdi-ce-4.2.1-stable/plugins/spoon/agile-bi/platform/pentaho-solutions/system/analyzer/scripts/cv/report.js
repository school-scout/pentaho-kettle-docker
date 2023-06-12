dojo.mixin(cvConst,{MAX_FILTER_EXPRESSIONS:10,MAX_FILTER_MEMBERS:200,dndAcceptedTypes:{"measures":["V","VM"],"columnAttributes":["L","T","LC","TC","LR","TR"],"rowAttributes":["L","T","LC","TC","LR","TR"],"filters":["V","L","T","VM","LC","TC","LR","TR"],"reportArea":["V","L","T","VM","LC","TC","LR","TR"],"trashcan":["VM","LC","TC","LR","TR","FT"]},dndTypes:{"measures":"M","columnAttributes":"C","rowAttributes":"R","filters":"FT"},TYPE_ATTRIBUTE:0,TYPE_METRIC:1,TYPE_FILTER:4,defaultGemTypes:{rowAttributes:0,columnAttributes:0,measures:1,filters:4},defaultFormatExp:"Case\nWhen [Measures].CurrentMember > 0\nThen '|#,##0|arrow=up'\nWhen [Measures].CurrentMember < 0\nThen '|#,##0|arrow=down'\nElse '|#,##0'\nEnd"});
dojo.mixin(cv.prefs,{chartOption:"VERTICAL_BAR",autoRefresh:true,manyReportItems:8000,maxReportItems:15000,maxFilterValues:3000,maxColumnFields:4,numProgressImg:1,fieldListView:"cmdViewCategory"});
dojo.mixin(cvCatalog,{emptyReportAreaHTML:"<div class='reportEmpty'><img src='images/icon_%{2}.png'><br>%{1}<br><br>"+"<div id=\"%{0}GettingStarted\" style=\"cursor:pointer; margin:auto; width: 300px; height: 29px; background-image: url(&quot;images/report_create_getting_started_middle.gif&quot;); background-repeat: repeat-x; vertical-align: middle;\">"+"<img align=\"left\" src=\"images/report_create_getting_started_left.gif\">"+"<img align=\"right\" src=\"images/report_create_getting_started_right.gif\">"+"<div id=\"reportContextHelp\" style=\"font-size: 0.7em; color: black; padding-top: 6px;\">"+cvCatalog["reportHelpGettingStarted"]+"</div></div></div>",filterTemplateSingleLine:"<div formula='%{0}' id='%{1}' class='filterItem'><div class='filterIndent'>"+"<img class='filterAction' id='remove_%{1}' title='Remove filter' onclick='cv.getActiveReport().removeFilter(\"%{1}\")' src='images/report/Remove.png'>"+"<img class='filterAction EDIT_Only' id='edit_%{1}' title='Edit filter' onclick='cv.getActiveReport().filterDlg.show(\"%{1}\")' src='images/report/editFilter.png'>"+"&nbsp;</div><span><b>%{2}</b>&nbsp;%{3}</span><img class='lockImg' title='Filter locked' src='images/icons/locked.gif'></div>",filterTemplateMultiLine:"<div class='filterItem filterLine'><div class='filterIndent'>&nbsp;</div>"+"<span><b>%{0}</b> is restricted as following:</span><img class='lockImg' title='Filter locked' src='images/icons/locked.gif'></div>",filterTemplateAttr:"<div formula='%{0}' id='%{1}' class='filterItem'><div class='filterIndent2'>"+"<img class='filterAction' id='remove_%{1}' title='Remove filter' onclick='cv.getActiveReport().removeFilter(\"%{1}\")' src='images/report/Remove.png'>"+"<img class='filterAction EDIT_Only' id='edit_%{1}' title='Edit filter' onclick='cv.getActiveReport().filterDlg.show(\"%{1}\")' src='images/report/editFilter.png'>"+"&nbsp;</div><span>%{2}</span></div>",filterTemplateMetric:"<div formula='%{0}' id='filter_metric_0' class='filterItem'><div class='filterIndent'>"+"<img class='' id='remove_filter_metric' title='Remove filter' onclick='cv.getActiveReport().removeCurrentGem()' src='images/report/Remove.png'>"+"<img class='EDIT_Only' id='edit_filter_metric' title='Edit filter' onclick='cv.getActiveReport().filterDlg.showMetricFilter()' src='images/report/editFilter.png'>"+"&nbsp;</div><div style='float:left;'>%{1}</div></div>",filterConditionEdit:"<table><tr><td width=10></td><td width=210><select id='FT_condMetric' style='width:98%;' size=1></select></td>"+"<td width=160><select id='FT_condOp' size=1>"+"<option value='GREATER_THAN' selected>%{GT}</option><option value='LESS_THAN'>%{LT}</option>"+"<option value='GREATER_THAN_EQUAL'>%{GTE}</option><option value='LESS_THAN_EQUAL'>%{LTE}</option>"+"<option value='EQUAL'>%{E}</option><option value='NOT_EQUAL'>%{NE}</option><option value='BETWEEN'>%{B}</option>"+"<option value='IS_NOT_EMPTY'>%{NE}</option></select></td>"+"<td width=105><input id='FT_condOp1' style='width:95px' type='text' class='inputNum'>"+"<span> and <input id='FT_condOp2' style='width:95px' type='text' class='inputNum'></span></td>"+"<td width=16 class='filterConditionDelete' id='FT_remove_{%id}' title='Delete condition'></td><td width=16></td></tr></table>",filterConditionStatic:"<table><tr><td width=10></td><td width=210>%{metric}</td><td width=160>%{op}</td>"+"<td width=105><span>%{op1}</span><span class='%{op2Css}'> and <span>%{op2}</span></span></td>"+"<td width=16 class='filterConditionDelete' id='FT_remove_{%id}' title='Delete condition'></td><td width=16></td></tr></table>",reportNoDataMsgHTML:"<div class='noData'><span class='noDataHeader'>%{0}</span><span class='noDataHint'>Your current combination of "+"<a class='appCmdLink' href='#' onclick='return cv.getActiveReport().manager.onToggleReportPane(\"cmdLayout\");'>Fields</a> and "+"<a class='appCmdLink' href='#' onclick='return cv.getActiveReport().manager.onToggleReportPane(\"cmdFilters\");'>Filters</a> did not generate any data. "+"<a class='appCmdLink helpLinkReportNoData' href='#'>View Help</a> to learn more.<p><a class='appCmdLink' href='#' onclick='cv.getActiveReport().history.undo();return false;'>Undo</a> your last action.</span></div>",reportSuccessMsgHTML:"<div class='noData'><span class='noDataHeader'>%{0}</span></div>",refreshPanelCancel:"<div class='refreshPaneCanceledMode'>%{0}</div>",refreshPanelComplete:"<div class='refreshPaneComplete'>&nbsp;&nbsp;%{0}&nbsp;</div>"});
cv.io={maxConnectionTries:3,ajaxLoad:function(_1,_2,_3,_4){
var _5=null;
_2.stok=cv.securityToken;
dojo.io.bind({url:cv.contextPath+_1,content:_2,handle:function(_6,_7,_8){
if(_3&&_6=="load"){
_5=_7;
}else{
if(!_3&&_6=="load"){
_4(_7);
}
}
},method:"POST",mimetype:"text/plain",sync:_3,encoding:"utf8"});
if(_3){
return _5;
}
},initAsyncRequest:function(_9){
if(_9.prevId==null){
_9.prevId="";
}
return this.ajaxLoad("ajax/initRequest",_9,true);
},cancelAsyncRequest:function(_a){
if(!_a){
return;
}
this.ajaxLoad("ajax/cancelRequest",{requestId:_a},false);
},refreshReport:function(_b){
var _c=(new Date).getTime();
_b.showProgressPane("reportRefreshing");
if(_b.refreshRequest){
_b.refreshRequest.abort();
}
_b.refreshRequestErrorCounter=0;
var id=this.initAsyncRequest({reportXML:_b.getReportXml(),prevId:_b.refreshRequestId,format:"HTML",action:"REFRESH",dirtyFlag:_b.isDirty(),newFields:_b.newFields.toString()});
_b.newFields="";
if(!id){
_b.handleReportMsg({type:"exception",initId:id});
return true;
}
var _d=_b.handleReportMsg(id);
if(_d&&(_c>=_b.refreshTimeStamp)){
_b.refreshRequestId=_d.text;
_b.refreshTimeStamp=_c;
this.getReportHTML(_b);
return true;
}
return false;
},getReportHTML:function(_e,id,_f){
if(!_e.refreshRequestId||(id&&id!=_e.refreshRequestId)){
return;
}
if(!id){
id=_e.refreshRequestId;
}
if(_e.refreshRequest){
_e.refreshRequest.abort();
_e.refreshRequest=null;
}
if(!_f){
_f=3;
}
var _10=this;
_e.refreshRequest=dojo.io.bind({url:cv.contextPath+"ajax/getReportHTML",content:{requestId:id,timeout:_f,reportViewWidth:_e.reportWidth,reportViewHeight:_e.reportHeight,stok:cv.securityToken},handle:function(_11,_12,evt){
var _13=true;
if(_11=="load"){
if(_12){
_13=false;
_e.loadReportHTML(_12);
}
}else{
if(!_10._retryConnection(_12,_e.refreshRequestErrorCounter)){
_e.handleReportMsg({type:"exception",message:_12.message});
_13=false;
}else{
_e.refreshRequestErrorCounter++;
}
}
if(_13){
dojo.lang.setTimeout(_10,"getReportHTML",3000,_e,id,1);
}
},method:"POST",mimetype:"text/plain",sync:false});
},getReportInFormat:function(_14,_15,_16,_17,_18){
var _19=this.initAsyncRequest({reportXML:_14,action:"REFRESH",format:_15,dirtyFlag:_18,prevId:""});
if(!_19){
return;
}
var _1a=dojo.dom.createDocumentFromText(_14);
var _1b=_1a.documentElement.selectSingleNode("cv:commonStorageAttributes/cv:path");
var _1c=_1a.documentElement.getElementsByTagName("path")[0].getAttribute("name");
var url=cv.contextPath+"ajax/getReportInFormat?requestId="+_19+"&format="+_15+"&stok="+cv.securityToken;
if(_16){
url=url+"&includeSubtotals="+_16;
}
if(_17){
url=url+"&formatNumbers="+_17;
}
if(_1c!=null&&_1c!=""){
url=url+"&reportName="+encodeURIComponent(_1c);
}
window.open(url);
},getReportDrillCSV:function(_1d,_1e,_1f,_20){
var _21=this.initAsyncRequest({reportXML:_1d,action:"REFRESH",format:"CSV",dirtyFlag:_20,prevId:""});
if(!_21){
return;
}
var url=cv.contextPath+"drill/getReportDrillCSV?requestId="+_21+"&colIndex="+_1e+"&rowIndex="+_1f;
window.open(url);
},_retryConnection:function(_22,_23){
if(_23<this.maxConnectionTries&&_22&&_22.message){
_22=_22.message;
var reg=/XMLHttpTransport\sError:\s(12\d\d\d)/;
var _24=reg.exec(_22);
if(_24&&_24[1]){
switch(_24[1]){
case "12002":
case "12029":
case "12030":
case "12031":
case "12152":
return true;
}
}
}
return false;
}};
dojo.declare("cv.Report",null,function(_25){
this.id=_25.id;
this.mode=_25.mode;
this.manager=_25.manager;
this.containerNode=_25.containerNode;
this.systemActionsNode=_25.systemActionsNode;
this.progressPaneId=_25.progressPaneId;
this.createPAA=_25.createPAA;
this.history=new cv.History(this,_25.manager,_25.uiController);
if(_25.reportDoc){
this.reportDoc=_25.reportDoc;
}else{
this.reportDoc=new cv.ReportDocument();
this.reportDoc.initialize(_25.reportXml);
}
if(_25.cube&&_25.catalog){
this.cube=_25.cube;
this.catalog=_25.catalog;
this.reportDoc.setReportOption("cube",this.cube);
this.reportDoc.setReportOption("catalog",this.catalog);
}else{
this.cube=this.reportDoc.getReportOption("cube");
this.catalog=this.reportDoc.getReportOption("catalog");
}
this.currentSelection=null;
this.gemList=new dojo.collections.Dictionary();
this.badFields=[];
this.badFilters=false;
},{MIN_REPORT_HEIGHT:100,HISTORY_ACTION_LIST:"",reportBeCanceled:false,byId:function(id){
if(id.indexOf(this.id)!=0){
id=this.id+id;
}
return dojo.byId(id);
},byClass:function(_26){
return cv.util.getFirstChildByClass(this.domNode,_26);
},createNode:function(tag,id,css,_27){
var _28=document.createElement(tag);
if(id){
_28.id=this.id+id;
}
if(css){
dojo.html.setClass(_28,css);
}
if(_27){
_27.appendChild(_28);
}
return _28;
},init:function(){
window.name="cvrpt"+this.id;
if(this.mode=="EDIT"){
if(dojo.lang.isUndefined(cv.rptDlgWidget)){
rptTooltip=cv.util.getDojoWidget("theRptInfoTooltip");
}
}
this._initDom();
this.reportStatus=null;
this.timeUnlimited=true;
this.refreshRequestId="";
this.progressImgId=0;
this.isReportPropsDirty=false;
this.actionLog=[];
this.pendingActionLen=0;
this.newFields="ALL";
this.topPaneId="";
this.reportHeight=300;
this.reportWidth=500;
this.refreshTimeStamp=null;
this.isInitialized=false;
this.pivotReportLoaded=false;
this.chartLoaded=false;
this.rptDlg=new cv.ReportDialog(this);
this.filterDlg=new cv.FilterDialog(this);
this.linkDlg=new cv.LinkDialog(this);
this.chartOptionsDlg=new cv.ChartOptionsDialog(this);
this.resizer=new cv.ReportResizer();
this.reportHeaders=null;
this.isResizing=false;
this.rowFieldWidths=new Array();
this.columnDataFieldWidths=new Array();
dojo.dnd.dragManager.nestedTargets=true;
this.dropTargets={measures:new cv.DataZoneDropTarget(this.byId("measures"),cvConst.dndAcceptedTypes["measures"],cvConst.dndTypes["measures"],this),columnAttributes:new cv.DataZoneDropTarget(this.byId("columnAttributes"),cvConst.dndAcceptedTypes["columnAttributes"],cvConst.dndTypes["columnAttributes"],this),rowAttributes:new cv.DataZoneDropTarget(this.byId("rowAttributes"),cvConst.dndAcceptedTypes["rowAttributes"],cvConst.dndTypes["rowAttributes"],this),reportArea:new cv.ReportDropTarget(this.byId("ReportArea"),cvConst.dndAcceptedTypes["reportArea"],this),trashcan:new cv.TrashAreaDropTarget(this.byId("Trashcan"),cvConst.dndAcceptedTypes["trashcan"],this)};
if(this.mode=="EDIT"){
this.dropTargets.filters=new cv.FilterPaneDropTarget(this.byId("filters"),cvConst.dndAcceptedTypes["filters"],cvConst.dndTypes["filters"],this);
this.dropTargets.filterPaneTitle=new cv.FilterPaneDropTarget(this.byId("FilterPaneTitle"),cvConst.dndAcceptedTypes["filters"],cvConst.dndTypes["filters"],this);
dojo.event.connect(this.nodeFilters,"ondblclick",this,"showFilterDlg");
dojo.event.connect(this.byId("CmdShowPivot"),"onclick",this,"toggleReportFormat");
dojo.event.connect(this.byId("CmdShowChart"),"onclick",this,"toggleReportFormat");
this.setAutoRefresh(this.reportDoc.getReportOption("autoRefresh")=="true"?true:false);
dojo.event.connect(this.byId("CmdToggleRefresh"),"onclick",this,"toggleAutoRefresh");
dojo.event.connect(this.byId("CmdSelectChartType"),"onclick",this,"toggleChartTypePopupMenu");
}else{
if(this.mode=="VIEW"||this.mode=="MINI"){
dojo.event.connect(this.byId("CmdActions"),"onclick",this,"toggleActionsPopupMenu");
}
}
dojo.event.connect(this.byId("FilterPaneTitle"),"onclick",this,"onToggleReportPane");
dojo.event.connect(this.byId("HideLayoutPane"),"onclick",this,"onToggleReportPane");
dojo.event.connect(this.byId("HideFilterPane"),"onclick",this,"onToggleReportPane");
dojo.event.connect(this.nodeFilters,"onmousemove",this,"onMouseOverFilters");
dojo.event.connect(dojo.byId("closeRowTruncate"),"onclick",this,"hideTruncateMessage");
dojo.event.connect(dojo.byId("closeColTruncate"),"onclick",this,"hideTruncateMessage");
cv.util.setHelpTopics([this.id+"HelpLayoutPane","CV/Business_User/working_with_fields.html#arranging_fields",this.id+"HelpFilterPane","CV/Business_User/working_with_filters.html"]);
cv.util.show(this.domNode);
var _29=this;
cv.formatRptInfoTooltip=function(){
if(!rptTooltip.loadRptProps()){
return;
}
var _2a=_29.getReportProperties();
for(var x in _2a){
var _2b=dojo.byId(x);
if(!_2b){
continue;
}
if(_2b.tagName=="INPUT"||_2b.tagName=="TEXTAREA"){
_2b.value=_2a[x];
}else{
_2b.innerHTML=dojo.string.escape("html",_2a[x]);
}
if(x=="description"&&_2a[x]==""){
if(_2b.tagName=="INPUT"||_2b.tagName=="TEXTAREA"){
_2b.value="No Description";
}else{
_2b.innerHTML=dojo.string.escape("html","No Description");
}
}
if(x=="created"||x=="update"){
if(_2a[x]!=null&&_2a[x]!=""){
var _2c=cv.util.formatDateString(_2a[x]);
_2b.innerHTML=dojo.string.escape("html",_2c);
}
}
if(x=="folder"){
if(_2a[x].substring(0,1)=="/"){
_2b.innerHTML=_2a[x].substring(1);
}
}
}
dojo.byId("refreshDates_2").innerHTML=dojo.byId("refreshDates").innerHTML;
var _2d=_29.reportDoc.getReportProperty("name");
if(!_29.manager.isReportWritable){
dojo.html.addClass(dojo.byId("editNameButton"),"hidden");
}
if(rptTooltip.loadStatus){
_29.showReportStatus(rptTooltip.loadStatus);
return;
}
};
},_initDom:function(){
this.domNode=this.createNode("DIV","ReportMain","reportMain pentaho-panel-insetglow "+this.mode);
this.containerNode.appendChild(this.domNode);
var _2e=this.createNode("DIV","ReportTitle","pentaho-titled-toolbar",this.domNode);
if(this.mode=="EDIT"){
_2e.innerHTML="<div id='"+this.id+"ReportFormatCmdDiv' class='reportFormatDiv'><img src='images/report/button_view_chart_pulldown.png' id='"+this.id+"CmdSelectChartType' class='selectChartType' height='23px' title='"+cvCatalog["ttChartType"]+"'>"+"<img id='"+this.id+"CmdShowChart' src='images/report/button_view_chart.png' class='reportDisplayFormat' valign='middle' title='"+cvCatalog["ttSwitchToChart"]+"'>"+"<img id='"+this.id+"CmdShowPivot' src='images/report/button_view_table.png' class='reportDisplayFormat' valign='middle' title='"+cvCatalog["ttSwitchToTable"]+"'>"+"<div class='EDIT_Only' style='float:right;padding-top:2px;padding-right:10px'>"+cvCatalog["reportViewAs"]+"</div>"+"<img id='"+this.id+"CmdToggleRefresh' style='padding-right:10px' src='images/report/button_view_autoRefresh.png' class='reportDisplayFormat' valign='middle' title='"+cvCatalog["ttDisableAutoRefresh"]+"'>"+"</div>"+"<div class='reportTitle pentaho-titled-toolbar-label'><a href='#' id='"+this.id+"TitleLink' class='titleLink'><img class='EDIT_Only' src='images/report/about.png'></a>"+"<a href='#' id='"+this.id+"TitleLinkDynamic' class='titleLink'><h2 id='"+this.id+"ReportName'>"+cvCatalog["reportNewName"]+"</h2></a>"+"</div>";
rptTooltip.addConnectNode(dojo.byId(this.id+"TitleLinkDynamic"),true);
rptTooltip.addConnectNode(dojo.byId(this.id+"TitleLink"),true);
}else{
_2e.innerHTML="<div id='"+this.id+"ReportFormatCmdDiv' class='reportFormatShowDiv' style='height:23px;'>"+"<div title='Report Actions' id='"+this.id+"CmdActions' class='cmdActionsBtn'><span>"+cvCatalog["reportDashboardActions"]+"</span></div>"+"</div><div class='titleLink'><h2 id='"+this.id+"ReportName' style='cursor:default'>"+cvCatalog["reportNewName"]+"</h2></div>";
}
_2e=this.createNode("DIV","ReportSummary","reportSummary clearfix",this.domNode);
_2e.innerHTML="<div id=\""+this.id+"StatusBar\" class=\"statusBar\"></div><div id=\"progressPane\" class=\"progressPaneDiv hidden\"></div><div class=\"filterSummary\" id=\""+this.id+"FilterPaneTitle\"><div id=\""+this.id+"FilterPaneToggle\" class=\"filterPaneToggle\" title=\""+cvCatalog["ttShowHideFilters"]+"\">&nbsp;</div>"+"<span id=\""+this.id+"FilterCountLabel\" title=\""+cvCatalog["ttShowHideFilters"]+"\" style=\"padding-top:5px;\">No Filter in use</span>";
if(this.systemActionsNode){
_2e.appendChild(this.systemActionsNode);
dojo.html.removeClass(this.systemActionsNode,"hidden");
}
this.nodeLayout=this.createNode("DIV","Layout","reportLayout clearfix hidden",this.domNode);
this.nodeLayout.innerHTML="<table><tbody><tr><td id=\""+this.id+"RowZoneLabel\" class=\"dropZoneLabel\">Row Labels&nbsp;"+"<img style=\"vertical-align:middle;\" src=\"images/row.gif\"></td><td width=\"*\"><div id=\""+this.id+"rowAttributes\" class=\"dropZoneAttributes\"></div></td><td width=\"42\"><img id=\""+this.id+"HideLayoutPane\" src=\"images/report/Close_over.png\" class=\"hideLayoutPane\" title=\"Hide layout pane\"><img id=\""+this.id+"HelpLayoutPane\" class=\"helpIcon\" title=\"Help on Fields\" style=\"float:right;\" src=\"images/help_link.png\"></td></tr>"+"<tr><td id=\""+this.id+"ColZoneLabel\" class=\"dropZoneLabel\">Col Headers&nbsp;"+"<img style=\"vertical-align:middle;\" src=\"images/col.gif\"></td><td width=\"*\"><div id=\""+this.id+"columnAttributes\" class=\"dropZoneAttributes\"></div></td><td>&nbsp;</td></tr><tr><td id=\""+this.id+"NumZoneLabel\" class=\"dropZoneLabel\">Numbers&nbsp;<img style=\"vertical-align: middle;\" src=\"images/data.gif\"></td>"+"<td width=\"*\"><div id=\""+this.id+"measures\" class=\"dropZoneMeasures\"></div></td><td>&nbsp;</td></tr></tbody></table>";
this.nodeFilter=this.createNode("DIV","Filter","reportFilter clearfix hidden",this.domNode);
this.nodeFilter.innerHTML="<img id=\""+this.id+"HideFilterPane\" src=\"images/report/Close_over.png\" class=\"closeBox\" style=\"float:right;\" title=\"Hide filter pane\">"+"<img id=\""+this.id+"HelpFilterPane\" class=\"helpIcon\" title=\"Help on Filters\" style=\"float:right;\" src=\"images/help_link.png\">"+"<div id=\""+this.id+"filters\" class=\"filters\"><div class=\"filterPaneHint\">To add a new filter, drag a field from Available Fields to this area.</div></div>";
this.nodeRowTruncate=this.createNode("DIV","RowTruncateInfo","rowTruncate hidden",this.domNode);
this.nodeRowTruncate.innerHTML="<img src=\"images/report/button_close.gif\" id=\"closeRowTruncate\" style=\"float:right;cursor:pointer;\"><br><img src=\"images/icons/info.gif\">&nbsp;Showing <span id=\""+this.id+"RowTruncateMsg\"></span>&nbsp;rows. Add more filters to reduce the number of rows.<br>To see all rows, download the report to Excel or PDF files.";
this.nodeColTruncate=this.createNode("DIV","ColTruncateInfo","colTruncate hidden",this.domNode);
this.nodeColTruncate.innerHTML="<img src=\"images/report/button_close.gif\" id=\"closeColTruncate\" style=\"float:right;cursor:pointer;\"><br><img src=\"images/icons/info.gif\">&nbsp;Showing <span id=\""+this.id+"ColTruncateMsg\"></span>&nbsp;columns. Add more filters to reduce the number of columns.<br>To see all columns, download the report to Excel or PDF files.";
this.nodeReportRefresh=this.createNode("DIV","ReportRefresh","reportRefresh",this.domNode);
this.nodeReportRefresh.innerHTML="<div style=\"float: left;\"><img src=\"images/icons/warn.png\" style=\"vertical-align: middle;\">"+cvCatalog["warnAutoRefreshPanel"]+"</div><button id=\"cmdRefreshBtn\" style=\"float: right; margin-right: 10px;padding: 2px 5px 4px;\" class=\"pentaho-button\">"+cvCatalog["refreshButton"]+"</button>";
cv.util.initDivButton(dojo.byId("cmdRefreshBtn"),null,function(){
if(!cv.getActiveReport().history.isStateRefreshed()){
cv.getActiveReport().refreshReport(true);
}
});
cv.util.hide(this.nodeReportRefresh);
this.nodeReportArea=this.createNode("DIV","ReportArea","reportArea",this.domNode);
this.nodeTrash=this.createNode("DIV","Trashcan","trashcan hidden",this.domNode);
this.nodeFilters=this.byId("filters");
this.statusBar=this.byId("StatusBar");
this.closeTruncateStatus="None";
},postCreate:function(){
var _2f="";
if(this.reportDoc.isEmpty()){
this.newFields="";
}else{
_2f="actionOpenReport";
}
this.history.add(new cv.ReportState(_2f));
this.history.setSaved();
this.openReport(null,false);
if(this.badFields.length>0){
this.history.current().reportXml=dojo.dom.innerXML(this.reportDoc.getReportNode());
}
this.history.setRefreshed(false);
this.successState=this.history.current();
this.isInitialized=true;
},destroy:function(){
if(this.mode=="EDIT"){
dojo.event.disconnect(this.nodeFilters,"ondblclick",this,"showFilterDlg");
}
if(this.cmdReportXml){
dojo.event.disconnect(this.cmdReportXml,"onclick",this.rptDlg,"showReportDefinition");
}
if(this.mode=="EDIT"){
dojo.event.disconnect(this.byId("FilterPaneTitle"),"onclick",this,"onToggleReportPane");
dojo.event.disconnect(this.nodeFilters,"onmousemove",this,"onMouseOverFilters");
dojo.event.disconnect(this.byId("CmdShowPivot"),"onclick",this,"toggleReportFormat");
dojo.event.disconnect(this.byId("CmdToggleRefresh"),"onclick",this,"toggleAutoRefresh");
dojo.event.disconnect(this.byId("CmdShowChart"),"onclick",this,"toggleReportFormat");
dojo.event.disconnect(this.byId("CmdSelectChartType"),"onclick",this,"toggleChartTypePopupMenu");
}else{
if(this.mode=="VIEW"||this.mode=="MINI"){
dojo.event.disconnect(this.byId("CmdActions"),"onclick",this,"toggleActionsPopupMenu");
}
}
this.rptDlg.destroy();
this.filterDlg.destroy();
this.resizer.destroy();
cv.util.destroyDojoWidgets();
this.rptDlg=null;
this.filterDlg=null;
this.resizer=null;
this.reportDoc=null;
this.reportHeaders=null;
this.reportStatus=null;
this.statusBar=null;
this.nodeColTruncate=null;
this.nodeRowTruncate=null;
this.nodeLayout=null;
this.nodeFilter=null;
cv.util.TRACE("_EXIT");
},setReportPropsDirty:function(_30){
this.isReportPropsDirty=_30;
},showReportDescription:function(_31){
var id=_31.currentTarget.id;
var _32=dojo.byId(id);
_32.setAttribute("title",this.getReportProperties().description);
},openReport:function(_33,_34){
if(_33){
this.reportDoc.replaceReportNode(_33);
this.reportDoc.setReportOption("autoRefresh",cv.prefs.autoRefresh?"true":"false");
}
this._initDisplay();
this.cube=this.reportDoc.getReportOption("cube");
var _35=this.reportDoc.getReportProperty("name");
var _36=this.reportDoc.getReportProperty("folder");
if(_35){
this.byId("ReportName").innerHTML=dojo.string.escape("html",_35);
document.title=_35;
}else{
this.byId("ReportName").innerHTML=dojo.string.escape("html",cvCatalog.reportNewName);
document.title=cvCatalog.reportNewName;
this.setReportPropsDirty(true);
var _37=cv.util.getURLQueryValue("autoRefresh");
if(!_33&&_37=="false"){
this.setAutoRefresh(false);
}
}
if(!_34){
this.refreshReport();
}
},destroyReport:function(){
if(this.reportHeaders!=null){
this.reportHeaders.disconnect();
this.reportHeaders=null;
}
var tbl=this.byClass("pivotTable");
if(tbl){
tbl.innerHTML="";
dojo.event.disconnect(tbl,"oncontextmenu",this,"toggleInReportPopupMenu");
cv.util.hide(this.nodeColTruncate,this.nodeRowTruncate);
}
},loadReportResizeParams:function(){
if(this.rowFieldWidths.length>0||this.columnDataFieldWidths.length>0){
return;
}
var _38="cv:uiAttributes/cv:rowFieldWidths/cv:labelWidth";
var _39=this.reportDoc.reportRecord.documentElement.selectNodes(_38);
for(var i=0;i<_39.length;++i){
this.rowFieldWidths[_39[i].attributes[0].value]=dojo.dom.textContent(_39[i].selectSingleNode("cv:width"))-0;
}
_38="cv:uiAttributes/cv:columnDataFieldWidths/cv:labelWidth";
var _3a=this.reportDoc.reportRecord.documentElement.selectNodes(_38);
for(var i=0;i<_3a.length;++i){
this.columnDataFieldWidths[_3a[i].attributes[0].value]=dojo.dom.textContent(_3a[i].selectSingleNode("cv:width"))-0;
}
},updateReportResizeParams:function(_3b,_3c,_3d,_3e){
if(_3b=="remove"){
if(_3e=="measure"){
for(var i=_3c;i<this.columnDataFieldWidths.length;++i){
this.columnDataFieldWidths[i]=this.columnDataFieldWidths[i+1];
}
}else{
for(var i=_3c;i<this.rowFieldWidths.length;++i){
this.rowFieldWidths[i]=this.rowFieldWidths[i+1];
}
}
}else{
if(_3b=="add"){
if(_3d=="before"){
if(_3e=="measure"){
for(var i=this.columnDataFieldWidths.length;i>_3c;i--){
this.columnDataFieldWidths[i]=this.columnDataFieldWidths[i-1];
}
this.columnDataFieldWidths[_3c]=null;
}else{
for(var i=this.rowFieldWidths.length;i>_3c;i--){
this.rowFieldWidths[i]=this.rowFieldWidths[i-1];
}
this.rowFieldWidths[_3c]=null;
}
}
}else{
}
}
},saveReportResizeParams:function(){
var _3f=this.reportDoc.reportRecord.documentElement.selectSingleNode("cv:uiAttributes");
var _40;
var _41;
if(_3f==null){
_3f=dojo.dom.createDocumentFromText("<uiAttributes xmlns=\"http://www.pentaho.com\"><rowFieldWidths></rowFieldWidths><columnDataFieldWidths></columnDataFieldWidths></uiAttributes>").documentElement;
if(dojo.render.html.ie){
_40=_3f.selectSingleNode("rowFieldWidths");
_41=_3f.selectSingleNode("columnDataFieldWidths");
}else{
_40=_3f.selectSingleNode("cv:rowFieldWidths");
_41=_3f.selectSingleNode("cv:columnDataFieldWidths");
}
}else{
dojo.dom.removeChildren(_3f.selectSingleNode("cv:rowFieldWidths"));
dojo.dom.removeChildren(_3f.selectSingleNode("cv:columnDataFieldWidths"));
_40=_3f.selectSingleNode("cv:rowFieldWidths");
_41=_3f.selectSingleNode("cv:columnDataFieldWidths");
}
for(i=0;i<this.rowFieldWidths.length;++i){
if(typeof this.rowFieldWidths[i]!="undefined"&&this.rowFieldWidths[i]!=null){
var _42=dojo.dom.createDocumentFromText("<labelWidth xmlns=\"http://www.pentaho.com\" index='"+i+"'><width>"+parseInt(this.rowFieldWidths[i])+"</width></labelWidth>").documentElement;
_40.appendChild(_42.cloneNode(true));
}
}
for(i=0;i<this.columnDataFieldWidths.length;++i){
if(typeof this.columnDataFieldWidths[i]!="undefined"&&this.columnDataFieldWidths[i]!=null){
var _42=dojo.dom.createDocumentFromText("<labelWidth xmlns=\"http://www.pentaho.com\" index='"+i+"'><width>"+parseInt(this.columnDataFieldWidths[i])+"</width></labelWidth>").documentElement;
_41.appendChild(_42.cloneNode(true));
}
}
if(this.reportDoc.reportRecord.documentElement.selectSingleNode("cv:uiAttributes")!=null){
dojo.dom.removeChildren(this.reportDoc.reportRecord.documentElement.selectSingleNode("cv:uiAttributes"));
this.reportDoc.reportRecord.documentElement.selectSingleNode("cv:uiAttributes").appendChild(_40);
this.reportDoc.reportRecord.documentElement.selectSingleNode("cv:uiAttributes").appendChild(_41);
}else{
this.reportDoc.reportRecord.documentElement.appendChild(_3f.cloneNode(true));
}
},loadReportHTML:function(_43){
this.refreshRequest=null;
this.refreshRequestId=null;
this.hideProgressPane();
var msg=this.handleReportMsg(_43);
if(msg){
if(msg.type=="success"){
this.showReportStatus(null);
if(msg.id!="successGenerateReport"){
if(msg.id=="reportNoDataMsg"){
_43=dojo.string.substituteParams(cvCatalog.reportNoDataMsgHTML,cvCatalog[msg.id]);
}else{
_43=dojo.string.substituteParams(cvCatalog.reportSuccessMsgHTML,cvCatalog[msg.id]);
}
}
}else{
this.showReportStatus(msg.details?msg.details:msg.id,msg.type);
}
this.loadReportResizeParams();
this.displayReport(_43,msg);
}
},log:function(_44,_45){
if(_44){
if(this.manager.cmdUndo){
if(_44=="UNDO"&&this){
_44=this.manager.cmdUndo.title;
}else{
if(_44=="REDO"){
_44=this.manager.cmdRedo.title;
}
}
}
var id=_44.indexOf(" (Ctrl+");
if(id>0){
_44=_44.substring(0,id);
}
this.actionLog.push(_44);
}
if(_45){
this.pendingActionLen=this.actionLog.length;
}
},handleReportMsg:function(_46){
if(!_46){
return null;
}
var msg=dojo.lang.isObject(_46)?_46:cv.util.parseAjaxMsg(_46);
if(msg){
switch(msg.type){
case "exception":
if((!dojo.lang.isUndefined(msg.message)&&(msg.message.indexOf("Component returned failure code: 0x80040111")>=0||msg.message.indexOf("XMLHttpTransport Error: 0")>=0))||(!dojo.lang.isUndefined(msg.initId)&&msg.initId==null)){
return null;
}
this.showReportStatus("exceptionGenerateReport");
var _47="<img class='reportMsgIcon' src='images/icons/exception_l.gif'><div class='reportMsgText'>"+(msg.ticket?dojo.string.substituteParams(cvCatalog.reportErrorTicket,msg.ticket+"",msg.id):cvCatalog.reportErrorMsg)+"</div>";
if(msg.text){
_47+=msg.text;
}
this.hideProgressPane();
this.displayReport(_47,null,"exception");
return null;
case "error":
this.showReportStatus(this.successState?"errorGenerateReport":"errorLoadReport");
this.rptDlg.showError(msg.details);
this._revertToLastSuccessState();
this.hideProgressPane();
return null;
case "confirm":
var _48=this;
this.refreshRequestId=msg.text;
if(msg.id=="Incompatible.fields"){
this.rptDlg.showConfirm(msg.details,"CV/Business_User/working_with_fields.html#incompatible_fields",{srcFunc:function(){
cv.io.getReportHTML(_48);
}},{srcObj:this,srcFunc:"cancelReport"});
}else{
this.rptDlg.showConfirm(msg.details,null,{srcFunc:function(){
cv.io.getReportHTML(_48);
}},{srcObj:this,srcFunc:"cancelReport"});
}
return null;
case "warn":
if(msg.id=="Incompatible.fields"){
this.rptDlg.showWarning(msg.details,"CV/Business_User/working_with_fields.html#incompatible_fields",false,false,null);
}else{
if(!cv.prefs.suppressMsg[msg.id]){
this.rptDlg.showWarning(msg.details,null,false,false,msg.id);
}
}
return msg;
case "sessionExpired":
return null;
default:
return msg;
}
}else{
return {type:"success",id:"successGenerateReport",text:_46};
}
},displayReport:function(_49,msg,_4a){
cv.util.TRACE("_START");
var _4b=this.getReportFormat();
if(!_49){
return;
}
this.destroyReport();
cv.util.TRACE("set report HTML");
this.nodeReportArea.innerHTML=_49;
if(msg&&msg.id=="reportNoDataMsg"){
cv.util.setHelpTopics([cv.util.getFirstChildByClass(this.nodeReportArea,"helpLinkReportNoData"),"CV/Business_User/working_with_filters.html#when_the_report_returns_no_data"]);
}else{
if(_4b=="PIVOT"){
var tbl=this.byClass("pivotTable");
if(tbl){
var _4c=tbl.getAttribute("rowcount"),_4d=tbl.getAttribute("columncount");
if(msg){
if(msg.truncate){
tbl.truncateType=msg.truncate;
}
switch(msg.truncate){
case "ROW":
_4c=dojo.string.substituteParams(cvCatalog.reportTableCountValue,_4c,msg.rows);
tbl.rowMsg=_4c;
break;
case "COL":
_4d=dojo.string.substituteParams(cvCatalog.reportTableCountValue,_4d,msg.cols);
tbl.colMsg=_4d;
break;
case "BOTH":
_4c=dojo.string.substituteParams(cvCatalog.reportTableCountValue,_4c,msg.rows);
tbl.rowMsg=_4c;
_4d=dojo.string.substituteParams(cvCatalog.reportTableCountValue,_4d,msg.cols);
tbl.colMsg=_4d;
break;
case "NONE":
default:
break;
}
}
this.statusBar.innerHTML=dojo.string.substituteParams(cvCatalog["reportTableCount"],_4c,_4d);
cv.util.TRACE("Update layout");
this.reportHeaders=new cv.ReportHeaders(this,tbl);
var _4e=0;
var _4f=dojo.html.getElementsByClass("resize",this.reportHeaders.rowLabelHeaderContainer);
for(var x=0;x<_4f.length;++x){
if(x!=0){
this.reportHeaders.attachResizeNode(_4f[x],"Label","before",_4e++);
}
this.reportHeaders.attachResizeNode(_4f[x],"Label","after",_4e++);
dojo.html.setStyle(_4f[x],"position","relative");
}
var _50=dojo.html.getElementsByClass("resize",this.reportHeaders.columnHeaderContainer);
for(var x=0;x<_50.length;++x){
if(_50[x].parentNode.getAttribute("type")=="measure"){
this.reportHeaders.attachResizeNode(_50[x],"Column","before",_4e++);
this.reportHeaders.attachResizeNode(_50[x],"Column","after",_4e++);
dojo.html.setStyle(_50[x],"position","relative");
}
}
this.reportHeaders.resizeLabels=_4f;
this.reportHeaders.resizeColumns=_50;
this.closeTruncateStatus="None";
this.resizeContainer();
this.reportHeaders.updateLayout();
dojo.event.connect(tbl,"oncontextmenu",this,"toggleInReportPopupMenu");
var _51=cv.util.getDojoWidget("memberPopMenu");
if(_51&&_51.domNode){
_51.domNode.memberId=null;
}
}
}else{
if(_4b=="CHART"){
dojo.lfx.html.fadeShow(this.nodeReportArea,cv.prefs.fadeTime).play();
}
}
}
if(!msg&&this.reportDoc.getReportNode().selectNodes("cv:measures/cv:measure").length==0){
this.showReportStatus("infoAddNumberField");
}
this.dropTargets.reportArea.init(_4b);
this.successState=this.history.current();
if(_4a!="exception"){
if(_4b=="PIVOT"){
this.pivotReportLoaded=true;
}else{
this.chartLoaded=true;
}
}
cv.util.TRACE("_END");
},refreshReport:function(_52){
this.updateMultiChartGemCSS();
if(!_52&&!this.autoRefresh()){
return true;
}
cv.util.hide(this.nodeReportRefresh);
this.history.setRefreshed(false);
this.statusBar.innerHTML="";
if(this.reportDoc.isEmpty()){
this.hideProgressPane();
if(this.refreshRequest){
this.refreshRequest.abort();
}
if(this.refreshRequestId){
cv.io.cancelAsyncRequest(this.refreshRequestId);
}
this.refreshRequest=this.refreshRequestId=null;
this.destroyReport();
var _53=this.getReportFormat();
if(_53=="PIVOT"||_53=="CHART"){
if(_53=="PIVOT"){
this.nodeReportArea.innerHTML=dojo.string.substituteParams(cvCatalog["emptyReportAreaHTML"],this.id,cvCatalog["emptyPivotTableArea"],"report_abstract");
}else{
this.nodeReportArea.innerHTML=dojo.string.substituteParams(cvCatalog["emptyReportAreaHTML"],this.id,cvCatalog["emptyChartArea"],"chart_abstract");
}
cv.util.setHelpTopics([this.id+"GettingStarted","CV/Business_User/creating_a_new_report.html#start_adding_fields_and_filters"]);
}
this.dropTargets.reportArea.init(_53);
this.showReportStatus(null);
this.successState=this.history.current();
return true;
}
this.pivotReportLoaded=false;
this.chartLoaded=false;
this.refreshTimeStamp=(new Date()).getTime();
return cv.io.refreshReport(this);
},cancelReport:function(){
this.reportBeCanceled=true;
this.hideProgressPane();
if(!this.refreshRequestId){
return;
}
if(this.refreshRequest){
this.refreshRequest.abort();
}
cv.io.cancelAsyncRequest(this.refreshRequestId);
this.refreshRequest=this.refreshRequestId=null;
this.showReportStatus("infoCancelReportRefresh");
this._revertToLastSuccessState();
},getReportXml:function(){
return this.reportDoc.getXml();
},getReportFormat:function(){
return this.reportDoc.getReportOption("reportTypeEnum");
},getReportPDF:function(){
cv.io.getReportInFormat(this.getReportXml(),"PDF",null,null,this.isDirty());
},getReportExcel:function(){
cv.io.getReportInFormat(this.getReportXml(),"EXCEL",null,null,this.isDirty());
},getReportDrillCSV:function(_54,_55){
cv.io.getReportDrillCSV(this.getReportXml(),_54,_55,this.isDirty());
},showReportStatus:function(_56,_57){
this.reportStatus=_56;
this.manager.showStatus(_56,_57);
},showProgressPane:function(_58){
var _59=dojo.byId(this.progressPaneId);
var _5a="<img src='images/report/refreshing.gif' style='vertical-align:middle;'>&nbsp;&nbsp;"+"Refreshing"+"&nbsp;&nbsp;<img id='progressPaneCancel' src='images/report/button_cancel.png' style='vertical-align:middle;cursor:pointer;'>";
_59.innerHTML=_5a;
cv.util.show(_59);
var _5b=cv.util.getFirstChildByClass(dojo.byId("refreshTooltip"),"progressPaneHeaderLabel");
if(_5b!=null){
_5b.innerHTML="<img src='images/report/refreshing.gif' style='vertical-align:middle;'>&nbsp;&nbsp;<b>Refreshing</b>";
}
dojo.event.connect(dojo.byId("progressPaneCancel"),"onclick",this,"cancelReport");
dojo.html.addClass(dojo.byId("refreshHeader"),"progressPaneUp");
dojo.html.addClass(dojo.byId("refreshAction"),"progressPaneContent");
dojo.html.addClass(dojo.byId("refreshFooter"),"progressPaneDown");
var pos=dojo.html.getAbsolutePosition(_59,true);
var _5c=cv.util.getDojoWidget("refreshTooltip");
var _5d=null;
_5c.addConnectNode(_59,pos.x+88,pos.y-8);
_5d=cv.util.getFirstChildByClass(_5c.domNode,"progressPaneContent");
var _5e=dojo.html.getViewport();
if(this.mode=="VIEW"||this.mode=="MINI"){
dojo.html.setStyle(_5c.domNode,"top","25px");
dojo.html.setStyle(_5c.domNode,"left",(_5e.width-320)+"px");
}
_5c._thisShow();
this.HISTORY_ACTION_LIST="";
for(var x=this.pendingActionLen;x<this.actionLog.length;++x){
this.HISTORY_ACTION_LIST+="<div style='font-size:11px;width:210px;'>"+this.actionLog[x]+"</div>";
}
if(_5d){
_5d.innerHTML=this.HISTORY_ACTION_LIST;
}
this.reportBeCanceled=false;
},_fadeInRefreshReport:function(){
dojo.lfx.html.fadeShow(this.nodeReportArea,3*cv.prefs.fadeTime).play();
},hideProgressPane:function(){
this.log(null,true);
var _5f=null;
var _60=dojo.byId(this.progressPaneId);
var _61=cv.util.getDojoWidget("refreshTooltip");
_61.close();
_61.removeConnectNode(_60);
if(this.mode=="VIEW"||this.mode=="MINI"){
_5f=this.reportBeCanceled?dojo.string.substituteParams(cvCatalog["refreshPanelCancel"],cvCatalog["refreshPanelCancelMsg"]):"";
}else{
_5f=this.reportBeCanceled?dojo.string.substituteParams(cvCatalog["refreshPanelCancel"],cvCatalog["refreshPanelCancelMsg"]):dojo.string.substituteParams(cvCatalog["refreshPanelComplete"],cvCatalog["refreshPanelCompleteMsg"]);
}
_60.innerHTML=_5f;
},getReportProperties:function(){
var _62={};
for(var x=0;x<this.reportDoc.reportProps.length;++x){
var _63=this.reportDoc.reportProps[x];
_62[_63]=this.reportDoc.getReportProperty(_63);
if(_62[_63]==null){
_62[_63]="";
}
}
return _62;
},setReportProperties:function(_64){
for(var x in _64){
this.reportDoc.setReportProperty(x,_64[x]);
}
this.setReportPropsDirty(true);
},toggleActionsPopupMenu:function(e){
if(!cv.util.getDojoWidget("reportFormatMenu")){
return;
}
var _65=cv.util.getDojoWidget("actionsMenu");
if(!_65){
return;
}
if(this.getReportFormat()=="PIVOT"){
cv.util.setMenuItem("PIVOT","checked");
cv.util.setMenuItem(this.chartOption,"none");
}else{
cv.util.setMenuItem(this.chartOption,"checked");
cv.util.setMenuItem("PIVOT","none");
}
cv.util.setMenuItem("cmdGrandTotalRow",this.reportDoc.getReportOption("showRowGrandTotal")=="true"?"checked":"none");
cv.util.setMenuItem("cmdGrandTotalCol",this.reportDoc.getReportOption("showColumnGrandTotal")=="true"?"checked":"none");
var _66=this.byId("CmdActions");
var pos=dojo.html.getAbsolutePosition(_66,true);
_65.open(pos.x+60,pos.y+13,_66);
},toggleGrandTotalRow:function(){
this.reportDoc.setReportOption("showRowGrandTotal",(this.reportDoc.getReportOption("showRowGrandTotal")=="true")?"false":"true");
this.history.add(new cv.ReportState("actionReportOptions"));
this.refreshReport();
},toggleGrandTotalCol:function(){
this.reportDoc.setReportOption("showColumnGrandTotal",(this.reportDoc.getReportOption("showColumnGrandTotal")=="true")?"false":"true");
this.history.add(new cv.ReportState("actionReportOptions"));
this.refreshReport();
},toggleChartTypePopupMenu:function(e){
var _67=cv.util.getDojoWidget("chartTypeMenu");
if(!_67){
return;
}
cv.util.setMenuItem(this.chartOption,"checked");
var _68=this.byId("CmdSelectChartType");
var pos=dojo.html.getAbsolutePosition(_68,true);
_67.open(pos.x+5,pos.y+13,_68);
},toggleReportFormat:function(e){
var act,_69=this.getReportFormat();
var _6a=null;
if(e&&e.target){
_6a=e.target;
while(!_6a.id){
_6a=_6a.parentNode;
}
}
if(_69=="PIVOT"){
if(_6a&&_6a.id.indexOf("CmdShowPivot")>=0){
return;
}
if(!this.chartOption){
this.chartOption=cv.prefs.chartOption;
}
this._initDisplay("CHART",this.chartOption);
act="actionShowChart";
}else{
if(_6a&&_6a.id.indexOf("CmdShowChart")>=0){
return;
}
this._initDisplay("PIVOT");
act="actionShowPivot";
}
this.history.add(new cv.ReportState(act));
this.refreshReport();
},toggleMultiChart:function(e){
var _6b=this.reportDoc.getChartOption("showMultiChart")=="true"?true:false;
if(e.target.id=="CmdToggleMultiChart"&&_6b){
return;
}
if(e.target.id=="CmdToggleSingleChart"&&!_6b){
return;
}
this.setShowMultiChart(!_6b);
if(!_6b){
this.history.add(new cv.ReportState("Switch to multi-charts"));
}else{
this.history.add(new cv.ReportState("Switch to single chart"));
}
this.refreshReport();
},setShowMultiChart:function(_6c){
this.reportDoc.setChartOption("showMultiChart",_6c?"true":"false");
if(_6c){
dojo.byId("CmdToggleSingleChart").src="images/report/single_chart_off.png";
dojo.byId("CmdToggleSingleChart").title="Switch to single chart";
dojo.byId("CmdToggleMultiChart").src="images/report/multi_chart_on.png";
dojo.byId("CmdToggleMultiChart").title="Switch to multi-chart";
}else{
dojo.byId("CmdToggleSingleChart").src="images/report/single_chart_on.png";
dojo.byId("CmdToggleSingleChart").title="Switch to single charts";
dojo.byId("CmdToggleMultiChart").src="images/report/multi_chart_off.png";
dojo.byId("CmdToggleMultiChart").title="Switch to multi-charts";
}
},toggleAutoRefresh:function(e){
var _6d=!cv.prefs.autoRefresh;
this.setAutoRefresh(_6d);
if(_6d&&!this.history.isStateRefreshed()){
this.refreshReport(true);
}
},setAutoRefresh:function(_6e){
cv.prefs.autoRefresh=_6e;
this.reportDoc.setReportOption("autoRefresh",_6e?"true":"false");
if(_6e){
this.byId("CmdToggleRefresh").src="images/report/button_view_autoRefresh.png";
this.byId("CmdToggleRefresh").title=cvCatalog["disableAutoRefresh"];
}else{
this.byId("CmdToggleRefresh").src="images/report/button_view_autoRefreshS.png";
this.byId("CmdToggleRefresh").title=cvCatalog["enableAutoRefresh"];
if(this.topPaneId!="layoutPane"&&this.isInitialized){
this.onToggleReportPane("cmdLayout");
}
}
},populateDropZone:function(_6f){
var _70=this.reportDoc.getChildMembers(_6f);
var _71=this.byId(_6f);
_71.innerHTML="";
for(var x=0;_70&&x<_70.length;++x){
var gem=this.createGemDomNode(_70[x],_6f);
if(gem){
_71.appendChild(gem.domNode);
}
}
if(_71.childNodes.length==0){
_71.innerHTML=cvCatalog["emptyDropZone"];
}
},populateFilters:function(){
var _72=this.reportDoc.getChildMembers("filters");
var _73=0;
this.timeUnlimited=true;
if(!_72||_72.length==0){
this.nodeFilters.innerHTML=cvCatalog[this.createPAA?"filterSummZoneHint":"filterSummZoneNone"];
}else{
dojo.dom.removeChildren(this.nodeFilters);
var x,gem,_74=[],_75=[];
for(x=0;x<_72.length;++x){
if(!_72[x].selectSingleNode("cv:predicates/cv:predicate")){
this.reportDoc.removeEmptyFilter(_72[x]);
}else{
gem=this.createGemDomNode(_72[x],"filters");
if(gem){
cv.getFieldHelp().isTimeAttribute(gem.getFormula(),true)?_74.push(gem):_75.push(gem);
}
}
}
if(_74.length>0){
this.timeUnlimited=false;
for(x=0;x<_74.length;++x){
this.nodeFilters.appendChild(_74[x].domNode);
_73+=_74[x].itemCount;
}
}
if(_75.length>0){
for(x=0;x<_75.length;++x){
this.nodeFilters.appendChild(_75[x].domNode);
_73+=_75[x].itemCount;
}
}
gem=this.createMetricFilterGem();
if(gem){
this.nodeFilters.appendChild(gem.domNode);
++_73;
}
}
this.byId("FilterCountLabel").innerHTML=_73==0?cvCatalog.filterTitleNone:dojo.string.substituteParams(_73>1?cvCatalog.filterTitlePlural:cvCatalog.filterTitleSingular,_73+"");
},showEditDialogOnColumnHeader:function(e){
if(this.mode!="EDIT"){
return;
}
this.currentSelection=this.getGem(e.target.parentNode.getAttribute("formula"));
if(!this.currentSelection){
return;
}
var _76="attribute";
if(this.currentSelection.type==cvConst.TYPE_METRIC){
_76=this.currentSelection.metricType;
}
if(_76=="EXPRESSION"){
this.rptDlg.showEditArithMeasure();
}else{
if(_76=="PCTOF"||_76=="RANK"||_76=="RSUM"||_76=="PCTRSUM"){
this.rptDlg.showEditSummaryMeasure();
}else{
if(_76=="VALUE"){
this.rptDlg.showEditColumn();
}else{
if(_76=="attribute"){
this.rptDlg.showEditColumn();
}else{
if(_76=="TREND"){
this.rptDlg.showEditTrendMeasure();
}
}
}
}
}
},showHelpDlg:function(){
var _77=(!this.currentSelection.metricType||this.currentSelection.metricType=="VALUE")?this.currentSelection.getFormula():this.currentSelection.getBaseFieldFormula();
if(_77&&_77.indexOf("[MEASURE:")!=0){
cv.getFieldHelp().showDlg(_77);
}
},showPropHelpDlg:function(){
this.rptDlg.show("show","propHelp");
},resize:function(_78,_79){
this.domNode.style.width=_78+"px";
this.domNode.style.height=_79+"px";
var _7a=_79-dojo.html.getBorderBox(this.byId("ReportTitle")).height-dojo.html.getBorderBox(this.byId("ReportSummary")).height-(this.topPaneId=="layoutPane"?dojo.html.getBorderBox(this.nodeLayout).height:(this.topPaneId=="filterPane"?dojo.html.getBorderBox(this.nodeFilter).height:0));
if(_7a<=0){
return false;
}
if(this.reportWidth==_78&&this.reportHeight==_7a){
return false;
}
this.reportWidth=_78;
this.reportHeight=_7a;
this.nodeReportArea.style.width=_78+"px";
this.nodeReportArea.style.height=_7a+"px";
var _7b=this.byId("ReportEmpty");
if(_7b){
_7b.style.height=_7a+"px";
}
if(this.reportHeaders){
this.reportHeaders.updateLayout();
}
var _7c=this.byId("Trashcan");
if(_7c){
dojo.lang.setTimeout(function(){
_7c.style.top=(_79-140)+"px";
_7c.style.left=(_78-130)+"px";
},200);
}
return true;
},resizeContainer:function(){
return this.manager.resize();
},addOptionsForAllMeasures:function(_7d,_7e,_7f,_80){
var _81=[],m2=[],x,id,_82,_83={};
var _84=this.reportDoc.getMetrics();
var _85=0;
var _86={};
for(x=0;x<_84.length;++x){
var _87=_84[x].getAttribute("measureTypeEnum");
if(_87=="VALUE"){
id=_84[x].getAttribute("formula");
_86[id]=_80?false:true;
}else{
id=_84[x].getAttribute("id");
if(_7f&&id==_7f){
++_85;
continue;
}
}
_81.push(id);
}
var _88={};
function _89(str,id){
if(_83[id]){
return _83[id];
}
if(!_88[str]){
_88[str]=1;
return str;
}
return _89(str+"_"+(++_88[str]),id);
};
var _8a=_84.length-_85;
var fh=cv.getFieldHelp();
_84=fh.getMeasureList();
for(x=0;x<_84.length;++x){
_82=_84[x].getAttribute("formula");
if(!fh.isHidden(_84[x])&&!_86[_82]){
m2.push(_82);
_83[_82]=_89(this.getFieldLabel(_82,true),_82);
}
}
if(_81.length==0&&m2.length==0){
return false;
}
var _8b=this;
function _8c(a,b){
return _83[a]>_83[b]?1:(_83[a]<_83[b]?-1:0);
};
m2.sort(_8c);
_81=_81.concat(m2);
_7d.innerHTML="";
for(x=0;x<_81.length;++x){
if(x==_8a&&_80){
var _8d=new Option("---------------------------------------------------------------","");
cv.addOption(_7d,_8d);
}
var _8e=(x<_8a)?_89(this.getFieldLabel(_81[x],true),_81[x]):_83[_81[x]];
if(_7e){
_8e=_8e.replace(/\]/g,"\\]");
}
var _8d=new Option(_8e,_81[x]);
_8d.setAttribute("title",_8e);
cv.addOption(_7d,_8d);
}
return true;
},addOptionsForAttributes:function(_8f,_90){
var _91=[],x;
var _92=_90?1:0;
var _93=this.reportDoc.getChildMembers("columnAttributes");
for(x=0;x<_93.length-_92;++x){
_91.push(_93[x]);
}
_93=this.reportDoc.getChildMembers("rowAttributes");
for(x=0;x<_93.length-_92;++x){
_91.push(_93[x]);
}
if(_91.length==0){
return false;
}
_8f.innerHTML="";
var _94=false;
for(x=_91.length-1;x>=0;--x){
var _95=_91[x].getAttribute("formula");
var _96=this.getFieldLabel(_95,true);
var _97=new Option(_96,_95);
_97.setAttribute("title",_96);
cv.addOption(_8f,_97);
if(!_94){
_94=true;
}
}
return _94;
},addToCheckFieldList:function(_98,_99){
if(!_98||this.newFields=="ALL"||(!_99&&this.getGem(_98))||this.getGem("filter_"+_98)||this.reportDoc.isUsedByMetricFilter(_98)){
return;
}
_98=_98.replace(",","&comma;");
if(!this.newFields){
this.newFields=_98;
}else{
if(!dojo.lang.isArray(this.newFields)){
this.newFields=[this.newFields];
}
for(var x=0;x<this.newFields.length;++x){
if(this.newFields[x]==_98){
return;
}
}
this.newFields.push(_98);
}
},showFilterDlg:function(){
var sel=this.currentSelection;
if(!sel){
return;
}
var id=sel.id;
var _9a;
if(sel.getAttribute){
_9a=sel.getAttribute("formula");
}else{
if(sel.getFormula){
_9a=sel.getFormula();
}
}
if(!id&&!_9a){
_9a=sel.parentNode.getAttribute("formula");
if(_9a){
this.rptDlg.showFilterList(_9a);
}
}else{
if(id&&id.indexOf("filter_")==0){
this.filterDlg.show(id);
}else{
if(_9a){
this.rptDlg.showFilterList(_9a);
}
}
}
},showNewFilterDlg:function(){
var sel=this.currentSelection;
if(!sel){
return;
}
var gem=this.getGem(sel.parentNode.id);
if(!gem){
return;
}
this.filterDlg.show(gem.getFormula());
},showFilterDlgCondition:function(){
var sel=this.currentSelection;
if(sel){
this.filterDlg.showMetricFilter(sel.getFormula(),"CONDITIONS");
}
},showFilterDlgRank:function(){
var sel=this.currentSelection;
if(sel){
this.filterDlg.showMetricFilter(sel.getFormula(),"RANK");
}
},isDirty:function(){
return this.isReportPropsDirty||this.history.isStateDirty();
},isEmpty:function(){
return this.reportDoc.isEmpty();
},_revertToLastSuccessState:function(){
this.history.setTo(this.successState);
if(this.successState){
this.successState.exec(true);
}
if(cv.prefs.autoRefresh){
this.history.setRefreshed(false);
}
if(!this.history.isStateRefreshed()){
cv.util.show(this.nodeReportRefresh);
}
this.log(cvCatalog.actionCancel,true);
},_initDisplay:function(_9b,_9c){
var _9d=this.reportDoc;
var _9e=this.getReportFormat();
if(!_9b){
_9b=_9e;
}else{
if(_9b==_9e&&(_9b!="CHART"||_9c==_9d.getChartOption("chartType"))){
return false;
}
_9d.setReportOption("reportTypeEnum",_9b);
}
if(_9b=="CHART"){
if(this.mode=="EDIT"){
this.byId("CmdShowChart").src="images/report/button_view_chartS.png";
this.byId("CmdShowPivot").src="images/report/button_view_table.png";
this.byId("CmdSelectChartType").title=cvCatalog["titleSwitchChartTypeTT"];
cv.util.getDojoWidget("chartTypeMenu");
}else{
if(this.mode=="VIEW"){
cv.util.getDojoWidget("reportFormatMenu");
}
}
var _9f=_9c?_9c:_9d.getChartOption("chartType");
var _a0=cvCatalog["dropZoneLabels_"+_9f+"_ROW"];
if(_9f!="MULTIPLE_PIE"){
_a0="<img id='CmdToggleSingleChart' class='multiChartCmdButton' src='images/report/single_chart_off.png'><img id='CmdToggleMultiChart' style='padding-right: 5px;' class='multiChartCmdButton' src='images/report/multi_chart_on.png'> "+_a0;
}
this.byId("RowZoneLabel").innerHTML=_a0;
this.byId("ColZoneLabel").innerHTML=cvCatalog["dropZoneLabels_"+_9f+"_COL"];
this.byId("NumZoneLabel").innerHTML=cvCatalog["dropZoneLabels_"+_9f+"_NUM"];
if(dojo.byId("CmdToggleMultiChart")){
dojo.event.connect(dojo.byId("CmdToggleSingleChart"),"onclick",this,"toggleMultiChart");
dojo.event.connect(dojo.byId("CmdToggleMultiChart"),"onclick",this,"toggleMultiChart");
this.setShowMultiChart(this.reportDoc.getChartOption("showMultiChart")=="true"?true:false);
}
cv.util.setMenuItem(this.chartOption,"none");
this.chartOption=_9f;
_9d.setChartOption("chartType",_9f);
_9d.status=null;
if(_9d.status){
this.showReportStatus(_9d.status);
}
this.disableMetricGems(true);
}else{
if(_9b=="PIVOT"){
if(this.mode=="EDIT"){
this.byId("CmdShowChart").src="images/report/button_view_chart.png";
this.byId("CmdShowPivot").src="images/report/button_view_tableS.png";
this.byId("CmdSelectChartType").title=cvCatalog["titleShowChartTypeTT"];
}
this.byId("RowZoneLabel").innerHTML=cvCatalog["dropZoneLabels_"+_9b+"_ROW"];
this.byId("ColZoneLabel").innerHTML=cvCatalog["dropZoneLabels_"+_9b+"_COL"];
this.byId("NumZoneLabel").innerHTML=cvCatalog["dropZoneLabels_"+_9b+"_NUM"];
this.disableMetricGems(false);
}
}
this.clearGemList();
this.populateDropZone("measures");
this.populateDropZone("rowAttributes");
this.populateDropZone("columnAttributes");
this.populateFilters();
if(this.badFields.length>0){
var _a1="";
for(var x=0,len=this.badFields.length;x<len;++x){
_a1+="\t"+this.badFields[x]+"\n";
}
alert(dojo.string.substituteParams(cvCatalog.warnMissingFields,_a1));
this.setReportPropsDirty(true);
}
return true;
},onGemToggleInChart:function(){
var gem=this.currentSelection;
if(!gem){
return;
}
var _a2=gem.isHideInChart()?"false":"true";
gem.xmlNode.setAttribute("hideInChart",_a2);
var _a3=this.getReportFormat()=="CHART";
gem.disable(_a2=="true"&&_a3);
this.history.add(new cv.ReportState((_a2=="true"?"actionHide":"actionShow"),gem.getDisplayLabel(true)));
if(_a3){
this.refreshReport();
}
},onGemSortDesc:function(){
this.setSortOrder(null,"DESC",true);
},onGemSortAsc:function(){
this.setSortOrder(null,"ASC",true);
},onGemConditionalFormatting:function(_a4){
var gem=this.currentSelection;
if(!gem){
return;
}
var _a5=gem.getNumberFormat();
var _a6;
if(_a5.formatShortcut==_a4){
gem.setNumberFormat({formatShortcut:"NONE"});
_a6="actionRemoveCondFormat";
}else{
gem.setNumberFormat({formatShortcut:_a4});
_a6="actionAddCondFormat";
}
this.history.add(new cv.ReportState(_a6,gem.getDisplayLabel(true)));
this.refreshReport();
},onGemToggleSubtotal:function(){
var gem=this.currentSelection;
if(!gem){
return;
}
var val=(gem.xmlNode.getAttribute("showSubtotal")=="true")?"false":"true";
gem.xmlNode.setAttribute("showSubtotal",val);
this.history.add(new cv.ReportState((val=="true"?"actionShowSubtotal":"actionHideSubtotal"),gem.getDisplayLabel(true)));
this.refreshReport();
},onRptExclude:function(){
this.updateInTableFilter("EXCLUDE");
this.setReportPropsDirty(true);
},onRptKeep:function(){
this.updateInTableFilter("KEEP");
this.setReportPropsDirty(true);
},onRptDrillDown:function(){
this.updateInTableFilter("KEEP_AND_DRILL");
this.setReportPropsDirty(true);
},onRptShowAll:function(){
this.updateInTableFilter("SHOW_ALL");
this.setReportPropsDirty(true);
},onRptNonVisualTotal:function(){
this.reportDoc.setReportOption("useNonVisualTotals",(this.reportDoc.getReportOption("useNonVisualTotals")=="true")?"false":"true");
this.history.add(new cv.ReportState("actionNonVisual"));
this.refreshReport();
},onRptHideGrandTotal:function(){
var obj=this.currentSelection;
while(obj&&obj.tagName!="DIV"&&obj.id!="pivotTableColumnHeaderContainer"&&obj.id!="pivotTableRowHeaderContainer"){
obj=obj.parentNode;
}
if(!obj){
return;
}
if(obj.id=="pivotTableColumnHeaderContainer"){
this.reportDoc.setReportOption("showRowGrandTotal","false");
}else{
this.reportDoc.setReportOption("showColumnGrandTotal","false");
}
this.history.add(new cv.ReportState("actionHideGrandTotal"));
this.refreshReport();
},onNewReport:function(){
var _a7=this;
if(this.isDirty()){
return this.rptDlg.showConfirm("promptDirtyReport",null,{srcFunc:function(){
_a7.history.setSaved();
_a7.setReportPropsDirty(false);
_a7.onNewReport();
}});
}
this.reportDoc.initialize();
var _a8="editor?command=new&catalog="+this.catalog+"&cube="+this.cube;
dojo.lang.setTimeout(function(){
window.location=_a8;
},0);
},onNewReportArea:function(){
var _a9=this;
if(this.isDirty()){
return this.rptDlg.showConfirm("promptDirtyReport",null,{srcFunc:function(){
_a9.history.setSaved();
_a9.setReportPropsDirty(false);
_a9.onNewReportArea();
}});
}
window.location="./select_area.jsf";
},onResetColumnSize:function(){
this.columnDataFieldWidths=new Array();
this.rowFieldWidths=new Array();
this.reportHeaders.updateLayout();
this.isReportPropsDirty=true;
var _aa=new cv.ReportState("Reset Column Sizes");
_aa.resizeData={rowFieldWidths:this.rowFieldWidths.slice(0,this.rowFieldWidths.length),columnDataFieldWidths:this.columnDataFieldWidths.slice(0,this.columnDataFieldWidths.length)};
var _ab=this.history.isStateRefreshed();
this.history.add(_aa);
if(_ab){
this.history.setRefreshed(true);
}
},onReset:function(){
if(dojo.html.hasClass(dojo.byId("cmdResetBtn"),"disabled")){
return;
}
cv.util.goToURL(window.location);
},onShowRenameRpt:function(){
rptTooltip.showRenameRpt();
},onToggleReportPane:function(e){
var _ac;
if(dojo.lang.isObject(e)){
_ac=e.target;
while(!_ac.id){
_ac=_ac.parentNode;
}
_ac=_ac.id.substring(this.id.length);
}else{
_ac=e;
}
return this.manager.onToggleReportPane(_ac);
},hideTruncateMessage:function(e){
if(e.target.id=="closeRowTruncate"){
cv.util.hide(this.nodeRowTruncate);
this.closeTruncateStatus=="None"?this.closeTruncateStatus="RowClose":this.closeTruncateStatus="BothClose";
}else{
if(e.target.id=="closeColTruncate"){
cv.util.hide(this.nodeColTruncate);
this.closeTruncateStatus=="None"?this.closeTruncateStatus="ColClose":this.closeTruncateStatus="BothClose";
}
}
}});
dojo.declare("cv.ReportState",null,function(_ad,_ae){
if(_ad&&cvCatalog[_ad]){
_ad=cvCatalog[_ad];
}
this.action=(_ad&&_ae)?dojo.string.substituteParams(_ad,_ae):_ad;
},{resizeData:{},init:function(_af){
this.report=_af;
if(!this.reportXml){
this.reportXml=dojo.dom.innerXML(_af.reportDoc.getReportNode());
}
this.resizeData.rowFieldWidths=this.report.rowFieldWidths.slice(0,this.report.rowFieldWidths.length);
this.resizeData.columnDataFieldWidths=this.report.columnDataFieldWidths.slice(0,this.report.columnDataFieldWidths.length);
if(this.action!="Column Resize"){
_af.log(this.action);
}
},checkRefresh:function(){
if(cv.prefs.autoRefresh){
this.report.history.setRefreshed();
}else{
this.report.refreshReport();
}
},exec:function(_b0,_b1){
var doc=dojo.dom.createDocumentFromText(this.reportXml);
if(doc&&doc.documentElement){
if(this.report.manager.cmdUndo!=null&&this.report.manager.cmdUndo.title.indexOf("Column Resize")>-1&&_b1=="UNDO"){
this.report.reportHeaders.updateLayout(this.resizeData.index,-this.resizeData.dx,this.resizeData.colspan);
this.checkRefresh();
}else{
if(this.report.manager.cmdUndo!=null&&this.report.manager.cmdRedo.title.indexOf("Column Resize")>-1&&_b1=="REDO"){
this.report.reportHeaders.updateLayout(this.resizeData.index,this.resizeData.dx,this.resizeData.colspan);
this.checkRefresh();
}else{
if(this.report.manager.cmdUndo!=null&&(this.report.manager.cmdUndo.title.indexOf("Reset Column")>-1||this.report.manager.cmdRedo.title.indexOf("Reset Column")>-1)){
this.report.columnDataFieldWidths=this.resizeData.columnDataFieldWidths.slice(0,this.resizeData.columnDataFieldWidths.length);
this.report.rowFieldWidths=this.resizeData.rowFieldWidths.slice(0,this.resizeData.rowFieldWidths.length);
this.checkRefresh();
}else{
this.report.columnDataFieldWidths=this.resizeData.columnDataFieldWidths.slice(0,this.resizeData.columnDataFieldWidths.length);
this.report.rowFieldWidths=this.resizeData.rowFieldWidths.slice(0,this.resizeData.rowFieldWidths.length);
this.report.openReport(doc.documentElement,_b0);
}
}
}
}
},back:function(_b2){
if(this.report.manager.cmdUndo.title.indexOf("Column")<0){
this.report.log("UNDO");
}
this.exec(_b2,"UNDO");
},forward:function(_b3){
if(this.report.manager.cmdRedo.title.indexOf("Column")<0){
this.report.log("REDO");
}
this.exec(_b3,"REDO");
},copy:function(_b4){
this.reportXml=_b4.reportXml;
}});
dojo.extend(cv.Report,{appendGem:function(_b5){
if(!this.checkDuplicateGem(_b5)){
return false;
}
if(this._getGemsInHierarchy(_b5)){
return this.insertGemInHierarchy(_b5,"actionAdd");
}else{
return this.insertGem(_b5,cv.getFieldHelp().getDndType(_b5)=="V"?"measures":"rowAttributes","append","actionAdd");
}
},checkColumns:function(_b6){
if(this.reportDoc.getChildMembers("columnAttributes").length+_b6<=cv.prefs.maxColumnFields){
return true;
}
var _b7=(this.getReportFormat()=="PIVOT")?"PIVOT_FULL":this.reportDoc.getChartOption("chartType");
dojo.lang.setTimeout(this.rptDlg,"showError",500,["errorTooManyFields",cv.prefs.maxColumnFields,cvCatalog["dropZoneLabels_"+_b7+"_COL"]]);
return false;
},checkDuplicateGem:function(_b8){
var gem,_b9=this.gemList.getKeyList();
if(!_b9||_b9.length==0){
return true;
}
for(var x=0;x<_b9.length;++x){
var _ba=this.gemList.item(_b9[x]);
if(_b9[x]==_b8||(_ba.type==cvConst.TYPE_METRIC&&_ba.metricType=="VALUE"&&_ba.getFormula()==_b8)){
gem=_ba;
break;
}
}
if(gem){
this.rptDlg.showError(["errorDuplicateItemInReport",gem.getDisplayLabel()],"CV/Business_User/working_with_fields.html");
return false;
}
return true;
},checkGemHierarchy:function(_bb,_bc,_bd){
if(_bb=="rowAttributes"||_bb=="columnAttributes"){
var _be=_bc.getAttribute("formula");
var _bf=this.getFieldLabel(_bc);
var _c0=this._getGemsInHierarchy(_be);
if(!_c0||_c0[0].getZoneId()==_bb){
return true;
}
if(_bd){
var _c1="",_c2=[];
for(var x=0;x<_c0.length;++x){
if(x>0){
_c1+=", ";
}
_c1+=_c0[x].getDisplayLabel();
_c2.push(_c0[x]);
}
_c2.push(this.getGem(_be));
this.pendingAction={func:"moveHierarchy",params:{list:_c2,zoneId:_bb,refId:_bd.refId,pos:_bd.pos}};
this.rptDlg.showConfirm(["promptMoveFieldHierarchy",_bf,_c1],"CV/Business_User/working_with_fields.html#about_field_hierarchies",{srcObj:this,srcFunc:"moveHierarchy"});
}else{
this.rptDlg.showError(["errorBreakFieldHierarchy",_bf,_c0[0].domNode.title],"CV/Business_User/working_with_fields.html#about_field_hierarchies");
}
return false;
}
return true;
},clearGemList:function(){
this.currentSelection=null;
this.gemList.clear();
this.badFields=[];
this.badFilters=false;
},createGem:function(_c3){
if(_c3.gemType==cvConst.TYPE_METRIC&&_c3.metricType!="VALUE"&&_c3.metricType!="EXPRESSION"){
var _c4=this.getGem(_c3.formula);
if(_c4){
var _c5=_c4.xmlNode.selectSingleNode("cv:displayLabels/cv:displayLabel");
if(_c5&&_c5.getAttribute("label")){
_c3.label=dojo.string.substituteParams(cvCatalog["metric"+_c3.metricType],_c5.getAttribute("label"));
_c3.locale=_c5.getAttribute("locale");
}
}
}else{
if(_c3.zoneId=="measures"&&!_c3.metricType){
_c3.metricType="VALUE";
}
}
var _c6=this.reportDoc.createNode(_c3);
return this.createGemDomNode(_c6,_c3.zoneId);
},createGemDomNode:function(_c7,_c8){
var gem;
switch(cvConst.defaultGemTypes[_c8]){
case cvConst.TYPE_ATTRIBUTE:
gem=new cv.AttributeGem(_c7,this);
break;
case cvConst.TYPE_METRIC:
gem=new cv.MetricGem(_c7,this);
break;
case cvConst.TYPE_FILTER:
gem=new cv.FilterGem(_c7,this,false);
break;
default:
return null;
}
if(gem.bad){
return null;
}
if(_c8){
gem.setZone(_c8);
}
gem.createDomNode();
this.gemList.add(gem.getId(),gem);
return gem;
},createMetricFilterGem:function(){
var _c9=this.reportDoc.getMetricFilterNode();
if(!_c9){
return null;
}
var gem=new cv.FilterGem(_c9,this,true);
if(gem.bad){
return null;
}
gem.setZone("filters");
gem.createDomNode();
this.gemList.add(gem.getId(),gem);
return gem;
},createSpecialMetricGem:function(_ca){
_ca.gemType=cvConst.TYPE_METRIC;
var gem=this.createGem(_ca);
this.insertGem(gem,_ca.refGem,"after",null,true);
return gem;
},disableMetricGems:function(_cb){
var _cc=this.gemList.getKeyList();
if(!_cc||_cc.length==0){
return;
}
for(var x=0;x<_cc.length;++x){
var gem=this.gemList.item(_cc[x]);
if(gem.metricType){
gem.disable(_cb&&gem.isHideInChart());
}
}
},getFieldLabel:function(obj,_cd){
if(!obj){
return "";
}
var _ce=null,_cf=null;
if(dojo.lang.isString(obj)){
_ce=obj;
}else{
if(dojo.lang.isObject(obj)){
if(obj.id&&this.gemList.item(obj.id)){
_cf=this.gemList.item(obj.id).getDisplayLabel(true);
}else{
_ce=obj.getAttribute("formula");
}
}
}
if(!_cf){
if(!_ce){
return "";
}
var gem=this.getGem(_ce);
_cf=gem?gem.getDisplayLabel(true):cv.getFieldHelp().get(_ce,"displayLabel");
}
if(!_cf){
_cf=cv.util.parseMDXExpression(_ce,false);
}
return _cd?_cf:dojo.string.escape("html",_cf);
},getFieldLabelPlural:function(obj,_d0){
if(!obj){
return "";
}
var _d1=null,_d2=null;
if(dojo.lang.isString(obj)){
_d1=obj;
}else{
if(dojo.lang.isObject(obj)){
if(obj.id&&this.gemList.item(obj.id)){
_d2=this.gemList.item(obj.id).getDisplayLabelPlural(true);
}else{
_d1=obj.getAttribute("formula");
}
}
}
if(!_d2){
if(!_d1){
return "";
}
var gem=this.getGem(_d1);
_d2=gem?gem.getDisplayLabelPlural(true):cv.getFieldHelp().get(_d1,"displayLabelPlural");
}
return (!_d2||_d0)?_d2:dojo.string.escape("html",_d2);
},getGem:function(key,_d3){
if(!key){
return null;
}
if(dojo.lang.isString(key)){
if(this.gemList.contains(key)){
return this.gemList.item(key);
}
if(!_d3){
_d3="VALUE";
}
}else{
if(!key.xmlNode){
return null;
}
}
var _d4=this.gemList.getKeyList();
if(!_d4||_d4.length==0){
return null;
}
for(var x=0;x<_d4.length;++x){
var gem=this.gemList.item(_d4[x]);
if(gem&&((key.xmlNode&&gem.xmlNode==key.xmlNode)||(gem.getFormula()==key&&gem.metricType==_d3))){
return gem;
}
}
return null;
},getGemFromDomNode:function(_d5){
if(!_d5){
return null;
}
if(_d5.id){
var gem=this.getGem(_d5.id);
if(gem){
return gem;
}
}
if(_d5.getAttribute("type")=="measure"){
return this.getGem(_d5.getAttribute("formula"),_d5.getAttribute("metrictype"));
}else{
return this.getGem(_d5.getAttribute("formula"));
}
},_getGemsInHierarchy:function(_d6){
var _d7=cv.getFieldHelp().getHierarchy(_d6);
var _d8=[];
for(var x=0;_d7&&x<_d7.length;++x){
var id=_d7[x];
var _d9;
if(id!=_d6){
_d9=this.getGem(id);
if(_d9){
_d8.push(_d9);
}
}
}
return (_d8.length==0)?null:_d8;
},getSummaryFacet:function(_da,_db){
var gem=this.getGem(_da,_db);
return gem?gem.getMetricFacet():null;
},getTrendNumberOnAncestors:function(_dc){
var _dd=cv.getFieldHelp().getHierarchy(_dc);
if(!_dd){
return null;
}
for(var x=0;x<_dd.length;++x){
var id=_dd[x];
if(id==_dc){
break;
}
var _de=this.reportDoc.getNode("cv:report/cv:measures/cv:measure/cv:trendFacet[@trendAttributeFormula=\""+id+"\"]");
if(_de){
return {ancestor:id,trend:this.getGem({xmlNode:_de.parentNode})};
}
}
return null;
},updateMultiChartGemCSS:function(){
var _df=false;
if(this.reportDoc.getReportOption("reportTypeEnum")=="CHART"&&this.reportDoc.getChartOption("chartType")!="MULTIPLE_PIE"&&this.reportDoc.getChartOption("showMultiChart")=="true"){
_df=true;
}
var _e0=this.byId("rowAttributes").childNodes;
for(var i=0;i<_e0.length;++i){
if(i==0&&_df){
dojo.html.removeClass(_e0[i],"attributeItem");
dojo.html.addClass(_e0[i],"attributeMultiChartItem");
this.getGemFromDomNode(_e0[i]).cssClassHover="attributeMultiChartItemHover";
}else{
dojo.html.addClass(_e0[i],"attributeItem");
dojo.html.removeClass(_e0[i],"attributeMultiChartItem");
this.getGemFromDomNode(_e0[i]).cssClassHover="attributeItemHover";
}
}
var _e1=this.byId("columnAttributes").childNodes;
for(var i=0;i<_e1.length;++i){
dojo.html.removeClass(_e1[i],"attributeMultiChartItem");
dojo.html.addClass(_e1[i],"attributeItem");
this.getGemFromDomNode(_e1[i]).cssClassHover="attributeItemHover";
}
},insertGem:function(_e2,_e3,_e4,_e5,_e6){
var gem,_e7,_e8;
var _e9=dojo.lang.isObject(_e3)?_e3:this.getGem(_e3);
if(_e9){
_e7=_e9.getZoneId();
_e8=_e9.domNode;
}else{
_e7=_e3;
if(_e7.indexOf(this.id)==0){
_e7=_e7.substring(this.id.length);
}
_e8=this.byId(_e7);
_e9=this.reportDoc.getReportZoneNode(_e7);
}
gem=dojo.lang.isObject(_e2)?_e2:this.getGem(_e2);
if(!(gem&&gem.getZoneId()==_e7)&&_e7=="columnAttributes"&&!this.checkColumns(1)){
return null;
}
if(!gem){
gem=this.createGem({zoneId:_e7,formula:_e2});
}
var _ea=dojo.html.getElementsByClass("gemLabel",gem.zone);
var _eb=_ea.length-1;
if(_e4!="append"){
for(var i=0;i<_ea.length;++i){
if(dojo.dom.textContent(_e8)==dojo.dom.textContent(_ea[i])){
_eb=i;
break;
}
}
if(gem.metricType=="VALUE"){
this.updateReportResizeParams("add",_eb,_e4,"measure");
}else{
this.updateReportResizeParams("add",_eb,_e4);
}
}else{
if(gem.metricType=="VALUE"&&this.reportHeaders!=null&&this.reportHeaders.columnHeaderContainer.getElementsByTagName("COL").length>_ea.length){
this.updateReportResizeParams("add",_ea.length,"before","measure");
}
}
var ok=true;
if(_e4=="before"){
dojo.dom.insertBefore(gem.xmlNode,_e9.xmlNode);
ok=dojo.html.insertBefore(gem.domNode,_e8);
}else{
if(_e4=="after"){
dojo.dom.insertAfter(gem.xmlNode,_e9.xmlNode);
ok=dojo.html.insertAfter(gem.domNode,_e8);
}else{
if(_e4=="append"){
_e9.appendChild(gem.xmlNode);
if(_e8.innerHTML==cvCatalog["emptyDropZone"]){
_e8.innerHTML="";
}
_e8.appendChild(gem.domNode);
}
}
}
if(_e5){
this.history.add(new cv.ReportState(_e5,gem.getDisplayLabel(true)));
if(_e5=="actionAdd"){
this.addToCheckFieldList(gem.getFormula(),true);
}
}
this.resizeContainer();
if(!_e6){
this.refreshReport();
}
return gem;
},insertGemInHierarchy:function(_ec,_ed,_ee){
var _ef=cv.getFieldHelp().getHierarchy(_ec);
if(!_ef){
return null;
}
var _f0=null,_f1=null;
for(var x=0;x<_ef.length;++x){
var id=_ef[x];
if(id==_ec){
if(_f0){
_f1="after";
break;
}
_f1="before";
}else{
var gem=this.getGem(id);
if(gem){
_f0=gem;
if(_f0&&_f1){
break;
}
}
}
}
if(!_f0||!_f1){
return null;
}
return this.insertGem(_ec,_f0,_f1,_ed,_ee);
},moveHierarchy:function(){
if(!this.pendingAction||this.pendingAction.func!="moveHierarchy"){
return;
}
var _f2=this.pendingAction.params;
if(_f2.zoneId=="columnAttributes"&&!this.checkColumns(_f2.list.length)){
return;
}
for(var x=0;x<_f2.list.length;++x){
var gem=_f2.list[x];
var _f3=gem.getFormula();
var _f4=gem.getSortOrder();
this.removeGem(gem,true,null,true);
if(x==0){
gem=this.insertGem(_f3,_f2.refId,_f2.pos,null,true);
}else{
gem=this.insertGemInHierarchy(_f3,null,true);
}
if(gem){
gem.setSortOrder(_f4);
}
}
this.history.add(new cv.ReportState("actionMoveHierarchy"));
this.refreshReport();
},onMouseOverFilters:function(e){
var _f5=cv.util.getAncestorByClass(e.target,"filterItem");
if(!_f5||_f5!=this.currentSelection){
this._setFilterSelected(this.currentSelection,false);
this.currentSelection=_f5;
}
if(!_f5){
return;
}
this._setFilterSelected(_f5,true);
},removeFilter:function(_f6){
var reg=/^(filter_.+)_(\d)$/;
var _f7=reg.exec(_f6);
if(!_f7){
return false;
}
var gem=this.getGem(_f7[1]);
if(!gem){
return false;
}
if(gem.isNumeric){
cv.util.removeNode(this.reportDoc.getNode("cv:report/cv:filters/cv:filter/cv:conditions"));
cv.util.removeNode(this.reportDoc.getNode("cv:report/cv:filters/cv:filter/cv:topBottom"));
this.reportDoc.removeEmptyFilter(gem.xmlNode);
this.gemList.remove(gem.getId());
}else{
if(!this.reportDoc.removeFilterPredicate(gem.xmlNode,_f7[2])){
this.gemList.remove(gem.getId());
}
}
if(cv.dlgWidget&&cv.dlgWidget.isShowing()){
var _f8=_f7[1];
var _f9=this.getGem(_f8);
if(!_f9){
cv.dlgWidget.hide();
}else{
if(!this.rptDlg.load(this.getFieldLabel(_f8.substring(7)),dojo.string.escape("HTML",_f8.substring(7)))){
cv.dlgWidget.hide();
}
var _fa=this.rptDlg.byId("predicateList");
dojo.html.addClass(_fa,"unlocked");
dojo.html.addClass(_fa,"filterGroup");
dojo.dom.removeChildren(_fa);
_fa.innerHTML=_f9.createSummary(true);
}
}
this.populateFilters();
this.currentSelection=null;
if(gem.isNumeric){
this.history.add(new cv.ReportState("actionRemoveNumericFilter"));
}else{
this.history.add(new cv.ReportState("actionRemoveFilter",gem.getDisplayLabel(true)));
}
this.resizeContainer();
this.refreshReport();
},removeCurrentGem:function(_fb){
if(_fb){
this.currentSelection=this.getGemFromDomNode(_fb);
}
var sel=this.currentSelection;
if(!sel){
return;
}
if(!(sel instanceof cv.BaseGem)){
var id=sel.id;
if(id&&id.indexOf("filter_")==0){
this.removeFilter(id);
}
return;
}
var _fc=sel.getZoneId();
if(_fc=="rowAttributes"||_fc=="columnAttributes"){
var _fd=sel.getFormula();
var _fe=sel.getDisplayLabel();
var _ff=this.reportDoc.getNode("cv:report/cv:measures/cv:measure/cv:summaryFacet[@breakAttributeFormula='"+_fd+"']");
if(_ff){
_ff=this.getGem({xmlNode:_ff.parentNode});
if(_ff){
return this.rptDlg.showError(["errorUsedByMetric",_fe,_ff.getDisplayLabel()]);
}
}
if(this.reportDoc.isUsedByMetricFilter(_fd)){
return this.rptDlg.showConfirm(["promptUsedByFilter",_fe],"CV/Business_User/working_with_filters.html#numeric_filters_larger_than",{srcObj:this,srcFunc:"removeGem"});
}
var _100=this.reportDoc.getNode("cv:report/cv:measures/cv:measure/cv:trendFacet[@trendAttributeFormula=\""+_fd+"\"]");
if(_100){
_100=this.getGem({xmlNode:_100.parentNode});
}
var heir=cv.getFieldHelp().getHierarchy(_fd,false);
if(heir){
var _101=false;
for(var x=0,_102=false;x<heir.length;++x){
if(heir[x]==_fd){
_102=true;
}else{
if(_102){
if(this.getGem(heir[x])){
_101=true;
break;
}
}
}
}
if(_101){
_100=null;
}else{
if(!_100){
var _103=this.reportDoc.getMetrics("TREND");
if(_103.length>0){
var _104=dojo.lang.indexOf(heir,_fd);
for(var x=0;!_100&&x<_103.length;++x){
var attr=_103[x].selectSingleNode("cv:trendFacet").getAttribute("trendAttributeFormula");
var id=dojo.lang.indexOf(heir,attr);
if(id<0||id>_104){
continue;
}
_100=_103[x];
if(this.getGem("filter_"+_fd)){
return this.rptDlg.showError(["errorRemoveWithTrendOnAncestor",_fe,this.getFieldLabel(attr),this.getGem({xmlNode:_100}).getDisplayLabel()]);
}
for(var y=id;y<_104;++y){
if(this.getGem(heir[y])){
_100=null;
break;
}
}
}
}
if(_100){
return this.rptDlg.showError(["errorUsedByTrendMetric",_fe,this.getGem({xmlNode:_100}).getDisplayLabel()]);
}
}
}
}
if(_100){
return this.rptDlg.showError(["errorUsedByTrendMetric",_fe,_100.getDisplayLabel()]);
}
}else{
if(_fc=="measures"&&sel.metricType!="VALUE"){
var id=sel.getFormula();
var _ff=this.reportDoc.getFirstMetricDependent(id);
if(_ff){
_ff=this.getGem({xmlNode:_ff});
if(_ff){
return this.rptDlg.showError(["errorUsedByMetric",sel.getDisplayLabel(),_ff.getDisplayLabel()]);
}
}
if(this.reportDoc.isUsedByMetricFilter(id)){
return this.rptDlg.showConfirm(["promptUsedByFilter",sel.getDisplayLabel()],"CV/Business_User/working_with_filters.html#numeric_filters_larger_than",{srcObj:this,srcFunc:"removeGem"});
}
}
}
this.removeGem(sel,true,"actionRemove");
},removeGem:function(gem,_105,_106,_107){
if(gem&&!dojo.lang.has(gem,"getFormula")){
gem=this.currentSelection;
_106="actionRemove";
}
if(!gem){
return;
}
var _108=dojo.html.getElementsByClass("gemLabel",gem.zone);
for(var i=0;i<_108.length;++i){
if(dojo.dom.textContent(gem.domNode)==dojo.dom.textContent(_108[i])){
if(gem.metricType=="VALUE"){
this.updateReportResizeParams("remove",i,"","measure");
}else{
this.updateReportResizeParams("remove",i);
}
break;
}
}
if(!_105){
if(this.reportDoc.removeFromMetricFilter(gem.getFormula())){
this.populateFilters();
}
}
this.gemList.remove(gem.getId());
cv.util.removeNode(gem.xmlNode);
gem.zone.removeChild(gem.domNode);
if(gem.zone.innerHTML==""){
gem.zone.innerHTML=cvCatalog["emptyDropZone"];
}
this.currentSelection=null;
if(_106){
this.history.add(new cv.ReportState(_106,gem.getDisplayLabel(true)));
}
this.resizeContainer();
if(!_107){
this.refreshReport();
}
},removeCurrentProp:function(){
var name=this.currentSelection.getAttribute("name");
var _109=this.currentSelection.getAttribute("formula");
var gem=this.getGem(_109);
gem.removeProperty(name);
},_setFilterSelected:function(node,_10a){
if(_10a){
dojo.html.addClass(node,"filterItemMouseOver");
}else{
dojo.html.removeClass(node,"filterItemMouseOver");
}
},setSortOrder:function(gem,_10b,_10c,_10d){
if(gem&&dojo.lang.isString(gem)){
gem=this.getGem(gem);
}else{
if(!gem){
gem=this.currentSelection;
}
}
if(!gem){
return;
}
var _10e=gem.getZoneId()=="rowAttributes"&&gem.isLast();
if(_10b==gem.getSortOrder()&&!(_10e&&this.reportDoc.getSortedMetric())){
return;
}
gem.setSortOrder(_10b);
if(gem.metricType||_10e){
var _10f=this.gemList.getKeyList();
for(var x=0;_10f&&x<_10f.length;++x){
var agem=this.gemList.item(_10f[x]);
if(agem&&agem.metricType&&agem.getId()!=gem.getId()){
agem.setSortOrder("NONE");
}
}
}
if(_10c){
if(gem.metricType){
var rows=this.reportDoc.getChildMembers("rowAttributes");
this.history.add(new cv.ReportState("actionSort",gem.getDisplayLabel(true)));
if(rows.length>=2){
this.rptDlg.showWarning(["warnSortMetric",this.getFieldLabel(rows[rows.length-1]),gem.getDisplayLabel(),this.getFieldLabel(rows[rows.length-2])],null,null,null,null,this);
}else{
this.refreshReport();
}
}else{
this.history.add(new cv.ReportState("actionSort",gem.getDisplayLabel(true)));
this.refreshReport();
}
}
},sortMembers:function(a,b){
if(a==b){
return 0;
}
var aa=a.caption;
var bb=b.caption;
if(aa==bb){
return a>b?1:-1;
}
return aa>bb?1:-1;
},toggleFilterLock:function(){
if(!this.currentSelection){
return;
}
var gem=this.getGem(this.currentSelection.parentNode.id);
if(!gem){
return;
}
gem.setViewType(gem.isLocked()?"MULTIPLE":"NONE");
},toggleInReportPopupMenu:function(e){
var obj=e.target;
if(obj.className=="resize"){
obj=obj.parentNode;
}
while(obj&&obj.tagName!="TD"){
obj=obj.parentNode;
}
if(!obj){
return;
}
var type=obj.getAttribute("type");
var menu=cv.util.getDojoWidget(type+"PopMenu"),_110=false;
this.currentSelection=null;
switch(type){
case "measure":
case "attribute":
this.currentSelection=this.getGem(obj.getAttribute("formula"));
if(this.currentSelection!=null){
this.currentSelection.updatePopupMenu();
}
break;
case "prop":
this.currentSelection=obj;
break;
case "member":
this.currentSelection=obj;
var _111=this.currentSelection.getAttribute("member");
var _112=this.currentSelection.getAttribute("formula");
var _113=this.getGem("filter_"+_112);
var _114=_113&&_113.isLocked(true);
var _115=cv.getFieldHelp().getDirectChild(_112);
if(menu){
if(menu.domNode&&menu.domNode.memberId==_111){
break;
}
cv.util.disconnectPopupMenu(this,[{id:"PM:membEXCLUDE",handler:"onRptExclude"},{id:"PM:membKEEP",handler:"onRptKeep"},{id:"PM:membKEEP_AND_DRILL",handler:"onRptDrillDown"},{id:"PM:membSHOW_ALL",handler:"onRptShowAll"}]);
menu.destroyChildren();
}else{
menu=dojo.widget.createWidget("PopupMenu2",{id:"memberPopMenu"},null);
document.body.appendChild(menu.domNode);
}
menu.domNode.memberId=_111;
_111=dojo.dom.textContent(obj.firstChild);
if(_114){
var mi=dojo.widget.createWidget("MenuItem2",{id:"PM:membLocked",caption:dojo.string.substituteParams(cvCatalog.menuMembLocked,this.getFieldLabel(_112))});
menu.addChild(mi);
}else{
var mi=dojo.widget.createWidget("MenuItem2",{id:"PM:membEXCLUDE",caption:dojo.string.substituteParams(cvCatalog.menuMembEXCLUDE,_111)});
menu.addChild(mi);
dojo.event.connect(mi,"onClick",this,"onRptExclude");
mi=dojo.widget.createWidget("MenuItem2",{id:"PM:membKEEP",caption:dojo.string.substituteParams(cvCatalog.menuMembKEEP,_111)});
menu.addChild(mi);
dojo.event.connect(mi,"onClick",this,"onRptKeep");
if(_115){
mi=dojo.widget.createWidget("MenuItem2",{id:"PM:membKEEP_AND_DRILL",caption:dojo.string.substituteParams(cvCatalog.menuMembKEEP_AND_DRILL,_111,this.getFieldLabel(_115))});
menu.addChild(mi);
dojo.event.connect(mi,"onClick",this,"onRptDrillDown");
}
if(_113){
mi=dojo.widget.createWidget("MenuItem2",{id:"PM:membSHOW_ALL",caption:dojo.string.substituteParams(cvCatalog.menuMembSHOW_ALL,this.getFieldLabel(_112))});
menu.addChild(mi);
dojo.event.connect(mi,"onClick",this,"onRptShowAll");
}
}
_110=true;
break;
case "grandTotal":
this.currentSelection=obj;
cv.util.setMenuItem("PM:totalNonVisual",this.reportDoc.getReportOption("useNonVisualTotals")=="true"?"checked":"none",this.createPAA?"enabled":"disabled");
cv.util.updateMenuItemCaption("PM:totalHide",dojo.dom.getFirstAncestorByTag(obj,"TABLE").id=="ZONE_columnAttributes"?"menuHideGrandTotalRow":"menuHideGrandTotalCol");
break;
default:
return;
}
if(this.currentSelection!=null){
menu.open(e.clientX,e.clientY,this.currentSelection);
}
e.preventDefault();
e.stopPropagation();
},updateFilterProps:function(_116,pred,_117){
var _118=_116.predicates,_119=null;
if(pred.members){
pred.members.sort(this.sortMembers);
}
var _11a=_118.getKeyList();
if(pred.op=="CONTAIN"||pred.op=="NOT_CONTAIN"||((pred.op=="EQUAL"||pred.op=="NOT_EQUAL")&&!pred.preset)){
for(var i=0;i<_11a.length;++i){
var _11b=_118.item(_11a[i]);
for(var j=0;j<_11b.length;j++){
var pd=_11b[j];
if(pd.op!=pred.op||pd.preset){
continue;
}
if(pd.ordinal==pred.ordinal){
break;
}
if(!_117){
alert(dojo.string.substituteParams(cvCatalog.infoMergeFilter,cvCatalog["filterOpString_"+pred.op],this.getFieldLabel(_116.formula)));
}
if(pred.op=="CONTAIN"||pred.op=="NOT_CONTAIN"){
var expx=pd.exp,expy=pred.exp;
var lenx=expx.length,leny=expy.length;
for(var y=0;y<leny;++y){
for(var x=0;x<lenx;++x){
if(expy[y]==expx[x]){
break;
}
}
if(x>=lenx){
expx.push(expy[y]);
}
}
}else{
pd.members.sort(this.sortMembers);
var memx=pd.members,memy=pred.members;
var x=0,y=0,lenx=memx.length,leny=memy.length,mem=[],flag;
while(x<lenx||y<leny){
if(x>=lenx){
while(y<leny){
mem.push(memy[y++]);
}
}else{
if(y>=leny){
while(x<lenx){
mem.push(memx[x++]);
}
}else{
flag=this.sortMembers(memx[x],memy[y]);
if(flag==0){
mem.push(memx[x++]);
++y;
}else{
if(flag>0){
mem.push(memy[y++]);
}else{
mem.push(memx[x++]);
}
}
}
}
}
pd.members=mem;
}
_119=pd;
_119.ordinal=i+1;
break;
}
if(_119){
if(_118.contains(pred.ordinal)){
_118.remove(pred.ordinal);
}
break;
}
}
}
if(!_119){
_119=pred;
var ord=_119.ordinal;
if(!ord){
for(var x=0;x<_118.getKeyList().length;x++){
if(_118.getKeyList()[x]>ord){
ord=_118.getKeyList()[x];
}
}
ord=ord+1;
}
var _11c=[];
_11c.push(_119);
_118.add(ord,_11c);
}
return _119;
},updateRelativeFilterProps:function(_11d,_11e){
var ord=_11e[0].ordinal;
var _11f=_11d.predicates;
var _120=_11f.getKeyList();
if(!ord){
for(var x=0;x<_120.length;x++){
if(parseInt(_120[x])>=ord){
ord=parseInt(_120[x])+1;
}
}
}
for(var x=0;x<_11e.length;x++){
if(!_11e[x].ordinal){
_11e[x].ordinal=ord;
}else{
break;
}
}
var _121={"EQUAL":0,"TIME_YAGO":1,"TIME_RANGE_PREV":2,"TIME_RANGE_NEXT":3,"TIME_AGO":4,"TIME_AHEAD":5};
_11e.sort(function(a,b){
if(a.op==b.op){
return 0;
}
return _121[a.op]>_121[b.op]?1:-1;
});
_11f.add(ord,_11e);
},updateInTableFilter:function(type,_122,_123){
var _124;
var _125;
if(_122){
_124=_122.formula;
_125={"formula":_122.member,"caption":_122.caption};
}else{
_124=this.currentSelection.getAttribute("formula");
_125={"formula":this.currentSelection.getAttribute("member"),"caption":dojo.dom.textContent(this.currentSelection.firstChild)};
}
var _126=this.getGem("filter_"+_124);
var _127=null;
if(_126&&_126.isLocked(true)){
return;
}
if(type=="SHOW_ALL"){
if(!_126){
return;
}
cv.util.removeNode(_126.xmlNode.selectSingleNode("cv:predicates"));
if(_126.xmlNode.childNodes.length==0){
this.removeGem(_126,true);
}
_127=dojo.string.substituteParams(cvCatalog.actionSHOW_ALL,this.getFieldLabel(_124,true));
}else{
var _128=_125.caption;
var _129;
if(_126){
_129=this.reportDoc.getFilterProps(_126.xmlNode);
}else{
_129={formula:_124,viewFilterEnum:"MULTIPLE"};
}
switch(type){
case "EXCLUDE":
if(!_129.predicates){
var _12a=new dojo.collections.Dictionary();
var _12b=[];
_12b.push({ordinal:1,op:"NOT_EQUAL",members:[_125]});
_12a.add(1,_12b);
_129.predicates=_12a;
}else{
var _12c=_129.predicates.getKeyList();
var _12d=false;
var pred;
var _12e;
for(var x=0;x<_12c.length;x++){
var _12f=_129.predicates.item(_12c[x]);
for(var j=0;j<_12f.length;j++){
pred=_12f[j];
if(pred.ordinal>_12e){
_12e=pred.ordinal+1;
}
if(pred.op=="NOT_EQUAL"){
pred.members.push(_125);
_12d=true;
break;
}
}
if(_12d){
break;
}
}
if(!_12d){
var _12b=[];
_12a=_129.predicates;
var _130=_129.predicates.getKeyList().length+1;
_12b.push({ordinal:_12e,op:"NOT_EQUAL",members:[_125]});
_12a.add(_12e,_12b);
}else{
if(pred.members.length>cvConst.MAX_FILTER_MEMBERS){
this.rptDlg.showError(["errprFilterMaxMembers",cvConst.MAX_FILTER_MEMBERS]);
return;
}
}
}
_127=dojo.string.substituteParams(cvCatalog.actionEXCLUDE,_128);
break;
case "KEEP":
var _12a=new dojo.collections.Dictionary();
var _12b=[];
_12b.push({ordinal:1,op:"EQUAL",members:[_125]});
_12a.add(1,_12b);
_129.predicates=_12a;
_127=dojo.string.substituteParams(cvCatalog.actionKEEP,_128);
break;
case "KEEP_AND_DRILL":
var _131=cv.getFieldHelp().getDirectChild(_124);
if(_131){
var _12a=new dojo.collections.Dictionary();
var _12b=[];
_12b.push({ordinal:1,op:"EQUAL",members:[_125]});
_12a.add(1,_12b);
_129.predicates=_12a;
this.insertGemInHierarchy(_131,null,true);
_127=dojo.string.substituteParams(cvCatalog.actionKEEP_AND_DRILL,_128,this.getFieldLabel(_131,true));
}
break;
default:
return;
}
this.reportDoc.updateFilter(_129);
}
if(!_123){
this.history.add(new cv.ReportState(_127));
this.openReport();
}
return _127;
},validateField:function(_132){
if(_132.indexOf("[MEASURE:")==0){
return true;
}
var _133=cv.getFieldHelp().get(_132);
if(!_133||cv.getFieldHelp().isHidden(_133)){
var i,_134=this.getFieldLabel(_132);
for(i=0;i<this.badFields.length;++i){
if(this.badFields[i]==_134){
break;
}
}
if(i==this.badFields.length){
this.badFields.push(_134);
}
return false;
}
return true;
},autoRefresh:function(){
if(this.mode=="VIEW"||this.mode=="MINI"){
return true;
}
if(this.history.isEmpty()){
return true;
}
if(!cv.prefs.autoRefresh){
if(this.nodeReportArea.lastChild.className!="autoRefreshDirtyPane"){
cv.util.show(this.nodeReportRefresh);
var div=document.createElement("div");
div.className="autoRefreshDirtyPane";
this.nodeReportArea.appendChild(div);
var _135=dojo.byId(this.progressPaneId);
cv.util.hide(_135);
this.statusBar.innerHTML="";
}
if(this.history.isStateRefreshed()){
this.nodeReportArea.removeChild(this.nodeReportArea.lastChild);
cv.util.hide(this.nodeReportRefresh);
}
}
return cv.prefs.autoRefresh;
},clickChart:function(_136){
for(var x=0;x<_136.length;x++){
var obj=_136[x];
if(obj.action=="KEEP"){
this.updateInTableFilter("KEEP",obj,true);
}else{
this.updateInTableFilter("KEEP_AND_DRILL",obj,true);
this.removeGem(this.getGem(obj.formula),null,null,true);
}
}
this.history.add(new cv.ReportState("Click on Chart"));
this.openReport();
}});
dojo.declare("cv.BaseGem",null,function(_137,_138){
this.report=_138;
},{type:null,htmlTemplate:null,commonCssClass:"dropZoneItem",cssClass:null,cssClassHover:null,popMenu:null,label:null,xmlNode:null,domNode:null,zone:null,getFormula:function(){
return this.xmlNode.getAttribute("formula");
},getUniqueId:function(){
return this.getFormula();
},getId:function(){
return this.domNode.id;
},getXmlAttributes:function(){
return this.xmlNode.attributes;
},getTagName:function(){
return this.xmlNode.tagName;
},getZoneId:function(){
return this.zone.id.substring(this.report.id.length);
},getName:function(_139){
var _13a=cv.getFieldHelp().get(this.getFormula(),"displayLabel");
if(!_13a){
return "";
}
return _139?_13a:dojo.string.escape("html",_13a);
},getNamePlural:function(_13b){
var _13c=cv.getFieldHelp().get(this.getFormula(),"displayLabelPlural");
if(!_13c){
return "";
}
return _13b?_13c:dojo.string.escape("html",_13c);
},getDisplayLabel:function(_13d,_13e){
var node=_13e?this.xmlNode.selectSingleNode("cv:displayLabels/cv:displayLabel[locale='"+_13e+"']"):this.xmlNode.selectSingleNode("cv:displayLabels/cv:displayLabel");
var _13f=(node&&node.getAttribute("label"))?node.getAttribute("label"):this.getName(true);
if(!_13f){
return "";
}
return _13d?_13f:dojo.string.escape("html",_13f);
},getDisplayLabelPlural:function(_140,_141){
var node=_141?this.xmlNode.selectSingleNode("cv:displayLabels/cv:displayLabel[locale='"+_141+"']"):this.xmlNode.selectSingleNode("cv:displayLabels/cv:displayLabel");
var _142=(node&&node.getAttribute("labelPlural"))?node.getAttribute("labelPlural"):this.getNamePlural(true);
if(!_142){
return "";
}
return _140?_142:dojo.string.escape("html",_142);
},setDisplayLabel:function(_143,_144,_145){
this.report.reportDoc.updateDisplayLabel(this.xmlNode,_143,_144,_145);
this.updateDomNode();
},getCalculateSubtotalsUsingFormula:function(){
return this.xmlNode.getAttribute("calculateSubtotalsUsingFormula");
},setCalculateSubtotalsUsingFormula:function(_146){
this.report.reportDoc.updateCalculateSubtotalsUsingFormula(_146,this.xmlNode);
},isLast:function(){
var _147=this.xmlNode.parentNode.selectNodes("cv:"+this.xmlNode.tagName);
return _147[_147.length-1]==this.xmlNode;
},setXmlNode:function(_148){
this.xmlNode=_148;
if(_148.parentNode){
this.zone=this.report.byId(_148.parentNode.tagName);
}
},setSortOrder:function(_149){
this.xmlNode.setAttribute("sortOrderEnum",(_149=="ASC"||_149=="DESC")?_149:"NONE");
},getSortOrder:function(){
return this.xmlNode.getAttribute("sortOrderEnum");
},setZone:function(zone){
this.zone=dojo.lang.isString(zone)?this.report.byId(zone):zone;
},createDomNode:function(){
var node=document.createElement("div");
node.setAttribute("formula",this.getFormula());
node.id=this.getUniqueId();
dojo.html.addClass(node,this.commonCssClass);
dojo.html.addClass(node,this.cssClass);
dojo.event.connect(node,"oncontextmenu",this,"onContextMenu");
dojo.event.connect(node,"onmouseover",this,"onMouseOver");
dojo.event.connect(node,"onmouseout",this,"onMouseOut");
dojo.event.connect(node,"onclick",this,"onClick");
dojo.event.connect(node,"ondblclick",this.report,"showEditDialogOnColumnHeader");
this.domNode=node;
this.updateDomNode();
},destroy:function(){
dojo.event.disconnect(this.domNode,"oncontextmenu",this,"onContextMenu");
dojo.event.disconnect(this.domNode,"onmouseover",this,"onMouseOver");
dojo.event.disconnect(this.domNode,"onmouseout",this,"onMouseOut");
dojo.event.disconnect(this.domNode,"onclick",this,"onClick");
dojo.event.disconnect(node,"ondblclick",this.report,"showEditDialogOnColumnHeader");
this.domNode=null;
},update:function(){
},updateDomNode:function(){
var _14a=this.getDisplayLabel(true);
if(!_14a){
this.domNode.innerHTML=cvCatalog.missingFieldLabel;
return this.report.rptDlg.showError(["errorOutdatedReport",this.getFormula()]);
}
this.domNode.setAttribute("title",_14a);
this.domNode.innerHTML=dojo.string.substituteParams(this.htmlTemplate,dojo.string.escape("html",dojo.string.summary(_14a,16)));
},onContextMenu:function(e){
this.report.currentSelection=this;
var menu=cv.util.getDojoWidget(this.popMenu);
if(!menu){
return;
}
this.updatePopupMenu();
menu.open(e.clientX,e.clientY,this);
e.preventDefault();
e.stopPropagation();
},onMouseOver:function(e){
if(this.cssClassHover){
dojo.html.addClass(this.domNode,this.cssClassHover);
}
},onMouseOut:function(e){
if(this.cssClassHover){
dojo.html.removeClass(this.domNode,this.cssClassHover);
}
},onClick:function(e){
if(dojo.widget.PopupManager.currentMenu){
dojo.widget.PopupManager.currentMenu.close();
}
},updatePopupMenu:function(){
}});
currentGem=null;
dojo.declare("cv.AttributeGem",cv.BaseGem,function(_14b,_14c){
this.bad=!this.report.validateField(_14b.getAttribute("formula"));
if(this.bad){
cv.util.removeNode(_14b);
}else{
this.setXmlNode(_14b);
}
},{type:cvConst.TYPE_ATTRIBUTE,htmlTemplate:"<div class='gemLabel'>%{0}</div>",cssClass:"attributeItem",cssClassHover:"attributeItemHover",popMenu:"attributePopMenu",dndType:null,setZone:function(zone){
this.zone=dojo.lang.isString(zone)?this.report.byId(zone):zone;
if(this.domNode){
this.domNode.dndObj.type=this.dndType+this.report.dropTargets[this.getZoneId()].dndSuffix;
}
},createDomNode:function(){
cv.BaseGem.prototype.createDomNode.call(this);
this.dndType=cv.getFieldHelp().getDndType(this.getFormula());
this.domNode.dndObj=new dojo.dnd.HtmlDragSource(this.domNode,this.dndType+this.report.dropTargets[this.getZoneId()].dndSuffix);
},updatePopupMenu:function(){
var _14d=this.getSortOrder();
var _14e=this.getFormula();
if(this.report.reportDoc.getSortedMetric()&&this.getZoneId()=="rowAttributes"&&this.isLast()){
_14d="NONE";
}
var _14f=this.report.getGem("filter_"+_14e);
cv.util.setMenuItem("PM:attrFilter",_14f?"checked":"none",_14f&&_14f.isLocked(true)?"disabled":"enabled");
cv.util.setMenuItem("PM:attrFilterRank",this.report.reportDoc.isUsedByMetricFilter(_14e,"RANK")?"checked":"none");
cv.util.setMenuItem("PM:attrSortAZ",_14d=="ASC"?"checked":"none");
cv.util.setMenuItem("PM:attrSortZA",_14d=="DESC"?"checked":"none");
var _150=!this.isLast();
cv.util.setMenuItem("PM:attrShowSub",_150&&this.xmlNode.getAttribute("showSubtotal")=="true"?"checked":"none",_150?"enabled":"disabled");
this._createHierarchyMenu();
this._createPropertiesMenu();
},_createHierarchyMenu:function(){
var _151=this.getFormula();
var heir=cv.getFieldHelp().getHierarchy(_151);
if(!heir||heir.length<=1){
cv.util.getDojoWidget("PM:addHier").setDisabled(true);
return;
}else{
cv.util.getDojoWidget("PM:addHier").setDisabled(false);
}
var _152=this.getZoneId();
var menu=dojo.widget.byId("hierarchyPopMenu");
if(menu){
menu.destroy();
}
menu=dojo.widget.createWidget("PopupMenu2",{id:"hierarchyPopMenu"},null);
for(var x=0;x<heir.length;++x){
var form=heir[x];
var disp=this.report.getFieldLabel(form);
if(!form||!disp){
continue;
}
var _153=(form==_151);
var mi;
if(form==_151){
mi=dojo.widget.createWidget("MenuItem2",{id:"HierPop:"+form,caption:disp,disabled:true});
}else{
if(this.report.getGem(form)){
mi=dojo.widget.createWidget("MenuItem2",{id:"HierPop:"+form,caption:disp,iconSrc:cv.contextPath+"images/checkmark.png"});
}else{
mi=dojo.widget.createWidget("MenuItem2",{id:"HierPop:"+form,caption:disp});
eval("mi.onClick = function() { cv.getActiveReport().insertGemInHierarchy('"+form+"','actionAdd'); }");
}
}
menu.addChild(mi);
}
document.body.appendChild(menu.domNode);
},_createPropertiesMenu:function(){
var _154=this.getFormula();
var _155=cv.getFieldHelp().getProperties(_154);
if(!_155||_155.length<1){
cv.util.getDojoWidget("PM:addProp").setDisabled(true);
return;
}else{
cv.util.getDojoWidget("PM:addProp").setDisabled(false);
}
var menu=dojo.widget.byId("propertiesPopMenu");
if(menu){
menu.destroy();
}
menu=dojo.widget.createWidget("PopupMenu2",{id:"propertiesPopMenu"},null);
currentGem=this;
var mi=dojo.widget.createWidget("MenuItem2",{id:"PropPop:AllMemberProps",caption:cvCatalog["memberPropertiesAddProps"]});
eval("mi.onClick = function() { currentGem.addAllProperties(); }");
menu.addChild(mi);
mi=dojo.widget.createWidget("MenuSeparator2");
menu.addChild(mi);
var _156=this.getProperties();
for(var x=0;x<_155.length;++x){
var prop=_155[x];
if(_156[prop]){
mi=dojo.widget.createWidget("MenuItem2",{id:"PropPop:"+prop,caption:prop,iconSrc:cv.contextPath+"images/checkmark.png"});
eval("mi.onClick = function() { currentGem.removeProperty('"+prop+"'); }");
}else{
mi=dojo.widget.createWidget("MenuItem2",{id:"PropPop:"+prop,caption:prop});
eval("mi.onClick = function() { currentGem.addProperty('"+prop+"'); }");
}
menu.addChild(mi);
}
},getProperties:function(){
var _157=this.xmlNode.selectNodes("cv:property");
var map={};
for(var x=0;x<_157.length;++x){
var name=_157[x].getAttribute("name");
map[name]=name;
}
return map;
},addProperty:function(name){
var _158=this.getProperties();
if(_158[name]){
return;
}
this.report.reportDoc.addMemberProperty(this.xmlNode,name);
this.report.history.add(new cv.ReportState("actionAdd",name));
this.report.refreshReport();
},addAllProperties:function(){
var _159=cv.getFieldHelp().getProperties(this.getFormula());
var _15a=this.getProperties();
var _15b=false;
for(var x=0;x<_159.length;++x){
var prop=_159[x];
if(_15a[prop]){
continue;
}
_15b=true;
this.report.reportDoc.addMemberProperty(this.xmlNode,prop);
}
if(_15b){
this.report.history.add(new cv.ReportState("actionAdd",cvCatalog["memberPropertiesAddProps"]));
this.report.refreshReport();
}
},removeProperty:function(name){
var node=this.xmlNode.selectSingleNode("cv:property[@name='"+name+"']");
if(!node){
return;
}
cv.util.removeNode(node);
this.report.history.add(new cv.ReportState("actionRemove",name));
this.report.refreshReport();
},getLink:function(){
return this.xmlNode.selectSingleNode("cv:link");
},setLink:function(_15c,_15d){
var node=this.xmlNode.selectSingleNode("cv:link");
if(node){
cv.util.removeNode(node);
}
this.report.reportDoc.addLink(this.xmlNode,_15c,_15d);
},removeLink:function(){
var node=this.xmlNode.selectSingleNode("cv:link");
if(node){
cv.util.removeNode(node);
}
}});
dojo.declare("cv.MetricGem",cv.BaseGem,function(_15e,_15f){
var _160=_15e.getAttribute("formula");
this.bad=_160?!this.report.validateField(_160):false;
if(!this.bad){
this.metricType=_15e.getAttribute("measureTypeEnum");
if(this.isSummaryMetric()){
var _161=_15e.selectSingleNode("cv:summaryFacet");
if(!_161||(_161.getAttribute("summaryAcrossEnum")=="LABEL"&&!this.report.validateField(_161.getAttribute("breakAttributeFormula")))){
this.bad=true;
}
}else{
if(this.metricType=="EXPRESSION"){
var _162=_15e.selectSingleNode("cv:expression");
if(!_162){
this.bad=true;
}else{
var _163=cv.textContent(_162).match(/\[Measures\]\.\[[^\]]+\]/g);
if(_163){
for(var i=0;i<_163.length;++i){
if(!this.report.validateField(_163[i])){
this.bad=true;
break;
}
}
}
}
}else{
if(this.metricType=="TREND"){
var _164=_15e.selectSingleNode("cv:trendFacet");
if(!_164||!this.report.validateField(_164.getAttribute("trendAttributeFormula"))){
this.bad=true;
}
}
}
}
}
if(this.bad){
cv.util.removeNode(_15e);
}else{
this.id=_15e.getAttribute("id");
if(!this.id){
this.id=this.report.reportDoc.getNextMetricId();
_15e.setAttribute("id",this.id);
}
this.setXmlNode(_15e);
}
},{type:cvConst.TYPE_METRIC,htmlTemplate:"<div class='gemLabel'>%{0}</div>",cssClass:"metricItem",cssClassHover:"metricItemHover",popMenuOrigin:"measurePopMenu",id:null,metricType:null,createDomNode:function(){
cv.BaseGem.prototype.createDomNode.call(this);
this.disable(this.report.getReportFormat()=="CHART"&&this.isHideInChart());
this.domNode.dndObj=new dojo.dnd.HtmlDragSource(this.domNode,"VM");
this.domNode.setAttribute("metrictype",this.metricType);
this.popMenu="measurePopMenu";
},getFormula:function(){
return (this.metricType=="VALUE"?this.xmlNode.getAttribute("formula"):this.id);
},getBaseFieldFormula:function(){
return (this.metricType=="EXPRESSION"?null:this.xmlNode.getAttribute("formula"));
},getId:function(){
return this.id;
},getUniqueId:function(){
return this.id;
},getDisplayLabel:function(_165,_166){
if(this.metricType=="VALUE"){
return cv.BaseGem.prototype.getDisplayLabel.call(this,_165,_166);
}
var node=this.xmlNode.selectSingleNode(_166?"cv:displayLabels/cv:displayLabel[locale='"+_166+"']":"cv:displayLabels/cv:displayLabel");
if(node&&node.getAttribute("label")){
return node.getAttribute("label");
}
var name;
if(this.metricType=="EXPRESSION"){
name=this.id;
}else{
name=cv.getFieldHelp().get(this.xmlNode.getAttribute("formula"),"displayLabel",!_165);
if(!name){
name=cvCatalog.missingFieldLabel;
}
}
return dojo.string.substituteParams(cvCatalog["metric"+this.metricType],name);
},update:function(_167){
if(this.isSummaryMetric()){
var _168=this.xmlNode.selectSingleNode("cv:summaryFacet");
if(!_168){
return false;
}
_168.setAttribute("summaryAcrossEnum",_167.sumAcross);
_168.setAttribute("useNonVisualTotals",_167.sumTotal);
if(_167.sumAcross=="LABEL"){
_168.setAttribute("breakAttributeFormula",_167.sumBreakBy);
}else{
_168.removeAttribute("breakAttributeFormula");
}
}else{
if(this.metricType=="EXPRESSION"){
cv.textContent(this.getMetricFacet(),_167.expression);
}else{
if(this.metricType=="TREND"){
var _169=this.getMetricFacet();
_169.setAttribute("trendTypeEnum",_167.trendType);
_169.setAttribute("amount",_167.trendAmount);
_169.setAttribute("trendDirectionEnum",_167.trendDir);
_169.setAttribute("trendAttributeFormula",_167.trendField);
}
}
}
if(_167.label){
this.report.reportDoc.updateDisplayLabel(this.xmlNode,_167.label);
}
if(_167.numberFormat){
this.setNumberFormat(_167.numberFormat);
}
this.updateDomNode();
},updatePopupMenu:function(){
var _16a=this.getSortOrder();
var _16b=this.getFormula();
cv.util.setMenuItem("PM:measSortLowHi",_16a=="ASC"?"checked":"none");
cv.util.setMenuItem("PM:measSortHiLow",_16a=="DESC"?"checked":"none");
cv.util.setMenuItem("PM:measFilterCond",this.report.reportDoc.isUsedByMetricFilter(_16b,"CONDITIONS")?"checked":"none");
cv.util.setMenuItem("PM:measFilterRank",this.report.reportDoc.isUsedByMetricFilter(_16b,"RANK")?"checked":"none");
cv.util.setMenuItem("PM:helpMetric",null,(this.metricType=="VALUE"?"enabled":"disabled"));
cv.util.updateMenuItemCaption("PM:inChartHideMetric",this.isHideInChart()?"menuShowOnChart":"menuHideFromChart");
cv.util.getDojoWidget("newNumberMenu");
cv.util.displayWidget("PM:editMeasureSummary",this.isSummaryMetric());
cv.util.displayWidget("PM:editMeasureArith",this.metricType=="EXPRESSION");
cv.util.displayWidget("PM:editMeasureTrend",this.metricType=="TREND");
cv.util.displayWidget("menuSeparator",this.isSummaryMetric()||this.metricType=="TREND"||this.metricType=="EXPRESSION");
cv.util.getDojoWidget("condFormatMenu");
var _16c=this.getNumberFormat();
var _16d=["COLOR_SCALE_G_Y_R","COLOR_SCALE_R_Y_G","COLOR_SCALE_B_Y_R","COLOR_SCALE_R_Y_B","DATA_BAR_RED","DATA_BAR_GREEN","DATA_BAR_BLUE","TREND_ARROW_GR","TREND_ARROW_RG"];
var x;
for(x in _16d){
this._initCondFormatPopupMenu(_16d[x],_16c.formatShortcut);
}
},_initCondFormatPopupMenu:function(_16e,_16f){
var mi=cv.util.getDojoWidget("PM:condFormat_"+_16e);
eval("mi.onClick = function() { cv.getActiveReport().onGemConditionalFormatting('"+_16e+"'); }");
cv.util.setMenuItem("PM:condFormat_"+_16e,_16f==_16e?"checked":"none");
},getNumberFormat:function(){
var _170=this.report.reportDoc.getNumberFormat(this.xmlNode);
if(!_170){
if(this.metricType=="VALUE"){
_170=cv.getFieldHelp().get(this.xmlNode.getAttribute("formula"),"format");
}else{
if(this.metricType=="PCTOF"||this.metricType=="PCTRSUM"){
_170={formatCategory:"Percentage (%)",formatScale:"2"};
}else{
_170={formatCategory:"General Number",formatScale:"0"};
}
}
_170.formatExpression="";
_170.formatShortcut="NONE";
}
return _170;
},setNumberFormat:function(_171){
this.report.reportDoc.setNumberFormat(this.xmlNode,_171);
},isSummaryMetric:function(){
return dojo.lang.inArray(["PCTOF","RSUM","PCTRSUM","RANK"],this.metricType);
},getMetricFacet:function(){
if(this.isSummaryMetric()){
return this.xmlNode.selectSingleNode("cv:summaryFacet");
}else{
if(this.metricType=="TREND"){
return this.xmlNode.selectSingleNode("cv:trendFacet");
}else{
if(this.metricType=="EXPRESSION"){
return this.xmlNode.selectSingleNode("cv:expression");
}
}
}
return null;
},isHideInChart:function(){
return this.xmlNode.getAttribute("hideInChart")=="true";
},disable:function(flag){
if(flag){
dojo.html.addClass(this.domNode,"metricDisabled");
this.popMenu="measureDisabledPopMenu";
}else{
dojo.html.removeClass(this.domNode,"metricDisabled");
this.popMenu=this.popMenuOrigin;
}
}});
dojo.declare("cv.FilterGem",cv.BaseGem,function(_172,_173,_174){
this.isNumeric=_174;
this.bad=!_173.validateField(_172.getAttribute("formula"));
if(!this.bad){
if(this.isNumeric){
var node,_175=_172.selectNodes("cv:conditions/cv:condition");
var len=_175.length;
for(var i=0;_175&&i<_175.length;++i){
node=_175[i];
if(!_173.validateField(node.getAttribute("formula"))){
cv.util.removeNode(node);
--len;
}
}
if(len==0&&_175.length>0){
_172.removeChild(_172.selectSingleNode("cv:conditions"));
}
node=_172.selectSingleNode("cv:topBottom");
if(node&&!_173.validateField(node.getAttribute("formula"))){
_172.removeChild(node);
node=null;
}
if(!node&&len==0){
this.bad=true;
}
}else{
var _175=_172.selectNodes("cv:predicates/cv:predicate");
if(!_175||_175.length==0){
this.bad=true;
}
var _176=cv.getFieldHelp().isTimeAttribute(_172.getAttribute("formula"));
for(var x=0;x<_175.length;++x){
var op=_175[x].getAttribute("operatorEnum");
var _177=_175[x].getAttribute("preset");
if((_176&&(op=="CONTAIN"||op=="NOT_CONTAIN"))||(!_176&&(_177||op=="BETWEEN"||op=="BEFORE"||op=="AFTER"))){
this.bad=true;
}
}
if(this.bad){
_173.badFilters=true;
}
}
}
if(this.bad){
cv.util.removeNode(_172);
}else{
this.setXmlNode(_172);
}
},{type:cvConst.TYPE_FILTER,htmlTemplate:cvCatalog.filterTemplate,cssClass:"filterItem",cssClassHover:null,popMenu:"filterPopMenu",itemCount:0,getUniqueId:function(){
return "filter_"+(this.isNumeric?"metric":this.getFormula());
},createDomNode:function(){
this.domNode=dojo.html.createNodesFromText(this.htmlTemplate)[0];
this.domNode.id=this.getUniqueId();
this.domNode.setAttribute("formula",this.getFormula());
this.updateDomNode();
dojo.event.connect(this.domNode,"oncontextmenu",this,"onContextMenu");
},updateDomNode:function(){
var _178=this.isLocked(true);
var _179=dojo.html.createNodesFromText(this.createSummary());
if(_179&&_179.length>0){
var dnd=cvConst.dndTypes["filters"];
for(var x=0;x<_179.length;++x){
var node=_179[x];
if(!_178&&node.id&&dojo.html.hasClass(node,this.cssClass)){
node.dndObj=new dojo.dnd.HtmlDragSource(node,dnd);
}
this.domNode.appendChild(node);
}
}
if(_178){
this.domNode.title="";
dojo.html.addClass(this.domNode,"lockedForUser");
}else{
if(this.isLocked()){
dojo.html.removeClass(this.domNode,"unlocked");
}else{
dojo.html.addClass(this.domNode,"unlocked");
}
}
},onContextMenu:function(e){
if(!this.report.currentSelection){
return;
}
var menu=cv.util.getDojoWidget(this.popMenu);
if(!menu){
return;
}
this.updatePopupMenu();
menu.open(e.clientX,e.clientY,this);
e.preventDefault();
e.stopPropagation();
},updatePopupMenu:function(){
var _17a=this.report.getFieldLabel(this.getFormula());
cv.util.updateMenuItemCaption("PM:toggleFilterLock",this.isLocked()?"menuFilterUnlock":"menuFilterLock",_17a);
cv.util.updateMenuItemCaption("PM:addFilter","menuAddFilter",_17a);
var _17b=this.isLocked(true);
cv.util.setMenuItem("PM:editFilter",null,_17b?"disabled":"enabled");
cv.util.setMenuItem("PM:removeFilter",null,_17b?"disabled":"enabled");
cv.util.setMenuItem("PM:addFilter",null,_17b?"disabled":"enabled");
cv.util.setMenuItem("PM:toggleFilterLock",null,this.report.createPAA?"enabled":"disabled");
if(!_17b){
cv.util.setMenuItem("PM:removeFilter",null,this.report.currentSelection.id?"enabled":"disabled");
}
},getViewType:function(){
return this.xmlNode.getAttribute("viewFilterEnum");
},setViewType:function(type){
this.xmlNode.setAttribute("viewFilterEnum",type);
if(type!="NONE"){
dojo.html.addClass(this.domNode,"unlocked");
}else{
dojo.html.removeClass(this.domNode,"unlocked");
}
},isLocked:function(_17c){
return !(_17c&&this.report.createPAA)&&!this.isNumeric&&this.getViewType()=="NONE";
},createSummary:function(_17d){
var str="",attr=this.report.getFieldLabel(this.getFormula());
if(this.isNumeric){
this.itemCount=1;
var node,_17e=this.xmlNode.selectNodes("cv:conditions/cv:condition");
for(var i=0;_17e&&i<_17e.length;++i){
node=_17e[i];
str+="<div class='filterItemList'>"+dojo.string.substituteParams(cvCatalog["filterSummMetric"+node.getAttribute("operator")],{METRIC:this.report.getFieldLabel(node.getAttribute("formula")),OP1:node.getAttribute("op1"),OP2:node.getAttribute("op2"),ATTR:attr})+"</div>";
}
node=this.xmlNode.selectSingleNode("cv:topBottom");
if(node){
str+="<div class='filterItemList'>"+dojo.string.substituteParams(cvCatalog["filterSummMetric"+node.getAttribute("type")],{METRIC:this.report.getFieldLabel(node.getAttribute("formula")),COUNT:node.getAttribute("count"),ATTR:attr})+"</div>";
}
if(this.isNumeric){
str=dojo.string.substituteParams(cvCatalog.filterTemplateMetric,this.getFormula(),str);
}
}else{
var _17e=this.xmlNode.selectNodes("cv:predicates/cv:predicate");
var _17f=new dojo.collections.Dictionary();
var _180;
for(var x=0;x<_17e.length;++x){
var _181=this._createPredicateSummary(_17e[x]).split("`");
_180=_17e[x].getAttribute("ordinal");
if(_17f.contains(_180)){
for(var i=0;i<_181.length;++i){
_17f.item(_180).labels.push(_181[i]);
}
}else{
_17f.add(_180,{operatorEnum:_17e[x].getAttribute("operatorEnum"),labels:_181});
}
}
var _182=_17f.getKeyList();
var _183=_182.length;
this.itemCount=_183;
if(_17e.length==0){
return cvCatalog.filterTemplateNone;
}
if(!_17d&&_183>1){
str+=dojo.string.substituteParams(cvCatalog.filterTemplateMultiLine,attr);
}
for(var x=0;x<_182.length;x++){
var _184="";
var _185=_17f.item(_182[x]).labels;
for(var j=0;j<_185.length;j++){
if(j>0){
if(j==_185.length-1){
if(_184.indexOf("<a")>-1){
_184+=", "+_185[j].replace("includes","");
}else{
var _186=_17f.item(_182[x]).operatorEnum;
var _187=" and ";
if(_186=="NOT_CONTAIN"||_186=="CONTAIN"){
_187=" or ";
}
_184+=_187+_185[j].replace("includes","");
}
}else{
_184+=", "+_185[j].replace("includes","");
}
}else{
_184=_185[j];
}
}
if(!_17d&&_183==1){
str+=dojo.string.substituteParams(cvCatalog.filterTemplateSingleLine,this.getFormula(),"filter_"+this.getFormula()+"_"+_182[x],attr,_184);
}else{
str+=dojo.string.substituteParams(cvCatalog.filterTemplateAttr,this.getFormula(),"filter_"+this.getFormula()+"_"+_182[x],_184);
}
}
}
return str;
},_createPredicateSummary:function(node){
var val="",val1="",op=node.getAttribute("operatorEnum");
var mems=node.selectNodes("cv:member");
var help=cv.getFieldHelp().get(this.getFormula());
var _188;
for(var y=0;mems.length>0&&y<mems.length;++y){
var _189=mems[y].getAttribute("formula");
if(!_189){
if(y>0){
_188+=","+mems[y].getAttribute("pos");
}else{
_188=mems[y].getAttribute("pos");
}
}
}
switch(op){
case "EQUAL":
case "NOT_EQUAL":
if(_188){
if(!help){
return "ERROR";
}
var _18a=cv.getFieldHelp().get(help,"type");
var apos=_188.split(",");
for(var x=0;x<apos.length;++x){
if(x>0){
val+="`";
}
if(_18a=="TIME_DATE"){
val+=cvCatalog["filterPreset"+cv.getFieldHelp().get(help,"type")+"_"+apos[x].replace(",","a").replace("-","n")];
}else{
val+=cvCatalog["filterSummR_3_"+apos[x].replace("-","n")];
}
}
val=dojo.string.substituteParams(val,this.report.getFieldLabel(this.getFormula()));
}else{
if(mems.length==0){
return cvCatalog.filterTemplateNone;
}else{
if(mems.length<5){
for(var x=0;x<mems.length;++x){
val+=(x>0?"` ":"")+dojo.string.escape("HTML",mems[x].getAttribute("caption"));
}
}else{
val=dojo.string.substituteParams(cvCatalog.filterSummSimple,dojo.string.escape("js",this.getFormula()),node.getAttribute("ordinal"),mems.length);
}
}
}
break;
case "CONTAIN":
case "NOT_CONTAIN":
var exp=node.selectNodes("cv:containsExpression");
if(!exp||exp.length==0){
return cvCatalog.filterTemplateNone;
}else{
for(var x=0;x<exp.length;++x){
val+=(x>0?"` ":"")+dojo.string.escape("HTML",cv.textContent(exp[x]));
}
}
break;
case "BETWEEN":
val1=dojo.string.escape("HTML",mems[1].getAttribute("caption"));
case "BEFORE":
case "AFTER":
val=dojo.string.escape("HTML",mems[0].getAttribute("caption"));
break;
case "TIME_AHEAD":
case "TIME_AGO":
case "TIME_RANGE_NEXT":
case "TIME_RANGE_PREV":
val=_188;
val1=this.report.getFieldLabel(this.getFormula());
break;
case "TIME_YAGO":
val1=this.report.getFieldLabel(this.getFormula());
return dojo.string.substituteParams(cvCatalog["filterSumm"+op],val1);
default:
val=dojo.string.escape("HTML",mems[0].getAttribute("caption"));
break;
}
return dojo.string.substituteParams(cvCatalog["filterSumm"+op],val,val1);
}});
dojo.declare("cv.ReportDialog",cv.Dialog,function(_18b){
this.report=_18b;
this.dlgTemplates={reportOpt_edit:"reportOptionsDlg.html",report_rename:"saveReportDlg.html",report_props:"reportPropsDlg.html",report_xml:"reportDefDlg.html",measures_subtotal:"measureDlg.html",measures_summaries:"summaryMetricsDlg.html",summary_new:"singleSummaryDlg.html",summary_edit:"singleSummaryDlg.html",measures_arith:"arithNumberDlg.html",measures_trend:"trendNumberDlg.html",arith_edit:"arithNumberDlg.html",trend_edit:"trendNumberDlg.html",gem_edit:"editGemDlg.html",filter_list:"filterListDlg.html",fieldHelp_show:"fieldHelpDlg.html",propHelp_show:"fieldHelpDlg.html",report_csv_download:"reportCSVDownloadDlg.html"};
this.prefixes={reportOpt_edit:"RO_",report_props:"RP_",report_xml:"RD_",measures_subtotal:"VF_",measures_summaries:"SM_",summary_edit:"SM_",summary_new:"SM_",measures_arith:"MA_",measures_trend:"MT_",arith_edit:"MA_",trend_edit:"MT_",gem_edit:"ED_",filter_list:"FT_",fieldHelp_show:"FH_",propHelp_show:"FH_",gadget_displaying:"GD_"};
this.helpTopics={reportOpt_edit:"CV/Business_User/setting_report_preferences.html",report_props:"",report_xml:"",measures_subtotal:"CV/Business_User/working_with_calculations.html#displaying_totals_as_averages_max",measures_summaries:"CV/Business_User/working_with_calculations.html#displaying_percent_rank_etc",summary_edit:"CV/Business_User/working_with_calculations.html#",summary_new:"CV/Business_User/working_with_calculations.html#",measures_arith:"CV/Business_User/working_with_calculations.html#",measures_trend:"CV/Business_User/working_with_calculations.html#",arith_edit:"CV/Business_User/working_with_calculations.html#",trend_edit:"CV/Business_User/working_with_calculations.html#",gem_edit:"CV/Business_User/working_with_fields.html#renaming_a_field",filter_list:"CV/Business_User/working_with_filters.html#filters_on_text_fields",fieldHelp_show:"CV/Business_User/working_with_fields.html#viewing_the_definition_of_a_field",gadget_displaying:""};
this.src=null;
this.dataSource=null;
},{destroy:function(){
this.src=null;
this.dataSource=null;
},show:function(_18c,src,_18d){
this.dataSource=this.report.currentSelection;
var _18e=this.report.reportDoc;
if(src){
this.src=src;
}else{
if(this.dataSource&&this.dataSource.getZoneId){
this.src=this.dataSource.getZoneId();
}
}
this.type=this.src+"_"+_18c;
this.param=_18d;
this.prefix=this.prefixes[this.type];
this.dlgTemplate=this.dlgTemplates[this.type];
this.helpTopic=this.helpTopics[this.type];
this.defaultFocus=null;
var _18f=this;
switch(this.type){
case "reportOpt_edit":
if(!this.load()){
break;
}
var attr=_18e.getReportOptions();
for(var x=0,y=attr.length;attr!=null&&x<y;++x){
this.updateHtml(attr[x].name,attr[x].value);
}
if(!this.report.createPAA){
this.byId("useNonVisualTotals").disabled=true;
}
cv.util.setHelpTopics(["RO_helpNonVisualTotal","CV/Business_User/working_with_calculations.html#non_visual_totals"]);
this.defaultFocus=this.byId("showEmptyCells");
break;
case "report_props":
if(!this.loadRptProps()){
break;
}
var _190=this.report.getReportProperties();
for(var x in _190){
var node=this.byId(x);
if(!node){
continue;
}
if(node.tagName=="INPUT"||node.tagName=="TEXTAREA"){
node.value=_190[x];
}else{
node.innerHTML=dojo.string.escape("html",_190[x]);
}
if(x=="description"&&_190[x]==""){
if(node.tagName=="INPUT"||node.tagName=="TEXTAREA"){
node.value="No Description";
}else{
node.innerHTML=dojo.string.escape("html","No Description");
}
}
if(x=="created"||x=="update"){
if(_190[x]!=null&&_190[x]!=""){
var _191=cv.util.formatDateString(_190[x]);
node.innerHTML=dojo.string.escape("html",_191);
}
}
if(x=="folder"){
if(_190[x].substring(0,1)=="/"){
node.innerHTML=_190[x].substring(1);
}
}
}
break;
case "report_xml":
if(!this.load()){
break;
}
this.byId("reportDef").value=dojo.dom.innerXML(_18e.getReportNode());
break;
case "measures_subtotal":
if(!this.dataSource){
return;
}
if(!this.load(this.dataSource.getDisplayLabel())){
break;
}
var attr=this.dataSource.getXmlAttributes();
for(var x=0,y=attr.length;attr!=null&&x<y;++x){
this.updateHtml(attr[x].name,attr[x].value);
}
this.defaultFocus=this.byId("showSum");
dojo.event.connect(this.byId("showSumTD"),"onclick",function(){
dojo.byId("VF_showSum").checked=!dojo.byId("VF_showSum").checked;
});
dojo.event.connect(this.byId("showAggregateTD"),"onclick",function(){
dojo.byId("VF_showAggregate").checked=!dojo.byId("VF_showAggregate").checked;
});
dojo.event.connect(this.byId("showAverageTD"),"onclick",function(){
dojo.byId("VF_showAverage").checked=!dojo.byId("VF_showAverage").checked;
});
dojo.event.connect(this.byId("showMaxTD"),"onclick",function(){
dojo.byId("VF_showMax").checked=!dojo.byId("VF_showMax").checked;
});
dojo.event.connect(this.byId("showMinTD"),"onclick",function(){
dojo.byId("VF_showMin").checked=!dojo.byId("VF_showMin").checked;
});
break;
case "measures_summaries":
if(!this.dataSource||!this.load(this.dataSource.getDisplayLabel())){
break;
}
if(this.param){
this.defaultFocus=this.byId(this.param);
}else{
this.defaultFocus=this.byId("PCTOF");
}
this.defaultFocus.checked=true;
break;
case "summary_new":
if(!this.dataSource){
return;
}
var _192=this.dataSource.getDisplayLabel();
if(!this.load(cvCatalog.summaryMetricTitle,_192)){
break;
}
var cat=this.byId("formatCategory"),_193=this.byId("formatScale");
this.byId("name").value=this._getUniqueLabel(dojo.string.substituteParams(cvCatalog["metric"+_18d],_192));
if(_18d=="PCTOF"||_18d=="PCTRSUM"||_18d=="RSUM"){
if(_18d=="RSUM"){
cat.value=this.dataSource.getNumberFormat().formatCategory;
}else{
cat.value="Percentage (%)";
}
_193.value="2";
}
dojo.html.setClass(this.byId(_18d),"summaryOption");
var _194=this.byId("field_"+_18d);
if(!this.report.addOptionsForAttributes(_194,true)){
_194.disabled=true;
this.byId("LABEL_"+_18d).disabled=true;
}
dojo.event.connect(dojo.byId("dlgBtnPrev"),"onclick",function(){
_18f.show("summaries",null,_18f.param);
});
if(_18e.getReportOption("useNonVisualTotals")=="true"){
this.displayMsg(cvCatalog.dlgInfoNonvisualTotal);
}
this.helpTopic+=_18d;
this.defaultFocus=this.byId("ROWS_"+_18d);
break;
case "summary_edit":
if(!this.dataSource){
return;
}
var _195=this.dataSource.metricType;
var _196=this.dataSource.getDisplayLabel();
if(!this.load(cvCatalog.summaryMetricEditTitle,this.report.getFieldLabel(this.dataSource.getBaseFieldFormula()))){
break;
}
this.byId("name").value=_196;
this._updateNumberFormat(this.dataSource,true);
dojo.html.setClass(this.byId(_195),"summaryOption");
var _194=this.byId("field_"+_195);
if(!this.report.addOptionsForAttributes(_194,true)){
_194.disabled=true;
this.byId("LABEL_"+_195).disabled=true;
}
var _197=this.dataSource.getMetricFacet();
var _198=_197.getAttribute("summaryAcrossEnum");
this.updateHtml("RD_"+_195,_198);
if(_198=="LABEL"){
this.updateHtml(_194,_197.getAttribute("breakAttributeFormula"));
}
if(_18e.getReportOption("useNonVisualTotals")=="true"){
this.displayMsg(cvCatalog.dlgInfoNonvisualTotal);
}
this.helpTopic+=_195;
this.defaultFocus=this.byId("ROWS_"+_195);
var btn=dojo.byId("dlgBtnPrev");
if(btn){
dojo.html.hide(btn);
}
btn=dojo.byId("dlgBtnSave");
if(btn){
btn.innerHTML="OK";
}
break;
case "measures_arith":
case "arith_edit":
if(!this.load()){
break;
}
var _199=this.byId("measures");
_199.selectedIndex=-1;
var ops=this.byId("ops").childNodes;
var _19a=this.byId("content");
var _19b=false;
function _19c(obj,_19d){
var _19e=0,end=0;
if(typeof (obj.selectionStart)=="number"){
_19e=obj.selectionStart;
end=obj.selectionEnd;
obj.value=obj.value.slice(0,_19e)+_19d+obj.value.slice(end);
}else{
if(document.selection){
if(!_19b){
var e=event.srcElement;
var r=obj.createTextRange();
r.moveStart("character",obj.value.length);
r.collapse(true);
r.select();
}
obj.focus();
var _19f=document.selection.createRange();
_19f.text=_19d;
}
}
};
function _1a0(e){
var src=e.target;
if(!src){
return true;
}
if(src.tagName=="INPUT"&&src.type=="button"){
if(src.value.length==1){
_19c(_19a,src.value);
}else{
if(src.id==_18f.prefix+"clear"){
_19a.value="";
}
}
e.preventDefault();
}else{
if(src.id==_18f.prefix+"measures"||src.id==_18f.prefix+"addField"||src.tagName=="OPTION"){
if(_199.options[_199.selectedIndex].value!=""){
_19c(_19a,"["+_199.options[_199.selectedIndex].text+"]");
}
}else{
if(src.id==_18f.prefix+"content"){
_19b=true;
}
}
}
_19a.focus();
return false;
};
for(var x=0;x<ops.length;++x){
if(ops[x].tagName=="INPUT"&&ops[x].type=="button"){
dojo.event.connect(ops[x],"onclick",_1a0);
}
}
dojo.event.connect(this.byId("addField"),"onclick",_1a0);
dojo.event.connect(_199,"ondblclick",_1a0);
dojo.event.connect(this.byId("clear"),"onclick",_1a0);
dojo.event.connect(this.byId("content"),"onclick",_1a0);
cv.util.setHelpTopics(["helpCalculateSubtotals","CV/Business_User/working_with_calculations.html#subtotal_calculation"]);
this.helpTopic+="creating_new_numbers";
if(this.type=="arith_edit"){
this.dataSourceOrigin={};
this.report.addOptionsForAllMeasures(_199,true,this.dataSource.getId(),true);
this.dataSourceOrigin.label=this.byId("name").value=this.dataSource.getDisplayLabel(true);
this.dataSourceOrigin.numberFormat=this._updateNumberFormat(this.dataSource,true);
this.dataSourceOrigin.expression=cv.textContent(this.dataSource.getMetricFacet());
_19a.value=this._transformArithExpression(this.dataSourceOrigin.expression,false);
this.byId("calculateSubtotalsUsingFormula").checked=(this.dataSource.getCalculateSubtotalsUsingFormula()=="true");
dojo.byId("dialogTitleText").innerHTML=cvCatalog.calculatedEditTitle;
}else{
this._updateNumberFormatAndDecimalPlacesDropdown();
dojo.byId("MA_name").value="";
this.report.addOptionsForAllMeasures(_199,true,null,true);
_199.value=this.dataSource.getFormula();
_19a.value+="["+_199.options[_199.selectedIndex].text+"]";
this.refGem=this.dataSource;
this.dataSource=null;
}
break;
case "measures_trend":
case "trend_edit":
if(!this.dataSource){
return;
}
var _1a1=this.report.reportDoc.getChildMembers("columnAttributes","rowAttributes"),_1a2=[];
if(_1a1){
for(var x=0;x<_1a1.length;++x){
var attr=_1a1[x].getAttribute("formula");
var hier=cv.getFieldHelp().getHierarchy(attr,false,true);
if(hier){
for(var y=0;y<hier.length;++y){
if(!dojo.lang.inArray(_1a2,hier[y])){
_1a2.push(hier[y]);
}
}
}else{
if(!dojo.lang.inArray(_1a2,attr)){
_1a2.push(attr);
}
}
}
}
if(_1a2.length==0){
this.showError("errorNoFieldForTrend");
return;
}
if(this.type=="trend_edit"){
if(!this.load(this.report.getFieldLabel(this.dataSource.getBaseFieldFormula()))){
break;
}
}else{
if(!this.load(this.dataSource.getDisplayLabel())){
break;
}
}
var _1a3=this.byId("trendFields");
_1a3.innerHTML="";
for(var x=0;x<_1a2.length;++x){
var f=_1a2[x];
cv.addOption(_1a3,new Option(this.report.getFieldLabel(f,true),f));
}
this._updateNumberFormat(this.dataSource,true);
if(this.type=="trend_edit"){
dojo.byId("dialogTitleText").innerHTML=cvCatalog.trendNumberEditTitle;
this.byId("name").value=this.dataSource.getDisplayLabel(true);
var _1a4=this.dataSource.getMetricFacet();
this.updateHtml("trendType",_1a4.getAttribute("trendTypeEnum"));
this.updateHtml("amount",_1a4.getAttribute("amount"));
this.updateHtml("trendFields",_1a4.getAttribute("trendAttributeFormula"));
}else{
this.baseGemFormat=this.dataSource.getNumberFormat().formatCategory;
this.byId("formatScale").value="2";
}
function _1a5(e){
var _1a6=_18f.dataSource;
if(_18f.type=="trend_edit"){
_1a6=_18f.report.getGem(_18f.dataSource.xmlNode.getAttribute("formula"));
}
_18f.byId("formatCategory").value=(e.target.value=="PCT_CHANGE")?"Percentage (%)":_1a6.getNumberFormat().formatCategory;
};
dojo.event.connect(this.byId("trendType"),"onchange",_1a5);
break;
case "gem_edit":
if(!this.dataSource){
return;
}
var _196=this.dataSource.getDisplayLabel();
if(this.dataSource.metricType){
if(!this.load(cvCatalog.editColumn)){
break;
}
}else{
if(!this.load(_196)){
break;
}
}
this.byId("name").innerHTML=this.dataSource.getName();
var _1a7=this.byId("displayLabel");
_1a7.value=this.dataSource.getDisplayLabel(true);
if(this.dataSource.metricType){
cv.util.hide("ED_pluralNameRow");
cv.util.hide("ED_pluralLabelRow");
this.dataSourceOrigin={};
this.dataSourceOrigin.numberFormat=this._updateNumberFormat(this.dataSource,true);
this.byId("nameTD").style.width="150px";
if(this.dataSource.metricType!="VALUE"){
cv.util.hide("ED_nameRow");
cv.util.hide("blankRow");
}
function _1a8(e){
var _1a9=_18f.byId("formatCategory");
if(_1a9.value=="Expression"){
_18f.byId("formatScale").disabled=true;
var _1aa=_18f.byId("formatExpression");
_1aa.disabled=false;
if(_1aa.value==""){
_1aa.value=cvConst.defaultFormatExp;
}
}else{
if(_1a9.value=="Default"){
_18f.byId("formatScale").disabled=true;
_18f.byId("formatExpression").disabled=true;
}else{
_18f.byId("formatScale").disabled=false;
_18f.byId("formatExpression").disabled=true;
}
}
};
dojo.event.connect(this.byId("formatCategory"),"onchange",_1a8);
_1a8();
}else{
this.byId("namePlural").innerHTML=this.dataSource.getNamePlural();
this.byId("displayLabelPlural").value=this.dataSource.getDisplayLabelPlural(true);
cv.util.hide("ED_formatRow","ED_formatExpRow");
}
this.defaultFocus=_1a7;
break;
case "filter_list":
var gem=this.report.getGem("filter_"+_18d);
if(!gem){
return this.report.filterDlg.show(_18d);
}
if(gem.itemCount==1){
return this.report.filterDlg.show(_18d,1);
}
if(!this.load(this.report.getFieldLabel(_18d),dojo.string.escape("HTML",_18d))){
break;
}
var list=this.byId("predicateList");
list.innerHTML=gem.createSummary(true);
break;
case "fieldHelp_show":
var fh=cv.getFieldHelp();
var node=fh.get(_18d);
var _1ab=fh.get(node,"displayLabelOriginal",true);
if(!_1ab){
_1ab="&nbsp;";
}
var _1ac=this.report.getFieldLabel(_18d);
var _196=fh.get(node,"displayLabel",true);
if(!this.load(_1ac,_196,_1ab)){
break;
}
if(_1ac!=_196){
cv.util.show("FH_customLabel");
}
if(_1ab!="nbsp;"&&_1ab!=_196&&cv.prefs.isAdmin){
cv.util.show("FH_name");
}
var desc=fh.get(node,"displayDescription",true);
if(desc){
this.updateHtml("displayDescription",desc);
}
this.updateHtml("formula",_18d);
this.updateHtml("type",cvCatalog["fieldTypes_"+fh.get(node,"type")]);
var _190=cv.getFieldHelp().getProperties(_18d);
if(_190&&_190.length>1){
var desc="";
cv.util.show("FH_memberProperties");
for(var x=0;x<_190.length;++x){
var prop=_190[x];
if(x!=0){
desc+=", ";
}
desc+=prop;
}
this.updateHtml("memberPropertiesDescription",desc);
}
break;
case "propHelp_show":
var _1ad=this.dataSource.getAttribute("formula");
var name=this.dataSource.getAttribute("name");
var fh=cv.getFieldHelp();
var node=fh.get(_1ad);
var _196=this.report.getFieldLabel(_1ad);
if(!_196){
_196=fh.get(node,"displayLabel",true);
}
if(!this.load(name,name,name)){
break;
}
this.updateHtml("displayDescription",dojo.string.substituteParams(cvCatalog["memberPropertyHelp"],name,_196));
this.updateHtml("type",cvCatalog["fieldTypes_PROPERTY"]);
break;
case "report_csv_download":
if(!this.load()){
break;
}
break;
default:
return;
}
if(this.status){
this.report.showReportStatus(this.status);
return;
}
this.showDialog();
this.lastSaveTime=null;
},save:function(){
var _1ae=this.report.reportDoc;
var els=this.theForm.elements;
var _1af=true;
switch(this.type){
case "reportOpt_edit":
for(var x=0;x<els.length;++x){
if(els[x].tagName=="INPUT"){
this.updateXml(_1ae.getReportNode(),els[x]);
}
}
this.report.history.add(new cv.ReportState("actionReportOptions"));
break;
case "report_props":
this.report.setReportProperties({description:this.byId("description").value});
_1af=false;
break;
case "report_xml":
var doc=dojo.dom.createDocumentFromText(this.byId("reportDef").value);
if(!doc||!doc.documentElement||doc.documentElement.tagName!="report"){
return this.displayError(cvCatalog.errorReportDefinition);
}
try{
this.report.openReport(doc.documentElement,true);
}
catch(e){
this.report.history.current().exec(true);
return this.displayError(cvCatalog.errorReportDefinition);
}
this.report.history.add(new cv.ReportState("actionImport"));
break;
case "measures_subtotal":
for(var x=0;this.dataSource!=null&&x<els.length;++x){
if(els[x].tagName=="INPUT"){
this.updateXml(this.dataSource.xmlNode,els[x]);
}
}
this.report.history.add(new cv.ReportState("actionEdit",this.dataSource.getDisplayLabel(true)));
break;
case "measures_summaries":
var _1b0=this.getRadioGroupValue(this.prefix+"Group");
if(!_1b0){
_1af=false;
break;
}
return this.show("new","summary",_1b0);
case "summary_new":
var _1b1=dojo.string.trim(this.byId("name").value);
var gem=this.report.createSpecialMetricGem({zoneId:"measures",formula:this.dataSource.getFormula(),metricType:this.param,sumAcross:this.getRadioGroupValue(this.prefix+"RD_"+this.param),sumTotal:"false",sumBreakBy:this.byId("field_"+this.param).value,refGem:this.dataSource});
this._updateNumberFormat(gem);
gem.setDisplayLabel(_1b1);
this.report.history.add(new cv.ReportState("actionAdd",_1b1));
break;
case "summary_edit":
var _1b1=dojo.string.trim(this.byId("name").value);
var _1b0=this.dataSource.metricType;
var _1b2=this.getRadioGroupValue(this.prefix+"RD_"+_1b0);
var _1b3={sumAcross:_1b2,sumBreakBy:this.byId("field_"+_1b0).value,sumTotal:"false"};
this.dataSource.update(_1b3);
this._updateNumberFormat(this.dataSource);
this.dataSource.setDisplayLabel(_1b1);
if(_1ae.isUsedByMetricFilter(this.dataSource.getFormula())){
this.report.populateFilters();
}
this.report.history.add(new cv.ReportState("actionEdit",_1b1));
break;
case "measures_arith":
case "arith_edit":
_1b1=dojo.string.trim(this.byId("name").value);
if(!this._validateName()){
return false;
}
if(!this._validateNumberFormatAndDecimalPlaces()){
return false;
}
var _1b4=this._transformArithExpression(this.byId("content").value,true);
if(this.dataSource){
this.dataSource.update({expression:_1b4});
}else{
this.dataSource=this.report.createSpecialMetricGem({zoneId:"measures",metricType:"EXPRESSION",formula:null,expression:_1b4,refGem:this.refGem});
}
this.dataSource.setDisplayLabel(_1b1);
this._updateNumberFormat(this.dataSource);
this.dataSource.setCalculateSubtotalsUsingFormula(this.byId("calculateSubtotalsUsingFormula").checked?"true":"false");
var msg=cv.util.parseAjaxMsg(cv.io.ajaxLoad("ajax/validateCalculatedMeasure",{reportXML:this.report.getReportXml(),measureId:this.dataSource.getId()},true));
if(msg&&msg.type=="error"){
return this.displayError(msg.details?msg.details:cvCatalog.dlgErrGeneric);
}
this.report.history.add(new cv.ReportState(this.type=="arith_edit"?"actionEdit":"actionAdd",_1b1));
this.report.addToCheckFieldList(this.dataSource.getId(),true);
if(this.type=="arith_edit"&&_1ae.isUsedByMetricFilter(this.dataSource.getFormula())){
this.report.populateFilters();
}
break;
case "measures_trend":
case "trend_edit":
var _1b3={zoneId:"measures",metricType:"TREND",formula:this.dataSource.getFormula(),trendType:this.byId("trendType").value,trendDir:this.byId("direction").value,trendAmount:this.byId("amount").value,trendField:this.byId("trendFields").value,refGem:this.dataSource};
var heir=cv.getFieldHelp().getHierarchy(_1b3.trendField);
if(heir){
for(var x=dojo.lang.indexOf(heir,_1b3.trendField)+1;x<heir.length;++x){
if(!this.report.getGem(heir[x])&&this.report.getGem("filter_"+heir[x])){
this.showError(["errorAddTrendWithFilterOnChild",this.report.getFieldLabel(heir[x]),this.report.getFieldLabel(_1b3.trendField)]);
return false;
}
}
}
if(!this._validateName()){
this.byId("name").focus();
return false;
}
var err=this._validateAmountField(_1b3.trendAmount);
if(err){
this.displayMsg(cvCatalog[err]);
this.byId("amount").focus();
return false;
}
var _1b5;
if(this.type=="trend_edit"){
this.dataSource.update(_1b3);
_1b5="actionEdit";
}else{
this.dataSource=this.report.createSpecialMetricGem(_1b3);
_1b5="actionAdd";
}
var _1b1=dojo.string.trim(this.byId("name").value);
this.dataSource.setDisplayLabel(_1b1);
this._updateNumberFormat(this.dataSource);
this.report.history.add(new cv.ReportState(_1b5,_1b1));
if(this.type=="trend_edit"&&_1ae.isUsedByMetricFilter(this.dataSource.getFormula())){
this.report.populateFilters();
}
break;
case "gem_edit":
if(this.dataSource.metricType){
this._updateNumberFormat(this.dataSource);
if(this.byId("formatCategory").value=="Expression"){
if(this.byId("formatExpression").value==""){
return this.displayError("Format expression cannot be empty.");
}
var msg=cv.util.parseAjaxMsg(cv.io.ajaxLoad("ajax/parseReport",{reportXML:this.report.getReportXml()},true));
if(msg&&msg.type=="error"){
return this.displayError(msg.details?msg.details:cvCatalog.dlgErrGeneric);
}
}
}
this.dataSource.setDisplayLabel(dojo.string.trim(this.byId("displayLabel").value),dojo.string.trim(this.byId("displayLabelPlural").value));
this.report.populateFilters();
this.report.history.add(new cv.ReportState("actionRename"));
break;
case "report_csv_download":
cv.io.getReportInFormat(this.report.getReportXml(),"CSV",dojo.byId("CSV_includeSubtotals").checked,dojo.byId("CSV_keepNumberFormatting").checked,this.report.isDirty());
_1af=false;
break;
default:
_1af=false;
break;
}
cv.dlgWidget.hide();
if(_1af&&this.report.reportStatus!="errorReportDefinition"){
this.report.refreshReport();
}
},cancel:function(){
switch(this.type){
case "measures_arith":
if(this.dataSource){
this.report.gemList.remove(this.dataSource.getId());
cv.util.removeNode(this.dataSource.xmlNode);
this.dataSource.zone.removeChild(this.dataSource.domNode);
}
break;
case "arith_edit":
this.dataSource.update(this.dataSourceOrigin);
break;
case "gem_edit":
if(this.dataSource.metricType){
this.dataSource.setNumberFormat(this.dataSourceOrigin.numberFormat);
}
break;
}
cv.Dialog.prototype.cancel.call(this);
},showEditColumn:function(){
this.show("edit","gem");
},showEditSummaryMeasure:function(){
this.show("edit","summary");
},showEditArithMeasure:function(){
this.show("edit","arith");
},showEditTrendMeasure:function(){
this.show("edit","trend");
},showReplaceAttribute:function(){
this.show("replace","attribute");
},showSaveReport:function(){
this.show("save","report");
},showRenameReport:function(){
this.show("rename","report");
},showReportOptions:function(){
this.show("edit","reportOpt");
},showReportProps:function(){
this.show("props","report");
},loadRptProps:function(){
this.status=null;
if(!this.cache[this.type]){
var dlg=this;
dojo.io.bind({url:cv.contextPath+"templates/"+this.dlgTemplate,handle:function(type,data,evt){
if(type=="load"){
if(cv.util.parseAjaxMsg(data)){
this.status="errorDlgLoad";
return;
}
dlg.cache[dlg.type]=data;
}else{
dlg.status="errorDlgLoad";
}
},mimetype:"text/plain",method:"POST",sync:true});
}
if(this.status!=null){
return false;
}
var str=this.loadRptProps.arguments.length>0?dojo.string.substituteParams(this.cache[this.type],this.loadRptProps.arguments):this.cache[this.type];
if(dojo.lang.isUndefined(cv.dlgWidget)){
cv.dlgWidget=cv.util.getDojoWidget("theDialog");
}
cv.dlgWidget.setContent("<form id=\"theDialogForm\" action=\"\" onsubmit=\"return false\">"+str+"</form>");
this.defaultMsg=null;
this.theForm=dojo.byId("theDialogForm");
if(!cv.getActiveReport().createPAA||!cv.getActiveReport().manager.isReportWritable){
dojo.html.addClass(this.byId("editNameButton"),"hidden");
dojo.html.setStyle(this.byId("closeButton"),"padding-left","23px");
}
var _1b6=this.byId("editDescButton");
if(_1b6){
dojo.event.connect(_1b6,"onclick",this,"showEditDesc");
}
var _1b7=this.byId("editNameButton");
if(_1b7){
dojo.event.connect(_1b7,"onclick",this,"showRenameRpt");
}
if(this.byId("descBtnCancel")){
dojo.event.connect(this.byId("descBtnCancel"),"onclick",this,"hideEditDesc");
}
if(this.byId("descBtnSave")){
dojo.event.connect(this.byId("descBtnSave"),"onclick",this,"saveRptDesc");
}
if(this.byId("nameBtnCancel")){
dojo.event.connect(this.byId("nameBtnCancel"),"onclick",this,"hideRenameRpt");
}
if(this.byId("nameBtnSave")){
dojo.event.connect(this.byId("nameBtnSave"),"onclick",this,"renameReport");
}
if(this.byId("closeButton")){
dojo.event.connect(this.byId("closeButton"),"onclick",this,"cancel");
}
return true;
},showReportDefinition:function(){
this.show("xml","report");
},showSubtotals:function(){
this.show("subtotal");
},showNewSummaryOptions:function(){
this.show("summaries");
},showNewArithBuilder:function(){
this.show("arith");
},showNewTrendNumber:function(){
this.show("trend");
},showFilterList:function(_1b8){
this.show("list","filter",_1b8);
},showCSVDownload:function(_1b9){
this.show("csv_download","report",_1b9);
},remove:function(){
switch(this.type){
case "attribute_replace":
this.report.reportDoc.setReplaced(this.dataSource.getFormula(),null);
return;
default:
break;
}
},_transformArithExpression:function(str,_1ba){
var _1bb=this.byId("measures").options;
var map={};
var _1bc={};
for(var x=0;x<_1bb.length;++x){
if(_1ba){
map["["+_1bb[x].text+"]"]=_1bb[x].value;
_1bc[_1bb[x].value]="["+_1bb[x].text+"]";
}else{
map[_1bb[x].value]="["+_1bb[x].text+"]";
}
}
return str.replace(_1ba?/((\[Measures\]\.\[[^\]]+\])|(\[MEASURE[^\]]+\]))|(\[(\\\]|[^\]])+\])/g:/(\[Measures\]\.\[[^\]]+\])|(\[MEASURE[^\]]+\])/g,function(_1bd,key){
if(typeof (map[_1bd])!="undefined"&&map[_1bd]!=null){
return map[_1bd];
}else{
if(typeof (_1bc[_1bd])!="undefined"&&_1bc[_1bd]!=null&&_1bd.indexOf("[Measures].")>=0){
return _1bd;
}else{
if((typeof (_1bc[_1bd])=="undefined"||_1bc[_1bd]==null)&&(_1bd.indexOf("[Measures].")>=0||_1bd.indexOf("[MEASURES].")>=0)){
return _1bd.replace("[Measures].","");
}
}
}
return _1bd;
});
},_updateNumberFormat:function(gem,toUI){
var cat=this.byId("formatCategory"),_1be=this.byId("formatScale"),exp=this.byId("formatExpression");
var _1bf;
if(toUI){
if(gem){
_1bf=gem.getNumberFormat();
if(_1bf.formatCategory){
cat.value=_1bf.formatCategory;
}
if(_1bf.formatScale){
_1be.value=_1bf.formatScale;
}
if(exp){
exp.value=_1bf.formatExpression;
}
}else{
cat.selectedIndex=-1;
_1be.selectedIndex=-1;
}
}else{
_1bf={formatCategory:cat.value,formatScale:_1be.value};
if(exp){
_1bf.formatExpression=exp.value;
}
gem.setNumberFormat(_1bf);
}
return _1bf;
},_selectFolderInList:function(_1c0){
CookieLib.setCookieAttrib("cookie","report_selected_folder",this.byId("folder").value);
if(!_1c0||!dojo.lang.isString(_1c0)||_1c0.length<=1){
_1c0=this.byId("folder").value;
}else{
this.byId("folder").value=_1c0;
}
var _1c1=this;
dojo.io.bind({url:cv.contextPath+"ajax/getFolderContent",content:{path:_1c0,stok:cv.securityToken},handle:function(type,data,evt){
if(type=="load"){
if(data){
var msg=cv.util.parseAjaxMsg(data);
if(msg){
return _1c1.displayMsg(msg.details?msg.details:cvCatalog.dlgErrGeneric);
}
_1c1.byId("folderContent").innerHTML="<select id=\"SR_filesInFolder\" size=9 class=\"folderContent\">"+data+"</select>";
dojo.event.connect(_1c1.byId("filesInFolder"),"onchange",_1c1,"_selectReportInFolder");
}else{
_1c1.byId("folderContent").innerHTML="<select size=9 class=\"folderContent\"><option>&nbsp;</option></select>";
}
}else{
_1c1.report.showReportStatus("errorReportDefinition");
}
},mimetype:"text/plain",method:"POST",sync:false});
},_selectReportInFolder:function(){
this.byId("name").value=this.byId("filesInFolder").value;
},_validateAmountField:function(_1c2){
dojo.html.removeClass(dojo.byId("MT_amount"),"invalid");
if(!cv.util.checkNumber(_1c2)||parseInt(_1c2)<=0||(parseInt(_1c2)!=parseFloat(_1c2))){
this.report.filterDlg.setInvalidInputField("MT_amount");
return "dlgErrTrendNumberAmountNumberExpected";
}
return null;
},_getUniqueLabel:function(_1c3){
var _1c4=this.report.gemList,_1c5=_1c4.getKeyList();
if(!_1c5||_1c5.length==0){
return _1c3;
}
function _1c6(str){
for(var x=0;x<_1c5.length;++x){
var gem=_1c4.item(_1c5[x]);
if(gem.getDisplayLabel()==str){
return true;
}
}
return false;
};
if(!_1c6(_1c3)){
return _1c3;
}
var i=2,_1c7=_1c3+"_"+i;
while(_1c6(_1c7)){
_1c7=_1c3+"_"+(++i);
}
return _1c7;
},_validateNumberFormatAndDecimalPlaces:function(){
dojo.html.removeClass(this.byId("formatCategory"),"invalid");
dojo.html.removeClass(this.byId("formatScale"),"invalid");
var _1c8=true;
if(this.byId("formatCategory").value==cvCatalog["dlgNullSelection"]){
this.byId("formatCategory").focus();
dojo.html.addClass(this.byId("formatCategory"),"invalid");
_1c8=false;
}
if(this.byId("formatScale").value==cvCatalog["dlgNullSelection"]){
this.byId("formatScale").focus();
dojo.html.addClass(this.byId("formatScale"),"invalid");
_1c8=false;
}
if(!_1c8){
this.displayMsg(cvCatalog["dlgErrNumberFormatOrDecimalRequired"]);
}
return _1c8;
},_updateNumberFormatAndDecimalPlacesDropdown:function(){
var _1c9=document.createElement("option");
_1c9.setAttribute("value",cvCatalog["dlgNullSelection"]);
_1c9.innerHTML=cvCatalog["dlgNullSelection"];
this.byId("formatCategory").insertBefore(_1c9,this.byId("formatCategory").getElementsByTagName("option")[0]);
this.byId("formatCategory").value=cvCatalog["dlgNullSelection"];
this.byId("formatScale").value="2";
},_validateName:function(){
dojo.html.removeClass(this.byId("name"),"invalid");
if(this.byId("name").value==""){
dojo.html.addClass(this.byId("name"),"invalid");
this.displayMsg(cvCatalog["dlgErrNameRequired"]);
return false;
}
return true;
},showRenameRpt:function(){
var node=this.byId("nameDiv");
node.innerHTML="<input id=\"RP_hiddenRptName\" type=\"hidden\" value=\""+this.byId("name").innerHTML.replace(/(["])/gm,"////")+"\"><input id=\"RP_name\" style=\"width:430px;\" value=\""+this.byId("name").innerHTML.replace(/(["])/gm,"////")+"\">";
dojo.html.setStyle(node,"padding-top","0px");
var _1ca=this.byId("name").value.replace(/\/\/\/\//g,"\"");
this.byId("hiddenRptName").value=this.byId("name").value=_1ca;
this.byId("name").focus();
dojo.html.removeClass(this.byId("nameBtn"),"hidden");
dojo.html.addClass(this.byId("editNameButton"),"hidden");
dojo.html.addClass(this.byId("closeButton"),"hidden");
},hideRenameRpt:function(){
var node=this.byId("nameDiv");
node.innerHTML="<div id='RP_name' style='font-weight: bold;width:360px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'>"+dojo.string.escape("html",this.byId("hiddenRptName").value)+"</div>";
dojo.html.setStyle(node,"padding-top","0px");
dojo.html.addClass(this.byId("nameBtn"),"hidden");
dojo.html.removeClass(this.byId("editNameButton"),"hidden");
dojo.html.removeClass(this.byId("closeButton"),"hidden");
},showEditDesc:function(){
var node=this.byId("editDescTextArea");
dojo.html.removeClass(this.byId("editDescTextAreaTR"),"hidden");
dojo.html.addClass(this.byId("descDivTR"),"hidden");
if(cv.getActiveReport().reportDoc.getReportProperty("description")==""){
node.innerHTML="<input id=\"RP_hiddenDesc\" type=\"hidden\" value=\""+this.byId("description").innerHTML.replace(/(["])/gm,"&quot;")+"\"><textarea id=\"RP_description\" style=\"width:430px;\" rows=3></textarea>";
}else{
node.innerHTML="<input id=\"RP_hiddenDesc\" type=\"hidden\" value=\""+this.byId("description").innerHTML.replace(/(["])/gm,"&quot;")+"\"><textarea id=\"RP_description\" style=\"width:430px;\" rows=3>"+this.byId("description").innerHTML.replace(/(["])/gm,"&quot;")+"</textarea>";
}
dojo.html.removeClass(this.byId("descBtn"),"hidden");
this.byId("editDescDiv").innerHTML="";
this.byId("description").focus();
this.isEditDescHidden=false;
this.isShowingNow=this.isEditDescHidden&&this.isRenamingHidden;
},hideEditDesc:function(){
var node=this.byId("editDescDiv");
dojo.html.addClass(this.byId("editDescTextAreaTR"),"hidden");
dojo.html.removeClass(this.byId("descDivTR"),"hidden");
var _1cb=this.byId("hiddenDesc").value;
node.innerHTML="<div id='RP_description' style='word-break:break-all;overflow:auto;padding-left: 10px;'>"+this.byId("hiddenDesc").value+"</div>";
dojo.html.addClass(this.byId("descBtn"),"hidden");
this.byId("editDescTextArea").innerHTML="";
this.isEditDescHidden=true;
this.isShowingNow=this.isEditDescHidden&&this.isRenamingHidden;
},saveRptDesc:function(){
this.report.setReportProperties({description:this.byId("description").value});
var desc=this.byId("description").value;
this.byId("description").innerHTML=desc;
this.byId("hiddenDesc").value=this.byId("description").value;
this.hideEditDesc();
},renameReport:function(){
var name=dojo.string.trim(this.byId("name").value);
if(dojo.string.trim(this.byId("hiddenRptName").value)!=dojo.string.trim(this.byId("name").value)){
if(!name){
return cv.flex.showMessage("error",cvCatalog.dlgErrEmptyReportName);
}
cv.getActiveReport().byId("ReportName").innerHTML=dojo.string.escape("html",name);
document.title=name;
cv.getActiveReport().reportDoc.setReportProperty("name",name);
this.byId("hiddenRptName").value=this.byId("name").value;
}
this.hideRenameRpt();
}});
dojo.declare("cv.LinkDialog",cv.Dialog,function(_1cc){
this.report=_1cc;
this.dlgTemplate="linkDlg.html";
this.prefix="AL_";
this.dataSource=null;
this.linkTypes=["FILE","URL"];
},{performAction:function(_1cd){
var ctx;
for(var x=0;x<_1cd.length;x++){
if(_1cd[x]["clickLevel"]){
ctx=_1cd[x];
break;
}
}
var _1ce=cv.util.parseMDXExpression(ctx.formula,false);
var _1cf=cv.util.parseMDXExpression(ctx.member,false);
var gem=this.report.getGem(ctx.formula);
var link=gem.getLink();
var _1d0=link.getAttribute("target");
var type=link.getAttribute("type");
if(type=="URL"){
var url=link.getAttribute("url");
url=url.replace("{"+_1ce+"}",encodeURIComponent(_1cf));
this._openUrl(_1d0,url,_1cf);
}else{
if(type=="FILE"){
var _1d1=link.getAttribute("fileSolution");
var _1d2=link.getAttribute("filePath");
var _1d3=link.getAttribute("fileName");
var file=this._getSolutionFileXML(_1d1,_1d2,_1d3);
if(file==null){
alert(cvCatalog.linkFileOpenError);
return;
}
var url=file.getAttribute("url");
var _1d4=link.selectNodes("cv:linkParam");
var _1d5=file.getAttribute("param-service-url");
var _1d6=null;
if(_1d4.length>0&&_1d5){
var _1d5=file.getAttribute("param-service-url");
_1d6=this._getSolutionDocParams(_1d5);
}
for(var x=0;x<_1d4.length;++x){
var p=_1d4[x].getAttribute("name");
url=url+"&"+encodeURIComponent(p)+"=";
var v=_1d4[x].getAttribute("value");
v=this._substituteParam(v,_1cd);
if(_1d6){
var _1d7=_1d6.selectSingleNode("parameter[@name=\""+p+"\"]/values/value[@label=\""+v+"\"]");
if(_1d7){
v=_1d7.getAttribute("value");
}
}
url=url+encodeURIComponent(v);
}
this._openUrl(_1d0,url,_1cf);
}else{
if(type=="DASHBOARD"){
for(var x=0;x<_1cd.length;++x){
ctx=_1cd[x];
_1cf=cv.util.parseMDXExpression(ctx.member,false);
if(parent&&parent.Dashboards&&parent.encode_prepare){
parent.Dashboards.fireOutputParam(window,ctx.formula,parent.encode_prepare(_1cf));
}else{
alert("Unable to call Dashbords.fireChange on param "+ctx.formula+" with value "+_1cf);
return;
}
}
}
}
}
},_substituteParam:function(_1d8,_1d9){
for(var x=0;x<_1d9.length;++x){
var ctx=_1d9[x];
var _1da=cv.util.parseMDXExpression(ctx.formula,false);
var _1db=cv.util.parseMDXExpression(ctx.member,false);
if(_1d8=="{"+_1da+"}"){
return _1db;
}
}
return _1d8;
},_openUrl:function(_1dc,url,_1dd){
if(_1dc=="NEW_TAB"){
if(window.parent&&window.parent.mantle_openTab){
window.parent.mantle_openTab(_1dd,_1dd,url);
return;
}
if(window.parent&&window.parent.parent&&window.parent.parent.mantle_openTab){
window.parent.parent.mantle_openTab(_1dd,_1dd,url);
return;
}
}
if(_1dc=="CURRENT"){
window.location=url;
}else{
window.open(url);
}
},show:function(){
this.dataSource=this.report.currentSelection;
if(!this.dataSource){
return;
}
var _1de=this.dataSource.getName();
if(!this.load(_1de)){
return;
}
dojo.event.connect(this.byId("enableCheckbox"),"onclick",cv.util,"onToggleSectionCheckbox");
dojo.event.connectOnce(this.byId("linkType"),"onchange",this,"_changeType");
dojo.event.connectOnce(this.byId("filePicker"),"onclick",this,"_openGwtRepositoryBrowser");
var xml=this.dataSource.getLink();
if(xml){
var _1df=this.byId("linkType");
var type=xml.getAttribute("type");
if(type=="URL"){
this.byId("urlInput").value=xml.getAttribute("url");
this.byId("urlToolTip").value=xml.getAttribute("toolTip");
cv.util.selectByValue(this.byId("urlTarget"),xml.getAttribute("target"));
}else{
if(type=="FILE"){
this.byId("fileLabel").value=xml.getAttribute("fileLabel");
this.byId("fileName").value=xml.getAttribute("fileName");
this.byId("filePath").value=xml.getAttribute("filePath");
this.byId("fileSolution").value=xml.getAttribute("fileSolution");
this.byId("fileToolTip").value=xml.getAttribute("toolTip");
cv.util.selectByValue(this.byId("fileTarget"),xml.getAttribute("target"));
this._populateParameters(xml.getAttribute("fileSolution"),xml.getAttribute("filePath"),xml.getAttribute("fileName"),xml.selectNodes("cv:linkParam"));
}
}
cv.util.selectByValue(this.byId("linkType"),xml.getAttribute("type"));
}else{
cv.util.setSectionCollapsed("AL_enableCheckbox");
}
this._changeType();
this.showDialog();
},save:function(){
if(dojo.byId("dlgBtnSave").disabled){
return;
}
if(this.byId("enableCheckbox").checked){
var type=this.byId("linkType").value;
if(!this._validateParameter(type)){
return;
}
if(type=="URL"){
var _1e0={type:type,url:this.byId("urlInput").value,toolTip:this.byId("urlToolTip").value,target:this.byId("urlTarget").value};
this.dataSource.setLink(_1e0);
this.report.history.add(new cv.ReportState("actionAdd","hyperlink"));
}else{
if(type=="FILE"){
var _1e0={type:type,fileLabel:this.byId("fileLabel").value,fileName:this.byId("fileName").value,filePath:this.byId("filePath").value,fileSolution:this.byId("fileSolution").value,toolTip:this.byId("fileToolTip").value,target:this.byId("fileTarget").value};
var rows=this.byId("linkParamsTable").rows;
var _1e1={};
for(var x=0;x<rows.length;++x){
if(!rows[x].lastChild.firstChild.checked){
continue;
}
var _1e2=rows[x].lastChild.lastChild;
_1e1[_1e2.name]=_1e2.value;
}
this.dataSource.setLink(_1e0,_1e1);
this.report.history.add(new cv.ReportState("actionAdd","hyperlink"));
}
}
}else{
this.dataSource.removeLink();
this.report.history.add(new cv.ReportState("actionRemove","hyperlink"));
}
cv.dlgWidget.hide();
if(this.report.reportStatus!="errorReportDefinition"){
this.report.refreshReport();
}
},_openGwtRepositoryBrowser:function(e){
zindex=dojo.html.getStyle(dojo.byId("theDialog"),"z-index");
dojo.html.setStyle(dojo.byId("theDialog"),"z-index","100");
var _1e3=this;
openFileChooserDialog({fileSelected:function(_1e4,_1e5,_1e6,_1e7){
_1e3.byId("fileLabel").value=_1e7;
_1e3.byId("fileSolution").value=_1e4;
_1e3.byId("filePath").value=_1e5;
_1e3.byId("fileName").value=_1e6;
_1e3._populateParameters(_1e4,_1e5,_1e6,null);
dojo.html.setStyle(dojo.byId("theDialog"),"z-index",zindex);
},dialogCanceled:function(){
dojo.html.setStyle(dojo.byId("theDialog"),"z-index",zindex);
}});
},_changeType:function(e){
var _1e8=this.byId("linkType");
for(var x=0;x<this.linkTypes.length;++x){
if(this.linkTypes[x]==_1e8.value){
cv.util.show(this.prefix+this.linkTypes[x]);
}else{
cv.util.hide(this.prefix+this.linkTypes[x]);
}
}
},_validateParameter:function(type){
if(type=="URL"){
if(!this.byId("urlInput").value){
this.displayError(cvCatalog.linkRequiredURL);
this.setInvalidInputField("AL_urlInput");
return false;
}
}else{
if(type=="FILE"){
if(!this.byId("fileName").value){
this.displayError(cvCatalog.linkRequiredFile);
this.setInvalidInputField("AL_fileLabel");
return false;
}
}
}
return true;
},_getSolutionDocParams:function(_1e9){
var xml=null;
dojo.io.bind({url:_1e9,handle:function(type,data,evt){
if(type=="load"){
xml=data;
}
},mimetype:"text/xml",method:"POST",sync:true});
return xml.documentElement;
},_populateParameters:function(_1ea,_1eb,_1ec,_1ed){
this.byId("fileLabelSpan").title=_1ea+_1eb+"/"+_1ec;
var _1ee=this.byId("linkParamsTable");
cv.util.hide("AL_linkParamsDiv");
while(_1ee.rows.length>0){
_1ee.deleteRow(0);
}
var file=this._getSolutionFileXML(_1ea,_1eb,_1ec);
if(file==null){
alert(cvCatalog.linkFileRemoved);
this.byId("fileLabel").value="";
this.byId("fileName").value="";
return;
}
var _1ef=file.getAttribute("param-service-url");
if(!_1ef){
return;
}
var _1f0=this._getSolutionDocParams(_1ef).selectNodes("parameter");
var _1f1=false;
for(var x=0;x<_1f0.length;++x){
var attr=_1f0[x].selectSingleNode("attribute[@name='parameter-group']");
if(attr&&(attr.getAttribute("value")=="system"||attr.getAttribute("value")=="subscription")){
continue;
}
_1f1=true;
var name=_1f0[x].getAttribute("name");
var _1f2=null;
attr=_1f0[x].selectSingleNode("attribute[@name='label']");
if(attr){
_1f2=attr.getAttribute("value");
}else{
_1f2=name;
}
var row=_1ee.insertRow(_1ee.rows.length);
var _1f3=null;
var _1f4=false;
if(_1ed){
for(var y=0;y<_1ed.length;++y){
if(_1ed[y].getAttribute("name")==name){
_1f3=_1ed[y].getAttribute("value");
_1f4=true;
break;
}
}
}
if(!_1f3){
if(_1f2==this.dataSource.getName()){
_1f3="{"+_1f2+"}";
_1f4=true;
}else{
_1f3="";
}
}
var cell=document.createElement("td");
cell.className="paramCell";
row.appendChild(cell);
cell.innerHTML=_1f2;
cell=document.createElement("td");
cell.className="valueCell";
row.appendChild(cell);
var _1f5=document.createElement("input");
_1f5.type="checkbox";
cell.appendChild(_1f5);
_1f5=document.createElement("input");
_1f5.name=name;
_1f5.type="text";
_1f5.size=40;
_1f5.value=_1f3;
cell.appendChild(_1f5);
if(_1f4){
row.lastChild.firstChild.checked=true;
}else{
row.lastChild.lastChild.disabled=true;
}
dojo.event.connectOnce(row.lastChild.firstChild,"onclick",this,"_toggleLinkParam");
}
if(_1f1){
cv.util.show("AL_linkParamsDiv");
}
},_toggleLinkParam:function(evt){
var cked=evt.target.checked;
var _1f6=evt.target.parentNode.lastChild;
if(!cked){
_1f6.value="";
_1f6.disabled=true;
}else{
_1f6.disabled=false;
_1f6.focus();
}
},_getSolutionFileXML:function(_1f7,_1f8,_1f9){
var xml=null;
dojo.io.bind({url:"../../SolutionRepositoryService?component=getSolutionRepositoryDoc",handle:function(type,data,evt){
if(type=="load"){
xml=data;
}
},mimetype:"text/xml",method:"POST",sync:true});
var file=xml.documentElement.selectSingleNode("file[@name=\""+_1f7+"\"]");
if(file==null){
return;
}
var _1fa=_1f8.split("/");
for(var x=0;x<_1fa.length;++x){
if(_1fa[x]==""){
continue;
}
file=file.selectSingleNode("file[@name=\""+_1fa[x]+"\"]");
if(file==null){
return;
}
}
file=file.selectSingleNode("file[@name=\""+_1f9+"\"]");
return file;
}});
dojo.declare("cv.ChartOptionsDialog",cv.Dialog,function(_1fb){
this.report=_1fb;
this.dlgTemplate="chartPropsDlg.html";
this.prefix="CP_";
this.originalOptions={};
this.applied=false;
this.lastScale=0;
},{show:function(){
if(!this.load()){
return;
}
var _1fc=this.report.reportDoc;
var attr=_1fc.getChartOptions().attributes;
for(var x=0,y=attr.length;attr!=null&&x<y;++x){
this.updateHtml(attr[x].name,attr[x].value);
this.originalOptions[attr[x].name]=attr[x].value;
}
this.toggleAutoRange();
dojo.event.connectOnce(this.byId("autoRange"),"onclick",this,"toggleAutoRange");
dojo.event.connectOnce(this.byId("labelColorDiv"),"onclick",this,"toggleColorPalette");
var _1fd=dojo.widget.createWidget("dojo:ColorPalette",{palette:"7x10"},dojo.byId("CP_labelColorPaletteWidget"));
dojo.event.connectOnce(_1fd,"onColorSelect",this,"selectColor");
dojo.html.setStyle(this.byId("labelColorDiv"),"background-color",_1fc.getChartOption("labelColor"));
dojo.event.connectOnce(this.byId("backgroundColorDiv"),"onclick",this,"toggleColorPalette");
_1fd=dojo.widget.createWidget("dojo:ColorPalette",{palette:"7x10"},dojo.byId("CP_backgroundColorPaletteWidget"));
dojo.event.connectOnce(_1fd,"onColorSelect",this,"selectColor");
dojo.html.setStyle(this.byId("backgroundColorDiv"),"background-color",_1fc.getChartOption("backgroundColor"));
dojo.event.connectOnce(this.byId("backgroundColorEndDiv"),"onclick",this,"toggleColorPalette");
_1fd=dojo.widget.createWidget("dojo:ColorPalette",{palette:"7x10"},dojo.byId("CP_backgroundColorEndPaletteWidget"));
dojo.event.connectOnce(_1fd,"onColorSelect",this,"selectColor");
dojo.html.setStyle(this.byId("backgroundColorEndDiv"),"background-color",_1fc.getChartOption("backgroundColorEnd"));
dojo.event.connectOnce(this.byId("legendColorDiv"),"onclick",this,"toggleColorPalette");
_1fd=dojo.widget.createWidget("dojo:ColorPalette",{palette:"7x10"},dojo.byId("CP_legendColorPaletteWidget"));
dojo.event.connectOnce(_1fd,"onColorSelect",this,"selectColor");
dojo.html.setStyle(this.byId("legendColorDiv"),"background-color",_1fc.getChartOption("legendColor"));
dojo.event.connectOnce(this.byId("legendBackgroundColorDiv"),"onclick",this,"toggleColorPalette");
_1fd=dojo.widget.createWidget("dojo:ColorPalette",{palette:"7x10"},dojo.byId("CP_legendBackgroundColorPaletteWidget"));
dojo.event.connectOnce(_1fd,"onColorSelect",this,"selectColor");
dojo.html.setStyle(this.byId("legendBackgroundColorDiv"),"background-color",_1fc.getChartOption("legendBackgroundColor"));
dojo.event.connect(dojo.byId("dlgBtnApply"),"onclick",this,"apply");
dojo.event.connectOnce(this.byId("backgroundFill"),"onchange",this,"toggleFillType");
this.toggleFillType();
this.lastScale=this.report.reportDoc.getChartOption("displayUnits");
this.lastScale=this.lastScale.substring(6);
dojo.event.connectOnce(this.byId("displayUnits"),"onchange",this,"toggleDisplayUnits");
dojo.event.connectOnce(dojo.byId("standardDialog"),"onclick",this,"hideColorPalettes");
this.showDialog();
},save:function(_1fe){
var _1ff=this.report.reportDoc;
var els=this.theForm.elements;
if(!dojo.byId("CP_autoRange").checked&&!cv.util.checkNumber(dojo.byId("CP_valueAxisLowerLimit").value)){
this.displayError(cvCatalog.dlgChartPropsAxisLimitError);
this.setInvalidInputField("CP_valueAxisLowerLimit");
dojo.byId("CP_valueAxisLowerLimit").focus();
return false;
}
if(!dojo.byId("CP_autoRange").checked&&!cv.util.checkNumber(dojo.byId("CP_valueAxisUpperLimit").value)){
this.displayError(cvCatalog.dlgChartPropsAxisLimitError);
this.setInvalidInputField("CP_valueAxisUpperLimit");
dojo.byId("CP_valueAxisUpperLimit").focus();
return false;
}
for(var x=0;x<els.length;++x){
if(els[x].tagName=="INPUT"||els[x].tagName=="SELECT"){
if((els[x].id=="CP_valueAxisLowerLimit"||els[x].id=="CP_valueAxisUpperLimit")&&els[x].value==""){
continue;
}
this.updateXml(_1ff.getChartOptions(),els[x]);
}
}
if(!_1fe){
this.report.history.add(new cv.ReportState("actionChartProps"));
cv.dlgWidget.hide();
}
if(this.report.reportStatus!="errorReportDefinition"){
this.report.refreshReport();
}
},toggleAutoRange:function(){
dojo.byId("CP_valueAxisLowerLimit").disabled=dojo.byId("CP_autoRange").checked;
dojo.byId("CP_valueAxisUpperLimit").disabled=dojo.byId("CP_autoRange").checked;
},toggleColorPalette:function(evt){
var _200=evt.target.id.replace("Div","Palette");
this.hideColorPalettes();
cv.util.show(_200);
evt.preventDefault();
evt.stopPropagation();
},toggleFillType:function(){
var type=dojo.byId("CP_backgroundFill").value;
if(type=="NONE"){
cv.util.hide("CP_backgroundColorWrapper");
cv.util.hide("CP_backgroundColorEndWrapper");
}else{
if(type=="SOLID"){
cv.util.show("CP_backgroundColorWrapper");
cv.util.hide("CP_backgroundColorEndWrapper");
}else{
if(type=="GRADIENT"){
cv.util.show("CP_backgroundColorWrapper");
cv.util.show("CP_backgroundColorEndWrapper");
}
}
}
},toggleDisplayUnits:function(){
var _201=dojo.byId("CP_displayUnits").value;
_201=_201.substring(6);
var _202=this.lastScale-_201;
this.lastScale=_201;
if(dojo.byId("CP_valueAxisLowerLimit").value){
dojo.byId("CP_valueAxisLowerLimit").value=dojo.byId("CP_valueAxisLowerLimit").value*Math.pow(10,_202);
}
if(dojo.byId("CP_valueAxisUpperLimit").value){
dojo.byId("CP_valueAxisUpperLimit").value=dojo.byId("CP_valueAxisUpperLimit").value*Math.pow(10,_202);
}
},selectColor:function(_203){
var _204;
if(!cv.util.isHidden("CP_labelColorPalette")){
_204="CP_labelColor";
}else{
if(!cv.util.isHidden("CP_backgroundColorPalette")){
_204="CP_backgroundColor";
}else{
if(!cv.util.isHidden("CP_backgroundColorEndPalette")){
_204="CP_backgroundColorEnd";
}else{
if(!cv.util.isHidden("CP_legendColorPalette")){
_204="CP_legendColor";
}else{
if(!cv.util.isHidden("CP_legendBackgroundColorPalette")){
_204="CP_legendBackgroundColor";
}
}
}
}
}
dojo.byId(_204).value=_203;
dojo.html.setStyle(dojo.byId(_204+"Div"),"background-color",_203);
cv.util.hide(_204+"Palette");
},hideColorPalettes:function(evt){
cv.util.hide("CP_labelColorPalette");
cv.util.hide("CP_backgroundColorPalette");
cv.util.hide("CP_backgroundColorEndPalette");
cv.util.hide("CP_legendBackgroundColorPalette");
cv.util.hide("CP_legendColorPalette");
},apply:function(){
this.save(true);
this.applied=true;
},cancel:function(){
if(this.applied){
var _205=this.report.reportDoc;
for(var prop in this.originalOptions){
_205.setChartOption(prop,this.originalOptions[prop]);
}
this.report.refreshReport();
}
cv.Dialog.prototype.cancel.call(this);
}});
dojo.declare("cv.FilterDialog",cv.Dialog,function(_206){
this.report=_206;
this.dlgTemplate=null;
this.prefix="FT_";
this.filterTypes=["FILTER_METRIC","FILTER_PICKLIST","FILTER_MATCH","FILTER_PRESET","FILTER_RANGE"];
},{destroy:function(){
this.clear();
},clear:function(){
this.gem=null;
this.type=null;
this.attribute=null;
this.attributeType=null;
this.isTimeAttribute=false;
this.metric=null;
this.ordinal=0;
this.filterProps=null;
this.parentFilterMsg=null;
this.asyncRequestId=null;
this.asyncMode=false;
this.searchCache=new Array(30);
this.searchCacheTopIndex=-1;
this.searchRequestId=null;
this.valueListNode=null;
this.search=null;
},show:function(_207,_208){
if(dojo.lang.isString(_207)&&_207.indexOf("filter_metric")==0){
return this.showMetricFilter();
}else{
if(cv.getFieldHelp().get(_207,"type")=="NUMBER"||(dojo.lang.isString(_207)&&_207.indexOf("[MEASURE:")==0)){
return this.showMetricFilter(_207);
}
}
this.clear();
if(_207.indexOf("filter_")==0){
var reg=/^filter_(.+)_(\d)$/;
var _209=reg.exec(_207);
if(!_209){
return false;
}
this.attribute=_209[1];
this.ordinal=_209[2];
}else{
this.attribute=_207;
_208=parseInt(_208);
if(!isNaN(_208)&&_208>0){
this.ordinal=_208;
}
}
this.attributeType=cv.getFieldHelp().get(this.attribute,"type");
if(!this.attributeType){
return;
}
this.isTimeAttribute=cv.getFieldHelp().isTimeAttribute(this.attribute);
this.gem=this.report.getGem("filter_"+this.attribute);
if(this.gem){
if(this.gem.isLocked(true)){
return;
}
this.filterProps=this.report.reportDoc.getFilterProps(this.gem.xmlNode);
}else{
if(!this.report.getGem(this.attribute)){
var _20a=this.report.getTrendNumberOnAncestors(this.attribute);
if(_20a){
this.showError(["errorAddFilterWithTrendOnAncestor",this.report.getFieldLabel(this.attribute),this.report.getFieldLabel(_20a.ancestor),_20a.trend.getDisplayLabel()]);
return false;
}
}
this.filterProps={type:this.type,formula:this.attribute,predicates:new dojo.collections.Dictionary()};
}
if(this.ordinal==0){
this.type=this.isTimeAttribute?"FILTER_PRESET":"FILTER_PICKLIST";
}else{
var pred=this.filterProps.predicates.item(this.ordinal)[0];
switch(pred.op){
case "CONTAIN":
case "NOT_CONTAIN":
this.type="FILTER_MATCH";
break;
case "BEFORE":
case "AFTER":
case "BETWEEN":
this.type="FILTER_RANGE";
break;
case "EQUAL":
case "NOT_EQUAL":
this.type=(this.isTimeAttribute&&pred.preset)?"FILTER_PRESET":"FILTER_PICKLIST";
break;
case "TIME_YAGO":
case "TIME_AHEAD":
case "TIME_AGO":
case "TIME_RANGE_NEXT":
case "TIME_RANGE_PREV":
this.type="FILTER_PRESET";
break;
default:
return;
}
}
this.dlgTemplate="filterPredicateDlg.html";
this.helpTopic="CV/Business_User/working_with_filters.html#filters_on_text_fields";
var _20b=this.report.getFieldLabel(this.attribute)?this.report.getFieldLabel(this.attribute):this.report.getFieldLabelPlural(this.attribute);
var _20c=cv.getFieldHelp().get(this.attribute,"type");
var _20d;
if(_20c=="TIME_DATE"){
_20d=this.load(_20b,"Today","Yesterday","Tomorrow");
}else{
_20d=this.load(_20b,"Current "+_20b,"Previous "+_20b,"Next "+_20b);
}
if(!_20d){
this.report.showReportStatus(this.status);
return;
}
var _20e=dojo.byId(this.isTimeAttribute?"FT_filterTypeText":"FT_filterTypeTime");
cv.util.removeNode(_20e);
_20e=dojo.byId(this.isTimeAttribute?"FT_filterTypeTime":"FT_filterTypeText");
dojo.event.connectOnce(_20e,"onclick",this,"_setFilterType");
this.valueListNode=dojo.byId("FT_valueList");
dojo.html.disableSelection(this.valueListNode);
if(!this.report.manager.applyReportContextInFilterDialog){
var heir=cv.getFieldHelp().getHierarchy(this.attribute);
if(heir){
var _20f=null;
for(var x=0;heir&&x<heir.length;++x){
var id=heir[x];
if(id==this.attribute){
break;
}
if(this.report.getGem("filter_"+id)){
_20f=id;
}
}
this.parentFilterMsg=_20f?dojo.string.substituteParams(cvCatalog.dlgInfoFilterOnParent,this.report.getFieldLabel(_20f)):null;
}
}
if(!this._setFilterType(this.type)){
return;
}
this.showDialog();
},save:function(){
if(dojo.byId("dlgBtnSave").disabled){
return;
}
if(!this._validateParameter()){
return;
}
var ok=false;
switch(this.type){
case "FILTER_METRIC":
ok=this._saveMetricFilter();
break;
case "FILTER_PICKLIST":
ok=this._savePicklistFilter(true);
break;
case "FILTER_MATCH":
ok=this._saveMatchFilter(true);
break;
case "FILTER_PRESET":
ok=this._savePresetFilter(true);
break;
case "FILTER_RANGE":
ok=this._saveRangeFilter(true);
break;
default:
return;
}
if(!ok){
return;
}
cv.dlgWidget.hide();
if(this.filterProps){
this.report.addToCheckFieldList(this.filterProps.formula);
this.report.reportDoc.updateFilter(this.filterProps);
this.report.populateFilters();
this.report.resizeContainer();
this.report.history.add(new cv.ReportState("actionEditFilter"));
if(this.report.reportStatus!="errorReportDefinition"){
this.report.refreshReport();
}
this.valueListNode=null;
}
},showAttrSelection:function(_210,_211,_212){
var gem=this.report.getGem("filter_"+_210);
if(!gem){
return;
}
if(!gem.isLocked(true)&&this.report.mode=="EDIT"){
return this.show(_210,_211);
}
this.type="filter_selection";
this.attribute=_210;
this.dlgTemplate="filterAttrViewDlg.html";
this.helpTopic=null;
if(!this.load(this.report.getFieldLabel(_210),_212)){
return;
}
var _213=dojo.byId("FT_memberList");
var _214=this.report.reportDoc.getFilterProps(gem.xmlNode);
_213.innerHTML=this._formatValueList(_214.predicates.item(_211)[0].members,"SELECTED");
this.showDialog();
},_setFilterType:function(e){
var ok=true,op=null;
if(dojo.lang.isString(e)&&e.indexOf("FILTER_")==0){
this.type=e;
this.updateHtml("filterType",e);
}else{
if(!e.target){
return;
}
if(e.target.tagName=="INPUT"){
this.type=this.getRadioGroupValue("FT_filterType");
}else{
if(e.target.tagName=="A"){
switch(e.target.id){
case "FT_filterOp_PRESET_EQUAL":
case "FT_filterOp_PRESET_NOT_EQUAL":
this.type="FILTER_PRESET";
op=e.target.id.substr(19);
break;
case "FT_filterOp_EQUAL":
case "FT_filterOp_NOT_EQUAL":
this.type="FILTER_PICKLIST";
op=e.target.id.substr(12);
break;
case "FT_filterOp_CONTAIN":
case "FT_filterOp_NOT_CONTAIN":
this.type="FILTER_MATCH";
op=e.target.id.substr(12);
break;
case "FT_filterOp_AFTER":
case "FT_filterOp_BEFORE":
case "FT_filterOp_BETWEEN":
this.type="FILTER_RANGE";
this.type="FILTER_RANGE";
op=e.target.id.substr(12);
break;
default:
return ok;
}
this.updateHtml("filterType",this.type);
}
}
}
this._showFilterTab();
switch(this.type){
case "FILTER_PICKLIST":
ok=this._initPicklistFilter(op);
break;
case "FILTER_MATCH":
ok=this._initMatchFilter(op);
break;
case "FILTER_PRESET":
ok=this._initPresetFilter(op);
break;
case "FILTER_RANGE":
ok=this._initRangeFilter(op);
break;
default:
}
return ok;
},_showFilterTab:function(){
for(var x=1;x<this.filterTypes.length;++x){
if(this.filterTypes[x]==this.type){
cv.util.show(this.prefix+this.filterTypes[x]);
}else{
cv.util.hide(this.prefix+this.filterTypes[x]);
}
}
},_initPresetFilter:function(op){
this.defaultMsg=null;
this.displayMsg();
var pred;
var opr;
var _215;
var _216,_217;
if(this.ordinal>0){
var _218=this.filterProps.predicates.item(this.ordinal);
for(var j=0;j<_218.length;j++){
pred=_218[j];
opr=pred.op;
_215=pred.preset;
if(pred.parameterName){
this._setParameterName(pred.parameterName);
}
if(!_215&&opr!="TIME_YAGO"){
continue;
}
switch(opr){
case "EQUAL":
var apos=_215.split(",");
for(var x=0;x<apos.length;++x){
if(apos[x]=="-1"){
_216=dojo.byId("FT_PREVIOUS_TIME");
}else{
if(apos[x]=="0"){
_216=dojo.byId("FT_CURRENT_TIME");
}else{
if(apos[x]=="-4"||apos[x]=="-12"){
_216=dojo.byId("FT_TIME_YAGO");
}else{
_216=dojo.byId("FT_NEXT_TIME");
}
}
}
_216.checked=true;
}
break;
case "TIME_YAGO":
dojo.byId("FT_TIME_YAGO").checked=true;
break;
case "TIME_RANGE_PREV":
dojo.byId("FT_TIME_RANGE_PREV").checked=true;
dojo.byId("FT_TIME_RANGE_PREV_NUM").value=_215;
break;
case "TIME_AGO":
dojo.byId("FT_TIME_AGO").checked=true;
dojo.byId("FT_TIME_AGO_NUM").value=_215;
break;
case "TIME_RANGE_NEXT":
dojo.byId("FT_TIME_RANGE_NEXT").checked=true;
dojo.byId("FT_TIME_RANGE_NEXT_NUM").value=_215;
break;
case "TIME_AHEAD":
dojo.byId("FT_TIME_AHEAD").checked=true;
dojo.byId("FT_TIME_AHEAD_NUM").value=_215;
break;
default:
}
}
}
_216=dojo.byId("FT_TIME_RANGE_PREV");
dojo.byId("FT_TIME_RANGE_PREV_NUM").disabled=!(_216.checked);
dojo.event.connectOnce(_216,"onclick",this,"_switchPreset");
_216=dojo.byId("FT_TIME_AGO");
dojo.byId("FT_TIME_AGO_NUM").disabled=!(_216.checked);
dojo.event.connectOnce(_216,"onclick",this,"_switchPreset");
_216=dojo.byId("FT_TIME_RANGE_NEXT");
dojo.byId("FT_TIME_RANGE_NEXT_NUM").disabled=!(_216.checked);
dojo.event.connectOnce(_216,"onclick",this,"_switchPreset");
_216=dojo.byId("FT_TIME_AHEAD");
dojo.byId("FT_TIME_AHEAD_NUM").disabled=!(_216.checked);
dojo.event.connectOnce(_216,"onclick",this,"_switchPreset");
cv.util.show("FT_PARAMETER");
dojo.event.connectOnce(dojo.byId("FT_PARAMETER_ENABLE"),"onclick",this,"_toggleParameterCheckbox");
if(this.attributeType=="TIME_YEAR"){
dojo.html.addClass(dojo.byId("TD_FT_TIME_YAGO"),"hidden");
}else{
dojo.html.removeClass(dojo.byId("TD_FT_TIME_YAGO"),"hidden");
}
return true;
},_switchPreset:function(evt){
var _219=evt.target.id;
var cked=evt.target.checked;
var _21a;
switch(_219){
case "FT_TIME_RANGE_PREV":
_21a=dojo.byId("FT_TIME_RANGE_PREV_NUM");
break;
case "FT_TIME_AGO":
_21a=dojo.byId("FT_TIME_AGO_NUM");
break;
case "FT_TIME_RANGE_NEXT":
_21a=dojo.byId("FT_TIME_RANGE_NEXT_NUM");
break;
case "FT_TIME_AHEAD":
_21a=dojo.byId("FT_TIME_AHEAD_NUM");
break;
}
if(!cked){
_21a.value="";
_21a.disabled=true;
dojo.html.removeClass(_21a,"inputNum invalid");
}else{
_21a.disabled=false;
_21a.focus();
}
},_savePresetFilter:function(){
if(dojo.byId("FT_TIME_RANGE_PREV").checked&&!this._validatePreset(dojo.byId("FT_TIME_RANGE_PREV_NUM").value)){
dojo.byId("FT_TIME_RANGE_PREV_NUM").focus();
dojo.html.addClass(dojo.byId("FT_TIME_RANGE_PREV_NUM"),"inputNum invalid");
return false;
}
if(dojo.byId("FT_TIME_AGO").checked&&!this._validatePreset(dojo.byId("FT_TIME_AGO_NUM").value)){
dojo.byId("FT_TIME_AGO_NUM").focus();
dojo.html.addClass(dojo.byId("FT_TIME_AGO_NUM"),"inputNum invalid");
return false;
}
if(dojo.byId("FT_TIME_RANGE_NEXT").checked&&!this._validatePreset(dojo.byId("FT_TIME_RANGE_NEXT_NUM").value)){
dojo.byId("FT_TIME_RANGE_NEXT_NUM").focus();
dojo.html.addClass(dojo.byId("FT_TIME_RANGE_NEXT_NUM"),"inputNum invalid");
return false;
}
if(dojo.byId("FT_TIME_AHEAD").checked&&!this._validatePreset(dojo.byId("FT_TIME_AHEAD_NUM").value)){
dojo.byId("FT_TIME_AHEAD_NUM").focus();
dojo.html.addClass(dojo.byId("FT_TIME_AHEAD_NUM"),"inputNum invalid");
return false;
}
if(!dojo.byId("FT_TIME_RANGE_PREV").checked&&!dojo.byId("FT_TIME_AGO").checked&&!dojo.byId("FT_TIME_RANGE_NEXT").checked&&!dojo.byId("FT_CURRENT_TIME").checked&&!dojo.byId("FT_PREVIOUS_TIME").checked&&!dojo.byId("FT_NEXT_TIME").checked&&!dojo.byId("FT_TIME_AHEAD").checked&&(dojo.html.getClass(dojo.byId("TD_FT_TIME_YAGO"))=="hidden"||(dojo.html.getClass(dojo.byId("TD_FT_TIME_YAGO"))!="hidden"&&!dojo.byId("FT_TIME_YAGO").checked))){
this.report.removeFilter("filter_"+this.filterProps.formula+"_"+this.ordinal);
return false;
}
var _21b;
if(dojo.byId("FT_PREVIOUS_TIME").checked){
_21b="-1";
}
if(dojo.byId("FT_CURRENT_TIME").checked){
_21b=_21b?_21b+",0":"0";
}
if(dojo.byId("FT_NEXT_TIME").checked){
_21b=_21b?_21b+",1":"1";
}
var _21c=[];
if(_21b){
_21c.push({ordinal:this.ordinal,op:"EQUAL",preset:_21b,rela_filter:1});
}
if(dojo.byId("FT_TIME_YAGO").checked){
_21c.push({ordinal:this.ordinal,op:dojo.byId("FT_TIME_YAGO").value,rela_filter:1});
}
if(dojo.byId("FT_TIME_RANGE_PREV").checked){
_21c.push({ordinal:this.ordinal,op:dojo.byId("FT_TIME_RANGE_PREV").value,preset:dojo.byId("FT_TIME_RANGE_PREV_NUM").value,rela_filter:1});
}
if(dojo.byId("FT_TIME_RANGE_NEXT").checked){
_21c.push({ordinal:this.ordinal,op:dojo.byId("FT_TIME_RANGE_NEXT").value,preset:dojo.byId("FT_TIME_RANGE_NEXT_NUM").value,rela_filter:1});
}
if(dojo.byId("FT_TIME_AGO").checked){
_21c.push({ordinal:this.ordinal,op:dojo.byId("FT_TIME_AGO").value,preset:dojo.byId("FT_TIME_AGO_NUM").value,rela_filter:1});
}
if(dojo.byId("FT_TIME_AHEAD").checked){
_21c.push({ordinal:this.ordinal,op:dojo.byId("FT_TIME_AHEAD").value,preset:dojo.byId("FT_TIME_AHEAD_NUM").value,rela_filter:1});
}
if(_21c.length>0){
_21c[0].parameterName=dojo.byId("FT_PARAMETER_NAME").value;
this.report.updateRelativeFilterProps(this.filterProps,_21c);
}
return true;
},_validatePreset:function(data){
if(!cv.util.checkNumber(data,false)||parseInt(data)<=0||parseInt(data)>180){
this.displayError("Please input a number between 1 and 180");
return false;
}
return true;
},_setPresetMenu:function(node){
if(node.childNodes.length>1){
return;
}
node.innerHTML="";
var _21d=cvCatalog["filterPreset"+this.attributeType];
for(var x in _21d){
cv.addOption(node,new Option(_21d[x],x));
}
node.childNodes[0].selected=true;
},_initRangeFilter:function(op){
cv.util.hide("FT_PARAMETER");
this.defaultMsg=this.parentFilterMsg;
this.displayMsg();
dojo.lang.setTimeout(this,"_loadRangeFilter",0,op);
return true;
},_loadRangeFilter:function(op){
this.asyncMode=true;
this._loadAttributeMembers();
var _21e=dojo.byId("FT_rangeOp");
if(_21e.disabled){
return;
}
var _21f=dojo.byId("FT_range1"),_220=dojo.byId("FT_range2");
dojo.event.connectOnce(_21e,"onchange",this,"_onChangeRangeOp");
var pred=(this.ordinal>0)?this.filterProps.predicates.item(this.ordinal)[0]:null;
if(pred&&(pred.op=="BETWEEN"||pred.op=="AFTER"||pred.op=="BEFORE")){
_21e.value=pred.op;
_21f.value=pred.members[0].formula;
if(pred.op=="BETWEEN"){
_220.value=pred.members[1].formula;
}else{
_220.options[_220.options.length-1].selected=true;
}
}else{
_21f.options[0].selected=true;
_220.options[_220.options.length-1].selected=true;
}
if(op){
_21e.value=op;
}
this._onChangeRangeOp();
},_saveRangeFilter:function(){
var op=dojo.byId("FT_rangeOp").value;
var _221=dojo.byId("FT_range1").options[dojo.byId("FT_range1").selectedIndex];
var _222=[{"formula":_221.value,"caption":_221.text}];
if(!_222[0]){
this.displayMsg(cvCatalog.dlgErrFilterInvalidValue);
return false;
}
if(op=="BETWEEN"){
_221=dojo.byId("FT_range2").options[dojo.byId("FT_range2").selectedIndex];
_222.push({"formula":_221.value,"caption":_221.text});
}
this.report.updateFilterProps(this.filterProps,{ordinal:this.ordinal,op:op,preset:null,members:_222});
return true;
},_onChangeRangeOp:function(){
if(!cv.util.isHidden("FT_range1_row")&&dojo.byId("FT_rangeOp").value=="BETWEEN"){
cv.util.show("FT_range2_row");
}else{
cv.util.hide("FT_range2_row");
}
},_initPicklistFilter:function(op){
this.defaultMsg=this.parentFilterMsg;
this.displayMsg();
this.memberListNode=dojo.byId("FT_memberList");
dojo.html.disableSelection(this.memberListNode);
this.search=dojo.byId("FT_searchText");
this.asyncMode=false;
this._loadAttributeMembers();
var _223=dojo.byId("FT_picklistOp");
dojo.event.connectOnce(_223,"onchange",this,"_onChangePicklistOp");
dojo.event.connectOnce(this.valueListNode,"onclick",this,"_onClickList");
dojo.event.connectOnce(this.valueListNode,"ondblclick",this,"_addMembers");
dojo.event.connectOnce(this.memberListNode,"onclick",this,"_onClickList");
dojo.event.connectOnce(this.memberListNode,"ondblclick",this,"_removeMembers");
dojo.event.connectOnce(dojo.byId("FT_searchBy"),"onclick",this,"_searchValueList");
dojo.event.connectOnce(dojo.byId("FT_select_add"),"onclick",this,"_addMembers");
dojo.event.connectOnce(dojo.byId("FT_select_addAll"),"onclick",this,"_addMembers");
dojo.event.connectOnce(dojo.byId("FT_select_remove"),"onclick",this,"_removeMembers");
dojo.event.connectOnce(dojo.byId("FT_select_removeAll"),"onclick",this,"_removeMembers");
dojo.event.connectOnce(dojo.byId("FT_PARAMETER_ENABLE"),"onclick",this,"_toggleParameterCheckbox");
cv.util.show("FT_PARAMETER");
var pred=(this.ordinal>0)?this.filterProps.predicates.item(this.ordinal)[0]:null;
if(pred&&(pred.op=="EQUAL"||pred.op=="NOT_EQUAL")&&!pred.preset){
_223.value=pred.op;
this.memberListNode.innerHTML=this._formatValueList(pred.members,"SELECTED");
if(pred.parameterName){
this._setParameterName(pred.parameterName);
}
}
if(op){
_223.value=op;
}
if(!_223.value){
_223.options[0].selected=true;
}
this._onChangePicklistOp();
return true;
},_savePicklistFilter:function(){
var _224=this._getSelectionList();
if(_224.count==0){
this.displayMsg(cvCatalog.dlgErrFilterNoSelection);
return false;
}
var _225=this.report.updateFilterProps(this.filterProps,{ordinal:this.ordinal,op:dojo.byId("FT_picklistOp").value,members:_224.toArray()});
_225.parameterName=dojo.byId("FT_PARAMETER_NAME").value;
if(_225.members.length>cvConst.MAX_FILTER_MEMBERS){
this.displayMsg(cvCatalog.dlgErrFilterMaxMembers,cvConst.MAX_FILTER_MEMBERS);
if(_225.ordinal>0&&_225.ordinal!=this.ordinal){
this.memberListNode.innerHTML=this._formatValueList(_225.members,"SELECTED");
this.ordinal=_225.ordinal;
}
return false;
}
return true;
},_onChangePicklistOp:function(){
dojo.html.removeClass(this.memberListNode,"excluded");
dojo.html.removeClass(this.memberListNode,"included");
var css=(dojo.byId("FT_picklistOp").value=="EQUAL")?"included":"excluded";
dojo.html.addClass(this.memberListNode,css);
},_addMembers:function(e){
if(!dojo.lang.isObject(this.searchCache[0])){
return;
}
var _226;
switch(e.target.id){
case "FT_select_add":
if(!this.valueListNode.selection){
return;
}
_226=this.valueListNode.selection.toArray();
break;
case "FT_select_addAll":
_226=this.valueListNode.getElementsByTagName("DIV");
break;
default:
if(e.target.id.indexOf("FT_AVA_")!=0){
return;
}
_226=[e.target];
break;
}
if(_226.length==0){
return;
}
var _227=this._getSelectionList();
var _228=_227.count;
var _229={};
for(var x=0;x<_228;++x){
_229[_227.item(x).formula]=true;
}
for(var x=0;x<_226.length;++x){
var node=_226[x];
if(!node.id){
continue;
}
var _22a=node.id.substring(7);
while(_22a&&_22a.indexOf("\"")>-1){
_22a=_22a.replace("\"","&quot;");
}
if(_229[_22a]){
continue;
}
var _22b=dojo.html.createNodesFromText("<div id=\"FT_SEL_"+_22a+"\">"+node.innerHTML+"</div>");
this.memberListNode.appendChild(_22b[0]);
++_228;
}
if(_228>cvConst.MAX_FILTER_MEMBERS){
this.displayMsg(cvCatalog.dlgErrFilterMaxMembers,cvConst.MAX_FILTER_MEMBERS);
}
dojo.byId("FT_memberListStat").innerHTML=dojo.string.substituteParams(cvCatalog[_228<=1?"filterSelectionSummarySingle":"filterSelectionSummaryAll"],_228);
},_removeMembers:function(e){
var _22c=this.memberListNode.getElementsByTagName("DIV");
var _22d=_22c.length;
switch(e.target.id){
case "FT_select_remove":
if(!this.memberListNode.selection){
return;
}
var _22c=this.memberListNode.selection.toArray();
_22d-=_22c.length;
break;
case "FT_select_removeAll":
_22d=0;
break;
default:
if(e.target.id.indexOf("FT_SEL_")!=0){
return;
}
_22c=[e.target];
--_22d;
break;
}
if(_22c.length==0){
return false;
}
for(var x=_22c.length-1;x>=0;--x){
this.memberListNode.removeChild(_22c[x]);
if(this.memberListNode.selection){
this.memberListNode.selection.clear();
}
}
dojo.byId("FT_memberListStat").innerHTML=dojo.string.substituteParams(cvCatalog[_22d<=1?"filterSelectionSummarySingle":"filterSelectionSummaryAll"],_22d);
return false;
},_onClickList:function(e){
var node=e.target;
if(node.id=="FT_valueList"){
node.focus();
}
var list=cv.util.getAncestorByClass(node,"selectableList");
if(!list||list==node){
return;
}
if(list.selection){
for(var x=0,len=list.selection.count;x<len;++x){
dojo.html.removeClass(list.selection.item(x),"selected");
}
}
if(!list.selection||!(e.ctrlKey||e.shiftKey)){
if(!list.selection){
list.selection=new dojo.collections.ArrayList();
}else{
list.selection.clear();
}
list.selection.add(node);
}else{
if(e.ctrlKey){
if(list.selection.contains(node)){
list.selection.remove(node);
}else{
list.selection.add(node);
}
}else{
if(e.shiftKey){
var it=list.selection.item(0);
var _22e,end;
if(dojo.html.abs(it).y>dojo.html.abs(node).y){
_22e=node;
end=it;
}else{
_22e=it;
end=node;
}
var divs=list.getElementsByTagName("DIV");
var add=false;
list.selection.clear();
list.selection.add(it);
for(var x=0,len=divs.length;x<len;++x){
if(divs[x]==_22e){
add=true;
}
if(add&&divs[x]!=it){
list.selection.add(divs[x]);
dojo.html.addClass(node,"selected");
}
if(divs[x]==end){
break;
}
}
}
}
}
for(var x=0,len=list.selection.count;x<len;++x){
dojo.html.addClass(list.selection.item(x),"selected");
}
},_loadAttributeMembers:function(){
if(dojo.lang.isObject(this.searchCache[0])){
return;
}
this.valueListNode.innerHTML="<span style='margin-left:5px'><img src='images/indicator_circle_ball.gif'>&nbsp;"+cvCatalog.progressLoading+"</span>";
this.searchRequestId=this.asyncRequestId=this._initGetMembersRequest("");
if(this.asyncRequestId){
this._getMembers({requestId:this.asyncRequestId,timeout:1,search:""});
}
},_searchValueList:function(e){
var key=this.search.value;
var len=key?key.length:0;
if(key){
key=key.toLowerCase();
}
var _22f=this.searchCache[len];
if(this.valueListNode.selection){
this.valueListNode.selection.clear();
}
if(_22f&&(len==0||_22f.key==key)){
this.valueListNode.innerHTML=this._formatValueList(_22f.data,"AVAILABLE",_22f.count);
}else{
if(this.searchCacheTopIndex==0||(this.searchCacheTopIndex>0&&key&&key.indexOf(this.searchCache[this.searchCacheTopIndex].key)>=0)){
var _230=this.searchCache[this.searchCacheTopIndex].data;
var _231=[];
for(var x=0,_232=_230.length;x<_232;++x){
if(dojo.string.escape("HTML",_230[x].caption).toLowerCase().indexOf(key)>=0){
_231.push(_230[x]);
}
}
this.searchCache[key.length]={key:key,data:_231};
this.valueListNode.innerHTML=this._formatValueList(_231,"AVAILABLE");
}else{
if(this.searchRequestId){
cv.io.cancelAsyncRequest(this.searchRequestId);
}
this.valueListNode.innerHTML="<span style='margin-left:5px'><img src='images/indicator_circle_ball.gif'>&nbsp;"+cvCatalog.progressLoading+"</span>";
this.searchRequestId=this._initGetMembersRequest(key);
if(this.searchRequestId){
this._getMembers({requestId:this.searchRequestId,timeout:1,search:key});
}
}
}
e.preventDefault();
e.stopPropagation();
return false;
},_initGetMembersRequest:function(_233){
return cv.io.initAsyncRequest({reportXML:this.report.getReportXml(),action:"MEMBERS",attribute:this.attribute,search:_233,newFields:""});
},_getMembers:function(_234){
var _235=this;
_234.stok=cv.securityToken;
this.asyncRequest=dojo.io.bind({url:cv.contextPath+"ajax/getMembers",content:_234,handle:function(type,data,evt){
if(!cv.dlgWidget.isShowing()){
return;
}
_235.status=null;
if(type=="load"){
if(_235.searchRequestId&&_235.searchRequestId!=_234.requestId){
return;
}
if(data){
_235.asyncRequestId=_235.asyncRequest=_235.searchRequestId=null;
_235.searchCacheTopIndex=(!data.count||data.values.length==data.count)?_234.search.length:-1;
if(_234.search.length>0){
_235.searchCache[_234.search.length]={key:_234.search,data:data.values,count:data.count};
}else{
_235.searchCache[0]={key:null,data:data.values,count:data.count};
if(_235.isTimeAttribute){
var _236=dojo.byId("FT_range1"),_237=dojo.byId("FT_range2");
_236.innerHTML=_237.innerHTML="";
cv.util.hide("FT_rangeLoading");
cv.util.show("FT_range1_row","FT_range2_row");
for(var x=0,len=data.values.length;x<len;++x){
var _238=dojo.string.escape("HTML",data.values[x].caption);
var _239=data.values[x].formula;
cv.addOption(_236,new Option(_238,_239));
cv.addOption(_237,new Option(_238,_239));
}
if(data.values.length<data.count){
cv.util.show("FT_rangeWarning");
dojo.byId("FT_rangeWarningText").innerHTML=dojo.string.substituteParams(cvCatalog["dlgAttributeFilterTooManyValues"],data.values.length);
}
}
}
_235.valueListNode.innerHTML=_235._formatValueList(data.values,"AVAILABLE",data.count);
}else{
_234.timeout=1;
_235.asyncRequest=null;
dojo.lang.setTimeout(_235,"_getMembers",5000,_234,1);
}
}else{
_235.asyncRequestId=_235.asyncRequest=_235.searchRequestId=null;
_235.status="dlgErrGeneric";
}
if(_235.status){
_235.displayMsg(cvCatalog[_235.status]);
}
},mimetype:"text/json",method:"POST",sync:this.asyncMode,encoding:"utf8"});
},_formatValueList:function(_23a,_23b,_23c){
var len=_23a?_23a.length:0;
var _23d,str="",_23e;
if(_23b=="SELECTED"){
_23d=dojo.byId("FT_memberListStat");
_23e="filterSelectionSummary";
}else{
_23d=dojo.byId("FT_valueListStat");
_23e=(this.search&&this.search.value)?"filterMatchesSummary":"filterValuesSummary";
}
if(_23d){
if(!_23c||(_23c>=0&&_23c<=len)){
_23d.innerHTML=dojo.string.substituteParams(cvCatalog[_23e+(len<=1?"Single":"All")],len);
}else{
_23d.innerHTML=dojo.string.substituteParams(cvCatalog[_23e+(_23c==-1?"PartialFirst":"Partial")],len,_23c);
}
}
for(var x=0;x<len;++x){
var val=dojo.string.escape("HTML",_23a[x].formula);
var _23f=dojo.string.escape("HTML",_23a[x].caption);
if(_23b=="SELECTED"){
str+="<div id=\"FT_SEL_"+val+"\">"+_23f+"</div>";
}else{
if(_23b=="AVAILABLE"){
str+="<div id=\"FT_AVA_"+val+"\">"+_23f+"</div>";
}else{
return "";
}
}
}
if(_23c>len){
str+="<div style='font-size:92%'>"+cvCatalog.filterHintForFind+"</div>";
}
return str;
},_getSelectionList:function(){
var _240=this.memberListNode.getElementsByTagName("DIV");
var _241=new dojo.collections.ArrayList();
for(var x=0,len=_240.length;x<len;++x){
_241.add({"formula":_240[x].id.substring(7),"caption":dojo.dom.textContent(_240[x])});
}
return _241;
},_initMatchFilter:function(op){
this.defaultMsg=null;
this.displayMsg();
var _242=dojo.byId("FT_matchOp");
var tbl=dojo.byId("FT_FILTER_MATCH");
dojo.event.connectOnce(tbl,"onclick",this,"_onClickMatchTbl");
dojo.event.connectOnce(dojo.byId("FT_exp_add"),"onclick",this,"_addExpressionItem");
dojo.event.connectOnce(dojo.byId("FT_PARAMETER_ENABLE"),"onclick",this,"_toggleParameterCheckbox");
cv.util.show("FT_PARAMETER");
this.defaultFocus=dojo.byId("FT_expression_0");
var pred=(this.ordinal>0)?this.filterProps.predicates.item(this.ordinal)[0]:null;
if(pred&&(pred.op=="CONTAIN"||pred.op=="NOT_CONTAIN")){
_242.value=pred.op;
if(pred.exp){
for(var x=0;x<pred.exp.length;++x){
this._createExpressionItem(pred.exp[x],x+"");
}
}
if(pred.parameterName){
this._setParameterName(pred.parameterName);
}
}
if(op){
_242.value=op;
}
if(!_242.value){
_242.options[0].selected=true;
}
return true;
},_saveMatchFilter:function(){
var list=this._getExpressionList();
if(list.length==0){
this.displayMsg(cvCatalog.dlgErrFilterRequiredExpression);
return false;
}
var _243=this.report.updateFilterProps(this.filterProps,{ordinal:this.ordinal,op:dojo.byId("FT_matchOp").value,exp:list});
_243.parameterName=dojo.byId("FT_PARAMETER_NAME").value;
if(_243.exp.length>cvConst.MAX_FILTER_EXPRESSIONS){
this.displayMsg(cvCatalog.dlgErrFilterMaxExpressions,cvConst.MAX_FILTER_EXPRESSIONS);
if(_243.ordinal>0&&_243.ordinal!=this.ordinal){
for(var x=0;x<cvConst.MAX_FILTER_EXPRESSIONS;++x){
this._createExpressionItem(_243.exp[x],x+"");
}
this.ordinal=_243.ordinal;
}
return false;
}
return true;
},_addExpressionItem:function(){
var tbl=dojo.byId("FT_FILTER_MATCH");
if(tbl.rows.length==cvConst.MAX_FILTER_EXPRESSIONS+1){
this.displayMsg(cvCatalog.dlgErrFilterMaxExpressions,cvConst.MAX_FILTER_EXPRESSIONS);
return;
}
this._createExpressionItem();
},_onClickMatchTbl:function(e){
if(!(e.target&&e.target.id)){
return;
}
var id=e.target.id;
if(id.indexOf("FT_exp_remove_")==0){
var tbl=dojo.byId("FT_FILTER_MATCH");
var len=tbl.rows.length;
if(len==2){
return;
}
id=parseInt(id.substr(14));
for(var x=id;x<len-2;++x){
dojo.byId("FT_expression_"+x).value=dojo.byId("FT_expression_"+(x+1)).value;
}
if(len==3){
dojo.html.removeClass(tbl,"FT_multiExp");
}
tbl.deleteRow(len-2);
}
},_getExpressionList:function(){
var list=[];
for(var x=0,len=dojo.byId("FT_FILTER_MATCH").rows.length-1;x<len;++x){
var val=dojo.byId("FT_expression_"+x).value;
if(val){
list.push(val);
}
}
return list;
},_createExpressionItem:function(exp,id){
var tbl=dojo.byId("FT_FILTER_MATCH");
if(id){
id=dojo.byId("FT_expression_"+id);
}
if(!id){
id=tbl.rows.length-1;
var tr=tbl.insertRow(id);
var td=tr.insertCell(0);
td.innerHTML=cvCatalog.filterTemplateExpressionOR;
dojo.html.setClass(td,"FT_expressionOR");
td=tr.insertCell(1);
td.innerHTML="<input type=\"text\" id=\"FT_expression_"+id+"\">";
dojo.html.setClass(td,"FT_expression");
td=tr.insertCell(2);
td.innerHTML="&nbsp;";
td.id="FT_exp_remove_"+id;
dojo.html.setClass(td,"FT_removeExp");
if(tbl.rows.length==3){
dojo.html.addClass(tbl,"FT_multiExp");
}
id=dojo.byId("FT_expression_"+id);
}
if(exp){
id.value=exp;
}
},_setParameterName:function(name){
dojo.byId("FT_PARAMETER_ENABLE").checked=true;
dojo.byId("FT_PARAMETER_NAME").disabled=false;
dojo.byId("FT_PARAMETER_NAME").value=name;
},_toggleParameterCheckbox:function(evt){
var cked=evt.target.checked;
var _244=dojo.byId("FT_PARAMETER_NAME");
if(!cked){
_244.value="";
_244.disabled=true;
dojo.html.removeClass(_244,"invalid");
}else{
_244.disabled=false;
_244.focus();
}
},_validateParameter:function(data){
if(this.type=="FILTER_METRIC"){
return true;
}
if(!dojo.byId("FT_PARAMETER_ENABLE").checked){
return true;
}
var text=dojo.byId("FT_PARAMETER_NAME");
if(text.value==""){
this.displayError("Please input a parameter name.");
text.focus();
dojo.html.addClass(text,"invalid");
return false;
}
return true;
}});
dojo.lang.extend(cv.FilterDialog,{showMetricFilter:function(_245,mode){
this.clear();
this.attributeType=this.type="FILTER_METRIC";
if(_245){
if(_245.indexOf("[MEASURE:")==0||cv.getFieldHelp().get(_245,"type")=="NUMBER"){
this.metric=_245;
}else{
this.attribute=_245;
}
}
if(!mode){
mode="CONDITIONS";
}
if(this._initMetricFilter(mode)){
this.showDialog();
}
},_initMetricFilter:function(mode){
this.helpTopic="CV/Business_User/working_with_filters.html#filters_on_number_fields";
if(!this.report.reportDoc.getNode("//cv:attribute")){
this.report.rptDlg.showError("errorNoAttributeInReport","CV/Business_User/working_with_filters.html#filters_on_number_fields");
return false;
}
this.type="FILTER_METRIC";
this.gem=this.report.getGem("filter_metric");
if(this.gem&&((this.attribute&&!this.report.reportDoc.isUsedByMetricFilter(this.attribute))||(this.metric&&!this.report.reportDoc.isUsedByMetricFilter(this.metric)))){
this.attribute=this.metric=null;
}
this.dlgTemplate="filterMetricDlg.html";
if(!this.load()){
this.report.showReportStatus(this.status);
return false;
}
this.filterProps=this.report.reportDoc.getMetricFilter();
this.rankCtrl=dojo.byId("FT_rank");
dojo.event.connect(this.rankCtrl,"onclick",cv.util,"onToggleSectionCheckbox");
var _246=dojo.byId("FT_rankMetric");
this.report.addOptionsForAllMeasures(_246);
if(this.filterProps){
this.attribute=this.filterProps.formula;
if(this.filterProps.rank){
_246.value=this.filterProps.rank.formula;
dojo.byId("FT_rankType").value=this.filterProps.rank.type;
dojo.byId("FT_rankCount").value=this.filterProps.rank.count;
}else{
if(mode!="RANK"){
cv.util.setSectionCollapsed("FT_rank");
}
}
}else{
if(this.metric){
_246.value=this.metric;
}
if(mode!="RANK"){
cv.util.setSectionCollapsed("FT_rank");
}
}
this.conditionsCtrl=dojo.byId("FT_conditions");
dojo.event.connect(this.conditionsCtrl,"onclick",cv.util,"onToggleSectionCheckbox");
dojo.event.connect(dojo.byId("FT_addCondition"),"onclick",this,"_editCondition");
dojo.event.connect(dojo.byId("FT_conditionsList"),"onclick",this,"_onClickConditionsList");
if(this.filterProps&&this.filterProps.conditions){
this.numConditions=this.filterProps.conditions.length;
for(var x=0;x<this.numConditions;++x){
this._updateCondition("FT_condition_"+x,true);
}
}else{
this.numConditions=1;
this._editCondition("FT_condition_0");
if(this.filterProps||mode=="RANK"){
cv.util.setSectionCollapsed("FT_conditions");
}
}
var _247=dojo.byId("FT_attribute");
this.report.addOptionsForAttributes(_247);
if(_247.options.length==1){
this.attribute=_247.options[0].value;
_247.parentNode.innerHTML=dojo.string.substituteParams(cvCatalog.filterMetricSubtitle,_247.options[0].innerHTML);
}else{
if(this.attribute){
_247.value=this.attribute;
}
dojo.event.connect(_247,"onchange",this,"_selectMetricFilterAttribute");
}
this._selectMetricFilterAttribute();
if(!this.filterProps){
this.filterProps={};
}
this.filterProps.type=this.type;
this.filterProps.old=this.attribute;
this.defaultFocus=dojo.byId(mode=="RANK"?"FT_rank":"FT_conditions");
return true;
},_saveMetricFilter:function(){
var _248=dojo.byId("FT_attribute");
this.filterProps.formula=_248?_248.value:this.attribute;
if(this.conditionsCtrl.checked){
if(this.selectedItem&&!this._updateCondition()){
return false;
}
var _249=this.filterProps.conditions;
for(var i=0;i<_249.length;++i){
if(_249[i]){
this.report.addToCheckFieldList(_249[i].formula);
}
}
}else{
this.filterProps.conditions=null;
}
if(this.rankCtrl.checked){
var _24a={formula:dojo.byId("FT_rankMetric").value,type:dojo.byId("FT_rankType").value,count:dojo.byId("FT_rankCount").value};
var err=this._validateRank(_24a);
if(err){
this.displayMsg(cvCatalog[err]);
return false;
}
_24a.count=parseInt(_24a.count);
this.filterProps.rank=_24a;
this.report.setSortOrder(_24a.formula,_24a.type=="BOTTOM"?"ASC":"DESC",false,true);
this.report.addToCheckFieldList(_24a.formula);
}else{
this.filterProps.rank=null;
}
if(!this.filterProps.conditions&&!this.filterProps.rank){
this.report.removeFilter("filter_metric_0");
this.filterProps=null;
}
return true;
},_editCondition:function(_24b){
if(!this._updateCondition()){
return;
}
var id;
if(!dojo.lang.isString(_24b)){
id=this.filterProps.conditions.length;
++this.numConditions;
_24b="FT_condition_"+id;
}else{
id=parseInt(this._getListItemIndex(_24b));
}
var cond=dojo.byId(_24b);
if(!cond){
cond=document.createElement("div");
dojo.byId("FT_conditionsList").appendChild(cond);
dojo.html.addClass(cond,"filterCondition");
cond.id=_24b;
}
dojo.html.addClass(cond,"filterConditionSelected");
cond.innerHTML=dojo.string.substituteParams(cvCatalog.filterConditionEdit,{GT:cvCatalog["filterConditionOperators_GREATER_THAN"],GTE:cvCatalog["filterConditionOperators_GREATER_THAN_EQUAL"],LT:cvCatalog["filterConditionOperators_LESS_THAN"],LTE:cvCatalog["filterConditionOperators_LESS_THAN_EQUAL"],E:cvCatalog["filterConditionOperators_EQUAL"],NE:cvCatalog["filterConditionOperators_NOT_EQUAL"],B:cvCatalog["filterConditionOperators_BETWEEN"],NE:cvCatalog["filterConditionOperators_NOT_EQUAL"]});
var _24c=dojo.byId("FT_condMetric");
this.report.addOptionsForAllMeasures(_24c);
var op=dojo.byId("FT_condOp");
dojo.event.connect(op,"onchange",this,"_setConditionOperands");
if(this.filterProps&&this.filterProps.conditions&&this.filterProps.conditions[id]){
var val=this.filterProps.conditions[id];
_24c.value=val.formula;
op.value=val.operator;
dojo.byId("FT_condOp1").value=val.op1;
dojo.byId("FT_condOp2").value=val.op2?val.op2:"";
}else{
if(this.metric){
_24c.value=this.metric;
}
}
this._setConditionOperands();
this.selectedItem=_24b;
},_updateCondition:function(_24d,_24e){
if(!_24d){
if(!this.selectedItem){
return true;
}
_24d=this.selectedItem;
}
var id=parseInt(this._getListItemIndex(_24d));
var cond=dojo.byId(_24d),_24f;
if(!cond){
if(!_24e){
return true;
}
cond=document.createElement("div");
dojo.byId("FT_conditionsList").appendChild(cond);
dojo.html.addClass(cond,"filterCondition");
cond.id=_24d;
_24f=this.filterProps.conditions[id];
}else{
if(!this.filterProps.conditions){
this.filterProps.conditions=[];
}
if(id==this.filterProps.conditions.length){
this.filterProps.conditions.push({});
}
_24f=this.filterProps.conditions[id];
_24f.formula=dojo.byId("FT_condMetric").value;
_24f.operator=dojo.byId("FT_condOp").value;
_24f.op1=dojo.byId("FT_condOp1").value;
_24f.op2=_24f.operator!="BETWEEN"?null:dojo.byId("FT_condOp2").value;
}
var err=this._validateCondition(_24f);
if(err){
this.displayMsg(cvCatalog[err]);
return false;
}else{
cond.innerHTML=dojo.string.substituteParams(cvCatalog.filterConditionStatic,{metric:this.report.getFieldLabel(_24f.formula),op:cvCatalog["filterConditionOperators_"+_24f.operator],op1:_24f.op1?_24f.op1:" ",op2:_24f.op2?_24f.op2:" ",op2Css:_24f.op2?" ":"hidden"});
dojo.html.removeClass(cond,"filterConditionSelected");
this.selectedItem=null;
this.displayMsg();
return true;
}
},_onClickConditionsList:function(e){
var node=e.target;
var cond=cv.util.getAncestorByClass(node,"filterCondition");
if(!cond){
return this._updateCondition();
}
if(dojo.html.hasClass(node,"filterConditionDelete")){
if(this.numConditions==1){
return this.displayMsg(cvCatalog.dlgErrFilterLastCondition);
}
var id=this._getListItemIndex(cond.id);
this.filterProps.conditions[id]=null;
if(this.selectedItem==cond.id){
this.selectedItem=null;
}
cv.util.removeNode(cond);
--this.numConditions;
return;
}
if(cond.id==this.selectedItem){
return;
}
if(this._updateCondition()){
this._editCondition(cond.id);
}
},_selectMetricFilterAttribute:function(){
var attr=dojo.byId("FT_attribute");
dojo.byId("FT_rankAttribute").innerHTML=this.report.getFieldLabel(attr?attr.value:this.attribute);
},_setConditionOperands:function(){
var op=dojo.byId("FT_condOp").value,op1=dojo.byId("FT_condOp1"),op2=dojo.byId("FT_condOp2").parentNode;
if(op=="IS_NOT_EMPTY"){
cv.util.hide(op1,op2);
op1.value=op2.value="";
}else{
if(op=="BETWEEN"){
cv.util.show(op1,op2);
}else{
cv.util.show(op1);
cv.util.hide(op2);
op2.value="";
}
}
},_validateCondition:function(_250){
var op1=parseFloat(_250.op1),op2=parseFloat(_250.op2);
if(!_250.formula||!_250.operator){
return "dlgErrFilterConditionRequiredFields";
}
if(_250.operator!="IS_NOT_EMPTY"&&!cv.util.checkNumber(_250.op1)){
this.setInvalidInputField("FT_condOp1");
return "dlgErrFilterConditionNumberExpected";
}
if(_250.operator=="BETWEEN"&&!cv.util.checkNumber(_250.op2)){
this.setInvalidInputField("FT_condOp2");
return "dlgErrFilterConditionNumberExpected";
}
if(op1>=op2){
this.setInvalidInputField("FT_condOp1");
return "dlgErrFilterConditionOp2LTOp1";
}
return null;
},_validateRank:function(_251){
if(!cv.util.checkNumber(_251.count)||parseInt(_251.count)<=0||parseInt(_251.count)!=parseFloat(_251.count)){
this.setInvalidInputField("FT_rankCount");
return "dlgErrFilterRankNumberExpected";
}
if(!_251.formula||!_251.type){
return "dlgErrFilterRankRequiredFields";
}
},_getListItemIndex:function(_252){
return _252.substr(13);
}});
cv.ReportDocument=function(){
this.reportRecord=null;
this.status=null;
this.xmlTemplate="<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><reportRecord xmlns=\"http://www.pentaho.com\" >\n"+"<commonStorageAttributes createdBy=\"\" updatedBy=\"\" description=\"\" created=\"\" update=\"\"><path folder=\"\" name=\"\"/></commonStorageAttributes>\n"+"<report cube=\"\" version=\"5\" autoRefresh=\"true\" freezeColumns=\"true\" freezeRows=\"true\" reportTypeEnum=\"PIVOT\" showDrillLinks=\"false\" showRowGrandTotal=\"false\" showColumnGrandTotal=\"false\" useNonVisualTotals=\"false\" showEmptyCells=\"false\" emptyCellDisplay=\"-\">\n"+"<title/><subtitle/>\n<measures/>\n<rowAttributes/><columnAttributes/><filters/>\n"+"</report></reportRecord>";
this.childTags={measures:"measure",columnAttributes:"attribute",rowAttributes:"attribute",filters:"filter"};
this.attributes={measure:{"showAggregate":"true","showSum":"false","showAverage":"false","showCount":"false","showMin":"false","showMax":"false","measureTypeEnum":"VALUE","sortOrderEnum":"NONE"},attribute:{"showSubtotal":"false","sortOrderEnum":"ASC"},filter:{"viewFilterEnum":"NONE"}};
this.reportProps=["name","folder","description","cube","reportTypeEnum","update","updatedBy","created","createdBy","title","subtitle"];
};
cv.ReportDocument.prototype={initialize:function(_253){
this.reportRecord=dojo.dom.createDocumentFromText(_253?_253:this.xmlTemplate);
cv.setDomDefaultNamespace(this.reportRecord);
if(_253){
this.status="reportOpenOK";
}
},getReportNode:function(){
return this.getNode("cv:report");
},getStorageNode:function(){
return this.getNode("cv:commonStorageAttributes");
},getXml:function(){
return dojo.dom.innerXML(this.reportRecord);
},replaceReportNode:function(node){
this.reportRecord.documentElement.replaceChild(node.cloneNode(true),this.getReportNode());
},replaceStorageNode:function(node){
this.reportRecord.documentElement.replaceChild(node.cloneNode(true),this.getStorageNode());
},getReportProperty:function(prop){
var val=null;
switch(prop){
case "catalog":
case "cube":
case "reportTypeEnum":
val=this.getReportNode().getAttribute(prop);
break;
case "title":
val=this.getReportTitle();
break;
case "subtitle":
val=this.getReportSubtitle();
break;
case "name":
case "folder":
val=this.getStoragePathNode().getAttribute(prop);
break;
default:
val=this.getStorageNode().getAttribute(prop);
break;
}
return val;
},setReportProperty:function(prop,val){
switch(prop){
case "catalog":
case "cube":
case "reportTypeEnum":
this.getReportNode().setAttribute(prop,val);
break;
case "title":
this.setReportTitle(val);
break;
case "subtitle":
this.setReportSubtitle(val);
break;
case "name":
case "folder":
this.getStoragePathNode().setAttribute(prop,val);
break;
default:
this.getStorageNode().setAttribute(prop,val);
break;
}
},getReportOptions:function(){
return this.getReportNode().attributes;
},getReportOption:function(key){
return this.getReportNode().getAttribute(key);
},setReportOption:function(key,_254){
this.getReportNode().setAttribute(key,_254);
},getStoragePathNode:function(){
return this.getNode("cv:commonStorageAttributes/cv:path");
},getReportTitle:function(){
var _255=this.getNode("cv:report/cv:title");
return _255?dojo.dom.textContent(_255):null;
},setReportTitle:function(str){
var _256=this.getNode("cv:report/cv:title");
if(!_256){
_256=this.reportRecord.createElement("title");
this.getReportNode().appendChild(_256);
}
cv.textContent(_256,str);
},getReportSubtitle:function(){
var st=this.getNode("cv:report/cv:subtitle");
return st?dojo.dom.textContent(st):null;
},setReportSubtitle:function(str){
var st=this.getNode("cv:report/cv:subtitle");
if(!st){
st=this.reportRecord.createElement("subtitle");
this.getReportNode().appendChild(st);
}
cv.textContent(st,str);
},setChartOption:function(name,_257){
var opts=this.getChartOptions();
opts.setAttribute(name,_257);
},getChartOption:function(name){
var opts=this.getChartOptions();
return opts.getAttribute(name);
},getChartOptions:function(){
var _258=this.getNode("cv:report/cv:chartOptions");
if(!_258){
_258=this._createXmlNode("chartOptions",{"showLegend":"true","autoRange":"true","legendPosition":"RIGHT","legendBackgroundColor":"#ffffff","legendSize":12,"legendStyle":"PLAIN","legendColor":"#000000","legendFontFamily":"Default","displayUnits":"UNITS_0","lineWidth":2,"lineShape":"CIRCLE","maxValues":100,"backgroundColor":"#ffffff","backgroundColorEnd":"#ffffff","labelColor":"#000000","backgroundFill":"NONE","labelSize":12,"labelStyle":"PLAIN","labelFontFamily":"Default","maxChartsPerRow":3,"chartType":"VERTICAL_BAR"});
for(x in cv.prefs.chartOptions){
_258.setAttribute(x,cv.prefs.chartOptions[x]);
}
this.getReportNode().appendChild(_258);
}
return _258;
},getReplaced:function(){
return this.getNode("cv:report/cv:attributeReplacement");
},setReplaced:function(_259,opts){
var node=this.getReplaced();
if(node){
if(!opts){
cv.util.removeNode(node);
return;
}
dojo.dom.removeChildren(node);
}else{
node=this._createXmlNode("attributeReplacement");
this.getReportNode().appendChild(node);
}
node.setAttribute("formula",_259);
for(var x=0;x<opts.length;++x){
var opt=this._createXmlNode("replacementOption");
cv.textContent(opt,opts[x]);
node.appendChild(opt);
}
},replaceAttribute:function(_25a){
var node=this.getReplaced();
if(!node){
return;
}
var cur=node.getAttribute("formula");
if(cur==_25a){
return;
}
node.setAttribute("formula",_25a);
var opts=node.selectNodes("cv:replacementOption");
for(var x=0;x<opts.length;++x){
if(cv.textContent(opts[x])==_25a){
cv.textContent(opts[x],cur);
break;
}
}
},isNew:function(){
return !this.getStorageNode().getAttribute("created");
},isEmpty:function(){
var _25b=this.getReportNode().selectNodes("cv:measures/cv:measure|*/cv:attribute");
return !_25b||_25b.length==0;
},getSortedMetric:function(){
return this.getNode("cv:report/cv:measures/cv:measure[@sortOrderEnum!='NONE']");
},createNode:function(_25c){
var node;
var _25d=this._createXmlNode(this.childTags[_25c.zoneId]);
if(_25c.formula){
_25d.setAttribute("formula",_25c.formula);
}
if(_25c.metricType){
if(dojo.lang.inArray(["PCTOF","RSUM","PCTRSUM","RANK"],_25c.metricType)){
node=this._createXmlNode("summaryFacet",{"summaryAcrossEnum":_25c.sumAcross,"useNonVisualTotals":_25c.sumTotal});
if(_25c.sumAcross=="LABEL"){
node.setAttribute("breakAttributeFormula",_25c.sumBreakBy);
}
}else{
if(_25c.metricType=="EXPRESSION"){
node=this._createXmlNode("expression");
cv.textContent(node,_25c.expression);
}else{
if(_25c.metricType=="TREND"){
node=this._createXmlNode("trendFacet",{"trendTypeEnum":_25c.trendType,"trendDirectionEnum":_25c.trendDir,"amount":_25c.trendAmount,"trendAttributeFormula":_25c.trendField});
}
}
}
_25d.setAttribute("measureTypeEnum",_25c.metricType);
if(node){
_25d.appendChild(node);
}
}
if(_25c.label){
node=this._createXmlNode("displayLabels");
_25d.appendChild(node);
node.appendChild(this._createXmlNode("displayLabel",{"label":_25c.label,"locale":_25c.locale}));
}
return _25d;
},getNode:function(_25e,_25f){
if(!_25f){
_25f=this.reportRecord.documentElement;
}
return _25f.selectSingleNode(_25e);
},getChildMembers:function(){
var path="";
for(var i=0;i<this.getChildMembers.arguments.length;++i){
if(i>0){
path+=" | ";
}
path+="cv:"+this.getChildMembers.arguments[i]+"/cv:"+this.childTags[this.getChildMembers.arguments[i]];
}
return this.getReportNode().selectNodes(path);
},getTimeAttributes:function(){
var _260=this.getReportNode().selectNodes("*/cv:attribute"),_261=null;
if(_260&&_260.length>0){
for(var x=0;x<_260.length;++x){
var _262=_260[x].getAttribute("formula");
if(cv.getFieldHelp().isTimeAttribute(_262,true)){
if(!_261){
_261=[_262];
}else{
_261.push(_262);
}
}
}
}
return _261;
},getReportZoneNode:function(zone){
return this.reportRecord.documentElement.selectSingleNode("cv:report/cv:"+zone);
},getFirstMetricDependent:function(id){
var _263=this.getReportNode().selectNodes("cv:measures/cv:measure[@measureTypeEnum!='VALUE' and @id!='"+id+"']");
for(var i=0;_263&&i<_263.length;++i){
var _264=_263[i];
if((_264.getAttribute("measureTypeEnum")=="EXPRESSION"&&cv.textContent(_264.selectSingleNode("cv:expression")).indexOf(id)>=0)||_264.getAttribute("formula")==id){
return _264;
}
}
return null;
},getMetrics:function(_265){
return this.getReportNode().selectNodes("cv:measures/cv:measure"+(_265?"[@measureTypeEnum='"+_265+"']":""));
},getNextMetricId:function(){
var id=0,_266=this.getNode("cv:report/cv:measures");
while(this.getNode("cv:measure[@id='[MEASURE:"+id+"]']",_266)){
++id;
}
return "[MEASURE:"+id+"]";
},getNumberFormat:function(_267){
var _268;
if(dojo.lang.isString(_267)){
_268=this.getNode("cv:report/cv:measures/cv:measure[@formula=\""+_267+"\"]/cv:numberFormat");
}else{
_268=_267.selectSingleNode("cv:numberFormat");
}
var exp="";
if(_268){
var _269=_268.selectSingleNode("cv:formatExpression");
if(_269){
exp=cv.textContent(_269);
}
}
return _268?{formatCategory:_268.getAttribute("formatCategory"),formatScale:_268.getAttribute("formatScale"),formatExpression:exp,formatShortcut:_268.getAttribute("formatShortcut")}:null;
},setNumberFormat:function(_26a,_26b){
if(dojo.lang.isString(_26a)){
_26c=this.getNode("cv:report/cv:measures/cv:measure[@formula=\""+_26a+"\"]/cv:numberFormat");
}
if(!_26a){
return false;
}
var _26c=_26a.selectSingleNode("cv:numberFormat");
if(!_26c){
_26c=this._createXmlNode("numberFormat");
_26a.appendChild(_26c);
_26c.setAttribute("formatShortcut","NONE");
_26c.setAttribute("formatCategory","Default");
_26c.setAttribute("formatScale","0");
}
if(_26b.formatCategory){
_26c.setAttribute("formatCategory",_26b.formatCategory);
}
if(_26b.formatScale){
_26c.setAttribute("formatScale",_26b.formatScale);
}
if(_26b.formatShortcut){
_26c.setAttribute("formatShortcut",_26b.formatShortcut);
}
var _26d=_26c.selectSingleNode("cv:formatExpression");
if(!_26d){
_26d=this._createXmlNode("formatExpression");
_26c.appendChild(_26d);
}
if(_26b.formatExpression){
cv.textContent(_26d,_26b.formatExpression);
}
},updateDisplayLabel:function(node,_26e,_26f,_270){
var _271=!_26e&&!_26f;
var _272=null,_273=node.selectSingleNode("cv:displayLabels");
if(!_273){
if(_271){
return;
}
_273=this._createXmlNode("displayLabels");
node.appendChild(_273);
}else{
_272=_273.selectSingleNode(_270?"cv:displayLabel[locale='"+_270+"']":"cv:displayLabel");
}
if(!_272){
if(_271){
return;
}
_272=this._createXmlNode("displayLabel");
_273.appendChild(_272);
}
if(_271){
_273.removeChild(_272);
if(!_273.selectSingleNode("cv:displayLabel")){
node.removeChild(_273);
}
return null;
}
_272.setAttribute("label",_26e?_26e:"");
_272.setAttribute("labelPlural",_26f?_26f:"");
_272.setAttribute("locale",_270?_270:"");
return _272;
},getFilters:function(_274){
var path="cv:report/cv:filters/cv:filter";
if(_274){
path+="[@viewFilterEnum='"+_274+"']";
}
return this.reportRecord.documentElement.selectNodes(path);
},getFilterProps:function(_275){
var _276={formula:_275.getAttribute("formula"),viewFilterEnum:_275.getAttribute("viewFilterEnum"),predicates:null};
var _277=_275.selectNodes("cv:predicates/cv:predicate");
if(!_277||_277.length==0){
return _276;
}
_276.predicates=new dojo.collections.Dictionary();
var _278;
var _279;
for(var x=0;x<_277.length;++x){
_279=_277[x].getAttribute("ordinal");
var pred={ordinal:_279,op:_277[x].getAttribute("operatorEnum"),preset:_277[x].getAttribute("preset"),parameterName:_277[x].getAttribute("parameterName")};
if(pred.op=="CONTAIN"||pred.op=="NOT_CONTAIN"){
var exp=_277[x].selectNodes("cv:containsExpression");
pred.exp=[];
for(var y=0,len=exp.length;len>0&&y<len;++y){
pred.exp.push(cv.textContent(exp[y]));
}
}else{
var mem=_277[x].selectNodes("cv:member");
var len=mem.length;
pred.members=[];
for(var y=0;len>0&&y<len;++y){
var _27a=mem[y].getAttribute("formula");
if(!_27a){
pred.members.push(parseInt(mem[y].getAttribute("pos")));
if(y>0){
_278+=","+mem[y].getAttribute("pos");
}else{
_278=mem[y].getAttribute("pos");
}
}else{
pred.members.push({"formula":_27a,"caption":mem[y].getAttribute("caption")});
}
}
if(_278){
pred.preset=_278;
}
_278=null;
}
if(_276.predicates.contains(_279)){
_276.predicates.item(_279).push(pred);
}else{
var _27b=[];
_27b.push(pred);
_276.predicates.add(_279,_27b);
}
}
return _276;
},removeFilterPredicate:function(_27c,_27d){
var _27e=this.getFilterProps(_27c);
if(!_27e){
return _27c;
}
_27e.predicates.remove(_27d);
var _27f=this.updateFilter(_27e);
return _27f&&_27f.selectSingleNode("cv:predicates/cv:predicate")?_27f:null;
},updateFilter:function(_280){
if(!_280.conditions&&!_280.rank&&!_280.predicates){
return null;
}
var _281=null,zone=this.getReportZoneNode("filters");
if(_280.type=="FILTER_METRIC"){
if(_280.old){
_281=this.getNode("cv:report/cv:filters/cv:filter[@formula=\""+_280.old+"\"]");
if(_281){
var _282=this.getNode("cv:conditions",_281);
if(_282){
_281.removeChild(_282);
}
_282=this.getNode("cv:topBottom",_281);
if(_282){
_281.removeChild(_282);
}
if(_280.old!=_280.formula&&_281.childNodes.length==0){
zone.removeChild(_281);
}
}
}
if(!_280.old||_280.old!=_280.formula){
_281=this.getNode("cv:report/cv:filters/cv:filter[@formula=\""+_280.formula+"\"]");
}
}else{
_281=this.getNode("cv:report/cv:filters/cv:filter[@formula=\""+_280.formula+"\"]");
if(_281){
cv.util.removeNode(this.getNode("cv:predicates",_281));
}
}
if(!_281){
_281=this._createXmlNode("filter",{"formula":_280.formula,"viewFilterEnum":"MULTIPLE"});
this.getReportZoneNode("filters").appendChild(_281);
}
if(_280.conditions){
var _283=this._createXmlNode("conditions");
for(var i=0;i<_280.conditions.length;++i){
if(!_280.conditions[i]){
continue;
}
var cond=this._createXmlNode("condition");
for(var x in _280.conditions[i]){
if(_280.conditions[i][x]){
cond.setAttribute(x,_280.conditions[i][x]);
}
}
_283.appendChild(cond);
}
_281.appendChild(_283);
}
if(_280.rank){
var rank=this._createXmlNode("topBottom");
for(var x in _280.rank){
if(_280.rank[x]){
rank.setAttribute(x,_280.rank[x]);
}
}
_281.appendChild(rank);
}
if(_280.predicates&&_280.predicates.getKeyList()&&_280.predicates.getKeyList().length>0){
var _284=_280.predicates.getKeyList();
var _285=[];
for(var x=0;x<_284.length;x++){
var _286=[];
var _287=_280.predicates.item(_284[x]);
if(_287.length>0){
var _288=this.getOrderKey(_287);
if(_285.length>0){
var _289=_285.length-1;
for(;_289>=0;_289--){
if(this.getOrderKey(_285[_289])>_288){
_286.push(_285.pop());
}else{
break;
}
}
_285.push(_287);
if(_286.length>0){
_285=_285.concat(_286.reverse());
}
}else{
_285.push(_287);
}
}
}
var _28a;
var _28b=this.getNode("cv:predicates",_281);
if(!_28b){
_28b=this._createXmlNode("predicates");
}
for(var i=0;i<_285.length;i++){
_28a=_285[i];
if(!_28a){
continue;
}
for(var j=0;j<_28a.length;j++){
var pred=_28a[j];
if(!pred){
continue;
}
var _28c=this._createXmlNode("predicate",{"ordinal":i+1,"operatorEnum":pred.op});
if(pred.preset){
pred.members=[];
var pos=pred.preset.split(",");
for(var x=0;x<pos.length;++x){
pred.members.push(parseInt(pos[x]));
}
}
var memb=pred.members;
for(var x=0;memb&&x<memb.length;++x){
var _28d=this._createXmlNode("member");
if(dojo.lang.isNumber(memb[x])){
_28d.setAttribute("pos",memb[x]);
}else{
_28d.setAttribute("pos","0");
_28d.setAttribute("formula",memb[x].formula);
_28d.setAttribute("caption",memb[x].caption);
}
_28c.appendChild(_28d);
}
if(pred.exp){
for(var x=0;x<pred.exp.length;++x){
var _28e=this._createXmlNode("containsExpression");
_28e.appendChild(this.reportRecord.createTextNode(pred.exp[x]));
_28c.appendChild(_28e);
}
}
if(pred.parameterName){
_28c.setAttribute("parameterName",pred.parameterName);
}
_28b.appendChild(_28c);
}
}
_281.appendChild(_28b);
}
if(this.removeEmptyFilter(_281)){
return null;
}
if(_280.viewFilterEnum){
_281.setAttribute("viewFilterEnum",_280.viewFilterEnum);
}
return _281;
},getOrderKey:function(_28f){
var _290=new dojo.collections.Dictionary();
_290.add("EQUAL",2);
_290.add("TIME_YAGO",2);
_290.add("TIME_RANGE_PREV",2);
_290.add("TIME_RANGE_NEXT",2);
_290.add("TIME_AGO",2);
_290.add("TIME_AHEAD",2);
_290.add("CONTAIN",3);
_290.add("BETWEEN",4);
_290.add("AFTER",5);
_290.add("BEFORE",6);
_290.add("NOT_EQUAL",7);
_290.add("NOT_CONTAIN",8);
var _291;
if(_28f[0].op=="EQUAL"){
var mems=_28f[0].members;
if(_28f[0].preset||dojo.lang.isNumber(mems[0])){
_291=2;
}else{
_291=1;
}
}else{
_291=_290.item(_28f[0].op);
}
return _291;
},getMetricFilter:function(){
var _292=null,cond=null;
var rank=this.getNode("cv:report/cv:filters/cv:filter/cv:topBottom");
if(rank){
_292=rank.parentNode;
cond=this.getNode("cv:conditions",_292);
}else{
cond=this.getNode("cv:report/cv:filters/cv:filter/cv:conditions");
if(cond){
_292=cond.parentNode;
}
}
if(!_292){
return null;
}
var _293={node:_292,formula:_292.getAttribute("formula"),conditions:null,rank:null};
if(rank){
_293.rank={};
var attr=rank.attributes;
for(var x=0;x<attr.length;++x){
_293.rank[attr[x].name]=attr[x].value;
}
}
if(cond){
conds=cond.getElementsByTagName("condition");
_293.conditions=new Array(conds.length);
for(var i=0;i<conds.length;++i){
var attr=conds[i].attributes;
_293.conditions[i]={};
for(var x=0;x<attr.length;++x){
_293.conditions[i][attr[x].name]=attr[x].value;
}
}
}
return _293;
},getMetricFilterNode:function(){
var node=this.getNode("cv:report/cv:filters/cv:filter/cv:conditions | cv:report/cv:filters/cv:filter/cv:topBottom");
return node?node.parentNode:null;
},isUsedByMetricFilter:function(id,_294){
var _295=this.getMetricFilter();
if(!_295){
return null;
}
if(_295.formula==id){
return (!_294||(_294=="RANK"&&_295.rank)||(_294=="CONDITIONS"&&_295.conditions))?_295.node:null;
}
if(_295.rank&&_295.rank["formula"]==id&&(!_294||_294=="RANK")){
return _295.node;
}
if(_295.conditions&&(!_294||_294=="CONDITIONS")){
for(var x=0;x<_295.conditions.length;++x){
if(_295.conditions[x]["formula"]==id){
return _295.node;
}
}
}
return null;
},removeFromMetricFilter:function(id){
var _296=this.isUsedByMetricFilter(id);
if(!_296){
return false;
}
var cond=this.getNode("cv:conditions",_296);
var rank=this.getNode("cv:topBottom",_296);
if(_296.getAttribute("formula")==id){
if(cond){
_296.removeChild(cond);
}
if(rank){
_296.removeChild(rank);
}
}else{
if(cond){
conds=cond.getElementsByTagName("condition");
var _297=conds.length;
for(var i=0;i<conds.length;++i){
if(conds[i].getAttribute("formula")==id){
cond.removeChild(conds[i]);
--_297;
}
}
if(_297==0){
_296.removeChild(cond);
}
}
if(rank&&rank.getAttribute("formula")==id){
_296.removeChild(rank);
}
}
this.removeEmptyFilter(_296);
return true;
},removeEmptyFilter:function(_298){
if(_298&&_298.selectSingleNode("cv:conditions|cv:topBottom|cv:predicates/cv:predicate")){
return false;
}
cv.util.removeNode(_298);
return true;
},updateCalculateSubtotalsUsingFormula:function(_299,_29a){
return _29a.setAttribute("calculateSubtotalsUsingFormula",_299);
},addMemberProperty:function(node,_29b){
var prop=this._createXmlNode("property",{"name":_29b});
node.appendChild(prop);
},addLink:function(node,_29c,_29d){
var link=this._createXmlNode("link",_29c);
if(_29d){
for(var x in _29d){
var _29e=this._createXmlNode("linkParam",{name:x,value:_29d[x]});
link.appendChild(_29e);
}
}
node.appendChild(link);
},_createXmlNode:function(_29f,_2a0){
var _2a1=cv.createNode(this.reportRecord,_29f);
var x,_2a2=this.attributes[_29f];
for(x in _2a2){
_2a1.setAttribute(x,_2a2[x]);
}
for(x in _2a0){
_2a1.setAttribute(x,_2a0[x]);
}
return _2a1;
}};
dojo.declare("cv.ReportDropTarget",dojo.dnd.HtmlDropTarget,function(_2a3,_2a4,_2a5){
this.report=_2a5;
this.curItem=null;
this.dropIndicator=document.createElement("div");
with(this.dropIndicator.style){
position="absolute";
zIndex=999;
overflow="hidden";
fontSize="8px";
}
if(!dojo.html.hasParent(this.dropIndicator)){
document.body.appendChild(this.dropIndicator);
}
cv.util.hide(this.dropIndicator);
},{init:function(_2a6){
this.reportFormat=_2a6;
if(_2a6=="PIVOT"){
this.zones={measures:this.report.byClass("ZONE_measures"),rowAttributes:this.report.byClass("ZONE_rowAttributes"),columnAttributes:this.report.byClass("ZONE_columnAttributes")};
if(this.zones.rowAttributes&&this.zones.rowAttributes.getElementsByTagName("TD").length==0){
this.zones.rowAttributes=this.report.byClass("pivotTableRowLabelHeaderContainer");
}
if(this.zones.columnAttributes&&this.zones.columnAttributes.getElementsByTagName("TR").length==0){
this.zones.columnAttributes=this.report.byClass("pivotTableColumnHeaderSection");
}
}else{
this.zones=null;
this.childBoxes=[];
this.zoneId=null;
}
},onDragOver:function(e){
if(this.report.isResizing||!this.report.history.isStateRefreshed()){
return;
}
if(!this.accepts(e.dragObjects)){
if(e.target.style&&e.target.style.cursor&&(dojo.html.hasClass(e.target,"dropZoneItem")||dojo.html.hasClass(e.target,"gemLabel")||dojo.html.hasClass(e.target,"dragObj"))){
e.target.style.cursor="not-allowed";
}
return false;
}
if(e.target.style&&e.target.style.cursor){
e.target.style.cursor="move";
}
if(this.reportFormat!="PIVOT"){
return true;
}
this.childBoxes={measures:[],rowAttributes:[],columnAttributes:[]};
var i,_2a7=this.zones["measures"]?this.zones["measures"].getElementsByTagName("TD"):null;
var _2a8=this.report.byClass("pivotTable");
if(_2a8){
var _2a9=dojo.html.getAbsolutePosition(_2a8,true);
_2a9.x=_2a9.y+dojo.html.getBorderBox(_2a8).height;
var len=_2a7?_2a7.length:0;
if(len>20){
len=20;
}
for(i=0;i<len;++i){
if(_2a7[i].getAttribute("type")!="measure"){
continue;
}
var pos=dojo.html.getAbsolutePosition(_2a7[i],true);
this.childBoxes["measures"].push({top:_2a9.y,bottom:_2a9.x,left:pos.x,right:pos.x+dojo.html.getBorderBox(_2a7[i]).width,node:_2a7[i]});
}
_2a7=this.zones["rowAttributes"]?this.zones["rowAttributes"].getElementsByTagName("TD"):null;
var _2aa=null;
for(i=0;_2a7&&i<_2a7.length;++i){
var pos=dojo.html.getAbsolutePosition(_2a7[i],true);
if(_2a7[i].getAttribute("formula")==_2aa){
this.childBoxes["rowAttributes"][this.childBoxes["rowAttributes"].length-1]["right"]=pos.x+dojo.html.getBorderBox(_2a7[i]).width;
}else{
this.childBoxes["rowAttributes"].push({top:_2a9.y,bottom:_2a9.x,left:pos.x,right:pos.x+dojo.html.getBorderBox(_2a7[i]).width,node:_2a7[i]});
}
_2aa=_2a7[i].getAttribute("formula");
}
_2a7=this.zones["columnAttributes"]?this.zones["columnAttributes"].getElementsByTagName("TR"):null;
_2aa=null;
for(i=0;_2a7&&i<_2a7.length;++i){
var fc=_2a7[i].firstChild;
if(!fc||(fc.getAttribute("type")!="attribute"&&fc.getAttribute("type")!="prop")){
break;
}
var pos=dojo.html.getAbsolutePosition(_2a7[i],true);
var box=dojo.html.getBorderBox(_2a7[i]);
if(fc.getAttribute("formula")==_2aa){
this.childBoxes["columnAttributes"][this.childBoxes["columnAttributes"].length-1]["bottom"]=pos.y+box.height;
}else{
this.childBoxes["columnAttributes"].push({top:pos.y,bottom:pos.y+box.height,left:pos.x,right:pos.x+box.width,node:fc});
}
_2aa=fc.getAttribute("formula");
}
}
if(this.reportFormat=="PIVOT"){
cv.util.show(this.dropIndicator);
}
return true;
},onDragMove:function(e,_2ab){
if(this.report.isResizing){
return;
}
if(e.target.style&&e.target.style.cursor){
e.target.style.cursor="move";
}
if(this.reportFormat!="PIVOT"){
return;
}
this._getZoneIdForPivot(e,_2ab[0]);
this.position=this._getNodeUnderMouse(e);
var _2ac=this.childBoxes[this.zoneId];
var _2ad=true;
if(this.position<0){
if(_2ac.length){
_2ad=(dojo.html.gravity(_2ac[0].node,e)&this.gravity);
}
}else{
_2ad=(dojo.html.gravity(_2ac[this.position].node,e)&this.gravity);
}
this.placeIndicator(e,_2ab,this.position,_2ad);
},onDragOut:function(e){
if(e.target.style&&e.target.style.cursor){
e.target.style.cursor="move";
}
if(this.reportFormat=="PIVOT"&&this.dropIndicator){
cv.util.hide(this.dropIndicator);
}
if(this.hoverMetric){
dojo.html.removeClass(this.hoverMetric,"metricHover");
this.hoverMetric=null;
}
},onDrop:function(e){
this.onDragOut(e);
var type=e.dragObject.type;
var _2ae=e.dragObject.domNode;
var _2af=_2ae.getAttribute("formula");
if(type.length==1&&this.reportFormat!="PIVOT"){
return this.report.appendGem(_2af);
}
var _2b0,_2b1,_2b2,gem,ok=true;
this._getZoneIdForPivot(e,e.dragObject);
this.position=this._getNodeUnderMouse(e);
var _2b3=this.childBoxes[this.zoneId];
if(!_2b3){
return false;
}
if(this.position<0){
if(_2b3.length){
if(dojo.html.gravity(_2b3[0].node,e)&this.gravity){
_2b0=this.report.getGemFromDomNode(_2b3[0].node);
if(_2b0){
_2b1=_2b0.domNode;
_2b2="before";
}
}else{
_2b0=this.report.getGemFromDomNode(_2b3[_2b3.length-1].node);
if(_2b0){
_2b1=_2b0.domNode;
_2b2="after";
}
}
}else{
_2b1=this.report.byId(this.zoneId);
_2b2="append";
}
}else{
var node=_2b3[this.position].node;
_2b0=this.report.getGemFromDomNode(node);
if(_2b0){
_2b1=_2b0.domNode;
_2b2=dojo.html.gravity(node,e)&this.gravity?"before":"after";
}
}
if(!_2b2){
return false;
}
this.actionStr="";
if(type.length==1){
ok=this.report.checkDuplicateGem(_2af);
if(ok){
ok=this.report.checkGemHierarchy(this.zoneId,_2ae);
}
if(!ok){
return false;
}
gem=this.report.createGem({zoneId:this.zoneId,formula:_2af});
this.curItem=gem.domNode;
this.actionStr="actionAdd";
}else{
if(type.length==2){
gem=this.report.getGemFromDomNode(_2ae);
if(!this.report.checkGemHierarchy(this.zoneId,gem.domNode,{refId:_2b1.id,pos:_2b2})){
return true;
}
gem.setZone(_2b0?_2b0.zone:_2b1);
this.curItem=gem.domNode;
this.actionStr="actionMove";
}else{
return false;
}
}
ok=this.insert(e,_2b1,_2b2);
this.curItem=null;
return ok;
},_getNodeUnderMouse:function(e){
var _2b4=this.childBoxes[this.zoneId];
for(var i=0,_2b5;_2b4&&i<_2b4.length;++i){
with(_2b4[i]){
if(e.pageX>=left&&e.pageX<=right&&e.pageY>=top&&e.pageY<=bottom){
return i;
}
}
}
return -1;
},_getZoneIdForPivot:function(e,obj){
if(this.reportFormat!="PIVOT"){
return;
}
this.gravity=dojo.html.gravity.WEST;
if(obj.type=="V"||obj.type=="VM"){
this.zoneId="measures";
}else{
if(this.zones["rowAttributes"]&&dojo.html.overElement(this.zones["rowAttributes"],e)){
this.zoneId="rowAttributes";
}else{
if(this.zones["columnAttributes"]&&dojo.html.overElement(this.zones["columnAttributes"],e)){
this.zoneId="columnAttributes";
this.gravity=dojo.html.gravity.NORTH;
}else{
this.zoneId="rowAttributes";
}
}
}
},placeIndicator:function(e,_2b6,i,_2b7){
if(!this.zoneId){
return;
}
var _2b8=this.dropIndicator.style;
var _2b9=this.childBoxes[this.zoneId];
var len=_2b9.length;
var zone=this.zones[this.zoneId];
if(!zone){
zone=this.domNode;
}
if(this.gravity==dojo.html.gravity.NORTH){
var top,_2ba=dojo.html.getContentBoxWidth(this.domNode);
if(i<0){
if(len){
top=_2b7?_2b9[0].top:_2b9[len-1].bottom;
}else{
top=dojo.html.getAbsolutePosition(zone,true).y;
}
}else{
top=_2b7?_2b9[i].top:_2b9[i].bottom;
}
_2b8.width=(_2ba+15)+"px";
_2b8.height="28px";
_2b8.left=(dojo.html.getAbsolutePosition(this.domNode,true).x-14)+"px";
_2b8.top=(top-14)+"px";
this.dropIndicator.innerHTML="<div style='position:relative;top:6px;height:16px;width:14px;float:left;overflow:hidden;background:url(images/dnd_left_arrow.png) no-repeat;'></div>"+"<div style='position:relative;top:10px;height:12px;width:"+(_2ba-18)+"px;float:left;background:url(images/dnd_horz_line.png) repeat-x;'></div>"+"<div style='position:relative;top:6px;height:16px;width:14px;float:left;overflow:hidden;background:url(images/dnd_right_arrow.png) no-repeat;'></div>";
}else{
var left,_2bb=dojo.html.getContentBox(this.domNode).height;
if(this.zoneId=="measures"&&len){
if(i<0||i>=len){
i=(_2b7?0:len-1);
}
if(this.hoverMetric&&this.hoverMetric!=_2b9[i].node){
dojo.html.removeClass(this.hoverMetric,"metricHover");
}
this.hoverMetric=_2b9[i].node;
dojo.html.addClass(this.hoverMetric,"metricHover");
}
if(i<0){
if(len){
left=_2b7?_2b9[0].left:_2b9[len-1].right;
}else{
if(this.zoneId=="measures"&&this.zones.columnAttributes){
zone=this.zones.columnAttributes;
}
left=dojo.html.getAbsolutePosition(zone,true).x;
}
}else{
left=_2b7?_2b9[i].left:_2b9[i].right;
}
_2b8.left=(left-14)+"px";
_2b8.height=(_2bb+10)+"px";
_2b8.width="28px";
_2b8.top=(dojo.html.getAbsolutePosition(this.domNode,true).y-7)+"px";
this.dropIndicator.innerHTML="<div style='position:relative;left:6px;width:16px;height:14px;overflow:hidden;background:url(images/dnd_top_arrow.png);'></div>"+"<div style='position:relative;left:11px;width:7px;height:"+(_2bb-22)+"px;background:url(images/dnd_vert_line.png) repeat-y;'></div>"+"<div style='position:relative;left:6px;width:16px;height:14px;overflow:hidden;background:url(images/dnd_bottom_arrow.png);'></div>";
}
},insert:function(e,_2bc,_2bd){
if(_2bc==this.curItem){
return false;
}
return this.report.insertGem(this.curItem.id,_2bc.id,_2bd,this.actionStr);
}});
dojo.declare("cv.DataZoneDropTarget",dojo.dnd.HtmlDropTarget,function(_2be,_2bf,_2c0,_2c1){
this.report=_2c1;
this.dndSuffix=_2c0;
this.curItem=null;
},{onDragOver:function(e){
if(this.report.isResizing){
return;
}
if(!dojo.lang.inArray(this.acceptedTypes,e.dragObjects[0].type)){
if(e.target.style&&e.target.style.cursor&&(dojo.html.hasClass(e.target,"dropZoneItem")||dojo.html.hasClass(e.target,"gemLabel")||dojo.html.hasClass(e.target,"dragObj"))){
e.target.style.cursor="not-allowed";
}
return false;
}
cv.util.setDivActive(this.domNode,true);
return cv.DataZoneDropTarget.superclass.onDragOver.call(this,e);
},onDragOut:function(e){
if(e.target.style&&e.target.style.cursor&&e.target.style.cursor=="not-allowed"){
e.target.style.cursor="move";
}
cv.util.setDivActive(this.domNode,false);
return cv.DataZoneDropTarget.superclass.onDragOut.call(this,e);
},onDrop:function(e){
var type=e.dragObject.type;
var _2c2=e.dragObject.domNode;
var _2c3=_2c2.getAttribute("formula");
var _2c4=this.report.getFieldLabel(_2c2);
var _2c5=this.domNode.id.substring(this.report.id.length);
this.actionStr="";
this.onDragOut(e);
var ok=true;
var i=this._getNodeUnderMouse(e),_2c6,_2c7;
if(i<0){
if(this.childBoxes.length){
if(dojo.html.gravity(this.childBoxes[0].node,e)&dojo.html.gravity.WEST){
_2c7=this.childBoxes[0].node;
_2c6="before";
}else{
_2c7=this.childBoxes[this.childBoxes.length-1].node,_2c6="after";
}
}else{
_2c7=this.domNode;
_2c6="append";
}
}else{
_2c7=this.childBoxes[i].node;
_2c6=(dojo.html.gravity(_2c7,e)&dojo.html.gravity.WEST)?"before":"after";
}
if(type.length==1){
ok=this.report.checkDuplicateGem(_2c3);
if(ok){
ok=this.report.checkGemHierarchy(_2c5,_2c2);
}
if(!ok){
return false;
}
this.curItem=this.report.createGem({zoneId:_2c5,formula:_2c3});
this.actionStr="actionAdd";
}else{
if(type.length==2){
this.curItem=this.report.getGemFromDomNode(_2c2);
if(type.charAt(1)!=this.dndSuffix){
if(!this.report.checkGemHierarchy(_2c5,_2c2,{refId:_2c7.id,pos:_2c6})){
return true;
}
this.curItem.setZone(this.domNode);
}
this.actionStr="actionMove";
}
}
var bOk=false;
if(this.curItem){
bOk=this.insert(e,_2c7,_2c6);
this.curItem=null;
}
return bOk;
},onDragMove:function(e,_2c8){
if(this.report.isResizing){
return;
}
var i=this._getNodeUnderMouse(e);
if(!this.dropIndicator){
this.createDropIndicator();
}
if(i<0){
if(this.childBoxes.length){
var _2c9=(dojo.html.gravity(this.childBoxes[0].node,e)&dojo.html.gravity.WEST);
}else{
var _2c9=true;
}
}else{
var _2ca=this.childBoxes[i];
var _2c9=(dojo.html.gravity(_2ca.node,e)&dojo.html.gravity.WEST);
}
this.placeIndicator(e,_2c8,i,_2c9);
if(!dojo.html.hasParent(this.dropIndicator)){
document.body.appendChild(this.dropIndicator);
}
},placeIndicator:function(e,_2cb,_2cc,_2cd){
with(this.dropIndicator.style){
if(_2cc<0){
if(this.childBoxes.length){
left=(_2cd?this.childBoxes[0].left:this.childBoxes[this.childBoxes.length-1].right)+"px";
top=(_2cd?this.childBoxes[0].top:this.childBoxes[this.childBoxes.length-1].top)+"px";
}else{
var pos=dojo.html.getAbsolutePosition(this.domNode);
left=pos.x+"px";
top=(pos.y+2)+"px";
}
}else{
var _2ce=this.childBoxes[_2cc];
left=(_2cd?_2ce.left:_2ce.right)+"px";
top=_2ce.top+"px";
}
}
},createDropIndicator:function(){
this.dropIndicator=document.createElement("div");
with(this.dropIndicator.style){
position="absolute";
zIndex=900;
borderLeftWidth="2px";
borderLeftColor="red";
borderLeftStyle="solid";
height="22px";
width="2px";
}
},insert:function(e,_2cf,_2d0){
if(_2cf==this.curItem.domNode){
return false;
}
return this.report.insertGem(this.curItem,_2cf.id,_2d0,this.actionStr);
}});
dojo.declare("cv.FilterPaneDropTarget",dojo.dnd.HtmlDropTarget,function(_2d1,_2d2,_2d3,_2d4){
this.report=_2d4;
this.dndSuffix=_2d3;
this.curItem=null;
this.filterPane=_2d1;
dojo.event.connect(this,"onDrop",this,"afterDrop");
},{onDragOver:function(e){
if(this.report.isResizing){
return;
}
if(!dojo.lang.inArray(this.acceptedTypes,e.dragObjects[0].type)){
if(e.target.style&&e.target.style.cursor&&(dojo.html.hasClass(e.target,"dropZoneItem")||dojo.html.hasClass(e.target,"gemLabel")||dojo.html.hasClass(e.target,"dragObj"))){
e.target.style.cursor="not-allowed";
}
return false;
}
cv.util.setDivActive(this.filterPane,true);
return cv.FilterPaneDropTarget.superclass.onDragOver.call(this,e);
},onDragMove:function(e){
},onDragOut:function(e){
if(e.target.style&&e.target.style.cursor&&e.target.style.cursor=="not-allowed"){
e.target.style.cursor="move";
}
cv.util.setDivActive(this.filterPane,false);
return cv.FilterPaneDropTarget.superclass.onDragOut.call(this,e);
},onDrop:function(e){
this.curItem=e.dragObject.domNode;
return cv.FilterPaneDropTarget.superclass.onDrop.call(this,e);
},createDropIndicator:function(){
return;
},afterDrop:function(){
if(this.curItem){
this.report.filterDlg.show(this.curItem.getAttribute("formula"));
}
this.curItem=null;
},insert:function(e,_2d5,_2d6){
return true;
}});
dojo.declare("cv.TrashAreaDropTarget",dojo.dnd.HtmlDropTarget,function(_2d7,_2d8,_2d9){
this.report=_2d9;
if(dojo.html.hasClass(this.domNode,"trashcan")){
dojo.event.connect(dojo.dnd.dragManager,"onMouseMove",this,"_onMouseMove");
dojo.event.connect(dojo.dnd.dragManager,"onMouseUp",this,"_onMouseUp");
}
},{onDragOver:function(e){
if(this.report.isResizing){
return;
}
if(!dojo.lang.inArray(this.acceptedTypes,e.dragObjects[0].type)){
if(e.target.style&&e.target.style.cursor&&(dojo.html.hasClass(e.target,"dropZoneItem")||dojo.html.hasClass(e.target,"gemLabel"))){
e.target.style.cursor="not-allowed";
}
return false;
}
this.childBoxes=[];
dojo.html.addClass(this.domNode,"trashActive");
return true;
},onDragMove:function(e){
},onDragOut:function(e){
if(e.target.style&&e.target.style.cursor&&e.target.style.cursor=="not-allowed"){
e.target.style.cursor="move";
}
dojo.html.removeClass(this.domNode,"trashActive");
return true;
},createDropIndicator:function(){
return;
},onDrop:function(e){
var id=e.dragObject.domNode.id;
if(id.indexOf("filter_")==0){
this.report.removeFilter(id);
}else{
this.report.removeCurrentGem(e.dragObject.domNode);
}
dojo.html.removeClass(this.domNode,"trashActive");
this.domNode.focus();
return true;
},_onMouseMove:function(e){
if(this.report.isResizing){
return;
}
if(dojo.widget.PopupManager.currentMenu){
dojo.widget.PopupManager.currentMenu.close();
}
var _2da=dojo.dnd.dragManager.selectedSources;
if(_2da.length==0||!dojo.lang.inArray(this.acceptedTypes,_2da[0].type)){
return;
}
cv.util.show(this.domNode);
},_onMouseUp:function(e){
if(!cv.util.isHidden(this.domNode)){
cv.util.hide(this.domNode);
}
}});
dojo.declare("cv.FieldHelp",null,function(_2db,_2dc){
this.doc=dojo.dom.createDocumentFromText(_2db);
cv.setDomDefaultNamespace(this.doc);
this.manager=_2dc;
this.fieldListItems=null;
this.fieldListTree=null;
this.fieldListNodes=null;
this.selectedField=null;
this.searchField=null;
this.viewOptions={"cmdViewCategory":"businessGroup","cmdViewName":"displayLabel","cmdViewType":"type","cmdViewSchema":"schema"};
this.currentView=null;
},{destroy:function(){
this.fieldListItems=null;
if(!this.fieldListTree){
return;
}
if(this.fieldListNodes){
for(var x=0,len=this.fieldListNodes.length;x<len;++x){
if(this.fieldListNodes[x].dndObj){
this.fieldListNodes[x].dndObj=null;
}
}
}
dojo.event.disconnect(this.searchField,"onkeyup",this,"searchFields");
dojo.event.disconnect(this.fieldListTree,"onmouseover",this,"onMouseOver");
dojo.event.disconnect(this.fieldListTree,"onmousedown",this,"onMouseDown");
dojo.event.disconnect(this.fieldListTree,"ondblclick",this,"onDblClick");
dojo.event.disconnect(this.fieldListTree,"oncontextmenu",this,"onContextMenu");
dojo.event.disconnect(this.clearSearchField,"onclick",this,"onClearSearch");
dojo.event.disconnect(dojo.byId("viewFieldOptions"),"onclick",this,"onViewFieldOptions");
dojo.event.disconnect(dojo.byId("hideFieldList"),"onclick",this.manager,"onToggleReportPane");
this.doc=null;
this.fieldListTree=null;
this.fieldListNodes=null;
this.selectedField=null;
this.searchField=null;
},_getFieldListItems:function(){
var _2dd=this.doc.documentElement.selectNodes("cv:attributeHelp|cv:measureHelp");
var _2de=[];
for(x=0,len=_2dd.length;x<len;++x){
if(!this.isHidden(_2dd[x])){
_2de.push(_2dd[x]);
}
}
return _2de;
},init:function(){
var x,len;
var _2df=this.doc.documentElement.selectNodes("cv:attributeHelp|cv:measureHelp");
this.fieldListItems=this._getFieldListItems();
this.fieldCount=this.fieldListItems.length;
this.fieldListTree=dojo.byId("fieldListTree");
this.fieldListTreeContent=dojo.byId("fieldListTreeContent");
if(this.fieldListTree){
this.searchField=dojo.byId("searchField");
this.searchField.value="";
this.clearSearchField=dojo.byId("clearSearchField");
cv.util.getDojoWidget("fieldViewMenu");
this.sortFields(cv.prefs.fieldListView);
dojo.byId("fieldCount").innerHTML=this.fieldListItems.length;
this.updateFieldCount();
dojo.event.connect(this.searchField,"onkeyup",this,"searchFields");
dojo.event.connect(this.fieldListTree,"onmouseover",this,"onMouseOver");
dojo.event.connect(this.fieldListTree,"onmousedown",this,"onMouseDown");
dojo.event.connect(this.fieldListTree,"ondblclick",this,"onDblClick");
dojo.event.connect(this.fieldListTree,"oncontextmenu",this,"onContextMenu");
dojo.event.connect(this.clearSearchField,"onclick",this,"onClearSearch");
dojo.event.connect(dojo.byId("viewFieldOptions"),"onclick",this,"onViewFieldOptions");
dojo.event.connect(dojo.byId("hideFieldList"),"onclick",this.manager,"onToggleReportPane");
}
var _2e0=this;
cv.formatTooltip=function(_2e1,node){
if(dojo.html.hasClass(node,"field")){
_2e0.formatTooltip(_2e1,node);
}
};
},formatTooltip:function(_2e2,node){
var _2e3=this.get(node.getAttribute("formula"));
var desc=this.get(_2e3,"displayDescription",true);
var str=(desc?desc:cvCatalog.fieldTooltipNone)+"<div class='fieldTooltipFooter'><a id='showFieldHelpDlg' class='appCmdLink' style='float:right;text-decoration:none;' "+"href='#' onclick='cv.getFieldHelp().onFieldHelp();return false'>Tell me more...</a></div>";
_2e2.innerHTML=str;
},get:function(node,_2e4,_2e5){
if(dojo.lang.isString(node)){
node=this.doc.documentElement.selectSingleNode("*[@formula=\""+node+"\"]");
}
if(!node||!_2e4){
return node;
}
var _2e6=node.selectSingleNode("cv:presentationFieldHelp");
var _2e7=null;
switch(_2e4){
case "formula":
case "hierarchy":
_2e7=node.getAttribute(_2e4);
break;
case "type":
_2e7=(node.tagName=="measureHelp")?"NUMBER":_2e6.getAttribute("type");
break;
case "displayLabel":
_2e7=_2e6?_2e6.getAttribute(_2e4):null;
if(!_2e7){
_2e7="";
}
break;
case "displayLabelOriginal":
if(_2e6){
var _2e8=_2e6.selectSingleNode("cv:originalPresentationFieldHelp");
if(_2e8){
_2e7=_2e8.getAttribute("displayLabel");
break;
}
}
if(!_2e7){
_2e7="";
}
break;
case "format":
_2e7={formatCategory:"Default",formatScale:"0",formatExpression:"",formatShortcut:"NONE"};
break;
default:
_2e7=_2e6?_2e6.getAttribute(_2e4):null;
break;
}
if(!_2e7){
return _2e7;
}
return _2e5?dojo.string.escape("html",_2e7):_2e7;
},getAttributeList:function(){
return this.doc.documentElement.selectNodes("cv:attributeHelp");
},getMeasureList:function(){
return this.doc.documentElement.selectNodes("cv:measureHelp");
},getDndType:function(item){
if(dojo.lang.isString(item)){
item=this.get(item);
if(!item){
return null;
}
}
if(item.tagName=="measureHelp"){
return "V";
}else{
return (this.isTimeAttribute(item)?"T":"L");
}
},getDirectChild:function(_2e9){
var heir=this.getHierarchy(_2e9);
for(var x=0;heir&&x<heir.length;++x){
if(heir[x]==_2e9){
return x<heir.length-1?heir[x+1]:null;
}
}
return null;
},getHierarchy:function(_2ea,_2eb,_2ec){
var item=this.get(_2ea);
if(!item){
return null;
}
item=item.getAttribute("hierarchy");
if(!item){
return null;
}
var _2ed=this.doc.documentElement.selectNodes("cv:hierarchyInfo[@formula=\""+item+"\"]/cv:levelInfo");
var _2ee=[];
for(var i=0;i<_2ed.length;++i){
var _2ef=_2ed[i].getAttribute("formula");
if(_2eb||!this.isHidden(_2ef)){
_2ee.push(_2ef);
}
if(_2ec&&_2ef==_2ea){
break;
}
}
return _2ee;
},getProperties:function(_2f0){
var _2f1=this.doc.documentElement.selectNodes("cv:attributeHelp[@formula=\""+_2f0+"\"]/cv:presentationFieldHelp/cv:property");
var _2f2=[];
for(var i=0;i<_2f1.length;++i){
_2f2.push(_2f1[i].getAttribute("name"));
}
return _2f2;
},isHidden:function(_2f3){
return this.get(_2f3,"hidden")=="true";
},isTimeAttribute:function(_2f4,_2f5){
if(dojo.lang.isString(_2f4)){
_2f4=this.get(_2f4);
if(!_2f4){
return false;
}
}
var type=this.get(_2f4,"type");
return _2f4.tagName=="attributeHelp"&&(type=="TIME_YEAR"||type=="TIME_QUARTER"||type=="TIME_MONTH"||type=="TIME_WEEK"||type=="TIME_DATE"||(_2f5&&type=="TIME_CYCLICAL"));
},searchFields:function(key){
if(key&&key.keyCode==13){
if(this.fieldCount==1&&this.selectedField){
this.manager.report.appendGem(this.selectedField.getAttribute("formula"));
}
return;
}
if(!key||!dojo.lang.isString(key)){
key=this.searchField.value;
}
var len=this.fieldListNodes.length;
this.fieldCount=0;
var re=null;
if(key){
re=new RegExp(dojo.string.escape("regex",key),"i");
if(cv.util.isHidden(this.clearSearchField)){
cv.util.show(this.clearSearchField);
}
}else{
cv.util.hide(this.clearSearchField);
}
var _2f6=false,_2f7=null;
var _2f8=null;
for(var x=0;x<len;++x){
var node=this.fieldListNodes[x];
if(_2f7!=node.groupHeader){
_2f7=node.groupHeader;
_2f6=false;
if(_2f7&&dojo.html.isDisplayed(_2f7)){
cv.util.hide(_2f7);
}
}
if(!re||node.innerHTML.search(re)>=0){
cv.util.show(node);
if(dojo.html.isDisplayed(node)){
++this.fieldCount;
if(!_2f8){
_2f8=node;
}
if(!_2f6&&_2f7){
cv.util.show(_2f7);
_2f6=true;
}
}
}else{
if(!cv.util.isHidden(node)){
cv.util.hide(node);
}
}
}
if(re){
dojo.byId("fieldListCount").innerHTML=dojo.string.substituteParams(cvCatalog.fieldListCount,this.fieldCount);
}else{
dojo.byId("fieldListCount").innerHTML=cvCatalog["fieldListAll"];
}
if(this.fieldCount==1){
if(this.selectedField){
dojo.html.setStyle(this.selectedField,"background-color","#ffffff");
}
this.selectedField=_2f8;
dojo.html.setStyle(this.selectedField,"background-color","#dfdfdf");
}
},showDlg:function(_2f9){
this.manager.report.rptDlg.show("show","fieldHelp",_2f9);
},sortFields:function(key){
if(this.currentView){
cv.util.setMenuItem(this.currentView,"none");
}
this.currentView=key;
cv.util.setMenuItem(this.currentView,"checked");
var _2fa,_2fb=true;
var _2fc=this;
key=this.viewOptions[key];
switch(key){
case "displayLabel":
_2fb=false;
_2fa=function(a,b){
return _2fc._sortByName(a,b);
};
break;
case "schema":
_2fa=null;
this.fieldListItems=this._getFieldListItems();
key="businessGroup";
break;
case "type":
_2fa=function(a,b){
if(_2fc.isTimeAttribute(a,true)&&_2fc.isTimeAttribute(b,true)){
return _2fc._sortByName(a,b);
}
var aa=_2fc.get(a,"type");
var bb=_2fc.get(b,"type");
if(aa==bb){
return _2fc._sortByName(a,b);
}
if(aa=="NUMBER"){
return -1;
}
if(bb=="NUMBER"){
return 1;
}
return (aa=="ATTRIBUTE")?-1:1;
};
break;
case "businessGroup":
_2fa=function(a,b){
var aa=_2fc.get(a,"businessGroup");
var bb=_2fc.get(b,"businessGroup");
if(!aa&&!bb){
return _2fc._sortByHierarchy(a,b);
}
if(!aa){
return 1;
}
if(!bb){
return -1;
}
if(aa>bb){
return 1;
}
if(aa<bb){
return -1;
}
return _2fc._sortByHierarchy(a,b);
};
break;
default:
return;
}
if(_2fa){
this.fieldListItems.sort(_2fa);
}
if(this.fieldListNodes){
for(var x=0,len=this.fieldListNodes.length;x<len;++x){
if(this.fieldListNodes[x].dndObj){
this.fieldListNodes[x].dndObj=null;
}
}
}
this.fieldListNodes=[];
this.fieldListTreeContent.innerHTML="";
var _2fd=cv.util.getDojoWidget("theTooltip");
var len=this.fieldListItems.length;
var _2fe="!@#$",_2ff=null,_300=null,_301=false,_302=0;
for(var x=0;x<len;++x){
var item=this.fieldListItems[x];
if(_2fb){
var gp;
if(key=="type"&&this.isTimeAttribute(item,true)){
gp="TIME";
}else{
gp=this.get(item,key);
}
if(gp!=_2fe){
_2fe=gp;
var _303;
switch(key){
case "schema":
_303=_2fe?_2fe:cvCatalog.fieldGroupNoValue;
break;
case "type":
_303=cvCatalog["fieldTypeLabels_"+(_2fe?_2fe:"NUMBER")];
break;
case "businessGroup":
_303=_2fe?_2fe:cvCatalog.fieldGroupNoValue;
break;
default:
_303=cvCatalog.fieldGroupNoValue;
break;
}
_2ff=document.createElement("DIV");
_2ff.innerHTML=dojo.string.escape("html",_303);
_2ff.id="GROUP"+_302;
dojo.html.addClass(_2ff,"folder hidden uncommon");
_301=false;
this.fieldListTreeContent.appendChild(_2ff);
_300=document.createElement("DIV");
_300.id="GROUP"+_302+"DIV";
dojo.html.addClass(_300,"folderContent uncommon");
this.fieldListTreeContent.appendChild(_300);
new cv.Collapsible(_2ff,_300,true);
++_302;
}
}
var node=document.createElement("DIV");
var _304=item.getAttribute("formula");
var _305=this.get(item,"displayLabel",true);
var _306=this.getProperties(_304);
if(_306&&_306.length>0){
_305+=" ("+_306.length+")";
}
node.innerHTML=_305?_305:"&nbsp;";
node.setAttribute("formula",_304);
node.groupHeader=_2ff;
dojo.html.addClass(node,this.get(item,"type")=="NUMBER"?"field measure":"field attribute");
if(this.get(item,"isDefaultFavorite")!="true"){
dojo.html.addClass(node,"uncommon");
}else{
if(_2ff&&dojo.html.hasClass(_2ff,"uncommon")){
dojo.html.removeClass(_2ff,"uncommon");
dojo.html.removeClass(_300,"uncommon");
}
}
this.fieldListNodes.push(node);
if(_300){
_300.appendChild(node);
}else{
this.fieldListTreeContent.appendChild(node);
}
if(_2ff&&!_301&&((cv.isMobile()&&node.style.display!="none")||dojo.html.isDisplayed(node))){
cv.util.show(_2ff);
_301=true;
}
if(!cv.isMobile()){
_2fd.addConnectNode(node);
}
var _304=node.getAttribute("formula");
var _307=this.get(_304);
if(_307){
node.dndObj=new dojo.dnd.HtmlDragSource(node,this.getDndType(_307));
dojo.html.disableSelection(node);
}
}
if(this.searchField.value){
this.searchFields();
}
},_sortByName:function(a,b){
var aa=this.get(a,"displayLabel");
var bb=this.get(b,"displayLabel");
if(aa>bb){
return 1;
}
if(aa<bb){
return -1;
}
return 0;
},_sortByHierarchy:function(a,b){
var aa=this.get(a,"hierarchy");
var bb=this.get(b,"hierarchy");
if(!aa&&!bb){
return this._sortByName(a,b);
}
if(!aa){
return -1;
}
if(!bb){
return 1;
}
if(aa!=bb){
return (aa<bb?-1:1);
}
var _308=this.doc.documentElement.selectNodes("cv:hierarchyInfo[@formula=\""+aa+"\"]/cv:levelInfo");
aa=this.get(a,"formula");
bb=this.get(b,"formula");
for(var i=0;i<_308.length;++i){
var _309=_308[i].getAttribute("formula");
if(_309==aa){
return -1;
}
if(_309==bb){
return 1;
}
}
return this._sortByName(a,b);
},updateFieldCount:function(){
},onClearSearch:function(){
if(this.searchField.value){
this.searchField.value="";
this.searchFields();
this.searchField.focus();
}
cv.util.hide(this.clearSearchField);
},onMouseOver:function(e){
var node=e.target;
if(!node||!dojo.html.hasClass(node,"field")||this.selectedField==node){
return;
}
if(this.selectedField){
dojo.html.removeClass(this.selectedField,"fieldListItem-selected");
}
this.selectedField=node;
dojo.html.addClass(this.selectedField,"fieldListItem-selected");
},onMouseDown:function(e){
var node=e.target;
if(!node||!dojo.html.hasClass(node,"field")){
return;
}
var _30a=node.getAttribute("formula");
var _30b=this.get(_30a);
if(!_30b){
return;
}
},onDblClick:function(e){
if(e.target==this.selectedField){
this.manager.report.appendGem(this.selectedField.getAttribute("formula"));
}
},onContextMenu:function(e){
var node=cv.util.getAncestorByClass(e.target,"field");
if(!node){
return;
}
cv.util.getDojoWidget("theTooltip").cancelShowing=true;
var menu=cv.util.getDojoWidget("fieldListMenu");
menu.open(e.clientX,e.clientY,this);
e.preventDefault();
e.stopPropagation();
},onFieldAdd:function(){
if(this.selectedField){
this.manager.report.appendGem(this.selectedField.getAttribute("formula"));
}
},onFieldFilter:function(){
if(this.selectedField){
this.manager.report.rptDlg.showFilterList(this.selectedField.getAttribute("formula"));
}
},onFieldHelp:function(){
if(this.selectedField){
this.showDlg(this.selectedField.getAttribute("formula"));
}
},onViewCategory:function(){
this.sortFields("cmdViewCategory");
},onViewName:function(){
this.sortFields("cmdViewName");
},onViewSchema:function(){
this.sortFields("cmdViewSchema");
},onViewType:function(){
this.sortFields("cmdViewType");
},onViewFieldOptions:function(e){
var menu=cv.util.getDojoWidget("fieldViewMenu");
if(!menu){
return;
}
menu.open(e.pageX,e.pageY,this);
}});
cv.ReportResizer=function(_30c){
this.report=_30c;
this.previousPageX=-1;
this.resizeObj=null;
this.resizeData=null;
this.page=null;
};
cv.ReportResizer.prototype={destroy:function(){
this.page=null;
this.resizeData=null;
this.resizeobj=null;
},gainedFocus:function(e){
var obj=e.target;
if(!obj){
return;
}
this._updateCursorLook(e);
while(obj.tagName!="DIV"){
obj=obj.childNodes[0];
}
dojo.event.connect(obj,"onmousemove",this,"_updateCursorLook");
dojo.event.connect(obj,"onclick",this,"_showMenu");
dojo.event.connect(obj,"onmousedown",this,"_beginResize");
dojo.event.kwConnect({srcObj:obj,srcFunc:"onmouseout",targetObj:this,targetFunc:"_lostFocus",once:true});
},_lostFocus:function(e){
var obj=e.target;
while(obj.tagName!="DIV"){
obj=obj.childNodes[0];
}
dojo.event.disconnect(obj,"onmousemove",this,"_updateCursorLook");
dojo.event.disconnect(obj,"onclick",this,"_showMenu");
dojo.event.disconnect(obj,"onmousedown",this,"_beginResize");
},_beginResize:function(e){
if(!this._isInResizeZone(e)){
return;
}
this.previousPageX=e.pageX;
var obj=e.target;
while(obj.tagName!="DIV"){
obj=obj.childNodes[0];
}
this.resizeObj=obj;
this.resizeData=this.report.reportHeaders.getDataColumn(this.resizeObj.offsetParent);
this.page=this.resizeObj;
while(this.page.offsetParent){
this.page=this.page.offsetParent;
}
dojo.event.connect(this.page,"onmousemove",this,"_resize");
dojo.event.kwConnect({srcObj:this.page,srcFunc:"onmouseup",targetObj:this,targetFunc:"_endResize",once:true});
},_endResize:function(e){
this.report.reportHeaders.updateLayout();
dojo.event.disconnect(this.page,"onmousemove",this,"_resize");
var _30d=this._getWidth(this.resizeObj);
for(var i=0;i<this.resizeData.length;i++){
this.resizeData[i].childNodes[0].style.width=(_30d+1)+"px";
}
},_resize:function(e){
var _30e=this._getParentHeaders(this.resizeObj);
for(var i=0;i<_30e.length;i++){
this._resizeObj(_30e[i],e);
}
this.previousPageX=e.pageX;
},_resizeObj:function(obj,e){
var _30f=this._getWidth(obj);
_30f=_30f+(e.pageX-this.previousPageX);
var _310=obj.offsetParent.getAttribute("colspan")*1;
if(_30f<10*_310){
_30f=10*_310;
}
obj.style.width=_30f+"px";
},_getParentHeaders:function(obj){
var cell=obj.parentNode;
var row=cell.parentNode;
var _311=row.parentNode;
var rows=_311.getElementsByTagName("TR");
var _312=cell.getAttribute("colindex")*1;
return this.getParentHeaders(rows,_312);
},getParentHeaders:function(rows,_313){
var _314=new Array();
for(var i=0;i<rows.length;i++){
var _315=rows[i].childNodes;
for(var j=0;j<_315.length;j++){
var _316=_315[j];
var _317=_316.getAttribute("colspan")*1;
var _318=_316.getAttribute("rowspan")*1;
var _319=_316.getAttribute("colindex")*1;
if(_319<=_313&&_319+_317>_313){
_314.push(_316.childNodes[0]);
i+=_318-1;
break;
}
}
}
return _314;
},_updateCursorLook:function(e){
var obj=e.target;
while(obj.tagName!="DIV"){
obj=obj.childNodes[0];
}
if(e.target.style&&e.target.style.cursor){
if(this._isInResizeZone(e)){
obj.offsetParent.style.cursor="e-resize";
}else{
obj.offsetParent.style.cursor="";
}
}
},_showMenu:function(e){
if(!this._isInResizeZone(e)){
this.report.toggleInReportPopupMenu(e);
}
},_isInResizeZone:function(e){
var obj=e.target;
while(obj.tagName!="DIV"){
obj=obj.childNodes[0];
}
var _31a=e.pageX;
var objX=this._findLeft(obj);
var _31b=obj.offsetWidth;
var _31c=objX+_31b;
if(_31a>(_31c-10)&&_31a<_31c){
return true;
}else{
return false;
}
},_findLeft:function(obj){
var _31d=0;
if(obj.offsetParent){
while(obj.offsetParent){
_31d+=obj.offsetLeft-obj.scrollLeft;
obj=obj.offsetParent;
}
}else{
if(obj.x){
_31d+=obj.x;
}
}
if(!dojo.render.html.ie){
_31d-=this.report.reportHeaders.getHorzScrollAmount();
}
return _31d;
},_getWidth:function(obj){
var _31e=1*obj.style.width.substring(0,obj.style.width.length-2);
return _31e;
}};
cv.ReportHeaders=function(_31f,obj){
this.report=_31f;
this.tableArea=_31f.nodeReportArea;
this.pivotTable=dojo.dom.firstElement(_31f.nodeReportArea,"DIV");
this.rowLabelHeaderSection=cv.util.getFirstChildByClass(this.pivotTable,"pivotTableRowLabelHeaderSection");
this.rowLabelHeaderContainer=cv.util.getFirstChildByClass(this.pivotTable,"pivotTableRowLabelHeaderContainer");
this.rowLabelSection=cv.util.getFirstChildByClass(this.pivotTable,"pivotTableRowLabelSection");
this.rowLabelContainer=cv.util.getFirstChildByClass(this.pivotTable,"pivotTableRowLabelContainer");
this.columnHeaderSection=cv.util.getFirstChildByClass(this.pivotTable,"pivotTableColumnHeaderSection");
this.columnHeaderContainer=cv.util.getFirstChildByClass(this.pivotTable,"pivotTableColumnHeaderContainer");
this.columnHeaderTable=cv.util.getFirstChildByClass(this.columnHeaderContainer,"ZONE_columnAttributes");
this.dataSection=cv.util.getFirstChildByClass(this.pivotTable,"pivotTableDataSection");
this.dataContainer=cv.util.getFirstChildByClass(this.pivotTable,"pivotTableDataContainer");
this.content=cv.util.getFirstChildByClass(this.pivotTable,"pivotTableContent");
this.scrollbarArea=cv.util.getFirstChildByClass(this.pivotTable,"pivotTableScrollbars");
this.scrollbarAreaDiv=dojo.dom.firstElement(this.scrollbarArea,"DIV");
this.truncateType=this.pivotTable.truncateType;
this.dragNodes=[];
var _320=this.rowLabelContainer.firstChild;
while(_320.tagName!="TABLE"){
_320=_320.nextSibling;
}
this.rowLabelTable=_320;
var _320=this.dataContainer.firstChild;
while(_320.tagName!="TABLE"){
_320=_320.nextSibling;
}
this.colLabelTable=_320;
var _320=this.content.firstChild;
while(_320.tagName!="TABLE"){
_320=_320.nextSibling;
}
this.contentTable=_320;
if(this.truncateType=="ROW"||this.truncateType=="BOTH"){
_31f.byId("RowTruncateMsg").innerHTML=this.pivotTable.rowMsg;
}
if(this.truncateType=="COL"||this.truncateType=="BOTH"){
_31f.byId("ColTruncateMsg").innerHTML=this.pivotTable.colMsg;
}
cv.util.hide(this.report.nodeColTruncate,this.report.nodeRowTruncate);
this.rowLabelHeaders=this.rowLabelHeaderContainer.getElementsByTagName("TD");
var _321=this.rowLabelSection.getElementsByTagName("TR");
var _322=null;
this.rowLabels=null;
if(_321.length>0){
_322=_321[0].childNodes;
this.rowLabels=this.rowLabelSection.getElementsByTagName("COLGROUP")[0].childNodes;
}
var _323=this.columnHeaderSection.getElementsByTagName("TR");
this.columnHeaders=_323.length?_323[_323.length-1].childNodes:null;
if(this.columnHeaders!=null&&dojo.render.html.ie&&_323.length==1){
var _324=this.columnHeaderSection.getElementsByTagName("COLGROUP")[0].childNodes;
for(var i=0;i<_324.length;i++){
_324[i].width=(_324[i].width*1)-1;
}
}
this.dataColumns=this.dataSection.getElementsByTagName("TR");
dojo.event.connect(this.scrollbarArea,"onscroll",this,"_scroll");
this.previousPageX=-1;
this.previousPageY=-1;
this._setUpDrag();
if(dojo.render.html.ie){
dojo.event.connect(this.pivotTable,"onmousewheel",this,"_mouseScroll");
dojo.event.connect(this.pivotTable,"onmousemove",this,"_clearSelection");
}else{
if(this.pivotTable.addEventListener){
this.pivotTable.addEventListener("DOMMouseScroll",dojo.lang.hitch(this,"_mouseScroll"),false);
}
}
dojo.event.connect(this.rowLabelHeaderContainer,"onmousemove",this,"resize");
dojo.event.connect(this.pivotTable,"onmousedown",this,"_mouseDown");
dojo.event.connect(this.columnHeaderContainer,"ondblclick",this.report,"showEditDialogOnColumnHeader");
dojo.event.connect(this.rowLabelHeaderContainer,"ondblclick",this.report,"showEditDialogOnColumnHeader");
this.widths=new Array();
this.initialWidths=new Array();
this.columnWidths=new Array();
this.initialColumnWidths=new Array();
this.DEFAULT_COLUMN_WIDTH=120;
this.MINIMAL_WIDTH=10;
this.resizeLabels=new Array();
this.resizeColumns=new Array();
for(var i=0;i<this.rowLabelHeaders.length;i++){
var _325=0;
if(this.rowLabels!=null){
_325=dojo.html.getMarginBox(_322[i]).width;
}
var _326=dojo.html.getMarginBox(this.rowLabelHeaders[i]).width;
if(this.isTooLongOrHasSpace(this.rowLabelHeaders[i].title)){
_326=_326*1.1/2;
}
this.widths[i]=Math.min(_325,210);
this.widths[i]=Math.max(this.widths[i],80);
this.widths[i]=Math.max(this.widths[i],_326);
this.initialWidths[i]=this.widths[i];
}
if(dojo.render.html.ie){
var cols=this.dataContainer.childNodes[0].childNodes[0].childNodes;
if(this.columnHeaders!=null&&this.columnHeaders.length>0&&cols.length>0){
var _327=cols[0];
_327.width=(_327.width*1)+1;
_327=cols[cols.length-1];
_327.width=(_327.width*1)-(_323.length==1?2:1);
}
}
};
cv.ReportHeaders.prototype={disconnect:function(){
this._tearDownDrag();
for(var i=0;i<this.dragNodes.length;++i){
this.dragNodes[i].dndObj=null;
}
if(dojo.render.html.ie){
dojo.event.disconnect(this.pivotTable,"onmousewheel",this,"_mouseScroll");
dojo.event.disconnect(this.pivotTable,"onmousemove",this,"_clearSelection");
}
dojo.event.disconnect(this.pivotTable,"onmousedown",this,"_mouseDown");
dojo.event.disconnect(this.scrollbarArea,"onscroll",this,"_scroll");
dojo.event.disconnect(this.columnHeaderContainer,"ondblclick",this.report,"showEditDialogOnColumnHeader");
dojo.event.disconnect(this.rowLabelHeaderContainer,"ondblclick",this.report,"showEditDialogOnColumnHeader");
this.pivotTable=null;
this.rowLabelHeaderSection=null;
this.rowLabelHeaderContainer=null;
this.rowLabelSection=null;
this.rowLabelContainer=null;
this.columnHeaderSection=null;
this.columnHeaderContainer=null;
this.dataSection=null;
this.dataContainer=null;
this.tableArea=null;
this.content=null;
this.scrollbarArea=null;
this.rowLabelHeaders=null;
this.rowLabels=null;
this.columnHeaders=null;
this.dataColumns=null;
this.dragNodes=null;
},isTooLongOrHasSpace:function(_328){
return _328.length>30||_328.indexOf(" ")>-1;
},attachResizeNode:function(_329,_32a,_32b,_32c){
if(_329==null){
return;
}
var node=document.createElement("div");
node.id=_32c;
node.setAttribute("id",_32c);
if("after"==_32b){
_329.appendChild(node);
node.setAttribute("dojoType","CVResizeHandle");
}else{
node.setAttribute("dojoType","CVBeforeResizeHandle");
_329.insertBefore(node,_329.firstChild);
}
var _32d=new dojo.xml.Parse();
var frag=_32d.parseElement(node,null,true);
var _32e=dojo.widget.getParser().createComponents(frag);
_32e[0].reportHeader=this;
_32e[0].targetType=_32a;
_32e[0].targetDomNode=_329;
_32e[0].nodeId=_32c;
},_sumOf:function(_32f){
var sum=0;
for(var i=0;i<_32f.length;i++){
sum+=_32f[i];
}
return sum;
},_computeRowLabelWidths:function(){
var _330=new Array();
for(var i=0;i<this.widths.length;i++){
_330[i]=this.widths[i];
}
var _331=this._sumOf(_330);
var _332=0.67*this.pivotTableWidth;
while(_331>_332){
var _333=new Array();
var _334=0;
var _335=0;
for(var i=0;i<_330.length;i++){
if(_330[i]==_334){
_333[_333.length]=i;
}else{
if(_330[i]>_334){
_333=new Array();
_333[0]=i;
_334=_330[i];
}
}
}
for(var i=0;i<_330.length;i++){
if(_330[i]>_335&&_330[i]<_334){
_335=_330[i];
}
}
var _336=Math.max(1,Math.min(Math.ceil((_331-_332)/_333.length),_334-_335));
for(var i=0;i<_333.length;i++){
_330[_333[i]]-=_336;
}
_331=this._sumOf(_330);
}
return _330;
},_adjustRowLabelWidths:function(_337,_338,dx){
var _339=Math.max(dojo.html.getPadding(this.rowLabelContainer).width,dojo.html.getPadding(this.rowLabelHeaderContainer).width);
var _33a=_339;
this.rowLabelContainer.childNodes[0].style.tableLayout="fixed";
this.rowLabelContainer.childNodes[0].style.width="0px";
var cols=this.rowLabelHeaderContainer.getElementsByTagName("COL");
this.rowLabelHeaderContainer.childNodes[0].style.tableLayout="fixed";
this.rowLabelHeaderContainer.childNodes[0].style.width="0px";
for(var i=0;i<_337.length;i++){
var _33b=this.widths[i];
if(this.report.rowFieldWidths[i]!=null){
_33b-=this.report.rowFieldWidths[i];
}
if(_33b<this.MINIMAL_WIDTH){
_33b=this.MINIMAL_WIDTH;
}
if(typeof _338!="undefined"&&i==_338){
this.report.isReportPropsDirty=true;
_33b-=dx;
if(typeof this.report.rowFieldWidths[i]=="undefined"){
this.report.rowFieldWidths[i]=dx;
}else{
this.report.rowFieldWidths[i]+=dx;
}
}
this.rowLabelHeaders[i].childNodes[0].style.whiteSpace="normal";
cols[i].width=_33b+"px";
if(this.rowLabels!=null){
this.rowLabels[i].width=_33b+"px";
}
_339+=_33b;
}
_339-=_33a;
this.rowLabelHeaderSection.setAttribute("width",_339);
this.rowLabelSection.setAttribute("width",_339);
if(_339>0){
this.rowLabelHeaderContainer.style.width=_339+"px";
this.rowLabelContainer.style.width=_339+(dojo.render.html.ie?-1:0)+(dojo.render.html.safari?0:1)+"px";
}
return _339;
},_adjustColumnWidths:function(_33c,dx,_33d){
var _33e=new Array();
var _33f=this.columnHeaderContainer.getElementsByTagName("COL");
for(var i=0;i<_33f.length;i++){
if(typeof this.report.columnDataFieldWidths[i]!="undefined"){
_33e[i]=this.DEFAULT_COLUMN_WIDTH-this.report.columnDataFieldWidths[i];
}else{
_33e[i]=this.DEFAULT_COLUMN_WIDTH;
}
}
for(var i=0;i<_33e.length;i++){
if(typeof _33c!="undefined"&&typeof _33d!="undefined"&&i>=_33c&&i<_33c+_33d){
this.report.isReportPropsDirty=true;
_33e[i]-=dx/_33d;
}
}
var _340=0;
for(var i=0;i<_33e.length;++i){
_340+=_33e[i];
}
if(dojo.render.html.ie){
_340+=1;
}
this.columnHeaderSection.style.width=_340+"px";
this.columnHeaderContainer.style.width=_340+"px";
this.columnHeaderSection.setAttribute("width",_340);
this.columnHeaderContainer.setAttribute("width",_340);
var _341=this.dataContainer.getElementsByTagName("COL");
for(var i=0;i<_33e.length;i++){
_341[i].width=_33e[i]<this.MINIMAL_WIDTH?this.MINIMAL_WIDTH:_33e[i];
_33f[i].width=_33e[i]<this.MINIMAL_WIDTH?this.MINIMAL_WIDTH:_33e[i];
}
for(var i=0;i<_33e.length;i++){
this.report.columnDataFieldWidths[i]=this.DEFAULT_COLUMN_WIDTH-_33e[i];
}
cv.util.getFirstChildByClass(this.columnHeaderContainer,"ZONE_columnAttributes").style.width=_340+"px";
this.dataContainer.setAttribute("width",_340);
this.dataContainer.style.width=_340+"px";
var _342=this.dataContainer.getElementsByTagName("table");
_342[0].setAttribute("width",_340);
},_adjustHeadersHeight:function(){
if(this.rowLabelHeaders!=null&&this.rowLabelHeaders.length>0&&this.columnHeaders!=null&&this.columnHeaders.length>0){
var _343=4;
var _344=Math.max(dojo.html.getMarginBox(this.columnHeaders[0]).height,dojo.html.getMarginBox(this.rowLabelHeaders[0]).height)-_343;
for(var i=0;i<this.rowLabelHeaders.length;i++){
this.rowLabelHeaders[i].style.height=(_344-1)+"px";
}
for(var i=0;i<this.columnHeaders.length;i++){
this.columnHeaders[i].style.height=(_344-(dojo.render.html.ie?1:1))+"px";
}
}
},_adjustContainer:function(_345){
var _346=Math.max(dojo.html.getBorderBox(this.columnHeaderContainer.childNodes[0]).height,dojo.html.getBorderBox(this.rowLabelHeaderContainer.childNodes[0]).height);
this.rowLabelHeaderSection.setAttribute("height",_346);
this.rowLabelHeaderContainer.style.height=_346+"px";
this.columnHeaderSection.setAttribute("height",_346);
this.dataAreaWidth=this.scrollbarArea.clientWidth-_345-2;
var _347=this.scrollbarArea.clientHeight-_346;
this.content.style.width=this.scrollbarArea.clientWidth+"px";
this.content.style.height=this.scrollbarArea.clientHeight+"px";
this.dataContainer.scrollLeft=0;
this.dataContainer.scrollTop=0;
var _348=this.rowLabelContainer.childNodes[0].offsetHeight*this.scrollbarArea.clientHeight/_347;
var _349=this.columnHeaderSection.getAttribute("width")-0;
var _34a=_345+_349;
this.scrollbarAreaDiv.style.height=Math.max(_347,_348)+"px";
this.scrollbarAreaDiv.style.width=Math.max(this.dataAreaWidth,_34a)+"px";
},_clearHeaderHeightStyle:function(){
if(this.rowLabelHeaders!=null){
for(var i=0;i<this.rowLabelHeaders.length;i++){
this.rowLabelHeaders[i].style.height="";
}
}
if(this.columnHeaders!=null){
for(var i=0;i<this.columnHeaders.length;i++){
this.columnHeaders[i].style.height="";
}
}
},updateLayout:function(_34b,dx,_34c){
this.pivotTableHeight=this.report.reportHeight-10;
this.pivotTableWidth=this.report.reportWidth-10;
this.scrollbarArea.style.height=this.pivotTableHeight+"px";
this.scrollbarArea.style.width=this.pivotTableWidth+"px";
this.pivotTable.style.height=this.pivotTableHeight+"px";
this.pivotTable.style.width=this.pivotTableWidth+"px";
this.content.style.marginTop="-"+this.pivotTableHeight+"px";
var _34d=this._computeRowLabelWidths();
this._clearHeaderHeightStyle();
var _34e=0;
if(typeof _34c!="undefined"){
_34e=this._adjustRowLabelWidths(_34d);
}else{
_34e=this._adjustRowLabelWidths(_34d,_34b,dx);
}
this._adjustColumnWidths(_34b,dx,_34c);
this._adjustHeadersHeight();
this._adjustContainer(_34e);
if(dojo.render.html.ie){
var _34f=dojo.html.getElementsByClass("resize",this.columnHeaderContainer);
for(var x=0;x<_34f.length;++x){
dojo.html.setStyle(_34f[x],"top","0px");
dojo.html.setStyle(_34f[x],"position","static");
dojo.html.setStyle(_34f[x],"position","relative");
}
for(var x=0;x<this.resizeLabels.length;++x){
dojo.html.setStyle(this.resizeLabels[x],"top","0px");
dojo.html.setStyle(this.resizeLabels[x],"position","static");
dojo.html.setStyle(this.resizeLabels[x],"position","relative");
}
}
this._scroll(null);
},getDataColumn:function(o){
for(var i=0;i<this.columnHeaders.length;i++){
if(this.columnHeaders[i]==o){
var _350=new Array();
for(var j=0;j<this.dataColumns.length;j++){
_350[j]=this.dataColumns[j].childNodes[i];
}
return _350;
}
}
return null;
},_scroll:function(e){
var _351=cv.getActiveReport().reportDoc;
var _352;
if(_351.getReportOption("freezeColumns")=="true"&&_351.getReportOption("freezeRows")=="true"){
_352=this.XYLockedScrollStrategy;
}else{
if(_351.getReportOption("freezeColumns")=="true"){
_352=this.YLockedScrollStrategy;
}else{
if(_351.getReportOption("freezeRows")=="true"){
_352=this.XLockedScrollStrategy;
}else{
_352=this.UnlockedScrollStrategy;
}
}
}
try{
var pctX=-this.scrollbarArea.scrollLeft/(this.scrollbarArea.clientWidth-this.scrollbarAreaDiv.clientWidth);
var pctY=-this.scrollbarArea.scrollTop/(this.scrollbarArea.clientHeight-this.scrollbarAreaDiv.clientHeight);
var _353=Math.round(_352.getMaxXOffset(this)*pctX);
var _354=Math.round(_352.getMaxYOffset(this)*pctY);
_352.scroll(this,_353,_354);
this._checkTruncate(pctX,pctY);
}
catch(e){
alert(e);
}
},_clearSelection:function(e){
dojo.html.clearSelection(this.pivotTable);
},_mouseScroll:function(e){
dojo.event.disconnect(this.pivotTable,"onmousewheel",this,"_mouseScroll");
var _355=0;
if(typeof e.wheelDelta=="number"){
_355=e.wheelDelta;
}else{
if(typeof e.detail=="number"){
_355=-e.detail*40;
}
}
this._scrollByAmount(0,_355);
dojo.event.connect(this.pivotTable,"onmousewheel",this,"_mouseScroll");
},_mouseDown:function(e){
var node=dojo.dom.getAncestorsByTag(e.target,"td",true);
if(!node){
return;
}
var type=node.getAttribute("type");
if(type!="measure"&&type!="attribute"){
return;
}
if(!node.dndObj){
if(type=="measure"){
type="VM";
}else{
var gem=this.report.getGem(node.getAttribute("formula"));
if(!gem){
return;
}
type=gem.dndType+this.report.dropTargets[gem.getZoneId()].dndSuffix;
}
node.dndObj=new dojo.dnd.HtmlDragSource(node,type);
this.dragNodes.push(node);
}
},keyPress:function(_356){
if(_356==33){
this._scrollByAmount(0,250);
}else{
if(_356==34){
this._scrollByAmount(0,-250);
}else{
if(_356==38){
this._scrollByAmount(0,10);
}else{
if(_356==40){
this._scrollByAmount(0,-10);
}else{
if(_356==37){
this._scrollByAmount(10,0);
}else{
if(_356==39){
this._scrollByAmount(-10,0);
}
}
}
}
}
}
},_setUpDrag:function(){
dojo.event.connect(this.dataContainer,"onmousedown",this,"_startDrag");
},_tearDownDrag:function(){
dojo.event.disconnect(this.dataContainer,"onmousedown",this,"_startDrag");
},_startDrag:function(e){
dojo.event.disconnect(this.scrollbarArea,"onscroll",this,"_scroll");
this.previousPageX=e.pageX;
this.previousPageY=e.pageY;
this.changeIndex=0;
this.previousXChanges=new Array();
this.previousYChanges=new Array();
for(var i=0;i<9;i++){
this.previousXChanges[i]=0;
this.previousYChanges[i]=0;
}
var _357=e.target;
while(_357.offsetParent){
_357=_357.offsetParent;
}
dojo.event.kwConnect({srcObj:_357,srcFunc:"onmouseup",targetObj:this,targetFunc:"_stopDrag",once:true});
dojo.event.connect(document,"onmouseup",this,"_stopDrag");
dojo.event.connect(_357,"onmousemove",this,"_drag");
dojo.event.connect(document,"onmousemove",this,"_drag");
},_stopDrag:function(e){
var _358=e.target;
while(_358.offsetParent){
_358=_358.offsetParent;
}
if(this.scrollbarArea){
dojo.event.connect(this.scrollbarArea,"onscroll",this,"_scroll");
}
dojo.event.disconnect(document,"onmouseup",this,"_stopDrag");
dojo.event.disconnect(_358,"onmousemove",this,"_drag");
dojo.event.disconnect(document,"onmousemove",this,"_drag");
},_drag:function(e){
if(e.button<0||e.button>2){
this._stopDrag();
return;
}
var _359=true;
var _35a=true;
var _35b=e.pageX-this.previousPageX;
var _35c=e.pageY-this.previousPageY;
this.previousXChanges[this.changeIndex]=_35b;
this.previousYChanges[this.changeIndex]=_35c;
var _35d=0;
var _35e=0;
for(var i=0;i<9;i++){
_35d+=this.previousXChanges[i];
_35e+=this.previousYChanges[i];
}
if(Math.abs(_35d)*2<Math.abs(_35e)){
}
if(Math.abs(_35e)*2<Math.abs(_35d)){
}
this.changeIndex=(this.changeIndex+1)%9;
this.previousPageY=e.pageY;
this.previousPageX=e.pageX;
if(!_359){
_35b=0;
}
if(!_35a){
_35c=0;
}
this._scrollByAmount(_35b,_35c);
},_scrollByAmount:function(_35f,_360){
if(_35f==0&&_360==0){
return;
}
var _361=cv.getActiveReport().reportDoc;
var _362;
if(_361.getReportOption("freezeColumns")=="true"&&_361.getReportOption("freezeRows")=="true"){
_362=this.XYLockedScrollStrategy;
}else{
if(_361.getReportOption("freezeColumns")=="true"){
_362=this.YLockedScrollStrategy;
}else{
if(_361.getReportOption("freezeRows")=="true"){
_362=this.XLockedScrollStrategy;
}else{
_362=this.UnlockedScrollStrategy;
}
}
}
var _363=_362.getXOffset(this,_35f);
var _364=_362.getYOffset(this,_360);
var _365=_362.getMaxXOffset(this);
var _366=_362.getMaxYOffset(this);
_362.scroll(this,_363,_364);
this.updateScrollbars(Math.min(1,_363/_365),Math.min(1,_364/_366));
this._checkTruncate(_363/_365,_364/_366);
},updateScrollbars:function(_367,_368){
this.scrollbarArea.scrollLeft=-Math.round((this.scrollbarArea.clientWidth-this.scrollbarAreaDiv.clientWidth)*_367);
this.scrollbarArea.scrollTop=-Math.round((this.scrollbarArea.clientHeight-this.scrollbarAreaDiv.clientHeight)*_368);
},UnlockedScrollStrategy:{getXOffset:function(_369,_36a){
return (_369.contentTable.style.marginLeft)?parseInt(_369.contentTable.style.marginLeft)+_36a:_36a;
},getMaxXOffset:function(_36b){
return _36b.content.clientWidth-_36b.contentTable.scrollWidth;
},getYOffset:function(_36c,_36d){
return (_36c.contentTable.style.marginTop)?parseInt(_36c.contentTable.style.marginTop)+_36d:_36d;
},getMaxYOffset:function(_36e){
return _36e.content.clientHeight-_36e.contentTable.scrollHeight;
},scroll:function(_36f,_370,_371){
var _372=Math.min(Math.max(_370,this.getMaxXOffset(_36f)),0);
var _373=Math.min(Math.max(_371,this.getMaxYOffset(_36f)),0);
_36f.contentTable.style.marginLeft=_372+"px";
_36f.contentTable.style.marginTop=_373+"px";
}},XLockedScrollStrategy:{getXOffset:function(_374,_375){
return (_374.columnHeaderTable.style.left)?parseInt(_374.columnHeaderTable.style.left)+_375:_375;
},getMaxXOffset:function(_376){
return _376.content.clientWidth-_376.contentTable.scrollWidth;
},getYOffset:function(_377,_378){
return (_377.contentTable.style.marginTop)?parseInt(_377.contentTable.style.marginTop)+_378:_378;
},getMaxYOffset:function(_379){
return _379.content.clientHeight-_379.contentTable.scrollHeight;
},scroll:function(_37a,_37b,_37c){
var _37d=Math.min(Math.max(_37b,this.getMaxXOffset(_37a)),0);
var _37e=Math.min(Math.max(_37c,this.getMaxYOffset(_37a)),0);
_37a.colLabelTable.style.left=_37d+"px";
_37a.columnHeaderTable.style.left=_37d+"px";
_37a.contentTable.style.marginTop=_37e+"px";
}},YLockedScrollStrategy:{getXOffset:function(_37f,_380){
return (_37f.contentTable.style.marginLeft)?parseInt(_37f.contentTable.style.marginLeft)+_380:_380;
},getMaxXOffset:function(_381){
return _381.content.clientWidth-_381.contentTable.scrollWidth;
},getYOffset:function(_382,_383){
return (_382.rowLabelTable.style.top)?parseInt(_382.rowLabelTable.style.top)+_383:_383;
},getMaxYOffset:function(_384){
return _384.content.clientHeight-_384.contentTable.scrollHeight;
},scroll:function(_385,_386,_387){
var _388=Math.min(Math.max(_386,this.getMaxXOffset(_385)),0);
var _389=Math.min(Math.max(_387,this.getMaxYOffset(_385)),0);
_385.contentTable.style.marginLeft=_388+"px";
_385.colLabelTable.style.top=_389+"px";
_385.rowLabelTable.style.top=_389+"px";
}},XYLockedScrollStrategy:{getXOffset:function(_38a,_38b){
return (_38a.columnHeaderTable.style.left)?parseInt(_38a.columnHeaderTable.style.left)+_38b:_38b;
},getMaxXOffset:function(_38c){
return _38c.content.clientWidth-_38c.contentTable.scrollWidth;
},getYOffset:function(_38d,_38e){
return (_38d.rowLabelTable.style.top)?parseInt(_38d.rowLabelTable.style.top)+_38e:_38e;
},getMaxYOffset:function(_38f){
return _38f.content.clientHeight-_38f.contentTable.scrollHeight;
},scroll:function(_390,_391,_392){
var _393=Math.min(Math.max(_391,this.getMaxXOffset(_390)),0);
var _394=Math.min(Math.max(_392,this.getMaxYOffset(_390)),0);
_390.colLabelTable.style.left=_393+"px";
_390.columnHeaderTable.style.left=_393+"px";
_390.rowLabelTable.style.top=_394+"px";
_390.colLabelTable.style.top=_394+"px";
}},_checkTruncate:function(pctX,pctY){
if(this.report.closeTruncateStatus=="BothClose"){
return;
}
if((this.truncateType=="COL"||this.truncateType=="BOTH")&&this.report.closeTruncateStatus!="ColClose"){
if(pctX>=1||this.scrollbarArea.clientWidth>=this.scrollbarAreaDiv.clientWidth){
cv.util.show(this.report.nodeColTruncate);
this.report.nodeColTruncate.style.left=(this.tableArea.clientWidth-dojo.html.getMarginBox(this.report.nodeColTruncate).width-35)+"px";
this.report.nodeColTruncate.style.top=(this.tableArea.offsetTop+10)+"px";
}else{
cv.util.hide(this.report.nodeColTruncate);
}
}
if(this.truncateType=="ROW"||this.truncateType=="BOTH"&&this.report.closeTruncateStatus!="RowClose"){
if(pctY>=1||this.scrollbarArea.clientHeight>=this.scrollbarAreaDiv.clientHeight){
cv.util.show(this.report.nodeRowTruncate);
this.report.nodeRowTruncate.style.top=(this.tableArea.offsetTop+this.tableArea.clientHeight-dojo.html.getMarginBox(this.report.nodeRowTruncate).height-28)+"px";
}else{
cv.util.hide(this.report.nodeRowTruncate);
}
}
}};
dojo.provide("clearview.widget.CVRptInfoTooltip");
dojo.widget.defineWidget("clearview.widget.CVRptInfoTooltip",clearview.widget.CVTooltip,{loadStatus:null,cacheTooltip:null,hideDelay_2:3000,showDelay:100,isEditDescHidden:true,isRenamingHidden:true,fillInTemplate:function(args,frag){
dojo.widget.Tooltip.superclass.fillInTemplate.call(this,args,frag);
this.addOnLoad(this,"_loadedContent");
dojo.html.addClass(this.domNode,"cvRptInfoTooltip");
var _395=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_395);
this.applyPopupBasicStyle();
},_onMouseOver:function(e){
this._mouse={x:e.pageX,y:e.pageY};
var node=e.target;
this._connectNode=node;
this._loadedContent();
if(cv.formatRptInfoTooltip){
cv.formatRptInfoTooltip();
this.cancelShowing=false;
}else{
this.domNode.innerHTML="Report information dialog has not been initialized for this element";
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
dojo.widget.PopupContainerBase.prototype.open.call(this,this._mouse.x,this._mouse.y,null,[this._mouse.x,this._mouse.y],"TL,TR,BL,BR",[-20,-10]);
},_position:function(){
this.move(this._mouse.x,this._mouse.y,[-20,-10],"TL,TR,BL,BR");
},loadRptProps:function(){
if(!this.cacheTooltip){
var _396=this;
dojo.io.bind({url:cv.contextPath+"templates/reportPropsDlg_2.html",handle:function(type,data,evt){
if(type=="load"){
if(cv.util.parseAjaxMsg(data)){
this.loadStatus="errorRptTooltipLoad";
return;
}
_396.cacheTooltip=data;
}else{
_396.loadStatus="errorRptTooltipLoad";
}
},mimetype:"text/plain",method:"POST",sync:true});
}
if(this.loadStatus!=null){
return false;
}
var str=this.loadRptProps.arguments.length>0?dojo.string.substituteParams(this.cacheTooltip,this.loadRptProps.arguments):this.cacheTooltip;
if(dojo.lang.isUndefined(cv.rptDlgWidget)){
cv.rptDlgWidget=cv.util.getDojoWidget("theRptInfoTooltip");
}
cv.rptDlgWidget.setContent("<form id=\"theRptTooltipForm\" action=\"\" onsubmit=\"return false\">"+str+"</form>");
if(!cv.getActiveReport().createPAA||!cv.getActiveReport().manager.isReportWritable){
dojo.html.addClass(dojo.byId("editNameButton"),"hidden");
dojo.html.setStyle(dojo.byId("closeButton"),"padding-left","23px");
}
this.theRptTooltipForm=dojo.byId("theRptTooltipForm");
var _397=dojo.byId("editDescButton");
if(_397){
dojo.event.connect(_397,"onclick",this,"showEditDesc");
}
var _398=dojo.byId("editNameButton");
if(_398){
dojo.event.connect(_398,"onclick",this,"showRenameRpt");
}
if(dojo.byId("descBtnCancel")){
dojo.event.connect(dojo.byId("descBtnCancel"),"onclick",this,"hideEditDesc");
}
if(dojo.byId("descBtnSave")){
dojo.event.connect(dojo.byId("descBtnSave"),"onclick",this,"saveRptDesc");
}
if(dojo.byId("nameBtnCancel")){
dojo.event.connect(dojo.byId("nameBtnCancel"),"onclick",this,"hideRenameRpt");
}
if(dojo.byId("nameBtnSave")){
dojo.event.connect(dojo.byId("nameBtnSave"),"onclick",this,"renameReport");
}
if(dojo.byId("closeButton")){
dojo.event.connect(dojo.byId("closeButton"),"onclick",this,"closeTooltip");
}
return true;
},showRenameRpt:function(){
var node=dojo.byId("nameDiv");
node.innerHTML="<input id=\"hiddenRptName\" type=\"hidden\" value=\""+dojo.byId("name").innerHTML.replace(/(["])/gm,"////")+"\"><input id=\"name\" style=\"width:400px;\" value=\""+dojo.byId("name").innerHTML.replace(/(["])/gm,"////")+"\">";
dojo.html.setStyle(node,"padding-top","11px");
var _399=dojo.byId("name").value.replace(/\/\/\/\//g,"\"");
dojo.byId("hiddenRptName").value=dojo.byId("name").value=_399;
dojo.byId("name").focus();
dojo.html.removeClass(dojo.byId("nameBtn"),"hidden");
dojo.html.addClass(dojo.byId("editNameButton"),"hidden");
dojo.html.addClass(dojo.byId("closeButton"),"hidden");
this.isRenamingHidden=false;
this.isShowingNow=this.isEditDescHidden&&this.isRenamingHidden;
},hideRenameRpt:function(){
var node=dojo.byId("nameDiv");
node.innerHTML="<div id='name' style='font-weight: bold;width:360px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'>"+dojo.string.escape("html",dojo.byId("hiddenRptName").value)+"</div>";
dojo.html.setStyle(node,"padding-top","14px");
dojo.html.addClass(dojo.byId("nameBtn"),"hidden");
dojo.html.removeClass(dojo.byId("editNameButton"),"hidden");
dojo.html.removeClass(dojo.byId("closeButton"),"hidden");
this.isRenamingHidden=true;
if(!this._tracking){
dojo.event.connect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=true;
}
this.isShowingNow=this.isEditDescHidden&&this.isRenamingHidden;
},showEditDesc:function(){
var node=dojo.byId("editDescTextArea");
dojo.html.removeClass(dojo.byId("editDescTextAreaTR"),"hidden");
dojo.html.addClass(dojo.byId("descDivTR"),"hidden");
if(cv.getActiveReport().reportDoc.getReportProperty("description")==""){
node.innerHTML="<input id=\"hiddenDesc\" type=\"hidden\" value=\""+dojo.byId("description").innerHTML.replace(/(["])/gm,"&quot;")+"\"><textarea id=\"description\" style=\"width:430px;\" rows=3></textarea>";
}else{
node.innerHTML="<input id=\"hiddenDesc\" type=\"hidden\" value=\""+dojo.byId("description").innerHTML.replace(/(["])/gm,"&quot;")+"\"><textarea id=\"description\" style=\"width:430px;\" rows=3>"+dojo.byId("description").innerHTML.replace(/(["])/gm,"&quot;")+"</textarea>";
}
dojo.html.removeClass(dojo.byId("descBtn"),"hidden");
dojo.byId("editDescDiv").innerHTML="";
dojo.byId("description").focus();
this.isEditDescHidden=false;
this.isShowingNow=this.isEditDescHidden&&this.isRenamingHidden;
},hideEditDesc:function(){
var node=dojo.byId("editDescDiv");
dojo.html.addClass(dojo.byId("editDescTextAreaTR"),"hidden");
dojo.html.removeClass(dojo.byId("descDivTR"),"hidden");
var _39a=dojo.byId("hiddenDesc").value;
node.innerHTML="<div id='description' style='word-break:break-all;overflow:auto;padding-left:10px;'>"+dojo.byId("hiddenDesc").value+"</div>";
dojo.html.addClass(dojo.byId("descBtn"),"hidden");
dojo.byId("editDescTextArea").innerHTML="";
this.isEditDescHidden=true;
this.isShowingNow=this.isEditDescHidden&&this.isRenamingHidden;
},saveRptDesc:function(){
var desc=dojo.byId("description").value;
cv.getActiveReport().setReportProperties({description:desc});
dojo.byId("description").innerHTML=desc;
dojo.byId("hiddenDesc").value=desc;
this.hideEditDesc();
},renameReport:function(){
var name=dojo.string.trim(dojo.byId("name").value);
if(dojo.string.trim(dojo.byId("hiddenRptName").value)!=dojo.string.trim(dojo.byId("name").value)){
if(!name){
return cv.flex.showMessage("error",cvCatalog.dlgErrEmptyReportName);
}
cv.getActiveReport().byId("ReportName").innerHTML=dojo.string.escape("html",name);
document.title=name;
cv.getActiveReport().reportDoc.setReportProperty("name",name);
dojo.byId("hiddenRptName").value=name;
}
this.hideRenameRpt();
},showTooltip:function(){
if(!this._tracking){
dojo.event.connect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=true;
}
this.isShowingNow=true;
},closeTooltip:function(){
dojo.widget.PopupContainerBase.prototype.close.call(this);
this._tracking=false;
dojo.event.disconnect(document.documentElement,"onmousemove",this,"_MouseMove");
this.isShowingNow=false;
}});
var console_enabled=false;
function pentahoLoad(){
console_enabled=window.parent!=null&&window.parent.mantle_initialized==true;
if(cv.getActiveReport().manager.isReportWritable){
enableSaveButtons();
}
};
function enableEditButton(){
if(console_enabled&&window.parent.enableContentEdit){
window.parent.enableContentEdit(true);
}
};
function disableEditButton(){
if(console_enabled&&window.parent.enableContentEdit){
window.parent.enableContentEdit(false);
}
};
function lowerEditButton(){
if(console_enabled&&window.parent.setContentEditSelected){
window.parent.setContentEditSelected(true);
}
};
function resetEditButton(){
if(console_enabled&&window.parent.setContentEditSelected){
window.parent.setContentEditSelected(false);
}
};
function enableSaveButtons(){
if(console_enabled&&window.parent.enableAdhocSave){
window.parent.enableAdhocSave(true);
}
};
function disableSaveButtons(){
if(console_enabled&&window.parent.enableAdhocSave){
window.parent.enableAdhocSave(false);
}
};
function refreshBrowsePanel(){
if(console_enabled&&window.parent.mantle_refreshRepository){
window.parent.mantle_refreshRepository();
}
};
var gCtrlr=new WaqrProxy();
function WaqrProxy(){
this.wiz=new Wiz();
this.repositoryBrowserController=new RepositoryBrowserControllerProxy();
};
function Wiz(){
currPgNum=0;
};
function savePg0(){
};
function RepositoryBrowserControllerProxy(){
this.getPossibleFileExtensions=function(){
return [".xanalyzer"];
},this.remoteSave=function(_39b,_39c,_39d,_39e,_39f){
if(_39b.indexOf(".xanalyzer")!=-1&&_39b.indexOf(".xanalyzer")==(_39b.length-10)){
_39b=_39b.substr(0,_39b.length-10);
}
cv.getActiveReport().reportDoc.setReportProperty("name",unescape(_39b.replace("+","%20")));
var _3a0=cv.getActiveReport().manager.saveReport("saveAs",_39b,_39c+_39d);
if(_3a0==true){
refreshBrowsePanel();
}
};
};
function drill(col,row){
var _3a1=new Date();
var _3a2="drillpopup"+_3a1.getTime();
window.open("",_3a2,"scrollbars=no,menubar=no,height=550,width=800,resizable=yes,toolbar=no,status=no");
var form=dojo.byId("drillForm");
form.setAttribute("action",cv.contextPath+"drill");
form.setAttribute("target",_3a2);
var _3a3=dojo.byId("drillForm_reportXML");
_3a3.setAttribute("value",cv.getActiveReport().getReportXml());
_3a3=dojo.byId("drillForm_colIndex");
_3a3.setAttribute("value",col);
_3a3=dojo.byId("drillForm_rowIndex");
_3a3.setAttribute("value",row);
form.submit();
};
function linkPivot(src){
var node=src.parentNode.parentNode;
var ctx={formula:node.getAttribute("formula"),member:node.getAttribute("member"),clickLevel:true};
cv.getActiveReport().linkDlg.performAction(new Array(ctx));
};
function linkChart(json){
var _3a4=eval("("+json+")");
cv.getActiveReport().linkDlg.performAction(_3a4);
};
function keepAndShow(json){
var _3a5=eval("("+json+")");
cv.getActiveReport().clickChart(_3a5);
};

