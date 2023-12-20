package com.banjjog.domain.reply.service;

import com.banjjog.domain.reply.dao.ReplyRepository;
import com.banjjog.domain.reply.domain.Reply;
import com.banjjog.domain.reply.dto.*;
import com.banjjog.domain.user.dao.UserRepository;
import com.banjjog.domain.user.domain.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ReplyServiceImpl implements ReplyService{

    private final ReplyRepository replyRepository;

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<ReplyGetResDto> getReply(Integer replyId) {
        Reply reply = replyRepository.getById(replyId);

        return ResponseEntity.ok(
            ReplyGetResDto.builder()
                    .userId(reply.getUsers().getUserId())
                    .replyId(reply.getReplyId())
                    .day(reply.getDay())
                    .myReply(reply.getMyReply())
                    .predictedReply(reply.getPredictedReply())
                    .text(reply.getText())
                    .build()
        );
    }

    @Override
    public ResponseEntity<ReplyGetByUserIdResDto> getReplyByUserId(ReplyGetByUserIdReqDto dto) {
        Reply reply = replyRepository.getReplyByUserIdAndDay(dto.getUserId(), dto.getDay());
        if(reply == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"reply 없음");
        }
        log.info("reply : {}",reply);
        return ResponseEntity.ok(ReplyGetByUserIdResDto
                .builder()
                        .replyId(reply.getReplyId())
                        .userId(reply.getUsers().getUserId())
                        .day(reply.getDay())
                        .myReply(reply.getMyReply())
                        .predictedReply(reply.getPredictedReply())
                        .text(reply.getText())
                .build());
    }

    @Override
    public ResponseEntity<ReplyCreateResDto> createReply(ReplyCreateReqDto dto) {
        Users users = userRepository.getById(dto.getUserId());
        Reply reply = Reply.builder()
                .users(users)
                .day(dto.getDay())
                .myReply(dto.getMyReply())
                .predictedReply(dto.getPredictedReply())
                .text("")
                .build();
        replyRepository.save(reply);

        return ResponseEntity.ok(ReplyCreateResDto.builder()
                        .userId(reply.getUsers().getUserId())
                .replyId(reply.getReplyId())
                .day(reply.getDay())
                .myReply(reply.getMyReply())
                .predictedReply(reply.getPredictedReply())
                .build());
    }

    @Override
    @Transactional
    public ResponseEntity<ReplyUpdateResDto> updateReply(ReplyUpdateReqDto dto) {
        Reply reply = replyRepository.getById(dto.getReplyId());
        reply.updateTest(dto.getText());

        return ResponseEntity.ok(
                ReplyUpdateResDto.builder()
                        .text(reply.getText())
                        .build()
        );
    }

    @Override
    public ResponseEntity<ReplyUpdateDateResDto> updateDateReply(ReplyUpdateDateReqDto dto) {
        Reply reply = replyRepository.getReplyByUserIdAndDay(dto.getUserId(),dto.getDay());
        if(dto.getType()==1){
            reply.updateDate1(dto.getTime());
            return ResponseEntity.ok(
                    ReplyUpdateDateResDto.builder()
                            .type(dto.getType())
                            .time(reply.getStartAnswer())
                            .build()
            );
        } else if (dto.getType()==2) {
            reply.updateDate2(dto.getTime());
            return ResponseEntity.ok(
                    ReplyUpdateDateResDto.builder()
                            .type(dto.getType())
                            .time(reply.getEndAnswer())
                            .build()
            );
        } else if (dto.getType()==3) {
            reply.updateDate3(dto.getTime());
            return ResponseEntity.ok(
                    ReplyUpdateDateResDto.builder()
                            .type(dto.getType())
                            .time(reply.getClickURL1())
                            .build()
            );
        }
        {
            reply.updateDate4(dto.getTime());
            return ResponseEntity.ok(
                    ReplyUpdateDateResDto.builder()
                            .type(dto.getType())
                            .time(reply.getClickURL2())
                            .build()
            );
        }
    }

    @Override
    public ResponseEntity<List<ReplyGetTextResDto>> getTexts(Integer userId) {
        List<Reply> textsByUserId = replyRepository.getTextByUserId(userId);
        return ResponseEntity.ok(textsByUserId
                .stream()
                .map(reply -> ReplyGetTextResDto
                        .builder()
                        .day(reply.getDay())
                        .text(reply.getText())
                        .build() ).collect(Collectors.toList()));
    }
}
