package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.MessageOutputPort;
import com.smallchat.backend.chat.application.usecase.LastChatMessageUseCase;
import com.smallchat.backend.chat.domain.model.vo.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LastChatMessageInputPort implements LastChatMessageUseCase {
    private final MessageOutputPort messageOutputPort;

    @Override
    public List<Message> getLastMessageList(List<String> chatIdList) {
        return messageOutputPort.getLastMessageInfo(chatIdList);
    }
}
