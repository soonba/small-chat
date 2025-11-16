package com.smallchat.backend.user.interfaces.web.dto

import com.smallchat.backend.global.utils.TokensKt

class LoginDto {
    data class Request(val id: String, val password: String)
    data class Response(val tokens: TokensKt)
}