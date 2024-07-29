package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.MessageOutputPort;
import com.smallchat.backend.room.application.usecase.SaveMessageUseCase;
import com.smallchat.backend.room.domain.event.MessagePublished;
import com.smallchat.backend.room.domain.model.vo.Message;
import com.smallchat.backend.room.domain.model.vo.Sender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SaveMessageInputPort implements SaveMessageUseCase {

    private final MessageOutputPort messageOutputPort;

    @Override
    public void saveMessage(MessagePublished messagePublished) {
        String nickname = messagePublished.getNickname();
        UUID userId = messagePublished.getUserId();
        String message = messagePublished.getMessage();
        UUID roomId = messagePublished.getRoomId();
        messageOutputPort.save(new Message(message, roomId, new Sender(userId, nickname)));
    }
}
