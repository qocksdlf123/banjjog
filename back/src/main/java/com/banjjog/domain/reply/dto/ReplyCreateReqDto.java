package com.banjjog.domain.reply.dto;

import lombok.Data;

@Data
public class ReplyCreateReqDto {
    Integer userId;

    Integer day;

    String myReply;

    String predictedReply;
}
