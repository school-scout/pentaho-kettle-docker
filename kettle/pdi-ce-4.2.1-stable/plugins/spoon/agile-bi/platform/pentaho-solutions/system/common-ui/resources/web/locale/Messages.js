Messages = function()
{
};

/*private static*/Messages.init = function()
{
	if (Messages.messageBundle === undefined) {
	  Messages.messageBundle = new Array();
	}
};

/**
 * Add a resource bundle to the set of resource bundles.
 * 
 * @param packageName String the name of the package containing the javascript
 * file with the resource strings. 
 * @param fileName String name of the javascript file with the 
 * resource strings, without the extention.
 */
/*public static*/Messages.addBundle = function( packageName, fileName )
{
  // Make sure Dojo doesn't try to load message bundles from any other locales than the default (ROOT).
  // Without the locale override Dojo will attempt to load resources from: ROOT, language, locale (language + variant). 
  //     e.g. For English in the US: ROOT, en, en-us
  //          This results in 404s for any message bundle that does not exist as the client has no way of knowing.
  // We should change this to URL bundles exclusively or run a dojo build for all javascript (dataapi, common, etc)
  dojo.requireLocalization(packageName, fileName, "ROOT", "ROOT");
  // dojo.requireLocalization(packageName, fileName);
  Messages.messageBundle.push( dojo.i18n.getLocalization(packageName, fileName) );
};

/*public static*/Messages.addUrlBundle = function( packageName, url )
{
    var xml = pentahoGet( url, '' );

    var pos1 = xml.indexOf('<return>');
    var pos2 = xml.indexOf('</return>');

    if( pos1 != -1 && pos2 != -1 ) {
        resultJson = xml.substr( pos1+8, pos2-pos1-8 )
    }
    var bundle = eval('('+resultJson+')');

    Messages.messageBundle.push( bundle );    
};

/*private static*/
Messages.entityDecoder=document.createElement('textarea');

/*public static*/
Messages.html_entity_decode = function(str)
{
    try{
        Messages.entityDecoder.innerHTML = str; 
        var value = Messages.entityDecoder.value;
        value = unescape(value);
        return value;
    } catch (e) {
        alert('cannot localize message: '+str);
    }
}

/**
 * Get the string from a message bundle referenced by <param>key</param>.
 * @param key String the key in the bundle which references the desired string
 * @param substitutionVars Array of String (optional) an array of strings
 * to substitute into the message string. 
 * @return String the string in the message bundle referenced by <param>key</param>.
 */
/*public static*/Messages.getString = function( key, substitutionVars )
{
	var msg = key; // if we don't find the msg, return the key as the msg
	// loop through each message bundle
	for ( var ii=0; ii<Messages.messageBundle.length; ++ii ) {
          // does this bundle have the key we are looking for?
        if (key in Messages.messageBundle[ii]) {
          // yes, it has the key
            msg = Messages.messageBundle[ii][key];
            if ( undefined != substitutionVars )
            {
                var subs = {};
                if(dojo.isString(substitutionVars)) {
                    subs['0'] = substitutionVars;
                }
                else if(dojo.isArray(substitutionVars)) {
                    for(var sNo=0; sNo<substitutionVars.length; sNo++) {
                        subs[''+sNo] = substitutionVars[sNo];
                    }
                }
                else if(dojo.isObject(substitutionVars)) {
                    subs = substitutionVars;
                }
                if(dojo.string.substituteParams) {
                    msg = dojo.string.substituteParams(msg, subs);
                } 
                else if(dojo.replace) {
                    msg = dojo.replace(msg, subs);
                }
            }
            break;
        }
	}
	return Messages.html_entity_decode(msg);
};
var cnt = 0;

/**
 * TODO sbarkdull: this method does not belong here, it belongs in UIUtils
 * 
 * @param elementOrId String or HTML element, if String, must be the id of an HTML element
 * @param msgKey String key into the message map
 */
/*public static*/Messages.setElementText = function( elementOrId, msgKey )
{
	var element;
	if (typeof elementOrId == "string") {
		element = document.getElementById(elementOrId);
	} else {
		element = elementOrId;
	}
	if (element) {
		element.innerHTML = Messages.getString(msgKey);
	}
};

/**
 * Add a resource bundle to the set of resource bundles.
 * 
 * @param packageName String the name of the package containing the javascript
 * file with the resource strings. 
 * @param fileName String name of the javascript file with the 
 * resource strings, without the extention.
 */
/*public static*/Messages.addUrlBundle = function( packageName, url )
{
    var xml = pentahoGet( url, '' );

    var pos1 = xml.indexOf('<return>');
    var pos2 = xml.indexOf('</return>');

    if( pos1 != -1 && pos2 != -1 ) {
        resultJson = xml.substr( pos1+8, pos2-pos1-8 )
    }
    var bundle = eval('('+resultJson+')');

    Messages.messageBundle.push( bundle );    
};

/* static init */
Messages.init();
