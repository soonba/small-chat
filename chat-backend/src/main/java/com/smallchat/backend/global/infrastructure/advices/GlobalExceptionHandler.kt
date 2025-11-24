package com.smallchat.backend.global.infrastructure.advices;

import com.smallchat.backend.global.infrastructure.web.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ApiResponse> handleAllException(Exception e) {
        return ResponseEntity
                .status(500)
                .body(ApiResponse.error(500, e.getMessage()));
    }
}
