<%@ page language="java" 
	import="org.pentaho.platform.engine.core.system.PentahoSystem,
			org.pentaho.platform.api.engine.IPentahoSession,
            org.pentaho.platform.web.jsp.messages.Messages,
			org.pentaho.platform.api.engine.IUITemplater,
			org.pentaho.platform.web.http.WebTemplateHelper,
			org.pentaho.platform.util.messages.LocaleHelper,
			org.pentaho.platform.api.repository.ISolutionRepository,
			org.pentaho.platform.repository.solution.dbbased.DbBasedSolutionRepository,
      org.pentaho.platform.web.http.PentahoHttpSessionHelper" %>
<%

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
 * @author Gretchen Moran
 * 
 */
 
	response.setCharacterEncoding(LocaleHelper.getSystemEncoding());
	IPentahoSession userSession = PentahoHttpSessionHelper.getPentahoSession( request );

	String content = ""; //$NON-NLS-1$
	
	ISolutionRepository solutionRepository = PentahoSystem.get(ISolutionRepository.class, userSession);
	
	if( solutionRepository instanceof DbBasedSolutionRepository ) { 
		content = ((DbBasedSolutionRepository)solutionRepository).resetSolutionFromFileSystem(userSession);
	} else {
		content = Messages.getString("SolutionManagerUI.ERROR_0001");
	}
	String templateName="template-document.html";
	
	String intro = "";
	String footer = "";
	IUITemplater templater = PentahoSystem.get(IUITemplater.class, userSession );
	if( templater != null ) {
		String sections[] = templater.breakTemplate( templateName, Messages.getString("UI.RESET_REPOSITORY_TITLE"), userSession ); //$NON-NLS-1$ //$NON-NLS-2$
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
<%= content %>
<%= footer %>
