package com.smallchat.backend.room.domain.model.vo;

import com.smallchat.backend.room.framework.web.dto.MessageBasicInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "message")
public class Message {
    private String message;
    private String roomId;
    private Sender sender; //optional, can be nullable if messageType is SYSTEM...
    private LocalDateTime createdAt;
    private MessageType messageType;

    public Message(String message, UUID roomId, Sender sender) {
        this.message = message;
        this.roomId = roomId.toString();
        this.sender = sender;
        this.createdAt = LocalDateTime.now();
        this.messageType = MessageType.USER;
    }

    public Message(SystemMessage message, String messageValue, UUID roomId) {
        this.message = message.getSystemMessage(messageValue);
        this.roomId = roomId.toString();
        this.sender = null;
        this.createdAt = LocalDateTime.now();
        this.messageType = MessageType.SYSTEM;
    }

    public static Message systemMessage(SystemMessage systemMessage, String messageValue, UUID roomId) {
        return new Message(systemMessage, messageValue, roomId);
    }

    public MessageBasicInfo toMessageBasicInfo() {
        return new MessageBasicInfo(sender, createdAt, message, messageType);
    }
}
