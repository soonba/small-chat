package com.smallchat.backend.chat.application.usecase

import com.smallchat.backend.chat.infrastructure.mongodb_adapter.MongoTemplateAdapter
import com.smallchat.backend.chat.interfaces.web.dto.MessageListDto
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Service

@Service
@RequiredArgsConstructor
class MessageListUseCase(val mongoTemplateAdapter: MongoTemplateAdapter) {
    fun execute(chatId: String, nextCursor: Long?): MessageListDto.Response {
        val list = mongoTemplateAdapter.getMessageList(chatId, nextCursor)
        val nextCursor = list.firstOrNull()
            ?.sentAt
            ?.epochSecond
        return MessageListDto.Response(list, nextCursor)
    }
}
