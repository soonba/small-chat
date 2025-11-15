package com.smallchat.backend.user.infrastructure

import com.smallchat.backend.user.domain.interfaces.PasswordEncoder
import org.mindrot.jbcrypt.BCrypt
import org.springframework.stereotype.Component

@Component
class BcryptPasswordEncoder : PasswordEncoder {
    override fun encode(raw: String): String =
        BCrypt.hashpw(raw, BCrypt.gensalt(10))

    override fun matches(raw: String, encoded: String): Boolean =
        BCrypt.checkpw(raw, encoded)
}