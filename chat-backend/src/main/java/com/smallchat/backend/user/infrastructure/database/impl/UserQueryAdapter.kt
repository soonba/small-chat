package com.smallchat.backend.user.infrastructure.database.impl

import com.smallchat.backend.user.application.port.UserQueryPort
import com.smallchat.backend.user.domain.interfaces.UserRepository
import org.springframework.stereotype.Repository

@Repository
class UserQueryAdapter(private val userRepository: UserRepository) : UserQueryPort {

}