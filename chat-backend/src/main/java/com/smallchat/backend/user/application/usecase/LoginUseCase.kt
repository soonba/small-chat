package com.smallchat.backend.user.application.usecase

import com.smallchat.backend.global.utils.JwtProvider
import com.smallchat.backend.global.utils.TokensKt
import com.smallchat.backend.user.domain.interfaces.RefreshRepository
import com.smallchat.backend.user.domain.interfaces.UserRepository
import com.smallchat.backend.user.domain.model.User
import com.smallchat.backend.user.infrastructure.BcryptPasswordEncoder
import com.smallchat.backend.user.interfaces.web.dto.LoginDto
import org.springframework.stereotype.Service

@Service
class LoginUseCase(
    private val userRepository: UserRepository,
    private val refreshRepository: RefreshRepository,
    private val jwtProvider: JwtProvider,
    private val passwordEncoder: BcryptPasswordEncoder
) {
    fun execute(request: LoginDto.Request): LoginDto.Response {
        val (id, password) = request
        val user: User = userRepository.findByLoginIdOrThrow(id)
        user.password.verifying(password, passwordEncoder)
        val tokens: TokensKt = jwtProvider.createTokens(user.userIdOrThrow, user.nickname)
        refreshRepository.save(user.userIdOrThrow, tokens.refreshToken)
        return LoginDto.Response(tokens)
    }
}