package com.smallchat.backend.user.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_refresh")
public class RefreshToken {
    @Id
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "value", nullable = false)
    private String value;

    public void verifying(String rt) {
        if (!this.value.equals(rt)) {
            throw new RuntimeException("토큰 불일치");
        }
    }
}
