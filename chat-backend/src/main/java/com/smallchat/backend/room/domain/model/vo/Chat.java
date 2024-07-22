package com.smallchat.backend.room.domain.model.vo;

import com.smallchat.backend.room.framework.web.dto.Message;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Document(collation = "chat")
public class Chat {
    private final String message;
    private final UUID roomId;
    private final Sender sender;
    private final LocalDateTime createdAt;

    public Chat(String message, UUID roomId, Sender sender) {
        this.message = message;
        this.roomId = roomId;
        this.sender = sender;
        this.createdAt = LocalDateTime.now();
    }

    public Message toMessage() {
        return new Message(sender, createdAt, message);
    }
}
