package com.smallchat.backend.global.framework.web

data class ApiResponseKt(
    val statusCode: Int = 0,
    val message: String = "",
    val data: Any? = null
)