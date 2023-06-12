/**
 * The Pentaho proprietary code is licensed under the terms and conditions
 * of the software license agreement entered into between the entity licensing
 * such code and Pentaho Corporation. 
 */

var anaLoadFunct = function(){
window.AnalyzerComponent = BaseComponent.extend({
  type: "AnalyzerComponent",
  executeAtStart: true,
  iconImgSrc:'../../../../../content/analyzer/images/analysis_report_file_icon.png',
  isDirty : false,
  setDirty : function(isDirty) {
    this.isDirty = isDirty;
  },

  getOutputParameters : function(){//TODO: [[name, enabled, inner_id]]
    return this.outputParameters;
  },
  setOutputParameters : function(outputParameters){
    for(var i=0; i< outputParameters.length; i++){
      this.setColumnContentLinkStatus(i, OutputParametersHelper.isParamEnabled(outputParameters[i]));
    }
  },
  setColumnContentLinkStatus : function (colIdx, enabled){
    if(this.outputParameters && this.outputParameters.length > colIdx){
      var prevEnabled = this.outputParameters[colIdx][OutputParametersHelper.OUT_PARAMS_ENABLED_IDX];
      if(enabled && !prevEnabled){
        //set default
        var dataId = this.outputParameters[colIdx][OutputParametersHelper.OUT_PARAMS_ID_IDX];
        var paramUID = OutputParametersHelper.getOutParameterUID(this, dataId);
        pentahoDashboardController.setParameterAndDefaultValue(null, paramUID, null);
      }
      this.outputParameters[colIdx][OutputParametersHelper.OUT_PARAMS_ENABLED_IDX] = enabled;
    }
  },

  update : function() {
      var localThis = this;

    try {
      var xactionIFrameHTML = "<iframe id=\"iframe_"+ this.htmlObject + "\"" +
      " frameborder=\"0\"" +
      " height=\"100%\"" +
      " width=\"100%\"" +
      " src=\"";

      xactionIFrameHTML += webAppPath + "/content/analyzer/viewer?frameless=true&solution=" + this.solution + "&path=" + this.path + "&action=" + this.action;

      // Add args
      var p = new Array(this.parameters.length);
      for(var i= 0, len = p.length; i < len; i++){
        var arg = "&" + encodeURIComponent(this.parameters[i][0]) + "=";
        
          var paramVal = (this.parameters[i][1] == null || this.parameters[i][1] == "") ? this.parameters[i][2] : Dashboards.getParameterValue(this.parameters[i][1]);
          if(paramVal == "NIL"){
            paramVal = this.parameters[i][2];
            if(paramVal != "NIL"){
              xactionIFrameHTML += arg + encodeURIComponent(paramVal);
            }
          } else if (typeof(paramVal) == 'string') {
            xactionIFrameHTML += arg + encodeURIComponent(paramVal);
          } else if (typeof(paramVal) == 'object' && paramVal.length) {
            for (var prop in paramVal) {
              var param = paramVal[prop];
              if (typeof(param) == 'string') {
                xactionIFrameHTML += arg + encodeURIComponent(param);
              }
            }
          }
        
      }

      // Add content linking args
      if(this.outputParameters) {
        var cl = new Array(this.outputParameters.length);
        for(var j= 0, len = cl.length; j < len; j++){
          if (this.outputParameters[j][1] == true ) {
            //EC: The widgetId is included here as a temporary solution for content linking.
            var arg = "&::cl=";
            if (this.outputParameters[j].length == 3) {
              var paramid = this.outputParameters[j][2];

              //Temporary fix until removal of widget id from parameter name
              if(paramid.indexOf("$") > 0){
          	    paramid = paramid.substring(paramid.indexOf("$")+1);
              }
              xactionIFrameHTML += arg + encodeURIComponent(paramid);
            } else {
              // something isn't right here
            }
          }
        }
      }

      // Close IFrame
      xactionIFrameHTML += "\"></iframe>";

      setTimeout(function(){$("#"+localThis.htmlObject).html(xactionIFrameHTML)});

    } catch (e) {
      // don't cause the rest of CDF to fail if xaction component fails for whatever reason
    }
  },

  // This will retrieve the parameters for this Analyzer report from the server
  refreshParameters : function() {

    this.staticParameters = true;
	// save a reference to this for use in nested functions
    var thisComponent = this;

    var defaultParams = [];
    $.ajax({
         url: webAppPath + "/content/analyzer/parameters?solution=" + this.solution + "&path=" + this.path + "&action=" + this.action,
         success:function(data) {
            $('parameter', data).each(function() {
              var paramId = $(this).attr('name');
              var paramLabel = $(this).find('attribute[name=label]').eq(0).attr("value");
              var defaultVals = $(this).find('values').find('value[selected=true]');
              if(defaultVals && defaultVals.length > 0){
                for(var y=0; y< defaultVals.length; y++){
                  var paramDefaultValue = $(this).find('values').find('value[selected=true]').eq(y).attr('value');
                  var paramRequired = $(this).attr('is-mandatory');
                  if (paramDefaultValue == undefined) {
                    paramDefaultValue = '';
                  }
                  defaultParams.push([paramLabel, '', paramDefaultValue]);
                }
              }
            });

            WidgetHelper.mergeParameters(thisComponent, defaultParams);

            // handle the output parameters too
            WidgetHelper.mergeOutputParameters(thisComponent, data);

          },
         async:   false,
        contentType: "xml"
    });
  },
  getGUID : function(){
    if(this.GUID == null){
      this.GUID = WidgetHelper.generateGUID();
    }
    return this.GUID;
  }

});

AnalyzerComponent.newInstance = function(prptref, localizedFileName) {

  var widget = new AnalyzerComponent();
  widget.localizedName = localizedFileName;
  widget.GUID = WidgetHelper.generateGUID();
  // used in GWT properties panel
  widget.iframe = true;
  widget.parameters = [];
  widget.outputParameters = [];
  var selectedWidgetIndex = pentahoDashboardController.getSelectedWidget() + 1; // add one to convert to 1-based
  widget.name = 'widget' + selectedWidgetIndex;
  widget.htmlObject = 'content-area-Panel_' + selectedWidgetIndex;
  var vals = XActionHelper.parseXaction(prptref);

  widget.xactionPath = prptref;
  widget.solution = vals[0];
  widget.path = vals[1];
  widget.action = vals[2];
  currentWidget = widget;

  widget.refreshParameters();
	currentWidget = widget;
  var details = XActionHelper.genXaction(widget.solution, widget.path, widget.action);
  PropertiesPanelHelper.initPropertiesPanel(details);

}

resolveOutParams = function(outputParameters) {
    if(!outputParameters) {
      return [];
    }
    if (outputParameters.length) {
      return outputParameters;
    } else {
      var params = [];
      var ok = true;
      var i = 0;
      while(ok) {
          var param = eval("outputParameters.parameter" + i);
          if (typeof(param) != 'undefined') {
              ok = true;
              i++;
              var id = param.name;
              if (typeof(param.id) != 'undefined') {
                  id = param.id;
              }
              params.push([param.name, param.enabled, id]);
          } else {
              ok = false;
          }
      }
      return params;
    }
}

PentahoDashboardController.registerComponentForFileType("xanalyzer", AnalyzerComponent);
};
delayedFunctions.push(anaLoadFunct);
