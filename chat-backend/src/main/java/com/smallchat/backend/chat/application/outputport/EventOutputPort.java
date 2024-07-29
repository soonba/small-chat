package com.smallchat.backend.chat.application.outputport;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.smallchat.backend.chat.domain.event.ChatJoined;

public interface EventOutputPort {
    void occurJoinChatEvent(ChatJoined chatJoined) throws JsonProcessingException;
}
