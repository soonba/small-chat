package com.smallchat.backend.user.application.inputport;

import com.smallchat.backend.global.utils.AuthenticatedUser;

public interface AuthInputPort {
    void logout(AuthenticatedUser request);
}
