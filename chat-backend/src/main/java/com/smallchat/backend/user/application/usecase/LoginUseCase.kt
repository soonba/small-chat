package com.smallchat.backend.user.application.usecase

import com.smallchat.backend.global.utils.JwtProvider
import com.smallchat.backend.global.utils.Tokens
import com.smallchat.backend.user.domain.interfaces.AuthRepository
import com.smallchat.backend.user.domain.interfaces.UserRepository
import com.smallchat.backend.user.domain.model.User
import com.smallchat.backend.user.infrastructure.BcryptPasswordEncoder
import com.smallchat.backend.user.interfaces.web.dto.LoginDto
import org.springframework.stereotype.Service

@Service
class LoginUseCase(
    private val userRepository: UserRepository,
    private val authRepository: AuthRepository,
    private val jwtProvider: JwtProvider,
    private val passwordEncoder: BcryptPasswordEncoder
) {
    fun execute(request: LoginDto.Request): LoginDto.Response {
        val (id, password) = request
        val user: User = userRepository.findByLoginIdOrThrow(id)
        user.password.verifying(password, passwordEncoder)
        val tokens: Tokens = jwtProvider.createTokens(user.userIdOrThrow, user.nickname)
        authRepository.saveRefresh(user.userIdOrThrow, tokens.refreshToken)
        return LoginDto.Response(tokens)
    }
}