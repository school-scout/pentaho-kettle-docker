<%@ page
  session="true"
  contentType="text/html;"
  import="org.pentaho.platform.util.messages.LocaleHelper" 
%><%
	response.setCharacterEncoding(LocaleHelper.getSystemEncoding());
%><html>
<head>
  <title>Error handling JPivot request ...</title>
</head>
<body bgcolor="white" dir="<%= LocaleHelper.getSystemEncoding() %>">

  <h2>JPivot Error ...</h2>

  An error happened servicing a JPivot request. Please see the server console for more details.
</body>
</html>
