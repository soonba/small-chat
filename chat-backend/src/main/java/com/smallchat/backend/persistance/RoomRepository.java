package com.smallchat.backend.persistance;

import com.smallchat.backend.room.domain.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {

    List<Room> findByRoomIdIn(List<UUID> roomIds);
}
