package com.smallchat.backend.chat.domain.interfaces

import com.smallchat.backend.chat.domain.model.Chat
import org.springframework.data.jpa.repository.JpaRepository

interface ChatRepository : JpaRepository<Chat, String> {
}