
<%@ page language="java" 
	import="java.util.ArrayList,
	org.pentaho.platform.api.engine.ILogger,
	org.pentaho.platform.util.web.SimpleUrlFactory,
	org.pentaho.platform.engine.core.system.PentahoSystem,
	org.pentaho.platform.uifoundation.component.xml.InputFormComponent,
	org.pentaho.platform.web.http.request.HttpRequestParameterProvider,
	org.pentaho.platform.web.http.session.HttpSessionParameterProvider,
	org.pentaho.platform.api.engine.IPentahoSession,
	org.pentaho.platform.web.http.WebTemplateHelper,
	org.pentaho.platform.util.messages.LocaleHelper,
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
	String hrefUrl = baseUrl + "ViewAction?"; //$NON-NLS-1$
	String onClick = ""; //$NON-NLS-1$
	String thisUrl = baseUrl + "./Navigate?"; //$NON-NLS-1$

	String instanceId = request.getParameter( "instance-id" ); //$NON-NLS-1$
	String solution = request.getParameter( "solution" ); //$NON-NLS-1$
	String path = request.getParameter( "path" ); //$NON-NLS-1$
	String actionName = request.getParameter( "action" ); //$NON-NLS-1$
	String templateName = request.getParameter( "template" ); //$NON-NLS-1$
	String stylesheetName = request.getParameter( "css" ); //$NON-NLS-1$
	
	SimpleUrlFactory urlFactory = new SimpleUrlFactory( thisUrl );

	ArrayList messages = new ArrayList();

	InputFormComponent inputForm = new InputFormComponent( urlFactory, instanceId, templateName, stylesheetName, solution, path, actionName, messages );
	inputForm.setLoggingLevel( ILogger.DEBUG );

	inputForm.setParameterProvider( HttpRequestParameterProvider.SCOPE_REQUEST, requestParameters ); //$NON-NLS-1$
	inputForm.setParameterProvider( HttpSessionParameterProvider.SCOPE_SESSION, sessionParameters ); //$NON-NLS-1$
	String content = null;
	if( inputForm.validate( userSession, null ) ) {
		content = inputForm.getContent( "text/html" ); //$NON-NLS-1$
	}
	if( content == null ) {
		StringBuffer buffer = new StringBuffer();
		PentahoSystem.get(IMessageFormatter.class, userSession).formatErrorMessage( "text/html", "Could not create inbox task display", messages, buffer ); //$NON-NLS-1$
		content = buffer.toString();
	} else {
		out.print( content );
	}
%>
