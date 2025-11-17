package com.smallchat.backend.user.infrastructure.database.impl

import com.smallchat.backend.user.domain.interfaces.UserRepository
import com.smallchat.backend.user.domain.model.User
import com.smallchat.backend.user.infrastructure.database.jpa_adapter.UserJpaRepository
import org.springframework.stereotype.Repository

@Repository
class UserRepositoryImpl(private val userJpaRepository: UserJpaRepository) : UserRepository {
    override fun save(user: User): User {
        return userJpaRepository.save(user)
    }

    override fun findByLoginIdOrThrow(loginId: String): User {
        return userJpaRepository.findByLoginId(loginId).orElseThrow { RuntimeException("not found user") }
    }

    override fun isExistByLoginId(loginId: String): Boolean {
        return userJpaRepository.existsByLoginId(loginId)
    }


}