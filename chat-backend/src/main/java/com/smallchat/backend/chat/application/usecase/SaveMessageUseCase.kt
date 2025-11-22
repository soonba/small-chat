package com.smallchat.backend.chat.application.usecase

import com.smallchat.backend.chat.domain.interfaces.MessageSimpleQueryRepository
import com.smallchat.backend.chat.domain.model.MessageKt
import org.springframework.stereotype.Service

@Service
class SaveMessageUseCase(private val messageSimpleQueryRepository: MessageSimpleQueryRepository) {
    fun execute(messageKt: MessageKt) {
        val (chatId, userId, nickname, message) = messageKt
        messageSimpleQueryRepository.save(
            MessageKt.userMessage(
                chatId,
                userId,
                nickname,
                message,
            )
        )
    }
}
