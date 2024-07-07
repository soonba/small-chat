package com.smallchat.backend.user.domain.model;

import com.smallchat.backend.user.domain.model.vo.ParticipatingRoom;
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
    private List<ParticipatingRoom> participatingRooms = new ArrayList<>();

    public static ParticipatingRooms init() {
        return new ParticipatingRooms();
    }

    public ParticipatingRooms joinRoom(ParticipatingRoom participatingRoom) {
        participatingRooms.add(participatingRoom);
        return this;
    }

    public ParticipatingRooms leaveRoom(ParticipatingRoom participatingRoom) {
        participatingRooms.remove(participatingRoom);
        return this;
    }

    public List<UUID> toRoomIdList() {
        return participatingRooms.stream().map(ParticipatingRoom::getRoomId).toList();
    }

    public void print() {
        participatingRooms.stream().forEach(el -> System.out.println(el.getRoomId()));
    }
}

