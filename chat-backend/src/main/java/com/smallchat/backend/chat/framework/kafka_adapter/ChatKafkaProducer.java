package com.smallchat.backend.chat.framework.kafka_adapter;

import com.smallchat.backend.chat.application.outputport.EventOutputPort;
import com.smallchat.backend.chat.domain.event.ChatJoined;
import com.smallchat.backend.chat.domain.event.ChatLeaved;
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
    @Value(value = "${producers.topic4.name}")
    private String TOPIC_LEAVE_CHAT;

    private final KafkaTemplate<String, ChatJoined> kafkaTemplate1;
    private final KafkaTemplate<String, ChatLeaved> kafkaTemplate2;

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

    @Override
    public void occurLeaveChatEvent(ChatLeaved chatLeaved) {
        CompletableFuture<SendResult<String, ChatLeaved>> future = kafkaTemplate2.send(TOPIC_LEAVE_CHAT, chatLeaved);
        future.whenComplete((result, throwable) -> {
            if (throwable != null) {
                System.err.println("Failure: " + throwable.getMessage());
            } else {
                System.out.println("Success: " + result);
            }
        });
    }
}
