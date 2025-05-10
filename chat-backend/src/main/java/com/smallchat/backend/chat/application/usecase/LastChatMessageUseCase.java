package com.smallchat.backend.chat.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smallchat.backend.chat.domain.model.vo.Message;
import com.smallchat.backend.chat.framework.mongodb_adapter.MessageOutputAdapter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LastChatMessageUseCase  {
    private final MessageOutputAdapter messageOutputAdapter;

    public List<Message> getLastMessageList(List<String> chatIdList) {
        return messageOutputAdapter.getLastMessageInfo(chatIdList);
    }
}
