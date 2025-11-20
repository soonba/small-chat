package com.smallchat.backend.chat.infrastructure.database.jpa_adapter;

import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.domain.interfaces.ChatRepository;
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
    @Deprecated
    public List<Chat> findChatBasicByIds(List<String> chatIds) {
        //todo 임시코드
        return List.of(chatRepository.findById(chatIds.get(0)).orElseThrow());
    }

    @Override
    public void delete(Chat chat) {
        chatRepository.delete(chat);
    }
}
