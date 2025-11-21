package com.smallchat.backend.global.infrastructure.rabbitMq

import org.springframework.amqp.core.TopicExchange
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RabbitMQConfig {

    companion object {
        const val EXCHANGE_NAME = "chat.exchange"
    }

    @Bean
    fun chatExchange(): TopicExchange =
        TopicExchange(EXCHANGE_NAME, true, false)
}