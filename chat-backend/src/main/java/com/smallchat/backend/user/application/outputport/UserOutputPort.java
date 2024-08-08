package com.smallchat.backend.user.application.outputport;

import com.smallchat.backend.user.domain.model.User;

public interface UserOutputPort {

    User loadUser(String userId);

    User loadUserById(String loginId);

    User createUser(User user);

    User saveUser(User user);

    void saveRefreshToken(String id, String rt);

    void validateRefreshToken(String id, String rt);

    boolean isExistID(String loginId);

    void deleteRefreshToken(String userId);
}
