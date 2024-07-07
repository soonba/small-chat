package com.smallchat.backend.room.application.usecase;

import java.util.UUID;

public interface JoinRoomUseCase {
    void join(UUID userId, UUID roomId);
}
