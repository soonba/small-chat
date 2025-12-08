package com.smallchat.backend.chat.infrastructure.rabbitMq

import org.springframework.amqp.core.BindingBuilder
import org.springframework.amqp.core.Queue
import org.springframework.amqp.core.TopicExchange
import org.springframework.amqp.rabbit.connection.ConnectionFactory
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter
import org.springframework.amqp.support.converter.MessageConverter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
class RabbitMQConfig {

    companion object {
        const val CHAT_EXCHANGE = "chat.exchange"

        const val CHAT_MESSAGE_QUEUE = "chat.message.queue"
        const val CHAT_SYSTEM_QUEUE = "chat.system.queue"

        const val ROUTING_MESSAGE = "chat.message"
        const val ROUTING_SYSTEM = "chat.system"
    }

    @Bean
    fun chatExchange() = TopicExchange(CHAT_EXCHANGE, true, false)

    @Bean
    fun chatMessageQueue() = Queue(CHAT_MESSAGE_QUEUE, true)

    @Bean
    fun chatSystemQueue() = Queue(CHAT_SYSTEM_QUEUE, true)

    @Bean
    fun bindMessage() = BindingBuilder.bind(chatMessageQueue())
        .to(chatExchange())
        .with(ROUTING_MESSAGE)

    @Bean
    fun bindSystem() = BindingBuilder.bind(chatSystemQueue())
        .to(chatExchange())
        .with(ROUTING_SYSTEM)

    @Bean
    fun converter(): Jackson2JsonMessageConverter = Jackson2JsonMessageConverter()

    @Bean
    fun rabbitTemplate(factory: ConnectionFactory, converter: MessageConverter) =
        RabbitTemplate(factory).apply {
            messageConverter = converter
        }
}