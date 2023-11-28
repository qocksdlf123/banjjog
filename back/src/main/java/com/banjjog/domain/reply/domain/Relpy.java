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
public class Relpy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer replyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    Users users;

    @Column(name = "day")
    Integer day;

    @Column(name = "my_reply")
    String myReply;

    @Column(name = "predicted_reply")
    String predictedReply;

    @Column(name = "impression")
    String impression;

}
