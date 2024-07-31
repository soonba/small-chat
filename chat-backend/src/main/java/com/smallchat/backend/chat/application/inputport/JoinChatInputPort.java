package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.ChatOutputPort;
import com.smallchat.backend.chat.application.outputport.EventOutputPort;
import com.smallchat.backend.chat.application.usecase.JoinChatUseCase;
import com.smallchat.backend.chat.domain.event.ChatJoined;
import com.smallchat.backend.chat.domain.model.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JoinChatInputPort implements JoinChatUseCase {

    private final ChatOutputPort chatOutputPort;
    private final EventOutputPort eventOutputPort;

    @Override
    @Transactional
    public void join(String userId, String chatId) {
        Chat loadedChat = chatOutputPort.load(chatId);
        Chat chat = loadedChat.addParticipant(userId);
        chatOutputPort.save(chat);
        try {
            eventOutputPort.occurJoinChatEvent(new ChatJoined(userId, chatId));
        } catch (Exception e) {
            throw new RuntimeException("이벤트 발행 실패");
        }
    }
}
