package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.application.usecase.LeaveChatUseCase;
import com.smallchat.backend.chat.domain.model.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LeaveChatInputPort implements LeaveChatUseCase {
    private final ChatOutputPort chatOutputPort;

    @Override
    public void leave(UUID userId, UUID chatId) {
        Chat chat = chatOutputPort.load(chatId);
        chat.removeParticipant(userId);
    }
}
