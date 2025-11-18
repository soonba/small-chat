package com.smallchat.backend.chat.infrastructure.database.jpa_adapter

import com.smallchat.backend.chat.domain.model.Chat
import org.springframework.data.jpa.repository.JpaRepository

interface ChatJpaRepository : JpaRepository<Chat, String> {
}