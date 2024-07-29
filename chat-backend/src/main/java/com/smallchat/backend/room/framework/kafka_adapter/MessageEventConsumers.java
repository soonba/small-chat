package com.smallchat.backend.room.framework.kafka_adapter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smallchat.backend.room.application.usecase.SaveMessageUseCase;
import com.smallchat.backend.room.domain.event.MessagePublished;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class MessageEventConsumers {

    private final SaveMessageUseCase saveMessageUseCase;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "${consumer.topic2.name}", groupId = "${consumer.groupid.name}")
    public void consume(ConsumerRecord<String, String> record) throws IOException {
        MessagePublished messagePublished = objectMapper.readValue(record.value(), MessagePublished.class);
        saveMessageUseCase.saveMessage(messagePublished);
    }
}
