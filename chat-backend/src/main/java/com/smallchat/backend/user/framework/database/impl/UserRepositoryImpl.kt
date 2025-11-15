package com.smallchat.backend.user.framework.database.impl

import com.smallchat.backend.user.domain.model.User
import com.smallchat.backend.user.domain.repository.UserRepository
import com.smallchat.backend.user.framework.database.jpa_adapter.UserJpaRepository
import org.springframework.stereotype.Repository

@Repository
class UserRepositoryImpl(private val userJpaRepository: UserJpaRepository) : UserRepository {
    override fun save(user: User): User {
        return userJpaRepository.save(user)
    }
}