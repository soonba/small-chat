package com.smallchat.backend.chat.domain.model.vo

enum class ChatRole(val value: String) {
    HOST("host"),
    GUEST("guest");

    companion object {
        fun fromValue(value: String): ChatRole =
            entries.firstOrNull { it.value == value }
                ?: throw IllegalArgumentException("Invalid ChatRole: $value")
    }
}
