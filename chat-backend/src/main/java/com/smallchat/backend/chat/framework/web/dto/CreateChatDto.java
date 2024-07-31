package com.smallchat.backend.chat.framework.web.dto;

import java.util.UUID;

public class CreateChatDto {
    public record Request(String chatName) {
    }

    public record Response(UUID chatId) {
    }
}
