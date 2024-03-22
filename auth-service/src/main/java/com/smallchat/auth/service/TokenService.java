package com.smallchat.auth.service;

import com.smallchat.auth.data.entity.Auth;
import com.smallchat.auth.data.jwt.JwtPayload;
import com.smallchat.auth.data.jwt.Tokens;

import java.util.UUID;

public interface TokenService {
    void saveRefreshToken(UUID id, String rt);

    void validateRefreshToken(UUID id, String rt);

    Tokens generateTokensByAuth(Auth auth);

    JwtPayload compile(String token);
}
