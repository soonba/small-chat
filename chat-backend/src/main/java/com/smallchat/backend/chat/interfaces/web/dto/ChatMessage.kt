package com.smallchat.backend.chat.interfaces.web.dto

import java.time.Instant


class ChatListDto {
    data class Response(val chatMessages: List<ChatMessage>)
}

data class ChatMessage(
    val chatId: String,
    val chatName: String,
    val lastMessage: String,
    val lastMessageTime: Instant
)

