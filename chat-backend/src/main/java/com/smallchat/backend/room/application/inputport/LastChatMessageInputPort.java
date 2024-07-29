package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.MessageOutputPort;
import com.smallchat.backend.room.application.usecase.LastChatMessageUseCase;
import com.smallchat.backend.room.domain.model.vo.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LastChatMessageInputPort implements LastChatMessageUseCase {
    private final MessageOutputPort messageOutputPort;

    @Override
    public List<Message> getLastMessageList(List<UUID> roomIdList) {
        return messageOutputPort.getLastMessageInfo(roomIdList);
    }
}
