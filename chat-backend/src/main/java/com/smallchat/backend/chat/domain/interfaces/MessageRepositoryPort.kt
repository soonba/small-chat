package com.smallchat.backend.chat.domain.interfaces

import com.smallchat.backend.chat.domain.model.MessageKt


interface MessageRepositoryPort {
    fun getMessageList(chatId: String, nextCursor: Long?): List<MessageKt>
//    fun getLastMessageInfo(chatIdList: List<String>): List<MessageKt>
}