package com.smallchat.backend.user.domain.model.vo

import com.smallchat.backend.user.domain.interfaces.PasswordEncoder
import jakarta.persistence.Embeddable


@Embeddable
class Password(private val presentPassword: String = "", private val pastPassword: String = "") {
    fun verifying(raw: String, encoder: PasswordEncoder): Boolean {
        return encoder.matches(raw, presentPassword)
    }
}
