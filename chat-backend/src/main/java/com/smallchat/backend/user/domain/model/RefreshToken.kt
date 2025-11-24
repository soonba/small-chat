package com.smallchat.backend.user.domain.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import lombok.NoArgsConstructor

@NoArgsConstructor
@Entity
@Table(name = "refresh_tokens")
class RefreshToken(
    @Id
    @Column(name = "user_id", nullable = false)
    private var userId: String,

    @Column(name = "value", nullable = false)
    private var value: String
) {
    fun verifying(rt: String) {
        if (this.value != rt) {
            throw RuntimeException("토큰 불일치")
        }
    }
}
