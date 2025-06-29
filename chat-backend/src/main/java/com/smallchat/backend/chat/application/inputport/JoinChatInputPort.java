package com.smallchat.backend.chat.application.inputport;

public interface JoinChatInputPort {
    void join(String userId, String chatId);
}
