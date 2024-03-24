package com.smallchat.backend.persistance;

import com.smallchat.backend.domain.Room;
import com.smallchat.backend.domain.User;
import com.smallchat.backend.domain.UserRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserRoomRepository extends JpaRepository<UserRoom, UUID> {

    List<UserRoom> findUserRoomByUser(User user);

    List<UserRoom> findUserRoomByRoom(Room user);
}
