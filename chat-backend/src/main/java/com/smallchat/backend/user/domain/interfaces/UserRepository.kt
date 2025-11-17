package com.smallchat.backend.user.domain.interfaces

import com.smallchat.backend.user.domain.model.User

interface UserRepository {
    fun save(user: User): User
    fun findByLoginIdOrThrow(loginId: String): User
    fun isExistByLoginId(loginId: String): Boolean
}