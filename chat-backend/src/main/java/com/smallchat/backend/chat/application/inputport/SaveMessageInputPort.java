package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.domain.event.MessagePublished;

public interface SaveMessageInputPort {
    void saveMessage(MessagePublished messagePublished);
}
