<%@ page language="java"
	import="org.pentaho.platform.engine.core.system.PentahoSystem,
			org.pentaho.platform.api.engine.IPentahoSession,
			org.pentaho.platform.api.repository.ISolutionRepository,
	        org.pentaho.platform.web.jsp.messages.Messages,
			org.pentaho.platform.api.engine.IUITemplater,
			org.pentaho.platform.web.http.WebTemplateHelper,
			org.pentaho.platform.util.messages.LocaleHelper,
			org.pentaho.platform.api.util.IVersionHelper,
    		org.pentaho.platform.util.web.SimpleUrlFactory,
			org.pentaho.platform.engine.core.solution.SimpleParameterProvider,
			org.pentaho.platform.engine.services.actionsequence.ActionResource,
			org.pentaho.actionsequence.dom.IActionResource,
      org.pentaho.platform.web.http.PentahoHttpSessionHelper"%>
<%

/*
 * Copyright 2006 Pentaho Corporation.  All rights reserved. 
 * This software was developed by Pentaho Corporation and is provided under the terms 
 * of the Mozilla Public License, Version 1.1, or any later version. You may not use 
 * this file except in compliance with the license. If you need a copy of the license, 
 * please go to http://www.mozilla.org/MPL/MPL-1.1.txt. The Original Code is the Pentaho 
 * BI Platform.  The Initial Developer is Pentaho Corporation.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS" 
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or  implied. Please refer to 
 * the license for the specific language governing your rights and limitations.
 *
 * @created Jul 23, 2005 
 * @author James Dixon
 * 
 */
 
	response.setCharacterEncoding(LocaleHelper.getSystemEncoding());
 	String baseUrl = PentahoSystem.getApplicationContext().getBaseUrl();
 
	String path = request.getContextPath();

	IPentahoSession userSession = PentahoHttpSessionHelper.getPentahoSession( request );

	StringBuffer sb = new StringBuffer();
  IVersionHelper versionHelper = PentahoSystem.get(IVersionHelper.class, null);
	String header = Messages.getString( "UI.USER_ABOUT_TITLE", versionHelper.getVersionInformation(PentahoSystem.class) );

	String intro = "";
	String footer = "";
	IUITemplater templater = PentahoSystem.get(IUITemplater.class, userSession );
	if( templater != null ) {

		// Load a template for this web page
		String template = null;
  		try {
  		  String templateName = request.getParameter("template"); //$NON-NLS-1$
  		  if (templateName == null) {
  		    templateName = "system/custom/template-dialog.html"; //$NON-NLS-1$
  		  }
	   		ActionResource resource = new ActionResource( "", IActionResource.SOLUTION_FILE_RESOURCE, "text/xml", templateName ); //$NON-NLS-1$ //$NON-NLS-2$
    			template = PentahoSystem.get(ISolutionRepository.class, userSession).getResourceAsString( resource, ISolutionRepository.ACTION_EXECUTE );
    		} catch (Throwable t) {
    		  // TODO we need to do something here, like log at the very least!
    		  // catching Throwable is likely not optimal either.
    		}

		// Break the template into header and footer sections
		String sections[] = templater.breakTemplateString( template, header, userSession ); //$NON-NLS-1$ //$NON-NLS-2$
		if( sections != null && sections.length > 0 ) {
			intro = sections[0];
		}
		if( sections != null && sections.length > 1 ) {
			footer = sections[1];
		}
	} else {
		intro = Messages.getString( "UI.ERROR_0002_BAD_TEMPLATE_OBJECT" );
	}

%>

<%= intro %>

<table class='content_table' border='0' cellpadding='0' cellspacing='0'
	height='100%'>
	<tr>
		<td height='100%' class='contentcell_half_left'>
		<%
				String copyright = Messages.getString( "UI.USER_COPYRIGHT" );
				String aboutText = Messages.getString( "UI.USER_ABOUT_TEXT", copyright );
				%> <%= aboutText %> <a href='javascript:void(0);'
			onclick='javascript:window.open( "http://community.pentaho.org/contributors/" );'><%=Messages.getString( "UI.USER_SPECIAL_THANKS" )%></a>
		</td>
	</tr>
</table>

<%= footer %>
