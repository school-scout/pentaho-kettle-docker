<%@ page language="java" 
	import="java.util.ArrayList,
			org.pentaho.platform.engine.core.system.PentahoSystem,
			org.pentaho.platform.api.engine.IPentahoSession,
	        org.pentaho.platform.web.jsp.messages.Messages,
			org.pentaho.platform.api.engine.IUITemplater,
			org.pentaho.platform.web.http.WebTemplateHelper,
			org.pentaho.platform.util.messages.LocaleHelper,
			org.pentaho.platform.util.VersionHelper,
			org.pentaho.platform.web.refactor.UserFilesComponent,
    		org.pentaho.platform.util.web.SimpleUrlFactory,
			org.pentaho.platform.engine.core.solution.SimpleParameterProvider,
			org.pentaho.platform.api.engine.IBackgroundExecution,
			org.pentaho.platform.api.repository.IContentItem,
			org.quartz.JobDetail,
			org.quartz.JobDataMap,
			org.quartz.Scheduler,
			org.quartz.SchedulerException,
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
 * @created September, 2006
 * @author Marc Batchelor
 * 
 */

 PentahoSystem.systemEntryPoint();
 try { 
	response.setCharacterEncoding(LocaleHelper.getSystemEncoding());
 	String baseUrl = PentahoSystem.getApplicationContext().getBaseUrl();
 
	String path = request.getContextPath();

	IPentahoSession userSession = PentahoHttpSessionHelper.getPentahoSession( request );

	String thisUrl = baseUrl + "UserContent?"; //$NON-NLS-1$
	SimpleUrlFactory urlFactory = new SimpleUrlFactory( thisUrl );

	ArrayList messages = new ArrayList();
	UserFilesComponent userFiles = PentahoSystem.get(UserFilesComponent.class, "IUserFilesComponent", userSession );
	userFiles.setUrlFactory( urlFactory );
	userFiles.setRequest( request );
	userFiles.setResponse( response );
	userFiles.setMessages( messages );
	userFiles.validate( userSession, null );
	
	String action = request.getParameter( "action" );
	if( "delete".equals( action ) ) {
		String delId = request.getParameter( "content-id" );
		userFiles.deleteContent( delId );
	}
	else if( "cancel-job".equals( action ) ) {
		String jobName = request.getParameter( "del-job-name" );
		String jobGroup = request.getParameter( "del-job-group" );
		userFiles.cancelJob( jobName, jobGroup );
	}

	// Clear the alert when this page is viewed (unless someone passes a parameter
    // of clearAlert=false
	String clearAlert = request.getParameter( "clearAlert" );
	if( !"false".equalsIgnoreCase(clearAlert) ) {
		userSession.resetBackgroundExecutionAlert();
	}

	String intro = ""; //$NON-NLS-1$
	String footer = ""; //$NON-NLS-1$
	String content = ""; //$NON-NLS-1$
	content = userFiles.getContent( "text/html" ); //$NON-NLS-1$
	IUITemplater templater = PentahoSystem.get(IUITemplater.class, userSession );
	if( templater != null ) {
		String sections[] = templater.breakTemplate( "template.html", "Background Execution Status", userSession ); //$NON-NLS-1$ //$NON-NLS-2$
		if( sections != null && sections.length > 0 ) {
			intro = sections[0];
		}
		if( sections != null && sections.length > 1 ) {
			footer = sections[1];
		}
	} else {
		intro = Messages.getString( "UI.ERROR_0002_BAD_TEMPLATE_OBJECT" ); //$NON-NLS-1$
	}
	
	%>

	<%= intro %>

	<%= content %>

	<%= footer %>

<%

	} finally {
	PentahoSystem.systemExitPoint();
 }
%>

