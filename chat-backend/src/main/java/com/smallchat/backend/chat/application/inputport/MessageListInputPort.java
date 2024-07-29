package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.MessageOutputPort;
import com.smallchat.backend.chat.application.usecase.MessageListUseCase;
import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.framework.web.dto.MessageListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageListInputPort implements MessageListUseCase {
    private final MessageOutputPort messageOutputPort;

    @Override
    public MessageListDto.Response getMessageList(UUID chatID) {
        List<Message> list = messageOutputPort.getMessageList(chatID);
        return new MessageListDto.Response(list.stream().map(Message::toMessageBasicInfo).toList());
    }
}