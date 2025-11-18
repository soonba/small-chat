package com.smallchat.backend.chat.infrastructure.database.jpa_adapter;

import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.domain.model.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChatOutputAdapter implements ChatOutputPort {
    private final ChatRepositoryJava chatRepositoryJava;


    @Override
    public Chat save(Chat chat) {
        return chatRepositoryJava.save(chat);
    }

    @Override
    public Chat load(String chatId) {
        return chatRepositoryJava.findById(chatId).orElseThrow(() -> new RuntimeException("찾을 수 없음"));
    }

    @Override
    public List<Chat> findChatBasicByIds(List<String> chatIds) {
        return chatRepositoryJava.findByIdIn(chatIds);
    }

    @Override
    public void delete(Chat chat) {
        chatRepositoryJava.delete(chat);
    }
}
