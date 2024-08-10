package com.smallchat.backend.chat.application.outputport;

import com.smallchat.backend.chat.domain.event.ChatJoined;
import com.smallchat.backend.chat.domain.event.ChatLeaved;

public interface EventOutputPort {
    void occurJoinChatEvent(ChatJoined chatJoined);
    void occurLeaveChatEvent(ChatLeaved chatJoined);
}
