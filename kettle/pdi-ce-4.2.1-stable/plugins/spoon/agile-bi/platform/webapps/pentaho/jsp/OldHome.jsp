<%@ 
	page language="java" 
	import="
			java.util.ArrayList,
			org.pentaho.platform.engine.core.system.PentahoSystem,
			org.pentaho.platform.api.engine.IPentahoSession,
			org.pentaho.platform.web.jsp.messages.Messages,
			org.pentaho.platform.web.http.WebTemplateHelper,
			org.pentaho.platform.api.engine.IUITemplater,
			org.pentaho.platform.util.messages.LocaleHelper,
			org.pentaho.platform.util.VersionHelper,
			org.pentaho.platform.api.ui.INavigationComponent,
			org.pentaho.platform.uifoundation.component.HtmlComponent,
			org.pentaho.platform.util.web.SimpleUrlFactory,
			org.pentaho.platform.engine.core.solution.SimpleParameterProvider,
			org.pentaho.platform.uifoundation.chart.ChartHelper,
      org.pentaho.platform.web.http.PentahoHttpSessionHelper" %><%

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
	String path = request.getContextPath();
	IPentahoSession userSession = PentahoHttpSessionHelper.getPentahoSession( request );

%>
	
<%
	// See if we have a 'territory' parameter
	String territory = request.getParameter("territory");
	// See if we have a 'productline' parameter
	String productline = request.getParameter("productline");

	// Create the title for the top of the page
	String title = "Top Ten Customers";
	if( territory == null && productline != null) {
		title = "Top Ten for " + productline;
	} 
	else if ( territory != null && productline == null) {
		title = "Top Ten for " + territory;
	}
	else if ( territory == null && productline == null) {
		title = "Top Ten Customers";
	}
	else  {
		title = "Top Ten for " + territory + ", " + productline;
	}
	
	String pie1 = "";
	String pie2 = "";
	String chart = "";

	SimpleParameterProvider parameters = new SimpleParameterProvider();
	parameters.setParameter( "drill-url", "PreviousHome?territory={territory}" );
	parameters.setParameter( "inner-param", "territory"); //$NON-NLS-1$ //$NON-NLS-2$
	parameters.setParameter( "image-width", "350"); //$NON-NLS-1$ //$NON-NLS-2$
	parameters.setParameter( "image-height", "200"); //$NON-NLS-1$ //$NON-NLS-2$
	StringBuffer content = new StringBuffer(); 
	ArrayList messages = new ArrayList();
	ChartHelper.doPieChart( "steel-wheels", "homeDashboard", "territory.widget.xml", parameters, content, userSession, messages, null ); 

	pie1 = content.toString();
	 
	parameters = new SimpleParameterProvider();

	if( territory == null ) {
	parameters.setParameter( "drill-url", "PreviousHome?productline={productline}" );
	} else {
	parameters.setParameter( "drill-url", "PreviousHome?territory="+territory+"&amp;productline={productline}" );
	}
	
	parameters.setParameter( "territory", territory );
	parameters.setParameter( "productline", productline );
	parameters.setParameter( "inner-param", "territory"); //$NON-NLS-1$ //$NON-NLS-2$
	parameters.setParameter( "inner-param", "productline"); //$NON-NLS-1$ //$NON-NLS-2$
	parameters.setParameter( "image-width", "350"); //$NON-NLS-1$ //$NON-NLS-2$
	parameters.setParameter( "image-height", "200"); //$NON-NLS-1$ //$NON-NLS-2$
	content = new StringBuffer(); 
	messages = new ArrayList();
    ChartHelper.doPieChart( "steel-wheels", "homeDashboard", "productline.widget.xml", parameters, content, userSession, messages, null ); 
	pie2 = content.toString();
	
	parameters = new SimpleParameterProvider();
	parameters.setParameter( "image-width", "400"); //$NON-NLS-1$ //$NON-NLS-2$
	parameters.setParameter( "image-height", "400"); //$NON-NLS-1$ //$NON-NLS-2$
	parameters.setParameter( "territory", territory );
	parameters.setParameter( "productline", productline );  			
	parameters.setParameter( "inner-param", "territory"); //$NON-NLS-1$ //$NON-NLS-2$
	parameters.setParameter( "inner-param", "productline"); //$NON-NLS-1$ //$NON-NLS-2$

	content = new StringBuffer(); 
	messages = new ArrayList();
	ChartHelper.doChart( "steel-wheels", "homeDashboard", "customer.widget.xml", parameters, content, userSession, messages, null ); 
	chart = content.toString();

	%>

<html>
	<head>
		<title>Steel Wheels - Top Ten</title>
	</head>
	<body>
  	<table  background="/sw-style/active/logo_backup.png">
  		<tr>
  			<td width="750" height="40" align="right" valign="middle" style="font-family:Arial;font-weight:bold" border="0"/><%= title %></td>
  		</tr>		
  	</table>	
  		<table class="homeDashboard" cellpadding="0" cellspacing="0" border="0" >
			<tr>
				<td valign="top" align="center"><%= pie1 %></td>
				<td rowspan="2" valign="top">
					<%= chart %>
				</td>
			</tr>
			<tr>
				<td valign="top" align="center">
					<%= pie2 %>
				</td>
			</tr>
 		</table>
</body>
</html>	
	
