package com.stackroute.keepnote.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.stackroute.keepnote.exceptions.UserAlreadyExistsException;
import com.stackroute.keepnote.exceptions.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.service.UserService;

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
@Api
@RestController
public class UserController {

	/*
	 * Autowiring should be implemented for the UserService. (Use Constructor-based
	 * autowiring) Please note that we should not create an object using the new
	 * keyword
	 */
	private UserService userService;
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status messages
	 * basis on different situations:
	 * 1. 201(CREATED) - If the user created successfully. 
	 * 2. 409(CONFLICT) - If the userId conflicts with any existing user
	 * 
	 * This handler method should map to the URL "/user" using HTTP POST method
	 */
	@ApiOperation("Create User")
	@PostMapping("/api/v1/user")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		
		try {
			user.setUserAddedDate(new Date());
			userService.registerUser(user);
			return new ResponseEntity<User>(user,HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<String>("User already exists",HttpStatus.CONFLICT);
		}
	}
	/*
	 * Define a handler method which will update a specific user by reading the
	 * Serialized object from request body and save the updated user details in a
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 200(OK) - If the user updated successfully.
	 * 2. 404(NOT FOUND) - If the user with specified userId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP PUT method.
	 */
	@ApiOperation("Update User")
	@PutMapping("/api/v1/user/{id}")
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		try {
			if(userService.updateUser(user.getUserId(), user) != null) {
				return new ResponseEntity<User>(user,HttpStatus.OK);
			}
			else
				return new ResponseEntity<String>("Data not found", HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>("Data not found", HttpStatus.NOT_FOUND);
		}
	}
	/*
	 * Define a handler method which will delete a user from a database.
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the user deleted successfully from database. 
	 * 2. 404(NOT FOUND) - If the user with specified userId is not found.
	 *
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid userId without {}
	 */
	@ApiOperation("Delete User")
	@DeleteMapping("/api/v1/user/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable String id) {
		
		try {
			if(userService.deleteUser(id)) {
				return new ResponseEntity<String>("Record deleted", HttpStatus.OK);
			}else
				return new ResponseEntity<String>("Data not found", HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>("Data not found", HttpStatus.NOT_FOUND);
		}
	}
	/*
	 * Define a handler method which will show details of a specific user. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the user found successfully. 
	 * 2. 404(NOT FOUND) - If the user with specified userId is not found. 
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP GET method where "id" should be
	 * replaced by a valid userId without {}
	 */
	@ApiOperation("Get User By Id")
	@GetMapping("/api/v1/user/{id}")
	public ResponseEntity<?> getUserById(@PathVariable String id) {
		User user;
		try {
			user = userService.getUserById(id);
			if(user != null) {
				return new ResponseEntity<User>(user,HttpStatus.OK);
			}
			else
				return new ResponseEntity<String>("Data not found", HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<String>("Data not found", HttpStatus.NOT_FOUND);
		}
		
	}
}
