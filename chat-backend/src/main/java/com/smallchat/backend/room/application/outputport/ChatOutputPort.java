package com.smallchat.backend.room.application.outputport;

import com.smallchat.backend.room.domain.model.vo.ChatModel;

import java.util.List;
import java.util.UUID;

public interface ChatOutputPort {
    void save(ChatModel chatModel);

    List<ChatModel> getChatModelList(UUID roomID);
}
