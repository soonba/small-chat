package com.smallchat.backend.user.framework.kafka_adapter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smallchat.backend.user.application.usecase.UserJoinRoomUseCase;
import com.smallchat.backend.user.domain.event.RoomJoined;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CreateRoomEventConsumers {

    private final UserJoinRoomUseCase userJoinRoomUseCase;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "${consumer.topic1.name}", groupId = "${consumer.groupid.name}")
    public void consume(ConsumerRecord<String, String> record) throws IOException {
        RoomJoined roomJoined = objectMapper.readValue(record.value(), RoomJoined.class);
        userJoinRoomUseCase.joinRoom(roomJoined.getUserId(), roomJoined.getRoomId());
    }
}
