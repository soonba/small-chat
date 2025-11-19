package com.smallchat.backend.chat.domain.interfaces

import com.smallchat.backend.chat.domain.model.Chat

interface ChatRepository {
    fun save(chat: Chat): Chat
    fun findByIdOrThrow(chatId: String): Chat
}