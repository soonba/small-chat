package com.smallchat.backend.chat.framework.jpa_adapter;

import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.domain.model.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChatOutputAdapter implements ChatOutputPort {
    private final ChatRepository chatRepository;


    @Override
    public Chat save(Chat chat) {
        return chatRepository.save(chat);
    }

    @Override
    public Chat load(String chatId) {
        return chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("찾을 수 없음"));
    }

    @Override
    public List<Chat> findChatBasicByIds(List<String> chatIds) {
        return chatRepository.findByChatIdIn(chatIds);
    }
}
