package com.smallchat.backend.chat.domain.interfaces

import com.smallchat.backend.chat.domain.model.Chat
import com.smallchat.backend.chat.domain.model.ChatUser
import com.smallchat.backend.chat.domain.model.vo.ChatRole

interface ChatUserRepository {
    fun findAllChatsByUserId(id: String): List<ChatUser>
    fun save(savedChat: Chat, userId: String, host: ChatRole): ChatUser
}