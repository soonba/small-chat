package com.smallchat.backend.chat.interfaces.mq

import com.smallchat.backend.chat.application.usecase.SaveMessageUseCase
import com.smallchat.backend.chat.infrastructure.rabbitMq.RabbitMQConfig
import com.smallchat.backend.chat.infrastructure.rabbitMq.RabbitMQPayload
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Service

@Service
class MessageEventConsumer(
    private val saveMessageUseCase: SaveMessageUseCase
) {

    @RabbitListener(queues = [RabbitMQConfig.CHAT_QUEUE])
    fun consume(event: RabbitMQPayload) {
        saveMessageUseCase.execute(event.data)
    }
}