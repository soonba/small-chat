package com.smallchat.backend.chat.domain.policy

import com.smallchat.backend.chat.domain.interfaces.ChatUserRepository
import org.springframework.stereotype.Service

@Service
class ChatParticipationPolicy(private val chatUserRepository: ChatUserRepository) {
    companion object {
        private const val PARTICIPATION_LIMIT: Int = 5
    }

    fun ensureUserCanJoin(userId: String): Unit {
        val userChats = chatUserRepository.findAllChatsByUserId(userId)
        if (userChats.size >= PARTICIPATION_LIMIT) {
            throw RuntimeException("채팅은 최대 ${PARTICIPATION_LIMIT}개 까지 참여가 가능합니다.")
        }
    }
}