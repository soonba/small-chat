package com.smallchat.backend.user.application.outputport;

import java.util.UUID;

public interface RefreshTokenOutputPort {

    void saveRefreshToken(UUID id, String rt);

    void validateRefreshToken(UUID id, String rt);
}
