package com.smallchat.backend.chat.application.usecase;

import static com.smallchat.backend.chat.framework.mongodb_adapter.MessageOutputAdapter.MESSAGE_PAGE_LIMIT;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.framework.mongodb_adapter.MessageOutputAdapter;
import com.smallchat.backend.chat.framework.web.dto.MessageListDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageListUseCase  {
    private final MessageOutputAdapter messageOutputAdapter;

    public MessageListDto.Response getMessageList(String chatID, Long nextCursor) {
        List<Message> list = messageOutputAdapter.getMessageList(chatID, nextCursor);
        long newNextCursor = list.isEmpty() || list.size() < MESSAGE_PAGE_LIMIT ? 0L : list.get(0).getCreatedAt().toEpochSecond();
        return new MessageListDto.Response(list.stream().map(Message::toMessageBasicInfo).toList()
                , newNextCursor);
    }
}
