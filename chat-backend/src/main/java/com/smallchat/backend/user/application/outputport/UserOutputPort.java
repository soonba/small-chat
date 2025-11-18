package com.smallchat.backend.user.application.outputport;

import com.smallchat.backend.user.domain.model.User;

public interface UserOutputPort {
    User loadUser(String userId);

    User saveUser(User user);

    boolean isExistID(String loginId);
}
