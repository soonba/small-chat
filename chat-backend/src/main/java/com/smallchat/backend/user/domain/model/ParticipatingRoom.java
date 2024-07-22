package com.smallchat.backend.user.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ParticipatingRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "participating_room_id", nullable = false)
    private UUID participatingRoomId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "room_id", nullable = false)
    private UUID roomId;

    public ParticipatingRoom(User user, UUID roomId) {
        this.user = user;
        this.roomId = roomId;
    }
}

