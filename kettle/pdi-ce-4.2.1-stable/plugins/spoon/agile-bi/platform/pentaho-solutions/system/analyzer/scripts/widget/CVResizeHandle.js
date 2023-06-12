/**
 * The Pentaho proprietary code is licensed under the terms and conditions
 * of the software license agreement entered into between the entity licensing
 * such code and Pentaho Corporation.
 * 
 * Process resize action on a report
 * 
 */

dojo.provide("dojo.widget.ResizeHandle2");
dojo.require("dojo.widget.*");
dojo.require("dojo.html.layout");
dojo.require("dojo.event.*");

//base class for resize
dojo.widget.defineWidget(
    "dojo.widget.CVResizeHandle",
    dojo.widget.ResizeHandle,
{

    templateString: '<div class="resizeHandle" style="right: 0"><div></div></div>',
    
    INITIAL_WIDTH: 0,
    MINIMAL_WIDTH: 10,//
    
    postCreate: function(){
         //give me an ID, make me easy to test
        this.domNode.id = "CVResizeHandle_" + this.widgetId;
        dojo.event.connect(this.domNode, "onmousedown", this, "_beginSizing");
       
        dojo.event.connect(this.domNode, "ondblclick", this, "_revert");
       
    },

    /**
    * revert the width of a column
    */
    _revert: function(/*Event*/ e) {
        
        if (this.targetType == "Label") {
            this.reportHeader.report.rowFieldWidths[this.resizeIndex] = 0; 
        } else if(this.targetType == "Column") {
            var colspan = this.targetDomNode.parentNode.getAttribute("colspan") - 0; 
            
            for (var i = 0; i < this.reportHeader.report.columnDataFieldWidths.length; i++) {
                if (i >= this.resizeIndex 
                    && i < this.resizeIndex + colspan) {   
                    this.reportHeader.report.columnDataFieldWidths[i] = 0;
                }
            }     
        }  
        
        
        this.reportHeader.updateLayout();
        this.reportHeader.report.history.add(new cv.ReportState("Reset Column"));
        this.reportHeader.report.history.setRefreshed(true);
    },
    /**
    * 
    **/
    _drawLine: function(/*Integer*/leftX) {
        with (this.line.style) {
            
            left = leftX + "px";  
            
            
            if (dojo.render.html.ie) {
                top = "2px";
            }              
        }
        
        this.reportHeader.rowLabelSection.appendChild(this.line);
    },
    
    _showLine: function() {
        if (this.line == null) {
            return;
        }
        
        with (this.line.style) { 
            visibility = "";
        }
    },
    
    _hideLine: function() {
        if (this.line == null) {
            return;
        }
        
         with (this.line.style) {
            //display = "none" ??
            visibility = "hidden";
        }
    },
    
    _createLineOnCursorPosition: function(/*Event*/e) {
        var fromPos = dojo.html.getAbsolutePosition(this.reportHeader.rowLabelSection, true);
        //The left side of this.report.rowLabelSection is defferent when you click 'Hide Field List' or 'Show Field List'
        var leftX = e.clientX - fromPos.x + this.INITIAL_WIDTH;
        
        if (this.line == null) {
            //
            this.line = document.createElement("div");  
            //dojo.event.connect(this.line, "ondblclick", this, "_revert");
            dojo.html.addClass(this.line, "resizeIndicator");
            this._drawLine(leftX);
            return;  
        }
   },
   
   _moveLineToCursorPosition: function(/*Event*/e) {
        var fromPos = dojo.html.getAbsolutePosition(this.reportHeader.rowLabelSection, true);
        //The left side of this.report.rowLabelSection is defferent when you click 'Hide Field List' or 'Show Field List'
        var leftX = e.clientX - fromPos.x + this.INITIAL_WIDTH;
        if (typeof this.currentWidth != "undefined") {     
             var offset = 1;
             if (this.targetType == "Column") {
                offset = this.targetDomNode.parentNode.getAttribute("colspan") - 0; 
             }  
             
             if (this.currentWidth - this.dx < this.MINIMAL_WIDTH * offset) {
                  //overflow
                  leftX = (this.startPoint.x - (this.currentWidth - this.MINIMAL_WIDTH * offset))- fromPos.x + this.INITIAL_WIDTH;
                  
                  //in IE7, e.offsetX = value will get a exception
                  if (dojo.render.html.ie) {
                      dojo.event.disconnect(dojo.body(), "onmousemove", this, "_changeSizing");
                  } else {
                      e.offsetX = leftX;
                  }   
                  
                  this.dx = this.currentWidth - this.MINIMAL_WIDTH * offset;
             }
        }
        this._showLine();
        this._drawLine(leftX);  
    },
    
    _getCurrentColumnWidth: function() {
        this.currentWidth = 0;
        var cols = [];
        
        if (this.targetType == "Label") {
            cols = this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL");
            this.currentWidth = cols[this.resizeIndex].width;
        } else if (this.targetType == "Column") {
            cols = this.reportHeader.columnHeaderContainer.getElementsByTagName("COL");
            
            var colspan = this.targetDomNode.parentNode.getAttribute("colspan") - 0; 
            
            for (var i = 0; i < cols.length; i++) {
                if (i >= this.resizeIndex 
                    && i < this.resizeIndex + colspan) {        
                    this.currentWidth += cols[i].width -0;
                }
            }               
        } else {
            //do not support other type now
            return ;
        }
    },
    
    _beginSizing: function(/*Event*/ e) {
        
        this.resizeIndex = this.targetDomNode.attributes["resizeIndex"].value - 0;
        this._getCurrentColumnWidth();
        this.dx = 0;
        this.startPoint  = {'x':e.clientX, 'y':e.clientY};
        this._createLineOnCursorPosition(e);
        
         dojo.event.connect(this.line, "ondblclick", this, "_revert");
        dojo.event.connect(dojo.body(), "onmousemove", this, "_changeSizing");
        dojo.event.connect(dojo.body(), "onmouseup", this, "_endSizing");
        e.preventDefault();
    },
    
    _changeSizing: function(/*Event*/ e){
        //setting this flag to true, then any DND actions will be disable
        this.reportHeader.report.isResizing = true;  

        try {
            if(!e.clientX  || !e.clientY){ return; }
        }catch(e){
            // sometimes you get an exception accessing above fields...
            return;
        }

        e.preventDefault();
        
        this.dx = this.startPoint.x - e.clientX;
        this._moveLineToCursorPosition(e);
        
    },
    
    _endSizing: function(/*Event*/ e){
        
        this.inherited('_endSizing', [e]); 
        
        //Note: you can't remove the line from html dom!
        //because our 'ondblclick' event are wire to line
        this._hideLine();
        
        this.dx = this.dx || 0;
        
        var reportState = new cv.ReportState("Column Resize");
        if (this.targetType == "Label") {
           
            this.reportHeader.updateLayout(this.resizeIndex ,this.dx);  
            reportState.resizeData = {index:this.resizeIndex, dx:this.dx};
        } else if(this.targetType == "Column") {
            
            var colspan = this.targetDomNode.parentNode.getAttribute("colspan") - 0; 
            this.reportHeader.updateLayout(this.resizeIndex ,this.dx,colspan);
            reportState.resizeData = {index:this.resizeIndex,dx:this.dx,colspan:colspan};
        }  
        
        this.reportHeader.report.history.add(reportState);
        this.reportHeader.report.history.setRefreshed(true);
        this.reportHeader.report.isResizing = false;  
    }
    
});

