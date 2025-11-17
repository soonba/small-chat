package com.smallchat.backend.global.utils

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

/**
 * jws sign key가 필요한 메서드 노출
 * createTokens
 * parseFromBearer
 */
@Component
class JwtProvider(
    @param:Value("\${auth.key}")
    private val rawKey: ByteArray
) {

    private val key = Keys.hmacShaKeyFor(rawKey)
    private val parser = Jwts.parser().verifyWith(key).build()

    fun createTokens(id: String, nickname: String): Tokens {
        val at = buildToken(AuthenticatedUser(id, nickname, TokenType.ACCESS_TOKEN))
        val rt = buildToken(AuthenticatedUser(id, nickname, TokenType.REFRESH_TOKEN))
        return Tokens(at, rt)
    }

    private fun buildToken(payload: AuthenticatedUser): String {
        val (userId, nickname, tokenType) = payload
        return Jwts.builder()
            .claim("type", tokenType)
            .claim("userId", userId)
            .claim("nickname", nickname)
            .expiration(tokenType.expDate)
            .signWith(key)
            .compact()
    }

    fun parseFromBearer(authHeader: String): AuthenticatedUser {
        val accessToken = authHeader.substringAfter("Bearer ").trim()
        return parseToken(accessToken)
    }

    fun parseToken(token: String): AuthenticatedUser {
        try {
            val payload = parser
                .parseSignedClaims(token)
                .getPayload()
            val userId = payload["userId"] as String
            val nickname = payload["nickname"] as String
            val type = payload["type"] as String
            return AuthenticatedUser(userId, nickname, enumValueOf<TokenType>(type))
        } catch (error: Error) {
            throw RuntimeException("parse token failed")
        }
    }
}
