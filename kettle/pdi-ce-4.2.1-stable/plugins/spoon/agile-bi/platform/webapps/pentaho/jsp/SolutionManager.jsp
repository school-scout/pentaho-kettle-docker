
<%@ page language="java"
import="org.pentaho.platform.engine.core.system.PentahoSystem,
	org.pentaho.platform.web.http.WebTemplateHelper,
	org.pentaho.platform.util.messages.LocaleHelper,
	org.pentaho.platform.api.engine.IPentahoSession,
	org.pentaho.platform.web.http.request.HttpRequestParameterProvider,
	org.pentaho.platform.web.http.session.HttpSessionParameterProvider,
	org.pentaho.platform.util.web.SimpleUrlFactory,
	java.util.ArrayList,
	org.pentaho.platform.web.refactor.SolutionManagerUIComponent,
	org.pentaho.platform.web.jsp.messages.Messages,
	java.io.IOException,
  org.pentaho.platform.web.http.PentahoHttpSessionHelper,
  org.pentaho.platform.api.engine.IMessageFormatter"%><%

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
	String thisUrl = baseUrl + "./SolutionManager?"; //$NON-NLS-1$

	SimpleUrlFactory urlFactory = new SimpleUrlFactory( thisUrl );
	ArrayList messages = new ArrayList();

	SolutionManagerUIComponent manager = new SolutionManagerUIComponent( urlFactory, messages, userSession ); //$NON-NLS-1$
	manager.validate( userSession, null );
	
	manager.setParameterProvider( HttpRequestParameterProvider.SCOPE_REQUEST, requestParameters ); //$NON-NLS-1$
	manager.setParameterProvider( HttpSessionParameterProvider.SCOPE_SESSION, sessionParameters ); //$NON-NLS-1$
	
	String content = manager.getContent( "text/xml" ); //$NON-NLS-1$
	if( content == null ) {
		StringBuffer buffer = new StringBuffer();
		PentahoSystem.get(IMessageFormatter.class, userSession).formatErrorMessage( "text/html", Messages.getErrorString( "SOLUTION_MANAGER.ERROR_0001_DISPLAY_ERROR" ), messages, buffer ); //$NON-NLS-1$ //$NON-NLS-2$
		content = buffer.toString();
	}

	try {
		out.print( content );
	} catch (IOException e) {}
%>