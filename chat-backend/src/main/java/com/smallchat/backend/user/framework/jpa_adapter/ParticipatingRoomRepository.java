package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.domain.model.ParticipatingRoom;
import com.smallchat.backend.user.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ParticipatingRoomRepository extends JpaRepository<ParticipatingRoom, UUID> {

    List<ParticipatingRoom> findByUser(User user);
}
