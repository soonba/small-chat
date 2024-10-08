package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.application.outputport.EventOutputPort;
import com.smallchat.backend.chat.application.usecase.JoinChatUseCase;
import com.smallchat.backend.chat.domain.event.ChatJoined;
import com.smallchat.backend.chat.domain.model.Chat;
import com.smallchat.backend.user.application.usecase.ValidateUserUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JoinChatInputPort implements JoinChatUseCase {

    private final ChatOutputPort chatOutputPort;
    private final EventOutputPort eventOutputPort;

    private final ValidateUserUseCase validateUserUseCase;

    @Override
    @Transactional
    public void join(String userId, String chatId) {
        validateUserUseCase.hasReachedMaxChatLimit(userId);
        Chat loadedChat = chatOutputPort.load(chatId);
        loadedChat.validateUserId(userId);
        Chat chat = loadedChat.addParticipant(userId);
        chatOutputPort.save(chat);
        eventOutputPort.occurJoinChatEvent(new ChatJoined(userId, chatId));
    }
}
