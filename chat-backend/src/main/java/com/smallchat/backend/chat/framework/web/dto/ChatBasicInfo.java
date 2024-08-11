package com.smallchat.backend.chat.framework.web.dto;


import java.time.ZonedDateTime;

public record ChatBasicInfo(String chatId, String chatName, String lastMessage, ZonedDateTime lastMessageTime) {
}

