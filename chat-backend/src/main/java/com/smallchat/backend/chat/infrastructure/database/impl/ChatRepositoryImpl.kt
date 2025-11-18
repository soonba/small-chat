package com.smallchat.backend.chat.infrastructure.database.impl

import com.smallchat.backend.chat.domain.interfaces.ChatRepository
import com.smallchat.backend.chat.domain.model.Chat
import com.smallchat.backend.chat.infrastructure.database.jpa_adapter.ChatJpaRepository
import org.springframework.stereotype.Repository

@Repository
class ChatRepositoryImpl(private val chatJpaRepository: ChatJpaRepository) : ChatRepository {
    override fun save(chat: Chat): Chat {
        return chatJpaRepository.save(chat)
    }
}