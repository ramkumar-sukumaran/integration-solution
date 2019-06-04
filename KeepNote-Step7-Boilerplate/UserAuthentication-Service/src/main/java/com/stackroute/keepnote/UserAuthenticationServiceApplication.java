package com.stackroute.keepnote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

//import com.stackroute.keepnote.jwtfilter.JwtFilter;


@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class UserAuthenticationServiceApplication {




    public static void main(String[] args) {
        SpringApplication.run(UserAuthenticationServiceApplication.class, args);
    }
    
//    @Bean
//	public FilterRegistrationBean jwtFilter() {
//		final FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
//		filterRegistrationBean.setFilter(new JwtFilter());
//		filterRegistrationBean.addUrlPatterns("/api/*");
//		return filterRegistrationBean;
//	}
}
