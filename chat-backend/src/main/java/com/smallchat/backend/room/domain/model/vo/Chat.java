package com.smallchat.backend.room.domain.model.vo;

import com.smallchat.backend.room.framework.web.dto.ChatBasicInfo;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Document(collation = "chat")
public class Chat {
    private final String message;
    private final UUID roomId;
    private final Sender sender; //optional, can be nullable if chatType is SYSTEM...
    private final LocalDateTime createdAt;
    private final ChatType chatType;

    public Chat(String message, UUID roomId, Sender sender) {
        this.message = message;
        this.roomId = roomId;
        this.sender = sender;
        this.createdAt = LocalDateTime.now();
        this.chatType = ChatType.USER;
    }

    public Chat(SystemMessage message, String messageValue, UUID roomId) {
        this.message = message.getSystemMessage(messageValue);
        this.roomId = roomId;
        this.sender = null;
        this.createdAt = LocalDateTime.now();
        this.chatType = ChatType.SYSTEM;
    }

    public static Chat systemMessage(SystemMessage systemMessage, String messageValue, UUID roomId) {
        return new Chat(systemMessage, messageValue, roomId);
    }

    public ChatBasicInfo toChatBasicInfo() {
        return new ChatBasicInfo(sender, createdAt, message, chatType);
    }
}
