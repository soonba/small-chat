package com.smallchat.backend.global.domain.auth

data class AuthenticatedUser(
    val userId: String,
    val nickname: String,
    val tokenType: TokenType,
)