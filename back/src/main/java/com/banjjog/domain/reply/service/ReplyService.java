package com.banjjog.domain.reply.service;

import com.banjjog.domain.reply.dto.*;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface ReplyService {
    ResponseEntity<ReplyGetResDto> getReply(Integer replyId);
    ResponseEntity<ReplyCreateResDto> createReply(ReplyCreateReqDto dto);

    ResponseEntity<ReplyUpdateResDto> updateReply(ReplyUpdateReqDto dto);

    ResponseEntity<List<ReplyGetTextResDto>> getTexts(Integer userId);
}
