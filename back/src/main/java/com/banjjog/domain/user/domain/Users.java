package com.banjjog.domain.user.domain;


import com.banjjog.domain.reply.domain.Relpy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    Integer userId;

    @OneToMany(mappedBy = "user")
    List<Relpy> relpies = new ArrayList<>();

    @Column(name = "my_name")
    String myName;

    @Column(name = "your_name")
    String yourName;

    @Column(name = "current_day")
    Integer currentDay;
}
