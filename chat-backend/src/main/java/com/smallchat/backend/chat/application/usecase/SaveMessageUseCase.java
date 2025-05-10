package com.smallchat.backend.chat.application.usecase;

import org.springframework.stereotype.Service;

import com.smallchat.backend.chat.domain.event.MessagePublished;
import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.domain.model.vo.Sender;
import com.smallchat.backend.chat.framework.mongodb_adapter.MessageOutputAdapter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SaveMessageUseCase  {

    private final MessageOutputAdapter messageOutputAdapter;

    public void saveMessage(MessagePublished messagePublished) {
        String nickname = messagePublished.getNickname();
        String userId = messagePublished.getUserId();
        String message = messagePublished.getMessage();
        String chatId = messagePublished.getChatId();
        messageOutputAdapter.save(new Message(message, chatId, new Sender(userId, nickname)));
    }
}
