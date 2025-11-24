package com.smallchat.backend.chat.application

import com.smallchat.backend.chat.domain.interfaces.ChatRepository
import com.smallchat.backend.chat.domain.interfaces.ChatUserRepository
import com.smallchat.backend.chat.domain.model.Chat
import com.smallchat.backend.chat.domain.model.ChatRole
import com.smallchat.backend.chat.domain.model.ChatUser
import com.smallchat.backend.chat.domain.model.Message
import com.smallchat.backend.chat.domain.policy.ChatParticipationPolicy
import com.smallchat.backend.chat.infrastructure.rabbitMq.MessagePublisher
import com.smallchat.backend.chat.interfaces.web.dto.CreateChatDto
import com.smallchat.backend.global.domain.auth.AuthenticatedUser
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@RequiredArgsConstructor
class CreateChatUseCase(
    private val chatUserRepository: ChatUserRepository,
    private val chatRepository: ChatRepository,
    private val chatParticipationPolicy: ChatParticipationPolicy,
    private val messagePublisher: MessagePublisher
) {

    @Transactional
    fun execute(authUser: AuthenticatedUser, request: CreateChatDto.Request): String {
        val userId = authUser.userId
        val chatName = request.chatName
        chatParticipationPolicy.ensureUserCanJoin(userId)
        val savedChat = chatRepository.save(Chat(name = chatName))
        chatUserRepository.save(ChatUser(null, savedChat, userId, ChatRole.HOST))
        messagePublisher.publish(Message.systemCreated(savedChat.chatIdOrThrow))
        return savedChat.chatIdOrThrow
    }
}
