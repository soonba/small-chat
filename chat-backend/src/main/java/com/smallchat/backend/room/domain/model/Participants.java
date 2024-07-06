package com.smallchat.backend.room.domain.model;

import com.smallchat.backend.room.domain.model.vo.Participant;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Participants {

    @ElementCollection
    List<Participant> participants;
}
