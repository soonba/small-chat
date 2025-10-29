package com.smallchat.backend.chat.interfaces.web.dto;

public class JoinChatDto {
    public record Request(String chatId) {
    }

    public record Response(String chatId) {
    }
}
