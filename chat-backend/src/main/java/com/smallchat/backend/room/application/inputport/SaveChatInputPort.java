package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.ChatOutputPort;
import com.smallchat.backend.room.application.usecase.SaveChatUseCase;
import com.smallchat.backend.room.domain.event.ChatPublished;
import com.smallchat.backend.room.domain.model.vo.Chat;
import com.smallchat.backend.room.domain.model.vo.Sender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SaveChatInputPort implements SaveChatUseCase {

    private final ChatOutputPort chatOutputPort;

    @Override
    public void saveChat(ChatPublished chatPublished) {
        String nickname = chatPublished.getNickname();
        UUID userId = chatPublished.getUserId();
        String message = chatPublished.getMessage();
        UUID roomId = chatPublished.getRoomId();
        chatOutputPort.save(new Chat(message, roomId, new Sender(userId, nickname)));
    }
}
