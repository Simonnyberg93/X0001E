package com.urbancloud.UserApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.urbancloud.UserApplication.filters.UserFilter;

@SpringBootApplication
public class UserApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean getFilter() {
		FilterRegistrationBean filterBean = new FilterRegistrationBean();
		filterBean.setFilter(new UserFilter());
		filterBean.addUrlPatterns("/api/v1/user/topics/*");
		filterBean.addUrlPatterns("/api/v1/user/role/*");
		filterBean.addUrlPatterns("/api/v1/user/*/addtopic/*");
		return filterBean;
	}
}
