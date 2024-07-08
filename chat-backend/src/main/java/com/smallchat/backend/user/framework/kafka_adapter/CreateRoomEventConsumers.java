package com.smallchat.backend.user.framework.kafka_adapter;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CreateRoomEventConsumers {

    @KafkaListener(topics = "${consumer.topic1.name}", groupId = "${consumer.groupid.name}")
    public void consume(ConsumerRecord<String, String> record) throws IOException {
        System.out.println("before");
        String value = record.value().replace("\"", "");
        UUID uuid = UUID.fromString(value);
        System.out.println("after");
        System.out.println(uuid);
    }
}
