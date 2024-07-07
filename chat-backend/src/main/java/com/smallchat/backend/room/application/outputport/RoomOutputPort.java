package com.smallchat.backend.room.application.outputport;

import com.smallchat.backend.room.domain.model.Room;

import java.util.List;
import java.util.UUID;

public interface RoomOutputPort {
    void save(Room room);

    Room load(UUID roomId);

    List<Room> findByIds(List<UUID> roomIDs);
}
