package com.smallchat.backend.room.domain.model;

import com.smallchat.backend.global.framework.jpa.BaseTime;
import com.smallchat.backend.room.domain.model.vo.Owner;
import com.smallchat.backend.room.domain.model.vo.Participant;
import com.smallchat.backend.room.framework.web.dto.RoomBasicInfo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@Table(name = "tb_room")
@Entity
public class Room extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "room_id", nullable = false)
    private UUID roomId;

    @Embedded
    private Owner owner;

    @Column(name = "name", nullable = false)
    private String name;

    @Embedded
    private Participants participants;

    public Room(Owner owner, String name, Participants participants) {
        this.owner = owner;
        this.name = name;
        this.participants = participants;
    }

    public static Room createRoom(Owner owner, String name) {
        return new Room(owner, name, Participants.init());
    }

    public Room addParticipant(UUID userId) {
        participants.addParticipant(Participant.of(userId));
        return this;
    }

    public RoomBasicInfo toRoomBasicInfo() {
        return new RoomBasicInfo(this.getRoomId(), getName());
    }
}


