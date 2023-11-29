package com.banjjog.domain.reply.service;

import com.banjjog.domain.reply.dao.ReplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ReplyServiceImpl implements ReplyService{

    private final ReplyRepository replyRepository;


}
