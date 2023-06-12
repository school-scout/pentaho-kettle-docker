

<%@ page language="java" 
	import="java.util.ArrayList,
	org.pentaho.platform.util.web.SimpleUrlFactory,
	org.pentaho.platform.web.jsp.messages.Messages,
	org.pentaho.platform.engine.core.system.PentahoSystem,
	org.pentaho.platform.uifoundation.chart.PieDatasetChartComponent,
	org.pentaho.platform.web.http.request.HttpRequestParameterProvider,
	org.pentaho.platform.web.http.session.HttpSessionParameterProvider,
	org.pentaho.platform.api.engine.IPentahoSession,
	org.pentaho.platform.web.http.WebTemplateHelper,
	org.pentaho.platform.api.engine.IUITemplater,
	org.pentaho.platform.util.logging.SimpleLogger,
	org.pentaho.platform.util.messages.LocaleHelper,
	org.pentaho.commons.connection.IPentahoConnection,
	org.pentaho.commons.connection.IPentahoResultSet,
	org.pentaho.commons.connection.PentahoDataTransmuter,
	org.pentaho.platform.engine.services.connection.PentahoConnectionFactory,
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
	String thisUrl = baseUrl + "./PieChart?"; //$NON-NLS-1$

	SimpleUrlFactory urlFactory = new SimpleUrlFactory( thisUrl );
	ArrayList messages = new ArrayList();

	PieDatasetChartComponent pieChart = new PieDatasetChartComponent( 2, "bi-developers/charts/pieChart.xml", 600, 400, urlFactory, messages ); //$NON-NLS-1$
	String intro = ""; //$NON-NLS-1$
	String footer = ""; //$NON-NLS-1$
	String content = ""; //$NON-NLS-1$
	
    IPentahoConnection connection = PentahoConnectionFactory.getConnection(IPentahoConnection.SQL_DATASOURCE, "SampleData", userSession, userSession); //$NON-NLS-1$ 
    try {
	    String query = "SELECT DEPARTMENT, ACTUAL FROM QUADRANT_ACTUALS ORDER BY DEPARTMENT"; //$NON-NLS-1$
	    IPentahoResultSet results = connection.executeQuery(query);
	    try {
		    Integer[] columnsToInclude = new Integer[] {new Integer(1)};
		    IPentahoResultSet r2 = PentahoDataTransmuter.transmute(results, new Integer(0), null, null, columnsToInclude, true);
		    
		    pieChart.setValues(r2);
			pieChart.setTitle( Messages.getString( "PIECHART.TEST_PIE_CHAR" )); //$NON-NLS-1$
			pieChart.validate( userSession, null );
			
			pieChart.setParameterProvider( HttpRequestParameterProvider.SCOPE_REQUEST, requestParameters ); //$NON-NLS-1$
			pieChart.setParameterProvider( HttpSessionParameterProvider.SCOPE_SESSION, sessionParameters ); //$NON-NLS-1$
			
			content = pieChart.getContent( "text/html" ); //$NON-NLS-1$
			if( content == null ) {
				StringBuffer buffer = new StringBuffer();
				PentahoSystem.get(IMessageFormatter.class, userSession).formatErrorMessage( "text/html", Messages.getString("PIECHART.DISPLAY_ERROR"), messages, buffer ); //$NON-NLS-1$ //$NON-NLS-2$
				content = buffer.toString();
			}
		
			IUITemplater templater = PentahoSystem.get(IUITemplater.class, userSession );
			if( templater != null ) {
				String sections[] = templater.breakTemplate( "template-document.html", Messages.getString("PIECHART.USER_SAMPLES"), userSession ); //$NON-NLS-1$ //$NON-NLS-2$
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

%>
<%= intro %>
<%= content %>