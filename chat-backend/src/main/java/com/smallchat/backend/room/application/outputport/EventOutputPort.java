package com.smallchat.backend.room.application.outputport;

import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.UUID;

public interface EventOutputPort {
    void occurCreateRoomEvent(UUID roomId) throws JsonProcessingException;
}
