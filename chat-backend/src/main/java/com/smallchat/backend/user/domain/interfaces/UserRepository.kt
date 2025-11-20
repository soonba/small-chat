package com.smallchat.backend.user.domain.interfaces

import com.smallchat.backend.user.domain.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param

interface UserRepository : JpaRepository<User, String> {
    fun findByLoginId(@Param("loginId") loginId: String): User?
    fun existsByLoginId(@Param("loginId") loginId: String): Boolean
}
