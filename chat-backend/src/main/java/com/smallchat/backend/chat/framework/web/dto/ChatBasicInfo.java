package com.smallchat.backend.chat.framework.web.dto;


import java.time.LocalDateTime;

public record ChatBasicInfo(String chatId, String chatName, String lastMessage, LocalDateTime lastMessageTime) {
}

