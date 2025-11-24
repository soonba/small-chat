package com.smallchat.backend.chat.infrastructure.rabbitMq

import com.smallchat.backend.chat.domain.model.Message

/**
 * NestJS에서 RPC 스타일의 payload로 보내게됨. 스프링 내에서 publish할 경우 스펙일 통일해야함
 */
data class RabbitMQPayload(
    val pattern: String,
    val data: Message
)