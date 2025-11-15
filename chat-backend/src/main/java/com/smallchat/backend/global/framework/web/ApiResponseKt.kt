package com.smallchat.backend.global.framework.web

data class ApiResponseKt<T>(
    private val statusCode: Int = 0,
    private val message: String = "",
    private val data: T? = null
)