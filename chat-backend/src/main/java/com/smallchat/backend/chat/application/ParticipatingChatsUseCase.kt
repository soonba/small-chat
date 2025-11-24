package com.smallchat.backend.chat.application

import com.smallchat.backend.chat.domain.interfaces.ChatRepository
import com.smallchat.backend.chat.domain.interfaces.ChatUserRepository
import com.smallchat.backend.chat.domain.interfaces.MessageSimpleQueryRepository
import com.smallchat.backend.chat.interfaces.web.dto.ChatDetail
import com.smallchat.backend.chat.interfaces.web.dto.ChatListDto
import com.smallchat.backend.chat.interfaces.web.dto.ChatMessage
import jakarta.persistence.EntityNotFoundException
import org.springframework.stereotype.Service

@Service
class ParticipatingChatsUseCase(
    val chatUserRepository: ChatUserRepository,
    val messageSimpleQueryRepository: MessageSimpleQueryRepository,
    val chatRepository: ChatRepository
) {

    fun getChatList(userId: String): ChatListDto.Response {
        val chatUsers = chatUserRepository.findAllByUserId(userId)
        val chatMessages = chatUsers.map { chatUser ->
            val chatId = chatUser.chat.chatIdOrThrow
            val chatName = chatUser.chat.name
            val lastMessageKt =
                messageSimpleQueryRepository.findFirstByChatIdOrderBySentAtDesc(chatId)
                    ?: throw EntityNotFoundException("찾을 수 없는 마지막 메시지")
            ChatMessage(chatId, chatName, lastMessageKt.message, lastMessageKt.actualSentAt)
        }

        return ChatListDto.Response(chatMessages)
    }

    fun getChatDetail(chatId: String): ChatDetail.Response {
        val chat = chatRepository.findById(chatId).orElseThrow { throw EntityNotFoundException("찾을 수 없는 채팅 엔티티") }
        return ChatDetail.Response(chatId, chat.name)
    }
}
