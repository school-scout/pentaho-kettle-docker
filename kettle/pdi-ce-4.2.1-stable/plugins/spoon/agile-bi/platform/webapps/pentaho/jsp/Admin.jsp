<%@ page language="java" 
	import="org.pentaho.platform.engine.core.system.PentahoSystem,
			org.pentaho.platform.api.engine.IPentahoSession,
			org.pentaho.platform.util.xml.XmlHelper,
           	org.pentaho.platform.web.jsp.messages.Messages,
			org.pentaho.platform.web.http.WebTemplateHelper,
			org.pentaho.platform.api.engine.IUITemplater,
			org.pentaho.platform.util.messages.LocaleHelper,
			org.pentaho.platform.engine.services.SolutionURIResolver,
			org.pentaho.platform.util.web.SimpleUrlFactory,
			org.pentaho.platform.engine.core.solution.SimpleParameterProvider,
			org.pentaho.platform.web.http.request.HttpRequestParameterProvider,
			javax.xml.transform.TransformerException,
      org.pentaho.platform.web.http.PentahoHttpSessionHelper,
      org.pentaho.platform.api.ui.INavigationComponent" %><%

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

	String header = Messages.getString( "UI.USER_ADMIN_INTRO" ); //$NON-NLS-1$
	String admin = getAdminLinks( userSession );
	String publish = getPublisherContent( userSession );

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

%>
<%= intro %>

	<%@page import="java.util.ArrayList"%>
<%@page import="org.dom4j.Document"%>
<%@page import="java.util.HashMap"%>
<%@page import="org.pentaho.platform.api.ui.INavigationComponent;"%>
<table class='content_table' border='0' cellpadding='0' cellspacing='0' height='100%''>
		<tr>
			<td colspan='2' class='content_pagehead'>
				<%= header %>
			</td>
		</tr>
		<tr>
			<td class='contentcell_half_right' width='50%'>
				<%= admin %>
				<%= publish %>
			</td>
		</tr>
	</table>

<%= footer %>
<%!private final String getAdminLinks( IPentahoSession userSession ) {
	        SimpleParameterProvider parameters = new SimpleParameterProvider();
        	parameters.setParameter( "solution", "admin" );
		String navigateUrl = PentahoSystem.getApplicationContext().getBaseUrl() + "/Navigate?";
		SimpleUrlFactory urlFactory = new SimpleUrlFactory( navigateUrl );
		ArrayList messages = new ArrayList();
		INavigationComponent navigate = PentahoSystem.get(INavigationComponent.class, userSession);
		navigate.setHrefUrl(PentahoSystem.getApplicationContext().getBaseUrl());
		navigate.setOnClick("");
		navigate.setSolutionParamName("solution");
		navigate.setPathParamName("path");
		navigate.setAllowNavigation( new Boolean(false) );
		navigate.setOptions("");
		navigate.setUrlFactory(urlFactory);
		navigate.setMessages(messages);
		// navigate.setLoggingLevel( org.pentaho.platform.api.engine.ILogger.DEBUG );
		navigate.validate( userSession, null );
		navigate.setParameterProvider( HttpRequestParameterProvider.SCOPE_REQUEST, parameters ); //$NON-NLS-1$
		navigate.setXsl( "text/html", "admin-mini.xsl" );
		String content = navigate.getContent( "text/html" ); //$NON-NLS-1$
		return content;
	}

	private final String getPublisherContent( IPentahoSession userSession ) {
		Document publishersDocument = PentahoSystem.getPublishersDocument();
		if( publishersDocument != null ) {
			HashMap parameters = new HashMap();
			try
			{
				StringBuffer sb = XmlHelper.transformXml( "publishers-mini.xsl", null, publishersDocument.asXML(), parameters, new SolutionURIResolver(userSession) ); //$NON-NLS-1$
				return sb.toString();
			} catch (TransformerException e )
			{
				return Messages.getErrorString( "PUBLISHERS.ERROR_0001_PUBLISHERS_ERROR" ); //$NON-NLS-1$
			}
		}
		return Messages.getErrorString( "PUBLISHERS.ERROR_0001_PUBLISHERS_ERROR" ); //$NON-NLS-1$

	}%>

