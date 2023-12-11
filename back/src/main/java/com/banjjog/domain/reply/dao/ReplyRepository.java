package com.banjjog.domain.reply.dao;

import com.banjjog.domain.reply.domain.Reply;
import com.banjjog.domain.reply.dto.ReplyGetTextResDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Integer> {

    @Query("select r from Reply  r where r.users.userId = :userId" )
    List<Reply> getTextByUserId(@Param("userId") Integer userId);


    @Query("select r from Reply r where r.users.userId = :userId and r.day = :day")
    Reply getReplyByUserIdAndDay(@Param("userId") Integer userId, @Param("day") Integer day);
}
