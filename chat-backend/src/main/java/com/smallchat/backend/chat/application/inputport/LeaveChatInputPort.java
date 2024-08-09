package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.application.usecase.LeaveChatUseCase;
import com.smallchat.backend.chat.domain.model.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LeaveChatInputPort implements LeaveChatUseCase {
    private final ChatOutputPort chatOutputPort;

    @Override
    @Transactional
    public void leave(String userId, String chatId) {
        Chat chat = chatOutputPort.load(chatId);
        Chat removedChat = chat.removeParticipant(userId);
        if (removedChat.isEmptyChat()) {
            chatOutputPort.delete(removedChat);
        }
    }
}
