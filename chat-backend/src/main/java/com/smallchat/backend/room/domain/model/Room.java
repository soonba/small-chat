package com.smallchat.backend.room.domain.model;

import com.smallchat.backend.global.framework.jpa.BaseTime;
import com.smallchat.backend.room.domain.model.vo.Owner;
import com.smallchat.backend.room.domain.model.vo.Participant;
import com.smallchat.backend.room.domain.model.vo.RoomName;
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

    @Embedded
    private RoomName roomName;

    @Embedded
    private Participants participants;

    public Room(Owner owner, RoomName roomName, Participants participants) {
        this.owner = owner;
        this.roomName = roomName;
        this.participants = participants;
    }

    public static Room createRoom(Owner owner, RoomName roomName) {
        return new Room(owner, roomName, Participants.init());
    }

    public Room addParticipant(UUID userId) {
        participants.joinParticipant(Participant.of(userId));
        return this;
    }

    public RoomBasicInfo toRoomBasicInfo() {
        return new RoomBasicInfo(this.getRoomId(), this.getRoomName().getName());
    }
}


