package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.application.inputport.MessageListInputPort;
import com.smallchat.backend.chat.application.outputport.MessageOutputPort;
import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.framework.web.dto.MessageListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.smallchat.backend.chat.framework.mongodb_adapter.MessageOutputAdapter.MESSAGE_PAGE_LIMIT;

@Service
@RequiredArgsConstructor
public class MessageListUseCase implements MessageListInputPort {
    private final MessageOutputPort messageOutputPort;

    @Override
    public MessageListDto.Response getMessageList(String chatID, Long nextCursor) {
        List<Message> list = messageOutputPort.getMessageList(chatID, nextCursor);
        long newNextCursor = list.isEmpty() || list.size() < MESSAGE_PAGE_LIMIT ? 0L : list.get(0).getCreatedAt().toEpochSecond();
        return new MessageListDto.Response(list.stream().map(Message::toMessageBasicInfo).toList()
                , newNextCursor);
    }
}
