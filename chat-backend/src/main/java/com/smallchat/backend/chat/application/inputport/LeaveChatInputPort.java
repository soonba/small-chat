package com.smallchat.backend.chat.application.inputport;

public interface LeaveChatInputPort {
    void leave(String userId, String chatId);
}
