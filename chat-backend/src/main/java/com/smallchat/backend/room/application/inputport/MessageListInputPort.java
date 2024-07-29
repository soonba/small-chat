package com.smallchat.backend.room.application.inputport;

import com.smallchat.backend.room.application.outputport.MessageOutputPort;
import com.smallchat.backend.room.application.usecase.MessageListUseCase;
import com.smallchat.backend.room.domain.model.vo.Message;
import com.smallchat.backend.room.framework.web.dto.MessageListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageListInputPort implements MessageListUseCase {
    private final MessageOutputPort messageOutputPort;

    @Override
    public MessageListDto.Response getMessageList(UUID roomID) {
        List<Message> list = messageOutputPort.getMessageList(roomID);
        return new MessageListDto.Response(list.stream().map(Message::toMessageBasicInfo).toList());
    }
}
