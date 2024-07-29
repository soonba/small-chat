package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.MessageOutputPort;
import com.smallchat.backend.chat.application.usecase.SaveMessageUseCase;
import com.smallchat.backend.chat.domain.event.MessagePublished;
import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.domain.model.vo.Sender;
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
        UUID chatId = messagePublished.getChatId();
        messageOutputPort.save(new Message(message, chatId, new Sender(userId, nickname)));
    }
}
