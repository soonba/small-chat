package com.smallchat.backend.chat.domain.model.vo

enum class ChatRole {
    HOST,
    GUEST;

    companion object {
        fun from(value: String): ChatRole =
            entries.firstOrNull { it.name.equals(value, ignoreCase = true) }
                ?: throw NoSuchElementException("Invalid ChatRole: $value")
    }
}
