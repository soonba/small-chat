package com.smallchat.backend.chat.domain.interfaces

import com.smallchat.backend.chat.domain.model.ChatUser
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface ChatUserRepository : JpaRepository<ChatUser, String> {

    @Query(
        """
    SELECT cu FROM ChatUser cu
    JOIN FETCH cu.chat
    WHERE cu.userId = :userId"""
    )
    fun findAllByUserId(@Param("userId") userId: String): List<ChatUser>

    @Query(
        """
    SELECT cu FROM ChatUser cu
    JOIN FETCH cu.chat
    WHERE cu.userId = :userId
      AND cu.chat.id = :chatId
    """
    )
    fun findByChatIdAndUserId(
        @Param("chatId") chatId: String,
        @Param("userId") userId: String
    ): ChatUser?

    @Modifying
    fun deleteByChatIdAndUserId(
        @Param("chatId") chatId: String,
        @Param("userId") userId: String
    )
}