
<%@page import="org.pentaho.platform.api.engine.IMessageFormatter"%><%@ page language="java" 
	import="java.util.ArrayList,
	org.pentaho.platform.util.web.SimpleUrlFactory,
    org.pentaho.platform.web.jsp.messages.Messages,
	org.pentaho.platform.engine.core.system.PentahoSystem,
	org.pentaho.platform.uifoundation.chart.CategoryDatasetChartComponent,
	org.pentaho.platform.uifoundation.chart.JFreeChartEngine,
	org.pentaho.platform.web.http.request.HttpRequestParameterProvider,
	org.pentaho.platform.web.http.session.HttpSessionParameterProvider,
	org.pentaho.platform.api.engine.IPentahoSession,
	org.pentaho.platform.web.http.WebTemplateHelper,
    org.pentaho.platform.api.engine.IUITemplater,
	org.pentaho.platform.util.messages.LocaleHelper,
	org.pentaho.commons.connection.IPentahoConnection,
	org.pentaho.commons.connection.IPentahoResultSet,
	org.pentaho.platform.engine.services.connection.PentahoConnectionFactory,
	org.pentaho.platform.util.logging.SimpleLogger,
    org.pentaho.platform.web.http.PentahoHttpSessionHelper"
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
	int chartType = (int)requestParameters.getLongParameter("ChartType", JFreeChartEngine.UNDEFINED_CHART_TYPE); //$NON-NLS-1$
	String chartDefinitionPath = requestParameters.getStringParameter("ChartDefinitionPath", null); //$NON-NLS-1$
	
	String thisUrl = baseUrl + "Chart?"; //$NON-NLS-1$
	String intro = ""; //$NON-NLS-1$
	String footer = ""; //$NON-NLS-1$
	String content = ""; //$NON-NLS-1$

	SimpleUrlFactory urlFactory = new SimpleUrlFactory( thisUrl );
	ArrayList messages = new ArrayList();
	CategoryDatasetChartComponent barChart = new CategoryDatasetChartComponent( chartType, chartDefinitionPath, 600, 400, urlFactory, messages );

    IPentahoConnection connection = PentahoConnectionFactory.getConnection(IPentahoConnection.SQL_DATASOURCE, "SampleData", userSession, userSession); //$NON-NLS-1$
    try {
	    String query = "select department, actual, budget, variance from QUADRANT_ACTUALS"; //$NON-NLS-1$
	
	    IPentahoResultSet results = connection.executeQuery(query);
	    try {
		    
		    barChart.setValues(results);
			barChart.validate( userSession, null );
			
			barChart.setParameterProvider( HttpRequestParameterProvider.SCOPE_REQUEST, requestParameters ); //$NON-NLS-1$
			barChart.setParameterProvider( HttpSessionParameterProvider.SCOPE_SESSION, sessionParameters ); //$NON-NLS-1$
			
			content = barChart.getContent( "text/html" ); //$NON-NLS-1$
			if( content == null ) {
				StringBuffer buffer = new StringBuffer();		
				PentahoSystem.get(IMessageFormatter.class, userSession).formatErrorMessage( "text/html", Messages.getErrorString( "CHART.DISPLAY_ERROR" ), messages, buffer ); //$NON-NLS-1$ //$NON-NLS-2$
				content = buffer.toString();
			}
		
			IUITemplater templater = PentahoSystem.get(IUITemplater.class, userSession );
			if( templater != null ) {
				String sections[] = templater.breakTemplate( "template-document.html", Messages.getString( "CHART.USER_SAMPLES" ), userSession ); //$NON-NLS-1$ //$NON-NLS-2$
				if( sections != null && sections.length > 0 ) {
					intro = sections[0];
				}
				if( sections != null && sections.length > 1 ) {
					footer = sections[1];
				}
			} else {
				intro = Messages.getString( "UI.ERROR_0002_BAD_TEMPLATE_OBJECT" ); //$NON-NLS-1$
			}
	    } finally {
	    	results.close();
	    }
    } finally {
    	connection.close();
    }
%><%= intro %>
<%= content %>