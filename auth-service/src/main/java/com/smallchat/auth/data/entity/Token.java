package com.smallchat.auth.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "token")
public class Token {
    @Id
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "refresh_token", nullable = false)
    private String refreshToken;

    public Token(UUID id, String refreshToken) {
        this.id = id;
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
