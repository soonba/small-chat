package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.application.outputport.RefreshTokenOutputPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class RefreshRefreshTokenOutputAdapter implements RefreshTokenOutputPort {

    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void saveRefreshToken(UUID id, String rt) {

    }

    @Override
    public void validateRefreshToken(UUID id, String rt) {

    }
}
