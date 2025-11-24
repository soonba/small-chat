package com.smallchat.backend.chat.infrastructure.rabbitMq

import com.smallchat.backend.chat.domain.model.Message
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.stereotype.Component

@Component
class MessagePublisher(
    private val rabbitTemplate: RabbitTemplate
) {

    fun publish(message: Message) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.CHAT_EXCHANGE,
            RabbitMQConfig.ROUTING_KEY,
            RabbitMQPayload("chat.message", message)
        )
    }
}
