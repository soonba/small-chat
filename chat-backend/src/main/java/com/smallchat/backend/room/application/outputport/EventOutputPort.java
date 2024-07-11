package com.smallchat.backend.room.application.outputport;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.smallchat.backend.room.domain.event.RoomJoined;

public interface EventOutputPort {
    void occurCreateRoomEvent(RoomJoined roomJoined) throws JsonProcessingException;
}
