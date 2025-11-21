package com.smallchat.backend.global.infrastructure.rabbitMq

import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.stereotype.Service

@Service
class ChatMessagePublisher(
    private val rabbitTemplate: RabbitTemplate
) {

    fun publish(chatId: String, event: MessageEvent) {
        val routingKey = "chat.$chatId"
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE_NAME,
            routingKey,
            event
        )
    }
}
