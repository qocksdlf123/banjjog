package com.banjjog.domain.reply.service;

import com.banjjog.domain.reply.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


public interface ReplyService {
    ResponseEntity<ReplyGetResDto> getReply(Integer replyId);

    ResponseEntity<ReplyGetByUserIdResDto> getReplyByUserId(ReplyGetByUserIdReqDto dto);
    ResponseEntity<ReplyCreateResDto> createReply(ReplyCreateReqDto dto);

    ResponseEntity<ReplyUpdateResDto> updateReply(ReplyUpdateReqDto dto);
    ResponseEntity<ReplyUpdateDateResDto> updateDateReply(ReplyUpdateDateReqDto dto);
    ResponseEntity<List<ReplyGetTextResDto>> getTexts(Integer userId);
}
