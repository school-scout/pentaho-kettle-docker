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
	org.pentaho.platform.engine.services.solution.SolutionHelper,
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
 * @author James Dixon
 */

/*
 * This JSP is an example of how to use Pentaho components to build a dashboard.
 * The script in this file controls the layout and content generation of the dashboard.
 * See the document 'Dashboard Builder Guide' for more details
 */

	// set the character encoding e.g. UFT-8
	response.setCharacterEncoding(LocaleHelper.getSystemEncoding()); 

	// get the current Pentaho session or create a new one if needed
	IPentahoSession userSession = PentahoHttpSessionHelper.getPentahoSession( request );
	%>
<html>
	<head>
		<title>Pentaho Sample Dashboard - JSP</title>
	</head>
	<body>

	<%
	// See if we have a 'department' parameter
	String department = request.getParameter("department");
	// See if we have a 'region' parameter
	String region = request.getParameter("region");

	// Create the title for the top of the page
	String title = "Select a region";
	if( department != null ) {
		title = "This is headcount spending for " + region + ", " + department;
	} 
	else if ( region != null ) {
		title = "This is headcount spending for " + region;
	}
	%>

<h1 style='font-family:Arial'><%= title %></h1>

<table>
	<tr>
		<td valign="top"><span style="font-family:Arial;font-weight:bold">Select a Region By Clicking on the Pie Chart</span>

	<%
		// Make a pie chart showing the regions
		// create the parameres for the pie chart
	        SimpleParameterProvider parameters = new SimpleParameterProvider();
		// define the click url template
	        parameters.setParameter( "drill-url", "SampleDashboard?region={REGION}" );
		// define the slices of the pie chart
	        parameters.setParameter( "inner-param", "REGION"); //$NON-NLS-1$ //$NON-NLS-2$
		// set the width and the height
	        parameters.setParameter( "image-width", "450"); //$NON-NLS-1$ //$NON-NLS-2$
        	parameters.setParameter( "image-height", "300"); //$NON-NLS-1$ //$NON-NLS-2$
		StringBuffer content = new StringBuffer(); 
	        ArrayList messages = new ArrayList();
		// call the chart helper to generate the pie chart image and to get the HTML content
		// use the chart definition in 'bi-developers/dashboard/regions.widget.xml'
        	ChartHelper.doPieChart( "bi-developers", "dashboard", "regions.widget.xml", parameters, content, userSession, messages, null ); 
	%>

		<%= content.toString() %>

		</td>	
			<td valign="top"><span style="font-family:Arial;font-weight:bold">
	<%
		if( region != null ) {
			// if the user has clicked on a slice of the pie chart we should have a region to work with
	%>
			Select a Department By Clicking on the Bar Chart
	<%
			// Make a bar chart showing the department 
			// create the parameres for the bar chart
	        	parameters = new SimpleParameterProvider();
			// define the click url template
	        	parameters.setParameter( "drill-url", "SampleDashboard?region="+region+"&amp;department={SERIES}" );
			parameters.setParameter( "REGION", region );
			parameters.setParameter( "outer-params", "REGION" );
			// define the category axis of the bar chart
        		parameters.setParameter( "inner-param", "DEPARTMENT"); //$NON-NLS-1$ //$NON-NLS-2$
			// set the width and the height
        		parameters.setParameter( "image-width", "450"); //$NON-NLS-1$ //$NON-NLS-2$
        		parameters.setParameter( "image-height", "300"); //$NON-NLS-1$ //$NON-NLS-2$
			content = new StringBuffer(); 
        		messages = new ArrayList();
			// call the chart helper to generate the pie chart image and to get the HTML content
			// use the chart definition in 'bi-developers/dashboard/regions.widget.xml'
	        	ChartHelper.doChart( "bi-developers", "dashboard", "departments.widget.xml", parameters, content, userSession, messages, null ); 
	%>
			</span>
			<br/>
			<%= content.toString() %>
	<%
		}
	%>
	</tr>
	<tr>
		<td colspan="2" valign="top" style="font-family:Arial;font-weight:bold"><hr size="1"/>
	</tr>
	<tr>
		<td valign="top"><span style="font-family:Arial;font-weight:bold">
	<%
		if( department != null ) {

			// if the user has clicked on a bar of the bar chart we should have a region and department to work with

			// create a dial and supply a value we create from the current time
			Date now = new Date();
			int seconds = now.getSeconds();
			// create a value from -15 to +15
			int dialValue = -15+seconds/2;
			// create the parameres for the bar chart
	        	parameters = new SimpleParameterProvider();
			// set the value displayed on the dial
			parameters.setParameter( "value", ""+dialValue );
			// set the title for the dial
			parameters.setParameter( "title", "My Dial" );
			// set the width and the height
	        	parameters.setParameter( "image-width", "105"); //$NON-NLS-1$ //$NON-NLS-2$
        		parameters.setParameter( "image-height", "105"); //$NON-NLS-1$ //$NON-NLS-2$
			content = new StringBuffer(); 
        		messages = new ArrayList();
			// call the chart helper to generate the pie chart image and to get the HTML content
			// use the chart definition in 'bi-developers/dashboard/regions.widget.xml'
  		      	ChartHelper.doDial( "bi-developers", "dashboard", "sampledial.widget.xml", parameters, content, userSession, messages, null ); 
	%>
			The value of this dial is based on the current time
			</span>
			<p/>
			<%= content.toString() %>
	<%
		}
	%>

		</td>
		<td valign="top" style="font-family:Arial;font-weight:bold">

	<%
		if( department != null ) {


			// if the user has clicked on a bar of the bar chart we should have a region and department to work with

			// run a report and embed the content into this page

			// create the parameres for the report
	        	parameters = new SimpleParameterProvider();
			// pass the region and department to the report
			parameters.setParameter( "region", region );
			parameters.setParameter( "department", department );
			// create an output stream for the report content 
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        		messages = new ArrayList();
			// run the action sequence 'bi-developers/dashboard/jsp/report.xaction'
        		SolutionHelper.doAction( "bi-developers", "dashboard/jsp", "embedded_report.xaction", "SampleDashboard", parameters, outputStream , userSession, messages, null ); 
			// write the report content into this page
	%>
			Click on a position title to drill to another page
			<p/>
			<% out.write( outputStream.toString() ); %>
	<%
		}
	%>

		</td>
	</tr>
</table>

</body>
</html>
