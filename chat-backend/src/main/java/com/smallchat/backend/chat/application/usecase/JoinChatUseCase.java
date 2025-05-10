package com.smallchat.backend.chat.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smallchat.backend.chat.domain.event.ChatJoined;
import com.smallchat.backend.chat.domain.model.Chat;
import com.smallchat.backend.chat.framework.jpa_adapter.ChatOutputAdapter;
import com.smallchat.backend.chat.framework.kafka_adapter.ChatKafkaProducer;
import com.smallchat.backend.user.application.usecase.ValidateUserUseCase;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JoinChatUseCase  {

    private final ChatOutputAdapter chatOutputPort;
    private final ChatKafkaProducer chatKafkaProducer;    

    private final ValidateUserUseCase validateUserUseCase;

    @Transactional
    public void join(String userId, String chatId) {
        validateUserUseCase.hasReachedMaxChatLimit(userId);
        Chat loadedChat = chatOutputPort.load(chatId);
        loadedChat.validateUserId(userId);
        Chat chat = loadedChat.addParticipant(userId);
        chatOutputPort.save(chat);
        chatKafkaProducer.occurJoinChatEvent(new ChatJoined(userId, chatId));
    }
}
