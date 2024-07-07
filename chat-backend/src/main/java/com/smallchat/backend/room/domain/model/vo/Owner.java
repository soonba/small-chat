package com.smallchat.backend.room.domain.model.vo;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Owner {
    private UUID userId;

    public static Owner of(UUID userId) {
        return new Owner(userId);
    }
}
