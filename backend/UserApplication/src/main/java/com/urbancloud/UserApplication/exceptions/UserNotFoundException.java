package com.urbancloud.UserApplication.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(code = HttpStatus.CONFLICT,reason = "User not found")
public class UserNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

}
