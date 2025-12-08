package com.smallchat.backend.chat.infrastructure.rabbitMq

import com.smallchat.backend.chat.domain.model.Message
import com.smallchat.backend.chat.infrastructure.rabbitMq.RabbitMQConfig.Companion.ROUTING_SYSTEM
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.stereotype.Component

/**
 * System Message Publisher
 */
@Component
class SystemMessagePublisher(
    private val rabbitTemplate: RabbitTemplate
) {

    fun publish(message: Message) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.CHAT_EXCHANGE,
            ROUTING_SYSTEM,
            RabbitMQPayload(ROUTING_SYSTEM, message)
        )
    }
}
