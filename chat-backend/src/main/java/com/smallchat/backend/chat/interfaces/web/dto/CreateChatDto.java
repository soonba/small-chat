package com.smallchat.backend.chat.interfaces.web.dto;

public class CreateChatDto {
    public record Request(String chatName) {
    }

    public record Response(String chatId) {
    }
}
