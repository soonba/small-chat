package com.smallchat.backend.room.application.usecase;

import com.smallchat.backend.room.domain.event.ChatPublished;

public interface SaveChatUseCase {
    void saveChat(ChatPublished chatPublished);
}
