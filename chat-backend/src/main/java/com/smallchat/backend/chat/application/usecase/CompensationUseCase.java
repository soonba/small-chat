package com.smallchat.backend.chat.application.usecase;

public interface CompensationUseCase {
    void cancelJoinChat(String chatId, String userId);
}
