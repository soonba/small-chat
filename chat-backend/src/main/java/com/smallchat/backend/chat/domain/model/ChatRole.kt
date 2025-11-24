package com.smallchat.backend.chat.domain.model

enum class ChatRole {
    HOST,
    GUEST;

    companion object {
        fun from(value: String): ChatRole =
            entries.firstOrNull { it.name.equals(value, ignoreCase = true) }
                ?: throw NoSuchElementException("Invalid ChatRole: $value")
    }
}
