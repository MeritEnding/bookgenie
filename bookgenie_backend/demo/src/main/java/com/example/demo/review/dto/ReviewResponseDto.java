package com.example.demo.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewResponseDto {
    private int code;
    private String message;
    private Long reviewId; // 리뷰 작성 완료 응답에 사용
}
