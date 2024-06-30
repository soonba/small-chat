package com.smallchat.backend.user.framework.jpa_adapter;

import com.smallchat.backend.domain.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<Token, Long> {
}
