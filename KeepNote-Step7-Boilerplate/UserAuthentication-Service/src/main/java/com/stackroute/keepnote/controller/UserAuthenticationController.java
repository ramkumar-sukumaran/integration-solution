package com.stackroute.keepnote.controller;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.UserAlreadyExistsException;
import com.stackroute.keepnote.exception.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.service.UserAuthenticationService;
import com.stackroute.keepnote.service.UserAuthenticationServiceProxy;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/*
 * As in this assignment, we are working on creating RESTful web service, hence annotate
 * the class with @RestController annotation. A class annotated with the @Controller annotation
 * has handler methods which return a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@CrossOrigin(origins="*")
@Api
@RestController
@RequestMapping("/api/v1/auth")
public class UserAuthenticationController {

    /*
	 * Autowiring should be implemented for the UserAuthenticationService. (Use Constructor-based
	 * autowiring) Please note that we should not create an object using the new
	 * keyword
	 */
	private UserAuthenticationService userAuthenticationService;
	@Autowired
    public UserAuthenticationController(UserAuthenticationService userAuthenticationService) {
		this.userAuthenticationService = userAuthenticationService;
	}
	@Autowired
	UserAuthenticationServiceProxy userProxy;
/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status messages
	 * basis on different situations:
	 * 1. 201(CREATED) - If the user created successfully. 
	 * 2. 409(CONFLICT) - If the userId conflicts with any existing user
	 * 
	 * This handler method should map to the URL "/api/v1/auth/register" using HTTP POST method
	 */
	@ApiOperation("Register User")
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		
		try {
			User userFound = userAuthenticationService.findByUserIdAndPassword(user.getUserId(), user.getUserPassword());
//			ResponseEntity<User> userFound = userProxy.getUserById(user.getUserId());
			if (userFound != null) {
//			if (userFound.getBody() != null) {
				return new ResponseEntity<User>(HttpStatus.CONFLICT);
			}
			userAuthenticationService.saveUser(user); 
//			userProxy.registerUser(user);
			return new ResponseEntity<User>(user, HttpStatus.CREATED);
		} catch (UserNotFoundException | UserAlreadyExistsException e) {
//		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
		
	}



	/* Define a handler method which will authenticate a user by reading the Serialized user
	 * object from request body containing the username and password. The username and password should be validated 
	 * before proceeding ahead with JWT token generation. The user credentials will be validated against the database entries. 
	 * The error should be return if validation is not successful. If credentials are validated successfully, then JWT
	 * token will be generated. The token should be returned back to the caller along with the API response.
	 * This handler method should return any one of the status messages basis on different
	 * situations:
	 * 1. 200(OK) - If login is successful
	 * 2. 401(UNAUTHORIZED) - If login is not successful
	 * 
	 * This handler method should map to the URL "/api/v1/auth/login" using HTTP POST method
	*/
	@ApiOperation("User Login")
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) throws Exception{
		Map<String,String> maps = new HashMap<String,String>();
		try {
			if (user.getUserId() == null || user.getUserPassword() == null)
				throw new ServletException("Username or Password Invalid");
			
			User userFound = userAuthenticationService.findByUserIdAndPassword(user.getUserId(), user.getUserPassword());
//			ResponseEntity<User> userFound = userProxy.getUserById(user.getUserId());
			
			if (userFound != null) {
//			if (userFound.getBody() != null) {
				String token = getToken(user.getUserId(),user.getUserPassword());
				maps.put("token", token);
				maps.put("message", "User successfully logged in");
			} else {
				throw new ServletException("Invalid credentials.");
			}
				
		} catch (UserNotFoundException e) {
			maps.put("token", null);
			maps.put("message", e.getMessage());
			
		}
		return new ResponseEntity<Map<String,String>>(maps,HttpStatus.OK);
	}



// Generate JWT token
	public String getToken(String username, String password) throws Exception {
			
        return Jwts.builder()//.setSubject(username)
        				.setIssuedAt(new Date())
        				.setExpiration(new Date(System.currentTimeMillis() + 300000))
        				.signWith(SignatureAlgorithm.HS256, "keepnote").compact();
        
	}
	
	@ApiOperation("Token authenticate")
	@PostMapping("/isAuthenticated")
	public ResponseEntity<?> isAuthenticated(HttpServletRequest req, @RequestHeader HttpHeaders headers) throws Exception{
		Map<String,Object> maps = new HashMap<String,Object>();
		boolean flag = false;
		try {
			String ss = req.getParameter("Authorization");
			System.out.println(" Authorization id --> " + ss + " :: req.getHeader(\"Authorization\");" + req.getHeader("Authorization"));
			System.out.println(" headers.get(\"Authorization\"); " + req.getHeaderNames());
//			List<String> headerList = headers.get("Authorization");
//			final String header = headerList.get(0);
			final String header = req.getHeader("Authorization");
			
			final String token = header.substring(7);
			System.out.println(" token " + token);
     	   	final Claims claims = Jwts.parser()
     			   			.setSigningKey("keepnote")
     			   			.parseClaimsJws(token)
     			   			.getBody();
     	   	//System.currentTimeMillis() - 300000)
//     	   	claims.getExpiration().before(when)
     	   	if(claims.getExpiration().getSeconds() > 300 ) {
     	   		maps.put("isAuthenticated", false);
     	   	}
				maps.put("isAuthenticated", true);
//				maps.put("message", "valid token");
		} catch (Exception e) {
			e.printStackTrace();
			maps.put("isAuthenticated", false);
			maps.put("message", e.getMessage());
			
		}
		HttpHeaders header = new HttpHeaders();
		header.set("Access-Control-Allow-Orgin", "*");
		header.set("Access-Control-Allow-Orgin", "POST,PUT,GET,DELETE,OPTIONS");
//		return new ResponseEntity<Map<String,String>>(maps,header,HttpStatus.OK);
		return new ResponseEntity<Map<String,Object>>(maps,HttpStatus.OK);
	}
	
}
