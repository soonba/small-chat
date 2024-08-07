package com.smallchat.backend.chat.framework.kafka_adapter;

import com.smallchat.backend.chat.application.outputport.EventOutputPort;
import com.smallchat.backend.chat.domain.event.ChatJoined;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class ChatKafkaProducer implements EventOutputPort {
    @Value(value = "${producers.topic1.name}")
    private String TOPIC_CREATE_CHAT;

    private final KafkaTemplate<String, ChatJoined> kafkaTemplate1;

    @Override
    public void occurJoinChatEvent(ChatJoined chatJoined) {
        CompletableFuture<SendResult<String, ChatJoined>> future = kafkaTemplate1.send(TOPIC_CREATE_CHAT, chatJoined);
        future.whenComplete((result, throwable) -> {
            if (throwable != null) {
                System.err.println("Failure: " + throwable.getMessage());
            } else {
                System.out.println("Success: " + result);
            }
        });
    }
}
