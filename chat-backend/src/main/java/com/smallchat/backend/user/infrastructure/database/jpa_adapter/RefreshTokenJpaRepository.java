package com.smallchat.backend.user.infrastructure.database.jpa_adapter;

import com.smallchat.backend.user.domain.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenJpaRepository extends JpaRepository<RefreshToken, String> {
}
