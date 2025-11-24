package com.smallchat.backend.chat.domain.interfaces

import com.smallchat.backend.chat.domain.model.Message


interface MessageRepositoryPort {
    fun getMessageList(chatId: String, nextCursor: Long?): List<Message>
//    fun getLastMessageInfo(chatIdList: List<String>): List<MessageKt>
}