package com.banjjog.domain.reply.service;

import com.banjjog.domain.reply.dao.ReplyRepository;
import com.banjjog.domain.reply.domain.Reply;
import com.banjjog.domain.reply.dto.*;
import com.banjjog.domain.user.dao.UserRepository;
import com.banjjog.domain.user.domain.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
