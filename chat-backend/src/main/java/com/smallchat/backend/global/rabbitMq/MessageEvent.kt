package com.smallchat.backend.global.rabbitMq

import com.smallchat.backend.chat.domain.model.vo.SystemMessageKt
import java.time.Instant

data class MessageEvent(
    val chatId: String,
    val userId: String,
    val nickname: String,
    val message: String,
    val sentAt: Instant = Instant.now()
) {

    companion object {
        fun systemJoin(chatId: String, userNickname: String): MessageEvent {
            return MessageEvent(
                chatId = chatId,
                userId = SystemMessageKt.SYSTEM_ID,
                nickname = SystemMessageKt.SYSTEM_NICKNAME,
                message = SystemMessageKt.userJoined(userNickname),
            )
        }

        fun systemLeave(chatId: String, userNickname: String): MessageEvent =
            MessageEvent(
                chatId = chatId,
                userId = SystemMessageKt.SYSTEM_ID,
                nickname = SystemMessageKt.SYSTEM_NICKNAME,
                message = SystemMessageKt.userLeft(userNickname),
            )

        fun systemCreated(chatId: String): MessageEvent =
            MessageEvent(
                chatId = chatId,
                userId = SystemMessageKt.SYSTEM_ID,
                nickname = SystemMessageKt.SYSTEM_NICKNAME,
                message = SystemMessageKt.chatCreated(),
            )
    }
}