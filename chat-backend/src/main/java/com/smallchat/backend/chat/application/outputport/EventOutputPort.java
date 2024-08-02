package com.smallchat.backend.chat.application.outputport;

import com.smallchat.backend.chat.domain.event.ChatJoined;

public interface EventOutputPort {
    void occurJoinChatEvent(ChatJoined chatJoined);
}
