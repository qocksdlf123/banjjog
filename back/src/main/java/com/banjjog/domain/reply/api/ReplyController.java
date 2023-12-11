package com.banjjog.domain.reply.api;

import com.banjjog.domain.reply.dto.*;
import com.banjjog.domain.reply.service.ReplyService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reply")
@CrossOrigin
public class ReplyController {

    private final ReplyService replyService;

    @Operation(summary = "replyId로 reply 조회")
    @GetMapping("")
    ResponseEntity<ReplyGetResDto> getReply(Integer replyId){
        return  replyService.getReply(replyId);
    }


    @Operation(summary = "userId와 day로 reply 조회")
    @GetMapping("/detail")
    ResponseEntity<ReplyGetByUserIdResDto> getReplyByUserId(@ModelAttribute ReplyGetByUserIdReqDto dto){
        return replyService.getReplyByUserId(dto);
    }

    @Operation(summary = "userId로 모든 text 즉 소감 조회", description = "해당하는 dat도 같이 조회")
    @GetMapping("/text")
    ResponseEntity<List<ReplyGetTextResDto>> getTexts(@RequestParam Integer userId){
        return replyService.getTexts(userId);
    }
    @Operation(summary = "userId, day, 답변 내용으로 Reply Entity 생성"
            ,description = "프론트 단에서 myReply, predictedReply 처리해줘야함"
    )
    @PostMapping("")
    ResponseEntity<ReplyCreateResDto> createReply(@RequestBody ReplyCreateReqDto dto) {
        return replyService.createReply(dto);
    }

    @Operation(summary = "기존에 답변한 내용에 소감 즉 text 추가하는 update api"
            ,description = "text만 수정하면 됨"
    )
    @PutMapping("")
    ResponseEntity<ReplyUpdateResDto> updateReply(@RequestBody ReplyUpdateReqDto dto){
        return replyService.updateReply(dto);
    }
}
