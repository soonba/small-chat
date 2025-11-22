package com.smallchat.backend.chat.infrastructure.rabbitMq

import com.smallchat.backend.chat.domain.model.MessageKt

data class NestRMQ(
    val pattern: String,
    val data: MessageKt
)