package com.smallchat.backend.chat.application.usecase;

import org.springframework.stereotype.Service;

import com.smallchat.backend.chat.application.inputport.SaveMessageInputPort;
import com.smallchat.backend.chat.application.outputport.MessageOutputPort;
import com.smallchat.backend.chat.domain.event.MessagePublished;
import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.domain.model.vo.Sender;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SaveMessageUseCase implements SaveMessageInputPort {

    private final MessageOutputPort messageOutputPort;

    @Override
    public void saveMessage(MessagePublished messagePublished) {
        String nickname = messagePublished.getNickname();
        String userId = messagePublished.getUserId();
        String message = messagePublished.getMessage();
        String chatId = messagePublished.getChatId();
        messageOutputPort.save(new Message(message, chatId, new Sender(userId, nickname)));
    }
}
