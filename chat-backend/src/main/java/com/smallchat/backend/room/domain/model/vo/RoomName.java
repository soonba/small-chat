package com.smallchat.backend.room.domain.model.vo;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Random;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class RoomName {

    private String name;

    public static RoomName sample(String roomName) {
        Random random = new Random();
        return new RoomName("방" + random.nextInt(900));
    }

    public static RoomName of(String name) {
        return new RoomName(name);
    }
}
