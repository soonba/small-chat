package com.smallchat.backend.user.interfaces.web.dto

import com.smallchat.backend.global.utils.TokensKt


class RefreshDto {
    data class Request(val refreshToken: String)
    data class Response(val tokens: TokensKt)
}
