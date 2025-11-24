package com.smallchat.backend.global.infrastructure.web

data class ApiResponse(
    val statusCode: Int = 0,
    val message: String = "",
    val data: Any? = null
)