package com.smallchat.backend.user.application.usecase

import com.smallchat.backend.global.utils.AuthenticatedUser
import com.smallchat.backend.global.utils.JwtProvider
import com.smallchat.backend.global.utils.TokenType
import com.smallchat.backend.user.domain.interfaces.RefreshTokenRepository
import com.smallchat.backend.user.domain.model.RefreshToken
import com.smallchat.backend.user.interfaces.web.dto.RefreshDto
import jakarta.persistence.EntityNotFoundException
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
            throw RuntimeException("refresh token required")
        }
        val tokenEntity =
            refreshTokenRepository.findById(id).orElseThrow { throw EntityNotFoundException("찾을 수 없는 리프레쉬 토큰 엔티티") }
        tokenEntity.verifying(refreshToken)

        val tokens = jwtProvider.createTokens(id, nickname)
        refreshTokenRepository.save(RefreshToken(id, tokens.refreshToken))

        return RefreshDto.Response(tokens)
    }
}