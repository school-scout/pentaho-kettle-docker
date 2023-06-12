
<%@ page language="java" 
	import="java.util.ArrayList,
	java.util.List,
	org.pentaho.platform.util.web.SimpleUrlFactory,org.pentaho.platform.engine.core.system.PentahoSystem,
	org.pentaho.platform.web.http.request.HttpRequestParameterProvider,
	org.pentaho.platform.web.http.session.HttpSessionParameterProvider,
	org.pentaho.platform.api.engine.IPentahoSession,
	org.pentaho.platform.web.http.WebTemplateHelper,
	org.pentaho.platform.util.VersionHelper,
	org.pentaho.platform.util.messages.LocaleHelper,
	org.pentaho.platform.uifoundation.component.xml.PropertiesPanelUIComponent,
	org.pentaho.platform.web.jsp.messages.Messages,
  org.pentaho.platform.web.http.PentahoHttpSessionHelper"
%><%
	PentahoSystem.systemEntryPoint();
	String content = null;
	IPentahoSession userSession = null;
	try {
		response.setCharacterEncoding(LocaleHelper.getSystemEncoding());
		String baseUrl = PentahoSystem.getApplicationContext().getBaseUrl();
	
		userSession = PentahoHttpSessionHelper.getPentahoSession( request );
		HttpRequestParameterProvider requestParameters = new HttpRequestParameterProvider( request );
		HttpSessionParameterProvider sessionParameters = new HttpSessionParameterProvider( userSession );
		
		String thisUrl = baseUrl; //+ "./PropertiesEditor?"; //$NON-NLS-1$
		SimpleUrlFactory urlFactory = new SimpleUrlFactory( thisUrl );
		List messages = new ArrayList();
		
		PropertiesPanelUIComponent propsPanel = new PropertiesPanelUIComponent( urlFactory, messages, userSession );
		propsPanel.validate( userSession, null );
		propsPanel.setParameterProvider( HttpRequestParameterProvider.SCOPE_REQUEST, requestParameters );
		propsPanel.setParameterProvider( HttpSessionParameterProvider.SCOPE_SESSION, sessionParameters );
		content = propsPanel.getContent( "text/html" ); //$NON-NLS-1$
	} finally {
    	PentahoSystem.systemExitPoint();      
    }
%>
<html>
<head>
    <link href="/pentaho-style/styles-new.css" rel="stylesheet" type="text/css" />
</head>

<body class="" dir="{text-direction}">

	<%= content %>
</body>
</html>