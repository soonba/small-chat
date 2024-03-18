package com.smallchat.auth.data.jwt;

import java.util.UUID;

//refresh Token payload
public class JwtPayload {
    private final UUID id;

    public JwtPayload(UUID id) {
        this.id = id;
    }
}
