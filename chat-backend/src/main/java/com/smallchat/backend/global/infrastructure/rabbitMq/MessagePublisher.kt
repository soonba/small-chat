package com.smallchat.backend.global.infrastructure.rabbitMq

import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.stereotype.Component

@Component
class MessagePublisher(
    private val rabbitTemplate: RabbitTemplate
) {

    fun publish(event: MessageEvent) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.CHAT_EXCHANGE,
            RabbitMQConfig.ROUTING_KEY,
            event
        )
    }
}
