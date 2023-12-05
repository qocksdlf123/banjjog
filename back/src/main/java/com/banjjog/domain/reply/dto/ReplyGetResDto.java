package com.banjjog.domain.reply.dto;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Builder
public class ReplyGetResDto {

    Integer userId;

    Integer replyId;

    Integer day;

    String myReply;

    String predictedReply;

    String text;
}
