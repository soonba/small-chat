package com.smallchat.backend.chat.application.usecase

import com.smallchat.backend.chat.domain.interfaces.ChatRepository
import com.smallchat.backend.chat.domain.interfaces.ChatUserRepository
import com.smallchat.backend.chat.domain.model.ChatUser
import com.smallchat.backend.chat.domain.model.vo.ChatRole
import com.smallchat.backend.chat.domain.policy.ChatParticipationPolicy
import com.smallchat.backend.global.infrastructure.rabbitMq.MessageEvent
import com.smallchat.backend.global.infrastructure.rabbitMq.MessagePublisher
import com.smallchat.backend.global.utils.AuthenticatedUser
import jakarta.persistence.EntityNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class JoinChatUseCase(
    private val chatParticipationPolicy: ChatParticipationPolicy,
    private val chatRepository: ChatRepository,
    private val chatUserRepository: ChatUserRepository,
    private val messagePublisher: MessagePublisher
) {

    @Transactional
    fun join(user: AuthenticatedUser, chatId: String) {
        val (userId, nickname, type) = user;
        chatParticipationPolicy.ensureUserCanJoin(userId)
        val chat1 = chatRepository.findById(chatId).orElseThrow { throw EntityNotFoundException("찾을 수 없는 엔티티") }
        chatUserRepository.save(ChatUser(null, chat1, userId, ChatRole.GUEST))
        messagePublisher.publish(
            MessageEvent.systemJoin(chatId, userId)
        )
    }
}
