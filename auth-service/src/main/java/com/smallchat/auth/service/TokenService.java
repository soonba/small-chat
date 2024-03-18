package com.smallchat.auth.service;

import java.util.UUID;

public interface TokenService {
    void saveRefreshToken(UUID id, String rt);

    void validateRefreshToken(UUID id, String rt);

}
