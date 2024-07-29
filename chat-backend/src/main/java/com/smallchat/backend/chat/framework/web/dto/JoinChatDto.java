package com.smallchat.backend.chat.framework.web.dto;

import java.util.UUID;

public class JoinChatDto {
    public record Request(String chatId) {
    }

    public record Response(UUID chatId) {
    }
}
