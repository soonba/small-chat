package com.smallchat.backend.chat.application.outputport;

import com.smallchat.backend.chat.domain.model.Chat;

import java.util.List;

public interface ChatOutputPort {
    Chat save(Chat chat);

    Chat load(String chatId);

    List<Chat> findChatBasicByIds(List<String> chatIds);

    void delete(Chat chat);
}
