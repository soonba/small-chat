package com.smallchat.backend.chat.application.outputport;

import com.smallchat.backend.chat.domain.model.vo.Message;

import java.util.List;

public interface MessageOutputPort {
    void save(Message chat);

    List<Message> getMessageList(String chatID, Long nextCursor);

    List<Message> getLastMessageInfo(List<String> chatIdList);

}
