package com.smallchat.backend.chat.application.usecase;

import org.springframework.stereotype.Service;

import com.smallchat.backend.chat.domain.event.ChatJoined;
import com.smallchat.backend.chat.domain.model.Chat;
import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.domain.model.vo.SystemMessage;
import com.smallchat.backend.chat.framework.jpa_adapter.ChatOutputAdapter;
import com.smallchat.backend.chat.framework.kafka_adapter.ChatKafkaProducer;
import com.smallchat.backend.chat.framework.mongodb_adapter.MessageOutputAdapter;
import com.smallchat.backend.chat.framework.web.dto.CreateChatDto;
import com.smallchat.backend.global.utils.TokenPayload;
import com.smallchat.backend.user.application.usecase.ValidateUserUseCase;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreateChatUseCase  {

    private final ChatOutputAdapter chatOutputAdapter;
    private final ChatKafkaProducer chatKafkaProducer;
    private final MessageOutputAdapter messageOutputAdapter;

    private final ValidateUserUseCase validateUserUseCase;

    public String createChat(TokenPayload tokenPayload, CreateChatDto.Request request) {
        String ownerId = tokenPayload.userId();
        validateUserUseCase.hasReachedMaxChatLimit(ownerId);
        Chat chat = Chat.of(ownerId, request.chatName());
        String chatId = chatOutputAdapter.save(chat).getChatId();
        messageOutputAdapter.save(Message.systemMessage(SystemMessage.CHAT_CREATED, chat.getName(), chatId));
        chatKafkaProducer.occurJoinChatEvent(new ChatJoined(ownerId, chatId));
        return chatId;
    }
}
