package com.smallchat.backend.chat.application

import com.smallchat.backend.chat.domain.interfaces.ChatUserRepository
import com.smallchat.backend.chat.domain.model.Message
import com.smallchat.backend.chat.infrastructure.rabbitMq.MessagePublisher
import com.smallchat.backend.global.domain.auth.AuthenticatedUser
import jakarta.persistence.EntityNotFoundException
import org.springframework.stereotype.Service

@Service
class LeaveChatUseCase(
    val chatUserRepository: ChatUserRepository,
    val messagePublisher: MessagePublisher
) {
    fun leave(user: AuthenticatedUser, chatId: String) {
        chatUserRepository.findByChatIdAndUserId(chatId, user.userId)
            ?: throw EntityNotFoundException("찾을 수 없는 챗-유저 엔티티")
        messagePublisher.publish(Message.systemLeave(chatId, user.nickname))
    }
}
