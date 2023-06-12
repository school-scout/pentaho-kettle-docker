<%@ page
  session="true"
  contentType="text/html;"
  import="org.pentaho.platform.util.messages.LocaleHelper,
          org.pentaho.platform.engine.core.system.PentahoSystem,
          org.pentaho.platform.web.jsp.messages.Messages,
          java.util.List" 
%><%
	response.setCharacterEncoding(LocaleHelper.getSystemEncoding());
    response.setHeader("Pragma", "no-cache"); // Set standard HTTP/1.0 no-cache header.
    response.setHeader("Cache-Control", "no-store, no-cache, private, must-revalidate, max-stale=0" );
    response.setHeader("Expires", "0");
  	List initializationErrorMessages = PentahoSystem.getInitializationFailureMessages();
%>
<html>
<head>
  <title>Error Initializing Pentaho</title>
</head>
<body bgcolor="white" dir="<%= LocaleHelper.getTextDirection() %>">

  <h2>Pentaho Initialization Exception</h2>
  <br />
  <div style='border:2px solid #cccccc'>
    <table width='100%' border='0'>
      <tr><td><b><%=Messages.getString("InitFailure.USER_ERRORS_DETECTED")%></b></td></tr>
<%
  for (int i=0; i<initializationErrorMessages.size(); i++) {
%>
    <tr><td><%=initializationErrorMessages.get(i)%></td></tr>
<%
  } // end for loop
%>
    </table>
    <br />
      <%= Messages.getString("InitFailure.USER_SEE_SERVER_CONSOLE") %>
  </div>
 </body>
</html>
