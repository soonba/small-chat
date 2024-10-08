package com.smallchat.backend.chat.domain.model.vo;

import com.smallchat.backend.chat.framework.web.dto.MessageBasicInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.ZonedDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "message")
public class Message {
    private String message;
    private String chatId;
    private Sender sender; //optional, can be nullable if messageType is SYSTEM...
    private ZonedDateTime createdAt;
    private MessageType messageType;

    public Message(String message, String chatId, Sender sender) {
        this.message = message;
        this.chatId = chatId;
        this.sender = sender;
        this.createdAt = ZonedDateTime.now();
        this.messageType = MessageType.USER;
    }

    public Message(SystemMessage message, String messageValue, String chatId) {
        this.message = message.getSystemMessage(messageValue);
        this.chatId = chatId;
        this.sender = null;
        this.createdAt = ZonedDateTime.now();
        this.messageType = MessageType.SYSTEM;
    }

    public static Message systemMessage(SystemMessage systemMessage, String messageValue, String chatId) {
        return new Message(systemMessage, messageValue, chatId);
    }

    public static Message notFoundMessage() {
        return new Message("정보 없음", "", null);
    }

    public MessageBasicInfo toMessageBasicInfo() {
        return new MessageBasicInfo(sender, createdAt, message, messageType);
    }
}
