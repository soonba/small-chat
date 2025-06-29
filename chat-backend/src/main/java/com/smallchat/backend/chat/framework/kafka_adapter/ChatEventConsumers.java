package com.smallchat.backend.chat.framework.kafka_adapter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smallchat.backend.chat.application.inputport.CompensationInputPort;
import com.smallchat.backend.global.domain.event.EventResult;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatEventConsumers {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final CompensationInputPort compensationUseCase;

    @KafkaListener(topics = "${consumer.topic3.name}", groupId = "${consumer.groupid.name}")
    public void consumeChatJoin(ConsumerRecord<String, String> record) throws Exception {
        EventResult eventResult = objectMapper.readValue(record.value(), EventResult.class);
        compensationUseCase.cancelJoinChat(eventResult.getChatId(), eventResult.getUserId());
    }
}

