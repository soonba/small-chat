package com.smallchat.backend.room.framework.kafka_adapter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smallchat.backend.room.application.usecase.SaveChatUseCase;
import com.smallchat.backend.room.domain.event.ChatPublished;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ChatEventConsumers {

    private final SaveChatUseCase saveChatUseCase;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "${consumer.topic2.name}", groupId = "${consumer.groupid.name}")
    public void consume(ConsumerRecord<String, String> record) throws IOException {
        ChatPublished chatPublished = objectMapper.readValue(record.value(), ChatPublished.class);
        saveChatUseCase.saveChat(chatPublished);
    }
}
