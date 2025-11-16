package com.smallchat.backend.user.domain.interfaces

import com.smallchat.backend.user.domain.model.User

interface UserRepository {
    fun save(user: User): User
    fun findByLoginIdOrThrow(id: String): User
}