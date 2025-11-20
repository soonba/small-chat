package com.smallchat.backend.user.domain.interfaces

import com.smallchat.backend.user.domain.model.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, String> {
    fun findByLoginId(loginId: String): User?
    fun isExistsByLoginId(loginId: String?): Boolean
}
