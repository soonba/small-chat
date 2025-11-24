package com.smallchat.backend.user.interfaces.web.dto

import com.smallchat.backend.global.domain.auth.Tokens

class LoginDto {
    data class Request(val id: String, val password: String)
    data class Response(val tokens: Tokens)
}