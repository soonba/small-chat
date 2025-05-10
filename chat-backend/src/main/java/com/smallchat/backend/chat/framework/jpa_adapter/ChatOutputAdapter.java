package com.smallchat.backend.chat.framework.jpa_adapter;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.smallchat.backend.chat.domain.model.Chat;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatOutputAdapter {
    private final ChatRepository chatRepository;


    public Chat save(Chat chat) {
        return chatRepository.save(chat);
    }

    public Chat load(String chatId) {
        return chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("찾을 수 없음"));
    }

    public List<Chat> findChatBasicByIds(List<String> chatIds) {
        return chatRepository.findByChatIdIn(chatIds);
    }

    public void delete(Chat chat) {
        chatRepository.delete(chat);
    }
}
