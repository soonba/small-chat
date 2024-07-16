package com.smallchat.backend.user.application.usecase;

import java.util.UUID;

public interface UserJoinRoomUseCase {

    void joinRoom(UUID userId, UUID roomId);
}
