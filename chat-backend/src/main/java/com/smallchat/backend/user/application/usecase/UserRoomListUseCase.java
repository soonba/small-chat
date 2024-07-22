package com.smallchat.backend.user.application.usecase;

import com.smallchat.backend.user.domain.model.ParticipatingRoom;

import java.util.List;
import java.util.UUID;

public interface UserRoomListUseCase {
    List<ParticipatingRoom> getUserJoinedRooms(UUID userId);
}
