package com.smallchat.backend.global.rabbitMq

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
        const val CHAT_QUEUE = "chat.message.queue"
        const val ROUTING_KEY = "chat.message"
    }

    @Bean
    fun chatExchange() = TopicExchange(CHAT_EXCHANGE, true, false)

    @Bean
    fun chatQueue() = Queue(CHAT_QUEUE, true)

    @Bean
    fun bind() = BindingBuilder.bind(chatQueue())
        .to(chatExchange())
        .with(ROUTING_KEY)

    @Bean
    fun converter() = Jackson2JsonMessageConverter()

    @Bean
    fun template(factory: ConnectionFactory, converter: MessageConverter) =
        RabbitTemplate(factory).apply {
            messageConverter = converter
        }
}
