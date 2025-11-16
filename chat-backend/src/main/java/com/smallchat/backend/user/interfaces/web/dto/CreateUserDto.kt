package com.smallchat.backend.user.interfaces.web.dto

import com.smallchat.backend.global.utils.TokensKt

class CreateUserDto {
    data class Request(val id: String, val nickname: String, val password: String)
    data class Response(val tokens: TokensKt)
}
