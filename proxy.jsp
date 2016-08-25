<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8"
%><%@page session="false"%><%@page import="java.net.*,java.io.*" %><%
//try {
	request.setCharacterEncoding("UTF-8");
	String reqUrl = request.getParameter("url");

	URL url = new URL(reqUrl);
	HttpURLConnection con = (HttpURLConnection)url.openConnection();
	con.setDoOutput(true);
	con.setRequestMethod(request.getMethod());
	int clength = request.getContentLength();
	if(clength > 0) {
		con.setDoInput(true);
		byte[] idata = new byte[clength];
		request.getInputStream().read(idata, 0, clength);
		con.getOutputStream().write(idata, 0, clength);
	}
	response.setContentType(con.getContentType());
 
	BufferedReader rd = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
	String line;
	while ((line = rd.readLine()) != null) {
		
		System.out.println(line);
		out.println(line); 
	}
	rd.close();
 
//} catch(Exception e) {
//	response.setStatus(500);
//}
%>