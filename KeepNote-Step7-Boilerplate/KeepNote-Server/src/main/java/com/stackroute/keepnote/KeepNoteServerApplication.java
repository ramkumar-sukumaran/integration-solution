package com.stackroute.keepnote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class KeepNoteServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(KeepNoteServerApplication.class, args);
	}

}
