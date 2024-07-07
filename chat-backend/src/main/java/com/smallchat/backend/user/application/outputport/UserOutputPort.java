package com.smallchat.backend.user.application.outputport;

import com.smallchat.backend.user.domain.model.ParticipatingRooms;
import com.smallchat.backend.user.domain.model.User;
import com.smallchat.backend.user.domain.model.vo.LoginId;

import java.util.UUID;

public interface UserOutputPort {

    User loadUser(UUID userId);

    User loadUserById(LoginId loginId);

    User saveUser(User user);

    void saveRefreshToken(UUID id, String rt);

    void validateRefreshToken(UUID id, String rt);

    boolean isExistID(LoginId loginId);

    ParticipatingRooms getParticipatingRooms(UUID userId);
}
