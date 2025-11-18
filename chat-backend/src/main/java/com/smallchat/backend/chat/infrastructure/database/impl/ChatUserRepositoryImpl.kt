package com.smallchat.backend.chat.infrastructure.database.impl

import com.smallchat.backend.chat.domain.interfaces.ChatUserRepository
import com.smallchat.backend.chat.domain.model.Chat
import com.smallchat.backend.chat.domain.model.ChatUser
import com.smallchat.backend.chat.domain.model.vo.ChatRole
import com.smallchat.backend.chat.infrastructure.database.jpa_adapter.ChatUserJpaRepository
import org.springframework.stereotype.Repository

@Repository
class ChatUserRepositoryImpl(private val chatUserJpaRepository: ChatUserJpaRepository) : ChatUserRepository {
    override fun findAllChatsByUserId(id: String): List<ChatUser> {
        return chatUserJpaRepository.findAllByUserId(id)
    }

    override fun save(
        savedChat: Chat,
        userId: String,
        host: ChatRole
    ): ChatUser {
        return chatUserJpaRepository.save(ChatUser(chat = savedChat, userId = userId, role = host.value))
    }
}