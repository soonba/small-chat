package com.smallchat.backend.persistance;

import com.smallchat.backend.domain.UserRoom;
import com.smallchat.backend.room.domain.model.Room;
import com.smallchat.backend.user.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserRoomRepository extends JpaRepository<UserRoom, UUID> {

    List<UserRoom> findUserRoomByUser(User user);

    List<UserRoom> findUserRoomByRoom(Room user);

    boolean existsByUserAndRoom(User user, Room room);
}
