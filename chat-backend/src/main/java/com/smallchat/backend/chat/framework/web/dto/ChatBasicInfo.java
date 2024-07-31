package com.smallchat.backend.chat.framework.web.dto;


import java.time.LocalDateTime;
import java.util.UUID;

public record ChatBasicInfo(UUID chatId, String chatName, String lastMessage, LocalDateTime lastMessageTime) {
}

