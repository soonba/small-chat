package com.smallchat.backend.chat.domain.model

import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document(collection = "message")
data class Message(
    val chatId: String,
    val userId: String,
    val nickname: String,
    val message: String,

    val sentAt: Instant? = Instant.now(),
    val type: MessageType? = MessageType.USER
) {

    val actualSentAt: Instant get() = sentAt ?: Instant.now()

    companion object {
        fun userMessage(chatId: String, userId: String, nickname: String, message: String): Message {
            return Message(chatId, userId, nickname, message, Instant.now(), MessageType.USER)
        }

        fun systemJoin(chatId: String, userNickname: String): Message {
            return Message(
                chatId = chatId,
                userId = SystemMessageKt.SYSTEM_ID,
                nickname = SystemMessageKt.SYSTEM_NICKNAME,
                message = SystemMessageKt.userJoined(userNickname),
                type = MessageType.SYSTEM
            )
        }

        fun systemLeave(chatId: String, userNickname: String): Message =
            Message(
                chatId = chatId,
                userId = SystemMessageKt.SYSTEM_ID,
                nickname = SystemMessageKt.SYSTEM_NICKNAME,
                message = SystemMessageKt.userLeft(userNickname),
                type = MessageType.SYSTEM
            )

        fun systemCreated(chatId: String): Message =
            Message(
                chatId = chatId,
                userId = SystemMessageKt.SYSTEM_ID,
                nickname = SystemMessageKt.SYSTEM_NICKNAME,
                message = SystemMessageKt.chatCreated(),
                type = MessageType.SYSTEM
            )
    }
}