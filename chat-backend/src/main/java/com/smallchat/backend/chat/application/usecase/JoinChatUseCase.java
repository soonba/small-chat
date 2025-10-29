package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.application.inputport.JoinChatInputPort;
import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.domain.model.Chat;
import com.smallchat.backend.user.application.inputport.ValidateUserInputPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JoinChatUseCase implements JoinChatInputPort {

    private final ChatOutputPort chatOutputPort;
//    private final EventOutputPort eventOutputPort;

    //todo inputport 수정 필요
    private final ValidateUserInputPort validateUserInputPort;

    @Override
    @Transactional
    public void join(String userId, String chatId) {
        validateUserInputPort.hasReachedMaxChatLimit(userId);
        Chat loadedChat = chatOutputPort.load(chatId);
        loadedChat.validateUserId(userId);
        Chat chat = loadedChat.addParticipant(userId);
        chatOutputPort.save(chat);
//        eventOutputPort.occurJoinChatEvent(new ChatJoined(userId, chatId));
    }
}
