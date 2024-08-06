package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.application.outputport.MessageOutputPort;
import com.smallchat.backend.chat.application.usecase.MessageListUseCase;
import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.framework.web.dto.MessageListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.ZoneOffset;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageListInputPort implements MessageListUseCase {
    private final MessageOutputPort messageOutputPort;

    @Override
    public MessageListDto.Response getMessageList(String chatID, Long nextCursor) {
        List<Message> list = messageOutputPort.getMessageList(chatID, nextCursor);
        long newNextCursor = list.isEmpty() ? 0L : list.get(list.size() - 1).getCreatedAt().toEpochSecond(ZoneOffset.UTC);
        return new MessageListDto.Response(list.stream().map(Message::toMessageBasicInfo).toList()
                , newNextCursor);
    }
}
