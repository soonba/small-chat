package com.smallchat.backend.chat.application.inputport;

public interface CompensationInputPort {
    void cancelJoinChat(String chatId, String userId);
}
