package com.smallchat.backend.chat.application.usecase;

import java.util.UUID;

public interface JoinChatUseCase {
    void join(UUID userId, UUID chatId);
}
