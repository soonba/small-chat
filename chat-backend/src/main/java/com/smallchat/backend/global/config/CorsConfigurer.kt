package com.smallchat.backend.global.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
open class CorsConfigurer : WebMvcConfigurer {
    @Value("\${client-origin}")
    private val origin: String? = "http://localhost:3000"

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**").allowedOrigins(origin, "http://localhost:3000")
    }
}