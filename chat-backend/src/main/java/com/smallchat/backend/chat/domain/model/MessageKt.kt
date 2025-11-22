package com.smallchat.backend.chat.domain.model

import com.smallchat.backend.chat.domain.model.vo.MessageType
import com.smallchat.backend.chat.domain.model.vo.SystemMessageKt
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document(collection = "message")
data class MessageKt(
    val chatId: String,
    val userId: String,
    val nickname: String,
    val message: String,

    val sentAt: Instant? = Instant.now(),
    val type: MessageType? = MessageType.USER
) {

    val actualSentAt: Instant get() = sentAt ?: Instant.now()

    companion object {
        fun userMessage(chatId: String, userId: String, nickname: String, message: String): MessageKt {
            return MessageKt(chatId, userId, nickname, message, Instant.now(), MessageType.USER)
        }

        fun systemJoin(chatId: String, userNickname: String): MessageKt {
            return MessageKt(
                chatId = chatId,
                userId = SystemMessageKt.SYSTEM_ID,
                nickname = SystemMessageKt.SYSTEM_NICKNAME,
                message = SystemMessageKt.userJoined(userNickname),
                type = MessageType.SYSTEM
            )
        }

        fun systemLeave(chatId: String, userNickname: String): MessageKt =
            MessageKt(
                chatId = chatId,
                userId = SystemMessageKt.SYSTEM_ID,
                nickname = SystemMessageKt.SYSTEM_NICKNAME,
                message = SystemMessageKt.userLeft(userNickname),
                type = MessageType.SYSTEM
            )

        fun systemCreated(chatId: String): MessageKt =
            MessageKt(
                chatId = chatId,
                userId = SystemMessageKt.SYSTEM_ID,
                nickname = SystemMessageKt.SYSTEM_NICKNAME,
                message = SystemMessageKt.chatCreated(),
                type = MessageType.SYSTEM
            )
    }
}