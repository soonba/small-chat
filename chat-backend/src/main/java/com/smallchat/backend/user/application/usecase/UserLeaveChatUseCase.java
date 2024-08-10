package com.smallchat.backend.user.application.usecase;

public interface UserLeaveChatUseCase {
    void leave(String userId, String chatId);
}
