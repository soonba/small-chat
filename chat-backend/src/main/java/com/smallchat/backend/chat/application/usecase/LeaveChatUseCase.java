package com.smallchat.backend.chat.application.usecase;

import java.util.UUID;

public interface LeaveChatUseCase {
    void leave(UUID userId, UUID chatId);
}
