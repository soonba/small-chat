package com.smallchat.backend.user.application.inputport;

public interface UserLeaveChatInputPort {
    void leave(String userId, String chatId);
}
