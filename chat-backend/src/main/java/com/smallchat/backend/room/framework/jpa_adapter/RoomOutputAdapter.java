package com.smallchat.backend.room.framework.jpa_adapter;

import com.smallchat.backend.persistance.RoomRepository;
import com.smallchat.backend.room.application.outputport.RoomOutputPort;
import com.smallchat.backend.room.domain.model.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class RoomOutputAdapter implements RoomOutputPort {
    private final RoomRepository roomRepository;


    @Override
    public void save(Room room) {
        roomRepository.save(room);
    }

    @Override
    public Room load(UUID roomId) {
        return null;
    }

    @Override
    public List<Room> findByIds(List<UUID> roomIDs) {
        return roomRepository.findByRoomIdIn(roomIDs);
    }
}
