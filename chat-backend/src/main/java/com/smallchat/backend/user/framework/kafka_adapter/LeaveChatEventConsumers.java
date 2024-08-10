package com.smallchat.backend.user.framework.kafka_adapter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smallchat.backend.global.domain.event.EventResult;
import com.smallchat.backend.global.domain.event.EventType;
import com.smallchat.backend.user.application.usecase.UserLeaveChatUseCase;
import com.smallchat.backend.user.domain.event.ChatJoined;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class LeaveChatEventConsumers {
    private final UserLeaveChatUseCase userLeaveChatUseCase;
    private final JoinChatEventProducer joinChatEventProducer;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "${consumer.topic4.name}", groupId = "${consumer.groupid.name}")
    public void consume(ConsumerRecord<String, String> record) throws IOException {
        ChatJoined chatJoined = objectMapper.readValue(record.value(), ChatJoined.class);
        try {
            userLeaveChatUseCase.leave(chatJoined.getUserId(), chatJoined.getChatId());
        } catch (Exception e) {
            joinChatEventProducer.occurEvent(EventResult.createFailEventResult(EventType.CHAT_JOINED, chatJoined.getChatId(), chatJoined.getUserId()));
        }
    }
}
