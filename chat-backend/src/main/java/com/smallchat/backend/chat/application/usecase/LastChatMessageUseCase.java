package com.smallchat.backend.chat.application.usecase;

import com.smallchat.backend.chat.domain.model.vo.Message;

import java.util.List;

public interface LastChatMessageUseCase {
    List<Message> getLastMessageList(List<String> chatIdList);
}
