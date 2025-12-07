package com.smallchat.backend.global.config

import com.smallchat.backend.global.domain.auth.CurrentUserResolver
import com.smallchat.backend.global.domain.auth.JwtInterceptor
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
open class WebConfig(
    private val jwtInterceptor: JwtInterceptor,
    private val currentUserResolver: CurrentUserResolver
) : WebMvcConfigurer {
    @Value("\${client.origin}")
    private val origin: String? = "https://soonba.github.io"

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**").allowedOrigins(origin, "http://localhost:3000", "https://soonba.github.io")
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600)
    }

    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(jwtInterceptor)
            .addPathPatterns("/**")
    }

    override fun addArgumentResolvers(resolvers: MutableList<HandlerMethodArgumentResolver>) {
        resolvers.add(currentUserResolver)
    }
}