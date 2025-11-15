package com.smallchat.backend.user.domain.interfaces

interface PasswordEncoder {
    fun encode(raw: String): String
    fun matches(raw: String, encoded: String): Boolean
}
