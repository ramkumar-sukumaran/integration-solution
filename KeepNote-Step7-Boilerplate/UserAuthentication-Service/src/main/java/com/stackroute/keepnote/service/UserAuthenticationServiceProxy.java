package com.stackroute.keepnote.service;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.stackroute.keepnote.model.User;

@FeignClient(name="get-userbyid-service")
@RibbonClient(name="get-userbyid-service")
public interface UserAuthenticationServiceProxy {

	@GetMapping("/api/v1/user/{id}")
	public ResponseEntity<User> getUserById(@PathVariable("id") String id);
	
	@PostMapping("/api/v1/user")
	public ResponseEntity<User> registerUser(@RequestBody User user);
}
