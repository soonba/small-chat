package com.smallchat.backend.user.application.usecase

import com.smallchat.backend.global.domain.auth.AuthenticatedUser
import com.smallchat.backend.global.domain.auth.JwtProvider
import com.smallchat.backend.global.domain.auth.TokenType
import com.smallchat.backend.global.domain.auth.UnauthorizedException
import com.smallchat.backend.user.domain.interfaces.RefreshTokenRepository
import com.smallchat.backend.user.domain.model.RefreshToken
import com.smallchat.backend.user.interfaces.web.dto.RefreshDto
import org.springframework.stereotype.Service

@Service
class RefreshTokenUseCase(
    val refreshTokenRepository: RefreshTokenRepository,
    val jwtProvider: JwtProvider
) {
    fun execute(request: RefreshDto.Request): RefreshDto.Response {
        val refreshToken = request.refreshToken
        val parseToken: AuthenticatedUser = jwtProvider.parseToken(refreshToken)
        val (id, nickname, tokenType) = parseToken
        if (tokenType != TokenType.REFRESH_TOKEN) {
            throw UnauthorizedException("refresh token required")
        }
        val tokenEntity =
            refreshTokenRepository.findById(id).orElseThrow { UnauthorizedException("invalid refresh token") }
        tokenEntity.verifying(refreshToken)

        val tokens = jwtProvider.createTokens(id, nickname)
        refreshTokenRepository.save(RefreshToken(id, tokens.refreshToken))

        return RefreshDto.Response(tokens)
    }
}
