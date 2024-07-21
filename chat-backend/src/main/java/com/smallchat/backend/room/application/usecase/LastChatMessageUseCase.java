package com.smallchat.backend.room.application.usecase;

import com.smallchat.backend.room.domain.model.Room;
import com.smallchat.backend.room.domain.model.vo.ChatBasic;

import java.util.List;

public interface LastChatMessageUseCase {
    List<ChatBasic> addChatBasicInfo(List<Room> roomList);
}
