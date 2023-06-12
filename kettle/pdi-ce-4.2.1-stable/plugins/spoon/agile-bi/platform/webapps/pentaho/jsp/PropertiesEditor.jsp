
<%@ page language="java" 
	import="
	java.util.ArrayList,
	org.pentaho.platform.util.web.SimpleUrlFactory,
	org.pentaho.platform.uifoundation.component.xml.PropertiesEditorUIComponent,
	org.pentaho.platform.uifoundation.component.xml.SolutionTreeUIComponent,
	org.pentaho.platform.web.http.request.HttpRequestParameterProvider,
	org.pentaho.platform.web.http.session.HttpSessionParameterProvider,
	org.pentaho.platform.api.engine.IPentahoSession,
	org.pentaho.platform.web.http.WebTemplateHelper,
	org.pentaho.platform.api.engine.IUITemplater,
	org.pentaho.platform.util.VersionHelper,
	org.pentaho.platform.util.messages.LocaleHelper,
	org.pentaho.platform.web.jsp.messages.Messages,
	org.pentaho.platform.engine.core.system.PentahoSystem,
	org.pentaho.platform.engine.security.SecurityHelper,
  org.pentaho.platform.web.http.PentahoHttpSessionHelper"
%><%
	 
	response.setCharacterEncoding(LocaleHelper.getSystemEncoding());
	String baseUrl = PentahoSystem.getApplicationContext().getBaseUrl();

	IPentahoSession userSession = PentahoHttpSessionHelper.getPentahoSession( request );

	HttpRequestParameterProvider requestParameters = new HttpRequestParameterProvider( request );
	HttpSessionParameterProvider sessionParameters = new HttpSessionParameterProvider( userSession );
	String path = request.getParameter( "path" );
	
	String thisUrl = baseUrl; //+ "./PropertiesEditor?"; //$NON-NLS-1$
	SimpleUrlFactory urlFactory = new SimpleUrlFactory( thisUrl );
	ArrayList messages = new ArrayList();
	
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
	
%><%=intro %>

	<table width="100%" class="content_table" border="0" cellpadding="0" cellspacing="0" height="20" style="padding-left: 5px; height: 24px;">
   <tr>
      <td>
         <table>
            <tr>
               <td>

                  <div class="icon_folder_sm"><a href="Admin"><%= Messages.getString("UI.USER_ADMIN") %></a></div>
               </td>
               <td>
                  <div class="icon_folder_sm"><a href="javascript:history.go(0)"><%= Messages.getString("UI.USER_PERMISSIONS") %></a></div>
               </td>
            </tr>
         </table>
      </td>

   </tr>
</table>

  	<table border="0" width="100%" class="content_header" cellpadding="0" cellspacing="0" style="positionx:absolute;top:50px;left:10px;width:200px;height:20px;">
		<tr>
			<td width="100%">
				<%= Messages.getString("UI.USER_PERMISSION_TREE") %>
			</td>
		</tr>
	</table>

<div id="treediv" style="border:1px solid #808080;positionx:absolute;topx:80px;left:10px;width:310px;height:520px;overflow:auto">

<%
	SolutionTreeUIComponent repository = new SolutionTreeUIComponent( urlFactory, messages, userSession );
	repository.validate( userSession, null );
	repository.setParameterProvider( HttpRequestParameterProvider.SCOPE_REQUEST, requestParameters ); 
	repository.setParameterProvider( HttpSessionParameterProvider.SCOPE_SESSION, sessionParameters ); 
	
	String treeContent = repository.getContent( "text/html" ); //$NON-NLS-1$
%><%= treeContent %>
</div>

  	<table border="0" width="100%" class="content_header" cellpadding="0" cellspacing="0" style="position:relative;top:-550px;left:330px;width:200px;height:20px;">
		<tr>
			<td width="100%">
				<%= Messages.getString("UI.USER_PERMISSION_SETTINGS") %>
			</td>
		</tr>
	</table>

<div id="itemdiv" style="border:1px solid #808080;position:relative;top:-550px;left:330px;width:1100px;height:520px;overflow:none">
	<% if( path != null ) { %>
		<iframe style="border:0px" src="<%= "PropertiesPanel?path=" + path %>" height="520" width="1100" name="dataframe">
<% } else { %>
		<iframe style="border:0px" src="about:blank" height="520" width="1100" name="dataframe">
<% } %>
		</iframe>
</div>


