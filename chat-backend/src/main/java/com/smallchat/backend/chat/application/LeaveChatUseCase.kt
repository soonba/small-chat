package com.smallchat.backend.chat.application

import com.smallchat.backend.chat.domain.interfaces.ChatUserRepository
import com.smallchat.backend.chat.domain.model.Message
import com.smallchat.backend.chat.infrastructure.rabbitMq.SystemMessagePublisher
import com.smallchat.backend.global.domain.auth.AuthenticatedUser
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class LeaveChatUseCase(
    val chatUserRepository: ChatUserRepository,
    val systemMessagePublisher: SystemMessagePublisher
) {
    @Transactional
    fun leave(user: AuthenticatedUser, chatId: String) {
        chatUserRepository.deleteByChatIdAndUserId(chatId, user.userId)
        systemMessagePublisher.publish(Message.systemLeave(chatId, user.nickname))
    }
}
