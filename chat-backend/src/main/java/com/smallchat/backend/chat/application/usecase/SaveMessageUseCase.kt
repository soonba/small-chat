package com.smallchat.backend.chat.application.usecase

import com.smallchat.backend.chat.domain.interfaces.MessageRepositoryKt
import com.smallchat.backend.chat.domain.model.MessageKt
import org.springframework.stereotype.Service

@Service
class SaveMessageUseCase(private val messageRepositoryKt: MessageRepositoryKt) {
    fun execute(messageKt: MessageKt) {
        val (chatId, userId, nickname, message) = messageKt
        messageRepositoryKt.save(
            MessageKt.userMessage(
                chatId,
                userId,
                nickname,
                message,
            )
        )
    }
}
