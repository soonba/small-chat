package com.smallchat.backend.room.application.outputport;

import com.smallchat.backend.room.domain.model.Room;
import com.smallchat.backend.room.domain.model.vo.ChatBasic;
import com.smallchat.backend.room.domain.model.vo.ChatModel;

import java.util.List;
import java.util.UUID;

public interface ChatOutputPort {
    void save(ChatModel chatModel);

    List<ChatModel> getChatModelList(UUID roomID);

    List<ChatBasic> getLastChatInfo(List<Room> roomList);

}
