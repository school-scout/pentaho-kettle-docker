
<%@ page language="java" 
	import="
	java.util.ArrayList,
	org.pentaho.platform.util.web.SimpleUrlFactory,
	org.pentaho.platform.uifoundation.component.xml.LoadDBRepositoryUIComponent,
	org.pentaho.platform.web.http.request.HttpRequestParameterProvider,
	org.pentaho.platform.web.http.session.HttpSessionParameterProvider,
	org.pentaho.platform.api.engine.IPentahoSession,
	org.pentaho.platform.web.http.WebTemplateHelper,
	org.pentaho.platform.util.VersionHelper,
	org.pentaho.platform.util.messages.LocaleHelper,
	org.pentaho.platform.api.engine.IUITemplater,
	org.pentaho.platform.engine.core.system.PentahoSystem,
	org.pentaho.platform.web.jsp.messages.Messages,
	org.pentaho.platform.engine.security.SecurityHelper,
  org.pentaho.platform.web.http.PentahoHttpSessionHelper"
%><%
	response.setCharacterEncoding(LocaleHelper.getSystemEncoding());
	String baseUrl = PentahoSystem.getApplicationContext().getBaseUrl();

	IPentahoSession userSession = PentahoHttpSessionHelper.getPentahoSession( request );
	HttpRequestParameterProvider requestParameters = new HttpRequestParameterProvider( request );
	HttpSessionParameterProvider sessionParameters = new HttpSessionParameterProvider( userSession );
	
	String thisUrl = baseUrl + "./LoadDBRepository?"; //$NON-NLS-1$
	SimpleUrlFactory urlFactory = new SimpleUrlFactory( thisUrl );
	ArrayList messages = new ArrayList();
	
	LoadDBRepositoryUIComponent repository = new LoadDBRepositoryUIComponent( urlFactory, messages, userSession );
	repository.validate( userSession, null );
	repository.setParameterProvider( HttpRequestParameterProvider.SCOPE_REQUEST, requestParameters );
	repository.setParameterProvider( HttpSessionParameterProvider.SCOPE_SESSION, sessionParameters );
	
	String content = repository.getContent( "text/html" ); //$NON-NLS-1$
	if (content == null) {
		content = "BIG ERROR -- SHOULD NOT SEE THIS!!!";
	}
	
	String intro = "";
	String footer = "";
	IUITemplater templater = PentahoSystem.get(IUITemplater.class, userSession );
	if( templater != null ) {
		String sections[] = templater.breakTemplate( "template-document.html",  "DB Load Utility", userSession ); //$NON-NLS-1$ //$NON-NLS-2$
		if( sections != null && sections.length > 0 ) {
	intro = sections[0];
		}
		if( sections != null && sections.length > 1 ) {
	footer = sections[1];
		}
	} else {
		intro = Messages.getString( "UI.ERROR_0002_BAD_TEMPLATE_OBJECT" ); //$NON-NLS-1$
	}

	if( !SecurityHelper.isPentahoAdministrator(userSession) ) {
%>
	<%= intro %>
	<%= Messages.getString( "UI.USER_PERMISSION_DENIED" ) %>
	<%= footer %>
<%
		return;
	}

%>

	<%= intro %>
	<%= content %>
	<%= footer %>
