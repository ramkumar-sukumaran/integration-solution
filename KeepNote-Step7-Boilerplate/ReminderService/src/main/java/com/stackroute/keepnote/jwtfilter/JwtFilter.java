package com.stackroute.keepnote.jwtfilter;


import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;



/* This class implements the custom filter by extending org.springframework.web.filter.GenericFilterBean.  
 * Override the doFilter method with ServletRequest, ServletResponse and FilterChain.
 * This is used to authorize the API access for the application.
 */


public class JwtFilter extends GenericFilterBean {

	
	
	

	/*
	 * Override the doFilter method of GenericFilterBean.
     * Retrieve the "authorization" header from the HttpServletRequest object.
     * Retrieve the "Bearer" token from "authorization" header.
     * If authorization header is invalid, throw Exception with message. 
     * Parse the JWT token and get claims from the token using the secret key
     * Set the request attribute with the retrieved claims
     * Call FilterChain object's doFilter() method */
	
	
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

       final HttpServletRequest httpServletRequest = (HttpServletRequest) request;
       final HttpServletResponse httpServletResponse = (HttpServletResponse) response;
       final String header = httpServletRequest.getHeader("Authorization");
       
       if("OPTIONS".equals(httpServletRequest.getMethod())) {
    	   httpServletResponse.setStatus(HttpServletResponse.SC_OK);
    	   chain.doFilter(httpServletRequest, httpServletResponse);
       } else {
    	   if (header == null || !header.startsWith("Bearer ")) {
    		   throw new ServletException("Missing or invalid Authorization header");
    	   }
    	   final String token = header.substring(7);
    	   final Claims claims = Jwts.parser()
    			   					.setSigningKey("keepnote")
    			   					.parseClaimsJws(token)
    			   					.getBody();
    	   httpServletRequest.setAttribute("claims", claims);
    	   chain.doFilter(httpServletRequest, httpServletResponse);
       }
       
    }
}
