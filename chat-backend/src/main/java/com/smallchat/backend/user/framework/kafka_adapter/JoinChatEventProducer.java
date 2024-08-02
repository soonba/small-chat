package com.smallchat.backend.user.framework.kafka_adapter;

import com.smallchat.backend.global.domain.event.EventResult;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class JoinChatEventProducer {
    @Value(value = "${producers.topic3.name}")
    private String TOPIC_JOIN_CHAT_RETURN;

    private final KafkaTemplate<String, EventResult> kafkaTemplate;

    public void occurEvent(EventResult eventResult) {
        CompletableFuture<SendResult<String, EventResult>> future = kafkaTemplate.send(TOPIC_JOIN_CHAT_RETURN, eventResult);
        future.whenComplete((result, throwable) -> {
            if (throwable != null) {
                System.err.println("Failure: " + throwable.getMessage());
            } else {
                System.out.println("Success: " + result);
            }
        });
    }
}
