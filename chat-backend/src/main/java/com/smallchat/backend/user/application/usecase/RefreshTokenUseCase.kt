package com.smallchat.backend.user.application.usecase

import com.smallchat.backend.global.utils.AuthenticatedUser
import com.smallchat.backend.global.utils.JwtProvider
import com.smallchat.backend.global.utils.TokenType
import com.smallchat.backend.user.domain.interfaces.RefreshRepository
import com.smallchat.backend.user.interfaces.web.dto.RefreshDto
import org.springframework.stereotype.Service

@Service
class RefreshTokenUseCase(
    val refreshRepository: RefreshRepository,
    val jwtProvider: JwtProvider
) {
    fun execute(request: RefreshDto.Request): RefreshDto.Response {
        val refreshToken = request.refreshToken
        val parseToken: AuthenticatedUser = jwtProvider.parseToken(refreshToken)
        val (id, nickname, tokenType) = parseToken
        if (tokenType != TokenType.REFRESH_TOKEN) {
            throw RuntimeException("refresh token required")
        }
        val tokenEntity = refreshRepository.findByIdOrElseThrow(id)
        tokenEntity.verifying(refreshToken)

        val tokens = jwtProvider.createTokens(id, nickname)
        refreshRepository.save(id, tokens.refreshToken)

        return RefreshDto.Response(tokens)
    }
}