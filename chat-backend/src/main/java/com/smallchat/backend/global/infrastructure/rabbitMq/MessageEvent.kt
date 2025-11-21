package com.smallchat.backend.global.infrastructure.rabbitMq

import com.smallchat.backend.chat.domain.model.vo.SystemMessageKt
import java.time.Instant

data class MessageEvent(
    val chatId: String,
    val senderId: String,
    val nickname: String,
    val content: String,
    val sentAt: Instant = Instant.now()
) {

    companion object {
        fun systemJoin(chatId: String, userNickname: String): MessageEvent {
            return MessageEvent(
                chatId = chatId,
                senderId = SystemMessageKt.SYSTEM_ID,
                nickname = SystemMessageKt.SYSTEM_NICKNAME,
                content = SystemMessageKt.userJoined(userNickname),
            )
        }

        fun systemLeave(chatId: String, userNickname: String): MessageEvent =
            MessageEvent(
                chatId = chatId,
                senderId = SystemMessageKt.SYSTEM_ID,
                nickname = SystemMessageKt.SYSTEM_NICKNAME,
                content = SystemMessageKt.userLeft(userNickname),
            )
    }
}