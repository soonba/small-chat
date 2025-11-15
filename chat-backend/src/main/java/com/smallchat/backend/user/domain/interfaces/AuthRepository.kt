package com.smallchat.backend.user.domain.interfaces

interface AuthRepository {
    fun saveRefresh(userId: String, value: String)
}