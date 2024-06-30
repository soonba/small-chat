package com.smallchat.backend.user.domain.model.vo;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Random;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Nickname {
    private String nickname;

    public static Nickname sample() {
        Random random = new Random();
        return new Nickname("사용자" + random.nextInt(900));
    }
}
