
<%@ page language="java" 
	import="java.util.ArrayList,
	 org.pentaho.platform.util.web.SimpleUrlFactory,
  	 org.pentaho.platform.engine.core.system.PentahoSystem,
  	 org.pentaho.platform.scheduler.SchedulerAdminUIComponent,
  	 org.pentaho.platform.web.http.request.HttpRequestParameterProvider,
  	 org.pentaho.platform.web.http.session.HttpSessionParameterProvider,
  	 org.pentaho.platform.api.engine.IPentahoSession,
  	 org.pentaho.platform.web.http.WebTemplateHelper,
  	 org.pentaho.platform.api.engine.IUITemplater,
  	 org.pentaho.platform.util.messages.LocaleHelper,
  	 org.apache.commons.lang.StringUtils,
  	 org.pentaho.platform.web.jsp.messages.Messages,
     org.pentaho.platform.web.http.PentahoHttpSessionHelper,
     org.pentaho.platform.api.engine.IMessageFormatter"
	 %><%
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
*/
	response.setCharacterEncoding(LocaleHelper.getSystemEncoding());
	String baseUrl = PentahoSystem.getApplicationContext().getBaseUrl();

	IPentahoSession userSession = PentahoHttpSessionHelper.getPentahoSession( request );
	HttpRequestParameterProvider requestParameters = new HttpRequestParameterProvider( request );
	HttpSessionParameterProvider sessionParameters = new HttpSessionParameterProvider( userSession );
	String thisUrl = baseUrl + "./SchedulerAdmin?"; //$NON-NLS-1$
	
	String mimeType = request.getParameter( "requestedMimeType" );
	if ( StringUtils.isEmpty( mimeType ) ) {
	  mimeType = "text/html";
	}

	SimpleUrlFactory urlFactory = new SimpleUrlFactory( thisUrl );
	ArrayList messages = new ArrayList();

	SchedulerAdminUIComponent admin = new SchedulerAdminUIComponent( urlFactory, messages ); //$NON-NLS-1$

	admin.validate( userSession, null );
	
	admin.setParameterProvider( HttpRequestParameterProvider.SCOPE_REQUEST, requestParameters ); //$NON-NLS-1$
	admin.setParameterProvider( HttpSessionParameterProvider.SCOPE_SESSION, sessionParameters ); //$NON-NLS-1$
	
	String content = admin.getContent( mimeType );
	if ( "text/html".equals( mimeType ) ) {
		if( content == null ) {
			StringBuffer buffer = new StringBuffer();
			PentahoSystem.get(IMessageFormatter.class, userSession).formatErrorMessage( "text/html", Messages.getErrorString( "SCHEDULER_ADMIN.ERROR_0001_DISPLAY_ERROR" ), messages, buffer ); //$NON-NLS-1$ //$NON-NLS-2$
			content = buffer.toString();
		}
	
		String intro = "";
		String footer = "";
		IUITemplater templater = PentahoSystem.get(IUITemplater.class, userSession );
		if( templater != null ) {
			String sections[] = templater.breakTemplate( "template.html", "", userSession ); //$NON-NLS-1$ //$NON-NLS-2$
			if( sections != null && sections.length > 0 ) {
				intro = sections[0];
			}
			if( sections != null && sections.length > 1 ) {
				footer = sections[1];
			}
		} else {
			intro = Messages.getString( "UI.ERROR_0002_BAD_TEMPLATE_OBJECT" );
		}
	
		// Content had $ signs - the regex stuff messes up with $ and \ so...
	    content = content.replaceAll( "\\\\", "\\\\\\\\" );
	    content = content.replaceAll( "\\$", "\\\\\\$" );
		%><%= intro %>
		<%= content %>
		<%= footer %><%    
	} else {
		if( content == null ) {
		  content = "<error msg='" + Messages.getErrorString( "SCHEDULER_ADMIN.ERROR_0001_DISPLAY_ERROR" ) + "'></error>";
		}
		%><%=content%><%  
	}
%>