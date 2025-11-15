package com.smallchat.backend.user.application.usecase

import com.smallchat.backend.global.utils.JwtProvider
import com.smallchat.backend.user.domain.model.User
import com.smallchat.backend.user.domain.model.vo.Password
import com.smallchat.backend.user.domain.repository.AuthRepository
import com.smallchat.backend.user.domain.repository.UserRepository
import com.smallchat.backend.user.framework.web.dto.CreateUserDto
import jakarta.transaction.Transactional
import lombok.RequiredArgsConstructor
import org.mindrot.jbcrypt.BCrypt
import org.springframework.stereotype.Service

@Service
@RequiredArgsConstructor
class CreateUserUseCase(
    private val jwtProvider: JwtProvider,
    private val userRepository: UserRepository,
    private val authRepository: AuthRepository
) {
    @Transactional
    fun createUser(req: CreateUserDto.Request): CreateUserDto.Response {
        val (id, nickname, password) = req
        val hashPwStr = BCrypt.hashpw(password, BCrypt.gensalt(10))
        val hashPw = Password(hashPwStr, "")
        val savedUser = userRepository.save(User.of(nickname, id, hashPw))
        val tokens = jwtProvider.createTokens(savedUser.userId, savedUser.nickname)
        authRepository.saveRefresh(savedUser.userId, tokens.refreshToken)
        return CreateUserDto.Response(tokens)
    }
}
