package com.smallchat.backend.room.application.usecase;

import com.smallchat.backend.room.domain.event.MessagePublished;

public interface SaveMessageUseCase {
    void saveMessage(MessagePublished messagePublished);
}
