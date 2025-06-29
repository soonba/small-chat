package com.smallchat.backend.chat.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smallchat.backend.chat.application.inputport.LastChatMessageInputPort;
import com.smallchat.backend.chat.application.outputport.MessageOutputPort;
import com.smallchat.backend.chat.domain.model.vo.Message;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LastChatMessageUseCase implements LastChatMessageInputPort {
    private final MessageOutputPort messageOutputPort;

    @Override
    public List<Message> getLastMessageList(List<String> chatIdList) {
        return messageOutputPort.getLastMessageInfo(chatIdList);
    }
}
