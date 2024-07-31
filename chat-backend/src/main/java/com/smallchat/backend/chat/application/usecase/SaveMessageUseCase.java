package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.domain.event.MessagePublished;

public interface SaveMessageUseCase {
    void saveMessage(MessagePublished messagePublished);
}
