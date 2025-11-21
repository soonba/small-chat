package com.smallchat.backend.global.infrastructure.rabbitMq

import org.springframework.amqp.core.AmqpAdmin
import org.springframework.amqp.core.BindingBuilder
import org.springframework.amqp.core.Queue
import org.springframework.amqp.core.TopicExchange
import org.springframework.stereotype.Component

@Component
class ChatQueueManager(
    private val amqpAdmin: AmqpAdmin
) {

    fun createQueueForChat(chatId: String) {
        val queueName = "chat.queue.$chatId"
        val routingKey = "chat.$chatId"

        val queue = Queue(queueName, true)
        val exchange = TopicExchange(RabbitMQConfig.EXCHANGE_NAME)
        val binding = BindingBuilder.bind(queue).to(exchange).with(routingKey)

        amqpAdmin.declareQueue(queue)
        amqpAdmin.declareBinding(binding)
    }
}