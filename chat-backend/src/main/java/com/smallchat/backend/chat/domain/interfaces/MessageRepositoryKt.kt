package com.smallchat.backend.chat.domain.interfaces

import com.smallchat.backend.chat.domain.model.MessageKt
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface MessageRepositoryKt : MongoRepository<MessageKt, String> {
    fun findFirstByChatIdOrderBySentAtDesc(chatId: String): MessageKt?
}
