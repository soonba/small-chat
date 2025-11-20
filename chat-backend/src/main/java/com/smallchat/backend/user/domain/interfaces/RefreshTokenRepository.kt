package com.smallchat.backend.user.domain.interfaces

import com.smallchat.backend.user.domain.model.RefreshToken
import org.springframework.data.jpa.repository.JpaRepository

interface RefreshTokenRepository : JpaRepository<RefreshToken, String>
