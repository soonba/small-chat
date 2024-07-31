package com.smallchat.backend.chat.domain.model.vo;

import com.smallchat.backend.chat.framework.web.dto.MessageBasicInfo;
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
    private String chatId;
    private Sender sender; //optional, can be nullable if messageType is SYSTEM...
    private LocalDateTime createdAt;
    private MessageType messageType;

    public Message(String message, UUID chatId, Sender sender) {
        this.message = message;
        this.chatId = chatId.toString();
        this.sender = sender;
        this.createdAt = LocalDateTime.now();
        this.messageType = MessageType.USER;
    }

    public Message(SystemMessage message, String messageValue, UUID chatId) {
        this.message = message.getSystemMessage(messageValue);
        this.chatId = chatId.toString();
        this.sender = null;
        this.createdAt = LocalDateTime.now();
        this.messageType = MessageType.SYSTEM;
    }

    public static Message systemMessage(SystemMessage systemMessage, String messageValue, UUID chatId) {
        return new Message(systemMessage, messageValue, chatId);
    }

    public MessageBasicInfo toMessageBasicInfo() {
        return new MessageBasicInfo(sender, createdAt, message, messageType);
    }
}
