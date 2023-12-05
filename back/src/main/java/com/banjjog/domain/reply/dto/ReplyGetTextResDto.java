package com.banjjog.domain.reply.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ReplyGetTextResDto {



    Integer day;

    String text;

}
