package com.smallchat.backend.user.domain.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ParticipatingRooms {

    @ElementCollection
    private List<UUID> participatingRooms = new ArrayList<>();

    public static ParticipatingRooms init() {
        return new ParticipatingRooms();
    }

    public ParticipatingRooms joinRoom(UUID roomId) {
        participatingRooms.add(roomId);
        return this;
    }

    public ParticipatingRooms leaveRoom(UUID participatingRoom) {
        participatingRooms.remove(participatingRoom);
        return this;
    }

    public List<UUID> getRoomList() {
        return participatingRooms;
    }
}

