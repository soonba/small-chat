package com.smallchat.backend.user.infrastructure.database.impl

import com.smallchat.backend.user.application.port.UserQueryPort
import com.smallchat.backend.user.infrastructure.database.jpa_adapter.UserJpaRepository
import org.springframework.stereotype.Repository

@Repository
class UserQueryAdapter(private val userJpaRepository: UserJpaRepository) : UserQueryPort {

}