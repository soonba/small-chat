package com.smallchat.backend.room.domain.model;

import com.smallchat.backend.room.domain.model.vo.Participant;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Participants {

    @ElementCollection
    private List<Participant> participants = new ArrayList<>();

    public static Participants init() {
        return new Participants();
    }


    public Participants joinParticipant(Participant participant) {
        participants.add(participant);
        return this;
    }

    public Participants leaveParticipant(Participant participant) {
        participants.remove(participant);
        return this;
    }
}
