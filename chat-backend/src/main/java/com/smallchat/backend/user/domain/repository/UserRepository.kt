package com.smallchat.backend.user.domain.repository

import com.smallchat.backend.user.domain.model.User

interface UserRepository {
    fun save(user: User): User
}