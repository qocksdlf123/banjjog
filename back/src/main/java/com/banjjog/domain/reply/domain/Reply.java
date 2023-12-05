package com.banjjog.domain.reply.domain;

import com.banjjog.domain.user.domain.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer replyId;


    @Column(name = "day")
    Integer day;

    @Column(name = "my_reply")
    String myReply;

    @Column(name = "predicted_reply")
    String predictedReply;

    @Column(name = "text")
    String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    Users users;

    public void updateTest(String text){
        this.text = text;
    }
}
