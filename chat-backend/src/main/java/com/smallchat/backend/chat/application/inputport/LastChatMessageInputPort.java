package com.smallchat.backend.chat.application.inputport;

import com.smallchat.backend.chat.domain.model.vo.Message;

import java.util.List;

public interface LastChatMessageInputPort {
    List<Message> getLastMessageList(List<String> chatIdList);
}
