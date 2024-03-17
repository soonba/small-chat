package com.smallchat.auth.service;

public interface TokenService {
    void saveRefreshToken(String rt);

    boolean existsRefreshToken(String rt);

}
