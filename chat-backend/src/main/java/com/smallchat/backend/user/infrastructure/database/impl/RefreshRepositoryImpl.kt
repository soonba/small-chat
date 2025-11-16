package com.smallchat.backend.user.infrastructure.database.impl

import com.smallchat.backend.user.domain.interfaces.RefreshRepository
import com.smallchat.backend.user.domain.model.RefreshToken
import com.smallchat.backend.user.infrastructure.database.jpa_adapter.RefreshTokenJpaRepository
import org.springframework.stereotype.Repository

@Repository
class RefreshRepositoryImpl(private val refreshTokenJpaRepository: RefreshTokenJpaRepository) : RefreshRepository {
    override fun save(userId: String, value: String) {
        refreshTokenJpaRepository.save(RefreshToken(userId, value))
    }

    override fun findByIdOrElseThrow(userId: String): RefreshToken {
        return refreshTokenJpaRepository.findById(userId).orElseThrow { RuntimeException("refresh token not found") }
    }
}