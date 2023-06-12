/**
 * The Pentaho proprietary code is licensed under the terms and conditions
 * of the software license agreement entered into between the entity licensing
 * such code and Pentaho Corporation.
 * 
 * Define a customize menu, the sub menu of it will show in the left of the current menu item
 * 
 */

dojo.provide("clearview.widget.CVLeftSidePopupMenu");

dojo.require("dojo.widget.PopupContainer");
dojo.widget.defineWidget(
	"clearview.widget.CVLeftSidePopupMenu",
	dojo.widget.PopupMenu2,
	
{
	submenuDelay: 750,

	open: function(/*Integer*/x, /*Integer*/y, /*DomNode*/parent, /*Object*/explodeSrc, /*String?*/orient, /*Array?*/padding){
		
                //call parent's method
		this.inherited('open', [x,y,parent,explodeSrc,orient,padding]);
         
		if (x == 0)
		{
                    //when we call this method with x:0 then we hope this widget will not be rendered
		    this.domNode.style.display="none";
		    this.isShowingNow = false;
		    return;
		} else
		{  
		    this.isShowingNow = true;
		}
	},

	_openSubmenu: function(submenu, from_item){
		// summary: open the menu to the left of the current menu item
		var fromPos = dojo.html.getAbsolutePosition(from_item.domNode, true);
		var our_w = dojo.html.getMarginBox(this.domNode).width;
		
		
		var x = fromPos.x  - submenu.width;
		var y = fromPos.y;
        
		if (x + ""== "NaN")
		{
		   //If we call open() with x:NaN on IE, nothing will be rendered!!
		   submenu.open(0, y, this, from_item.domNode);
		} else
		{
		   submenu.open(x, y, this, from_item.domNode);
		}
		
		
		if (x + ""== "NaN")
		{
		    //when submenu have not show, it hasn't 'width' attribute
		    //show submenu again with the correct position
		    x = fromPos.x  - submenu.width;
                    submenu.open(x, y, this, from_item.domNode);
		} 
        
		this.currentSubmenuTrigger = from_item;
		this.currentSubmenuTrigger.is_open = true;
	},
    
        //This method must existed if this script run on IE 
	onOpen: function(/*Event*/ e){
        //do same action as parent
        this.inherited('onOpen', [e]); 
    }	
});
