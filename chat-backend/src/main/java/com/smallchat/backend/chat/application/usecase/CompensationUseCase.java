package com.smallchat.backend.chat.application.usecase;

import org.springframework.stereotype.Service;

import com.smallchat.backend.chat.domain.model.Chat;
import com.smallchat.backend.chat.framework.jpa_adapter.ChatOutputAdapter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompensationUseCase  {

    private final ChatOutputAdapter chatOutputPort;
    
    public void cancelJoinChat(String chatId, String userId) {
        Chat chat = chatOutputPort.load(chatId);
        Chat removed = chat.removeParticipant(userId);
        if (removed.isEmptyChat()) {
            chatOutputPort.delete(removed);
        }
    }
}
