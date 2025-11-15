package com.smallchat.backend.user.framework.database.impl

import com.smallchat.backend.user.domain.model.RefreshToken
import com.smallchat.backend.user.domain.repository.AuthRepository
import com.smallchat.backend.user.framework.database.jpa_adapter.RefreshTokenRepository
import org.springframework.stereotype.Repository

@Repository
class AuthRepositoryImpl(private val refreshTokenRepository: RefreshTokenRepository) : AuthRepository {
    override fun saveRefresh(userId: String, value: String) {
        refreshTokenRepository.save(RefreshToken(userId, value))
    }
}