package com.smallchat.backend.chat.domain.model;

import com.smallchat.backend.chat.domain.model.vo.Participant;
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

    public static Participants init(String ownerId) {
        Participants participants1 = new Participants();
        participants1.participants.add(new Participant(ownerId));
        return participants1;
    }


    public Participants addParticipant(Participant participant) {
        participants.add(participant);
        return this;
    }

    public Participants removeParticipant(Participant participant) {
        participants.remove(participant);
        return this;
    }

    public boolean isEmpty() {
        return participants.isEmpty();
    }

    public boolean isFull() {
        return participants.size() >= 10;
    }
    
    public void validateUserId(String userId) {
        Participant target = new Participant(userId);
        if (participants.contains(target)) {
            throw new RuntimeException("이미 방에 존재하는 유저");
        }
    }
}
