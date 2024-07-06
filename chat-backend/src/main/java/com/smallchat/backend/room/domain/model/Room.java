package com.smallchat.backend.room.domain.model;

import com.smallchat.backend.global.framework.jpa.BaseTime;
import com.smallchat.backend.room.domain.model.vo.Owner;
import com.smallchat.backend.room.domain.model.vo.RoomName;
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
}