dojo.widget.defineWidget(
    "dojo.widget.CVBeforeResizeHandle",
    dojo.widget.CVResizeHandle,
{
   
     templateString: '<div class="resizeHandle" style="left: 0"><div></div></div>',
     postCreate: function(){
        //give me a ID, make me easy to test
        this.domNode.id = "CVResizeHandle_" + this.widgetId;
        dojo.event.connect(this.domNode, "onmousedown", this, "_beginSizing");
        dojo.event.connect(this.domNode, "ondblclick", this, "_revert");
     },
     
     
     _getCurrentColumnWidth: function() {
        this.currentWidth = 0;
        var cols = [];
        if (this.targetType == "Label") {
            cols = this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL");
            this.currentWidth = cols[this.resizeIndex -1].width;
        } else if (this.targetType == "Column") {
            if (this.resizeIndex == 0){
                var lastIndexOfRowLabel = this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL").length -1;
                this.currentWidth = this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL")[lastIndexOfRowLabel].width;
            } else {
                
                cols = this.reportHeader.columnHeaderContainer.getElementsByTagName("COL");
            
                var colspan = this.targetDomNode.parentNode.getAttribute("colspan") - 0; 
                var realResizeIndex = this.resizeIndex - colspan;
                for (var i = 0; i < cols.length; i++) {
                    if (i >= realResizeIndex 
                        && i < realResizeIndex + colspan) {        
                        this.currentWidth += cols[i].width -0;
                    }
                }    
            }
                       
        } else {
            //do not support other type now
            return ;
        }
    },
    
      /**
    * revert the width of a column
    */
    _revert: function(/*Event*/ e) {
        
        if (this.targetType == "Label") {
            this.reportHeader.report.rowFieldWidths[this.resizeIndex -1] = 0; 
        } else if(this.targetType == "Column") {
             
            
             if (this.resizeIndex == 0){
                var lastIndexOfRowLabel = this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL").length -1;
                this.reportHeader.report.rowFieldWidths[lastIndexOfRowLabel] = 0; 
            } else {
                  var colspan = this.targetDomNode.parentNode.getAttribute("colspan") - 0; 
                  var actualColumnIndex = this.resizeIndex -colspan;
                  for (var i = 0; i < this.reportHeader.report.columnDataFieldWidths.length; i++) {
                      if (i >= actualColumnIndex 
                          && i < actualColumnIndex + colspan) {   
                          this.reportHeader.report.columnDataFieldWidths[i] = 0;
                      }
                 }   
            }
            
        }  
        
        
        this.reportHeader.updateLayout();
        this.reportHeader.report.history.add(new cv.ReportState("Reset Column"));
        this.reportHeader.report.history.setRefreshed(true);
    },
    
     _endSizing: function(/*Event*/ e){
       
        dojo.event.disconnect(dojo.body(), "onmousemove", this, "_changeSizing");
		dojo.event.disconnect(dojo.body(), "onmouseup", this, "_endSizing");

		
        this._hideLine();
        
        this.dx = this.dx || 0;
        var reportState = new cv.ReportState("Column Resize","");
       
        if (this.targetType == "Label") {
            this.reportHeader.updateLayout(this.resizeIndex -1,this.dx);  
            reportState.resizeData = {index:this.resizeIndex -1,dx:this.dx};
        } else if(this.targetType == "Column") {
            if (this.resizeIndex == 0){
                var lastIndexOfRowLabel = this.reportHeader.rowLabelHeaderContainer.getElementsByTagName("COL").length -1;
                this.reportHeader.updateLayout(lastIndexOfRowLabel,this.dx);  
                reportState.resizeData = {index:lastIndexOfRowLabel,dx:this.dx} ;
            } else {
                var colspan = this.targetDomNode.parentNode.getAttribute("colspan") - 0; 
                this.reportHeader.updateLayout(this.resizeIndex - colspan,this.dx,colspan);
                 reportState.resizeData = {index : this.resizeIndex - colspan,dx:this.dx,colspan:colspan};
            } 
        }  
        
        this.reportHeader.report.history.add(reportState);
        this.reportHeader.report.history.setRefreshed(true);
        this.reportHeader.report.isResizing = false;  
    } 
});