package com.smallchat.backend.application;

import com.smallchat.backend.data.jwt.JwtPayload;
import com.smallchat.backend.data.jwt.Tokens;
import com.smallchat.backend.domain.Auth;

import java.util.UUID;

public interface TokenService {
    void saveRefreshToken(UUID id, String rt);

    void validateRefreshToken(UUID id, String rt);

    Tokens generateTokensByAuth(Auth auth);

    JwtPayload compile(String token);
}
