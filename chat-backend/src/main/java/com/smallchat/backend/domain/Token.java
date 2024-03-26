package com.smallchat.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "tb_token")
public class Token {
    @Id
    @Column(name = "auth_id", nullable = false)
    private UUID authId;

    @Column(name = "refresh_token", nullable = false)
    private String refreshToken;

    public Token(UUID authId, String refreshToken) {
        this.authId = authId;
        this.refreshToken = refreshToken;
    }

    protected Token() {
    }

    public void verifying(String rt) {
        if (!this.refreshToken.equals(rt)) {
            throw new RuntimeException("토큰 불일치");
        }
        ;
    }
}
