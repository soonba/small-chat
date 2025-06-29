package com.smallchat.backend.chat.application.usecase;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smallchat.backend.chat.application.inputport.LeaveChatInputPort;
import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.application.outputport.EventOutputPort;
import com.smallchat.backend.chat.domain.event.ChatLeaved;
import com.smallchat.backend.chat.domain.model.Chat;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaveChatUseCase implements LeaveChatInputPort {
    private final ChatOutputPort chatOutputPort;
    private final EventOutputPort eventOutputPort;

    @Override
    @Transactional
    public void leave(String userId, String chatId) {
        Chat chat = chatOutputPort.load(chatId);
        Chat removedChat = chat.removeParticipant(userId);
        if (removedChat.isEmptyChat()) {
            chatOutputPort.delete(removedChat);
        }
        eventOutputPort.occurLeaveChatEvent(new ChatLeaved(userId, chatId));

    }
}
