package com.smallchat.backend.global.framework.advices

import com.fasterxml.jackson.databind.ObjectMapper
import com.smallchat.backend.global.framework.web.ApiResponseKt
import org.springframework.core.MethodParameter
import org.springframework.http.MediaType
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.server.ServerHttpRequest
import org.springframework.http.server.ServerHttpResponse
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice

//@RestControllerAdvice
class ApiResponseAdvice : ResponseBodyAdvice<Any> {
    override fun supports(
        returnType: MethodParameter,
        converterType: Class<out HttpMessageConverter<*>?>
    ): Boolean {
        return true
    }

    override fun beforeBodyWrite(
        body: Any?,
        returnType: MethodParameter,
        selectedContentType: MediaType,
        selectedConverterType: Class<out HttpMessageConverter<*>?>,
        request: ServerHttpRequest,
        response: ServerHttpResponse
    ): Any {

        // 이미 ApiResponseKt 형태면 다시 감싸지 않음
        if (body is ApiResponseKt<*>) {
            return body
        }

        // String은 JSON 변환 방식을 직접 적용해야 함
        if (body is String) {
            return ObjectMapper().writeValueAsString(
                ApiResponseKt(
                    statusCode = 200,
                    message = "OK",
                    data = body
                )
            )
        }

        // 일반적인 DTO → ApiResponseKt 로 wrapping
        return ApiResponseKt(
            statusCode = 200,
            message = "OK",
            data = body
        )
    }

}