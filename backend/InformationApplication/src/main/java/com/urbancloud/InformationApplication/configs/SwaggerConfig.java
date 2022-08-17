package com.urbancloud.InformationApplication.configs;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {

	  @Bean
	  public GroupedOpenApi publicApi() {
	      return GroupedOpenApi.builder()
	              .group("urbancloud-public")
	              .pathsToMatch("/**")
	              .build();
	  }
	  
	  @Bean
	  public OpenAPI springShopOpenAPI() {
	      return new OpenAPI()
	              .info(new Info().title("UrbanCloud API")
	              .description("UrbanCloud information API")
	              .version("v0.0.1")
	              .license(new License().name("Apache 2.0").url("http://urbancloud.org")))
	              .externalDocs(new ExternalDocumentation()
	              .description("UrbanClud Wiki Documentation")
	              .url("https://urbancloud.wiki.github.org/docs"));
	  }

}
