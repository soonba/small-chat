package com.smallchat.backend.user.application.usecase;

import java.util.UUID;

public interface UserJoinChatUseCase {

    void joinChat(UUID userId, UUID chatId);
}
