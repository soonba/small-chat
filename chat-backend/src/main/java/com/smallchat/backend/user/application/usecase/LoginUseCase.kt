package com.smallchat.backend.user.application.usecase

import com.smallchat.backend.global.domain.auth.JwtProvider
import com.smallchat.backend.global.domain.auth.Tokens
import com.smallchat.backend.global.domain.auth.UnauthorizedException
import com.smallchat.backend.user.domain.interfaces.RefreshTokenRepository
import com.smallchat.backend.user.domain.interfaces.UserRepository
import com.smallchat.backend.user.domain.model.RefreshToken
import com.smallchat.backend.user.infrastructure.BcryptPasswordEncoder
import com.smallchat.backend.user.interfaces.web.dto.LoginDto
import org.springframework.stereotype.Service

@Service
class LoginUseCase(
    private val userRepository: UserRepository,
    private val refreshTokenRepository: RefreshTokenRepository,
    private val jwtProvider: JwtProvider,
    private val passwordEncoder: BcryptPasswordEncoder
) {
    fun execute(request: LoginDto.Request): LoginDto.Response {
        val (id, password) = request
        val user = userRepository.findByLoginId(id) ?: throw UnauthorizedException("invalid credentials")
        if (!user.password.verifying(password, passwordEncoder)) {
            throw UnauthorizedException("invalid credentials")
        }
        val tokens: Tokens = jwtProvider.createTokens(user.userIdOrThrow, user.nickname)
        refreshTokenRepository.save(RefreshToken(user.userIdOrThrow, tokens.refreshToken))
        return LoginDto.Response(tokens)
    }
}
