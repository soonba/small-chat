package com.smallchat.backend.room.application.usecase;

import com.smallchat.backend.room.domain.model.vo.Chat;

import java.util.List;
import java.util.UUID;

public interface LastChatMessageUseCase {
    List<Chat> getLastMessageListByRoomIdList(List<UUID> roomIdList);
}
