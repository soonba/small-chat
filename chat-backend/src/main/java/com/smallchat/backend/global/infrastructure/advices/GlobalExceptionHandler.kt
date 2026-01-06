package com.smallchat.backend.global.infrastructure.advices

import com.smallchat.backend.global.infrastructure.web.ApiResponse
import com.smallchat.backend.global.domain.auth.UnauthorizedException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {
    //현재는 글로벌 핸들러
    @ExceptionHandler(Exception::class)
    fun handleAllException(e: Exception): ResponseEntity<ApiResponse> {
        return ResponseEntity
            .status(500)
            .body(ApiResponse(500, e.message ?: "", null))
    }

    @ExceptionHandler(UnauthorizedException::class)
    fun handleUnauthorizedException(e: UnauthorizedException): ResponseEntity<ApiResponse> {
        return ResponseEntity
            .status(401)
            .body(ApiResponse(401, e.message ?: "Unauthorized", null))
    }
}
