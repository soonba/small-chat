package com.smallchat.backend.user.application.usecase

import com.smallchat.backend.global.domain.auth.JwtProvider
import com.smallchat.backend.user.domain.interfaces.RefreshTokenRepository
import com.smallchat.backend.user.domain.interfaces.UserRepository
import com.smallchat.backend.user.domain.model.RefreshToken
import com.smallchat.backend.user.domain.model.User
import com.smallchat.backend.user.domain.model.vo.Password
import com.smallchat.backend.user.infrastructure.BcryptPasswordEncoder
import com.smallchat.backend.user.interfaces.web.dto.CreateUserDto
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class CreateUserUseCase(
    private val jwtProvider: JwtProvider,
    private val userRepository: UserRepository,
    private val refreshTokenRepository: RefreshTokenRepository,
    private val passwordEncoder: BcryptPasswordEncoder,
) {
    @Transactional
    fun execute(req: CreateUserDto.Request): CreateUserDto.Response {
        val (id, nickname, password) = req
        val hashPwStr = passwordEncoder.encode(password)
        val hashPw = Password(presentPassword = hashPwStr)
        val savedUser = userRepository.save(User(nickname = nickname, loginId = id, password = hashPw))
        val tokens = jwtProvider.createTokens(savedUser.userIdOrThrow, savedUser.nickname)
        refreshTokenRepository.save(RefreshToken(savedUser.userIdOrThrow, tokens.refreshToken))
        return CreateUserDto.Response(tokens)
    }
}
