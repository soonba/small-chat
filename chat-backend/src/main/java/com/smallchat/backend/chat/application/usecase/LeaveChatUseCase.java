package com.smallchat.backend.chat.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smallchat.backend.chat.domain.event.ChatLeaved;
import com.smallchat.backend.chat.domain.model.Chat;
import com.smallchat.backend.chat.framework.jpa_adapter.ChatOutputAdapter;
import com.smallchat.backend.chat.framework.kafka_adapter.ChatKafkaProducer;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaveChatUseCase  {
    private final ChatOutputAdapter chatOutputPort;
    private final ChatKafkaProducer chatKafkaProducer;

    @Transactional
    public void leave(String userId, String chatId) {
        Chat chat = chatOutputPort.load(chatId);
        Chat removedChat = chat.removeParticipant(userId);
        if (removedChat.isEmptyChat()) {
            chatOutputPort.delete(removedChat);
        }
        chatKafkaProducer.occurLeaveChatEvent(new ChatLeaved(userId, chatId));

    }
}
