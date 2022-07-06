package com.urbancloud.UserApplication.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.GenericFilter;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpMethod;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;

public class UserFilter extends GenericFilter{

	private static final long serialVersionUID = 1L;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;

		if (httpRequest.getMethod().equalsIgnoreCase(HttpMethod.OPTIONS.name())) {
			chain.doFilter(httpRequest, httpResponse);
		}

		else {
			String headerInfo = httpRequest.getHeader("Authorization");
			System.out.println(headerInfo);
			if ((headerInfo == null) || (!headerInfo.startsWith("Bearer"))) {

				throw new ServletException("JWT Token is missing");
			} else {
				String myToken = headerInfo.substring(7);
				try {
					JwtParser jwtparser = Jwts.parser().setSigningKey("urbancloud");
					Jwt jwtobj = jwtparser.parse(myToken);
					Claims claimobj = (Claims) jwtobj.getBody();

					System.out.println("logged in user is " + claimobj.getSubject());

				} catch (Exception e) {
					System.out.println(e.getMessage());
					throw new ServletException("invalid token");
				}
			}
			chain.doFilter(httpRequest, httpResponse);
		}
		
	}

}
