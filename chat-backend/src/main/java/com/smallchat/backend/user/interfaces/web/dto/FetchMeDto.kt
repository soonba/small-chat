package com.smallchat.backend.user.interfaces.web.dto

class FetchMeDto {
    data class Response(val userId: String, val nickname: String)
}
