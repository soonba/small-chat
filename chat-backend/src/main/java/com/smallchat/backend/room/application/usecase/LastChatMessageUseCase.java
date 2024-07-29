package com.smallchat.backend.room.application.usecase;

import com.smallchat.backend.room.domain.model.vo.Message;

import java.util.List;
import java.util.UUID;

public interface LastChatMessageUseCase {
    List<Message> getLastMessageList(List<UUID> roomIdList);
}
