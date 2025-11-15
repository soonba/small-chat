package com.smallchat.backend.user.domain.repository

interface AuthRepository {
    fun saveRefresh(userId: String, value: String)
}