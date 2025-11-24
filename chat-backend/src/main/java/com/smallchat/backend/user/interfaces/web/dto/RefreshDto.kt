package com.smallchat.backend.user.interfaces.web.dto

import com.smallchat.backend.global.domain.auth.Tokens


class RefreshDto {
    class Request(val refreshToken: String) {
        constructor() : this("")
    }

    data class Response(val tokens: Tokens)
}