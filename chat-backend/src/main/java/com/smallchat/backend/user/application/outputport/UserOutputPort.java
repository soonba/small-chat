package com.smallchat.backend.user.application.outputport;

import com.smallchat.backend.user.domain.model.ParticipatingRooms;
import com.smallchat.backend.user.domain.model.User;

import java.util.UUID;

public interface UserOutputPort {

    User loadUser(UUID userId);

    User loadUserById(String loginId);

    User createUser(User user);

    User saveUser(User user);

    void saveRefreshToken(UUID id, String rt);

    void validateRefreshToken(UUID id, String rt);

    boolean isExistID(String loginId);

    ParticipatingRooms getParticipatingRooms(UUID userId);
}
