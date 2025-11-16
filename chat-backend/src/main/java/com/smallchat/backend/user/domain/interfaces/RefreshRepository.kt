package com.smallchat.backend.user.domain.interfaces

import com.smallchat.backend.user.domain.model.RefreshToken

interface RefreshRepository {
    fun save(userId: String, value: String): Unit
    fun findByIdOrElseThrow(userId: String): RefreshToken
}