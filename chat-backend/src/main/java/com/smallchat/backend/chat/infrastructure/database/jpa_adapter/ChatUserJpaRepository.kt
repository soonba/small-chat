package com.smallchat.backend.chat.infrastructure.database.jpa_adapter

import com.smallchat.backend.chat.domain.model.ChatUser
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface ChatUserJpaRepository : JpaRepository<ChatUser, String> {

    @Query(
        """
    SELECT cu FROM ChatUser cu
    JOIN FETCH cu.chat
    WHERE cu.userId = :userId"""
    )
    fun findAllByUserId(@Param("userId") userId: String): List<ChatUser>
}