package com.banjjog.domain.reply.domain;

import com.banjjog.domain.user.domain.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @Column(name = "start_answer")
    LocalDateTime startAnswer;

    @Column(name = "end_answer")
    LocalDateTime endAnswer;

    @Column(name = "click_URL1")
    LocalDateTime clickURL1;

    @Column(name = "click_URL2")
    LocalDateTime clickURL2;

    public void updateTest(String text){
        this.text = text;
    }

    public void updateDate1(LocalDateTime time){
        this.startAnswer = time;
    }
    public void updateDate2(LocalDateTime time){
        this.endAnswer = time;
    }
    public void updateDate3(LocalDateTime time){
        this.clickURL1 = time;
    }
    public void updateDate4(LocalDateTime time){this.clickURL2 = time;}

}
