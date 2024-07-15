package com.smallchat.backend.room.domain.model;

import com.smallchat.backend.global.framework.jpa.BaseTime;
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

    @Column(name = "owner_id", nullable = false)
    private UUID ownerId;

    @Column(name = "name", nullable = false)
    private String name;

    @Embedded
    private Participants participants;

    public Room(UUID ownerId, String name, Participants participants) {
        this.ownerId = ownerId;
        this.name = name;
        this.participants = participants;
    }

    public static Room createRoom(UUID ownerId, String name) {
        return new Room(ownerId, name, Participants.init());
    }

    public Room addParticipant(UUID userId) {
        participants.addParticipant(Participant.of(userId));
        return this;
    }

    public RoomBasicInfo toRoomBasicInfo() {
        return new RoomBasicInfo(this.getRoomId(), getName());
    }
}


