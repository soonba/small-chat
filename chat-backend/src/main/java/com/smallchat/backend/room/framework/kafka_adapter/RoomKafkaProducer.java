package com.smallchat.backend.room.framework.kafka_adapter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.smallchat.backend.room.application.outputport.EventOutputPort;
import com.smallchat.backend.room.domain.event.RoomJoined;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class RoomKafkaProducer implements EventOutputPort {
    @Value(value = "${producers.topic1.name}")
    private String TOPIC_CREATE_ROOM;
//    @Value(value = "${producers.topic2.name}")
//    private String TOPIC_RETURN;
//    @Value(value = "${producers.topic3.name}")
//    private String TOPIC_CLEAR;
//    @Value(value = "${producers.topic4.name}")
//    private String TOPIC_POINT;

    private final KafkaTemplate<String, RoomJoined> kafkaTemplate1;

    @Override
    public void occurCreateRoomEvent(RoomJoined roomJoined) throws JsonProcessingException {
        CompletableFuture<SendResult<String, RoomJoined>> future = kafkaTemplate1.send(TOPIC_CREATE_ROOM, roomJoined);
        future.whenComplete((result, throwable) -> {
            if (throwable != null) {
                System.err.println("Failure: " + throwable.getMessage());
            } else {
                System.out.println("Success: " + result);
            }
        });
    }
}
