package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.application.usecase.CompensationUseCase;
import com.smallchat.backend.chat.domain.model.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompensationInputPort implements CompensationUseCase {

    private final ChatOutputPort chatOutputPort;

    @Override
    public void cancelJoinChat(String chatId, String userId) {
        Chat chat = chatOutputPort.load(chatId);
        Chat removed = chat.removeParticipant(userId);
        if (removed.isEmptyChat()) {
            chatOutputPort.delete(removed);
        }
    }
}
