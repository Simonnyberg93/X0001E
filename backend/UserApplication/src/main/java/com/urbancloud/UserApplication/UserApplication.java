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
	public FilterRegistrationBean<UserFilter> getFilter() {
		FilterRegistrationBean<UserFilter> filterBean = new FilterRegistrationBean<UserFilter>();
		filterBean.setFilter(new UserFilter());
		filterBean.addUrlPatterns("/api/v1/user/topics/*");
		filterBean.addUrlPatterns("/api/v1/user/role/*");
		filterBean.addUrlPatterns("/api/v1/user/area/*");
		filterBean.addUrlPatterns("/api/v1/user/getuser/*");
		return filterBean;
	}
}
