package com.smallchat.backend.chat.application.outputport;

import com.smallchat.backend.chat.domain.model.vo.Message;

import java.util.List;
import java.util.UUID;

public interface MessageOutputPort {
    void save(Message chat);

    List<Message> getMessageList(UUID chatID);

    List<Message> getLastMessageInfo(List<UUID> chatIdList);

}
