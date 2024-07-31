package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.MessageOutputPort;
import com.smallchat.backend.chat.application.usecase.LastChatMessageUseCase;
import com.smallchat.backend.chat.domain.model.vo.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LastChatMessageInputPort implements LastChatMessageUseCase {
    private final MessageOutputPort messageOutputPort;

    @Override
    public List<Message> getLastMessageList(List<UUID> chatIdList) {
        return messageOutputPort.getLastMessageInfo(chatIdList);
    }
}
