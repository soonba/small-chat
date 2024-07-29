package com.smallchat.backend.room.application.outputport;

import com.smallchat.backend.room.domain.model.vo.Message;

import java.util.List;
import java.util.UUID;

public interface MessageOutputPort {
    void save(Message chat);

    List<Message> getMessageList(UUID roomID);

    List<Message> getLastMessageInfo(List<UUID> roomIdList);

}
