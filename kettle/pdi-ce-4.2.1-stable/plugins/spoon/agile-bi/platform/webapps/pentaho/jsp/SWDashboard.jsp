<%@ page language="java" 
	import="java.util.ArrayList,
	java.util.Date,
	java.io.ByteArrayOutputStream,
	org.pentaho.platform.util.web.SimpleUrlFactory,
	org.pentaho.platform.web.jsp.messages.Messages,
	org.pentaho.platform.engine.core.system.PentahoSystem,
	org.pentaho.platform.uifoundation.chart.DashboardWidgetComponent,
	org.pentaho.platform.web.http.request.HttpRequestParameterProvider,
	org.pentaho.platform.web.http.session.HttpSessionParameterProvider,
	org.pentaho.platform.api.engine.IPentahoSession,
	org.pentaho.platform.web.http.WebTemplateHelper,
	org.pentaho.platform.util.VersionHelper,
	org.pentaho.platform.util.messages.LocaleHelper,
	org.pentaho.platform.engine.core.solution.SimpleParameterProvider,
	org.pentaho.platform.uifoundation.chart.ChartHelper,
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
 *
 * Created Feb 16, 2006 
 * @author James Dixon  modified by Kurtis Cruzada
 */

/*
 * This JSP is an example of how to use Pentaho components to build a dashboard.
 * The script in this file controls the layout and content generation of the dashboard.
 * See the document 'Dashboard Builder Guide' for more details
 */

	// set the character encoding e.g. UFT-8
	response.setCharacterEncoding(LocaleHelper.getSystemEncoding()); 

	// create a new Pentaho session 
	IPentahoSession userSession = PentahoHttpSessionHelper.getPentahoSession( request );
	%>	
	<%
	// See if we have a 'territory' parameter
	String territory = request.getParameter("territory");
	// See if we have a 'productline' parameter
	String productline = request.getParameter("productline");

	// Create the title for the top of the page
	String title = "Revenue Analysis";
	if( productline != null ) {
		title = "Sales for " + territory + ", " + productline;
	} 
	else if ( territory != null ) {
		title = "Sales for " + territory;
	}
	%>
	<html>
	<head>
		<title>Steel Wheels - Revenue Analysis</title>
	</head>
	<body>
  	<table  background="/sw-style/active/logo_backup.png">
  		<tr>
  			<td width="750" height="40" align="right" valign="middle" style="font-family:Arial;font-weight:bold" border="0"/><%= title %></td>
  		</tr>		
  	</table>	
  	<table class="homeDashboard" cellpadding="0" cellspacing="0" border="0" >
	<tr>
		<td valign="top" align="center">
	<%
		// Make a pie chart showing the territories
		// create the parameres for the pie chart
	        SimpleParameterProvider parameters = new SimpleParameterProvider();
		// define the click url template
	        parameters.setParameter( "drill-url", "SWDashboard?territory={TERRITORY}" );
		// define the slices of the pie chart
	        parameters.setParameter( "inner-param", "TERRITORY"); //$NON-NLS-1$ //$NON-NLS-2$
		// set the width and the height
	        parameters.setParameter( "image-width", "350"); //$NON-NLS-1$ //$NON-NLS-2$
        	parameters.setParameter( "image-height", "200"); //$NON-NLS-1$ //$NON-NLS-2$
		StringBuffer content = new StringBuffer(); 
	        ArrayList messages = new ArrayList();
		// call the chart helper to generate the pie chart image and to get the HTML content
		// use the chart definition in 'steel-wheels/dashboard/territory.widget.xml'
        	ChartHelper.doPieChart( "steel-wheels", "dashboards", "territory.widget.xml", parameters, content, userSession, messages, null ); 
	%>
		<%= content.toString() %>
		</td>			
		<td valign="top" align="center">
	<%
			if( territory == null ) {
			// if the user has clicked on a slice of the pie chart we should have a territory to work with
	%>			
	<%
			// Make a bar chart showing the department 
			// create the parameres for the bar chart
			parameters = new SimpleParameterProvider();
			// define the click url template
			parameters.setParameter( "drill-url", "SWDashboard?territory="+territory+"&amp;productline={SERIES}" );
			parameters.setParameter( "TERRITORY", territory );
			parameters.setParameter( "outer-params", "TERRITORY" );
			// define the category axis of the bar chart
			parameters.setParameter( "inner-param", "TERRITORY"); //$NON-NLS-1$ //$NON-NLS-2$
			parameters.setParameter( "inner-param", "PRODUCTLINE"); //$NON-NLS-1$ //$NON-NLS-2$
			// set the width and the height
			parameters.setParameter( "image-width", "400"); //$NON-NLS-1$ //$NON-NLS-2$
			parameters.setParameter( "image-height", "200"); //$NON-NLS-1$ //$NON-NLS-2$
			content = new StringBuffer(); 
			messages = new ArrayList();
			// call the chart helper to generate the pie chart image and to get the HTML content
			// use the chart definition in 'steel-wheels/dashboard/productline.widget.xml'
			ChartHelper.doChart( "steel-wheels", "dashboards", "productline_all.widget.xml", parameters, content, userSession, messages, null ); 
		%>		
		<%= content.toString() %>
		<%
			}
		%>
	<%
		if( territory != null ) {
			// if the user has clicked on a slice of the pie chart we should have a territory to work with
	%>			
	<%
			// Make a bar chart showing the department 
			// create the parameres for the bar chart
	        	parameters = new SimpleParameterProvider();
			// define the click url template
	        	parameters.setParameter( "drill-url", "SWDashboard?territory="+territory+"&amp;productline={SERIES}" );
			parameters.setParameter( "TERRITORY", territory );
			parameters.setParameter( "outer-params", "TERRITORY" );
			// define the category axis of the bar chart
			    parameters.setParameter( "inner-param", "TERRITORY"); //$NON-NLS-1$ //$NON-NLS-2$
        		parameters.setParameter( "inner-param", "PRODUCTLINE"); //$NON-NLS-1$ //$NON-NLS-2$
			// set the width and the height
        		parameters.setParameter( "image-width", "400"); //$NON-NLS-1$ //$NON-NLS-2$
        		parameters.setParameter( "image-height", "200"); //$NON-NLS-1$ //$NON-NLS-2$
			content = new StringBuffer(); 
        		messages = new ArrayList();
			// call the chart helper to generate the pie chart image and to get the HTML content
			// use the chart definition in 'steel-wheels/dashboard/productline.widget.xml'
	        	ChartHelper.doChart( "steel-wheels", "dashboards", "productline.widget.xml", parameters, content, userSession, messages, null ); 
	%>
			<%= content.toString() %>
	<%
		}
	%>
		</td>
	</tr> 	
    </table>
  	<table class="homeDashboard" cellpadding="0" cellspacing="0" border="0" >
  	<tr>
  		<td valign="top" align="center"> 	  				
  	<%
  				if( productline != null ) {
  				
  				// if the user has clicked on a bar of the bar chart we should have a territory and productline to work with
  				
  				// create a dial and supply a value we create from the current time
  				// create the parameters for the line chart
  				parameters = new SimpleParameterProvider();
  				parameters.setParameter( "TERRITORY", territory );
  				parameters.setParameter( "outer-params", "TERRITORY" );
  				parameters.setParameter( "PRODUCTLINE", productline );
  				parameters.setParameter( "outer-params", "PRODUCTLINE" );
  				// define the category axis of the bar chart
  				parameters.setParameter( "inner-param", "PRODUCTLINE"); //$NON-NLS-1$ //$NON-NLS-2$
  				// set the width and the height
  				parameters.setParameter( "image-width", "750"); //$NON-NLS-1$ //$NON-NLS-2$
  				parameters.setParameter( "image-height", "200"); //$NON-NLS-1$ //$NON-NLS-2$
  				content = new StringBuffer(); 
  				messages = new ArrayList();
  				// call the chart helper to generate the pie chart image and to get the HTML content
  				// use the chart definition in 'steel-wheels/dashboard/regions.widget.xml'
  				ChartHelper.doChart( "steel-wheels", "dashboards", "SalesOvertime.widget.xml", parameters, content, userSession, messages, null ); 
  	%>
  	<%= content.toString() %>
  	<%
  		}
  	%>
 	<%
  				if( productline == null ) { 		
		  		// if the user has clicked on a bar of the bar chart we should have a territory and productline to work with 		
  				// create a dial and supply a value we create from the current time
  				// create the parameters for the line chart
  				parameters = new SimpleParameterProvider();
  				parameters.setParameter( "TERRITORY", territory );
  				parameters.setParameter( "outer-params", "TERRITORY" );			
  				// define the category axis of the bar chart
  				parameters.setParameter( "inner-param", "PRODUCTLINE"); //$NON-NLS-1$ //$NON-NLS-2$
  				// set the width and the height
  				parameters.setParameter( "image-width", "750"); //$NON-NLS-1$ //$NON-NLS-2$
  				parameters.setParameter( "image-height", "200"); //$NON-NLS-1$ //$NON-NLS-2$
  				content = new StringBuffer(); 
  				messages = new ArrayList();
  				// call the chart helper to generate the pie chart image and to get the HTML content
  				// use the chart definition in 'steel-wheels/dashboard/regions.widget.xml'
  				ChartHelper.doChart( "steel-wheels", "dashboards", "SalesOvertime_All.widget.xml", parameters, content, userSession, messages, null ); 
  	%>  		
  		<%= content.toString() %>
  	<%
  		}
  	%>	
  		</td>
  	</tr>
  </table>
</body>
</html>
