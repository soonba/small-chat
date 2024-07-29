package com.smallchat.backend.chat.application.outputport;

import com.smallchat.backend.chat.domain.model.Chat;

import java.util.List;
import java.util.UUID;

public interface ChatOutputPort {
    Chat save(Chat chat);

    Chat load(UUID chatId);

    List<Chat> findChatBasicByIds(List<UUID> chatIds);
}
