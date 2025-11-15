package com.smallchat.backend.user.interfaces.web.dto

import com.smallchat.backend.global.utils.Tokens

class CreateUserDto {
    data class Response(val tokens: Tokens)
    data class Request(val id: String, val nickname: String, val password: String)
}
