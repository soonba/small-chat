package com.smallchat.backend.room.application.outputport;

import com.smallchat.backend.room.domain.model.vo.Chat;

import java.util.List;
import java.util.UUID;

public interface ChatOutputPort {
    void save(Chat chat);

    List<Chat> getChatList(UUID roomID);

    List<Chat> getLastChatInfo(List<UUID> roomIdList);

}
