package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.user.domain.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
}
