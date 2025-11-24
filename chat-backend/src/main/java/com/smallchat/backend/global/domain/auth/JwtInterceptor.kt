package com.smallchat.backend.global.domain.auth

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.stereotype.Component
import org.springframework.web.servlet.HandlerInterceptor

@Component
class JwtInterceptor(
    private val jwtProvider: JwtProvider
) : HandlerInterceptor {

    override fun preHandle(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any
    ): Boolean {
        val auth = request.getHeader("Authorization") ?: return true
        if (auth.startsWith("Bearer ")) {
            val authenticatedUser = jwtProvider.parseFromBearer(auth)
            UserContext.set(authenticatedUser)
        }
        return true
    }

    override fun afterCompletion(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any,
        ex: Exception?
    ) {
        UserContext.clear()
    }
}
